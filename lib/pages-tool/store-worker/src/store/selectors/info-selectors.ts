import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "..";
import { rootSelector } from "./root-selector";
import type { LineUpdateInput, PageUpdateInput } from "kalila-graphql";
import {
  selectAllImageElements,
  selectAllSegments,
  selectAllTextElements,
} from "../base-selectors";
import { selectElementLines } from "../internal-selectors";

const selectPageInfoState = (state: RootState) => state.info;

export const selectPageInfo = createSelector(selectPageInfoState, (info) => {
  const tags: Record<string, boolean> = {};
  (info?.tags ?? []).forEach((tag) => {
    if (tag) tags[tag] = true;
  });
  return { ...info, tags, tagList: info?.tags ?? [], version: Date.now() };
});

export const selectUpdatePayload = createSelector(rootSelector, (state) => {
  const version = Date.now();
  const update: PageUpdateInput = { version };

  if (state.changed.info) {
    update.tags = state.info?.tags ?? [];
    update.foliation = state.info?.foliation;
    update.pagination = state.info?.pagination;
    update.commentary = state.info?.commentary ?? [];
  }

  if (state.changed.text) {
    update.text = selectAllTextElements(state.text).map((text) => {
      let lines: LineUpdateInput[] | undefined = undefined;
      if (state.changed.lines) {
        lines = selectElementLines(state, text.id).map((line) => ({
          id: line.id,
          elementId: text.id,
          order: line.order,
          position: line.position!,
          region: line.region,
        }));
      }
      return {
        id: text.id,
        order: text.order,
        position: text.position!,
        region: text.region,
        lines,
      };
    });
  }

  if (state.changed.images) {
    update.images = selectAllImageElements(state.images).map((image) => ({
      id: image.id,
      order: image.order,
      position: image.position!,
      region: image.region,
      unitId: image.unitId,
      legendId: image.legendId,
      motifs: image.motifs,
      style: image.style,
    }));
  }

  if (state.changed.segments) {
    update.segments = selectAllSegments(state.segments).map((segment) => ({
      id: segment.id,
      unitId: segment.unitId,
      startPage: segment.startPage,
      startLine: segment.startLine,
      startToken: segment.startToken,
      endPage: segment.endPage,
      endLine: segment.endLine,
      endToken: segment.endToken,
      mediumId: segment.mediumId,
      tags: segment.tags,
      lacuna: segment.lacuna,
    }));
  }

  return {
    id: state.info?.id,
    number: state.info?.number,
    mediumId: state.info?.mediumId,
    update,
  };
});
