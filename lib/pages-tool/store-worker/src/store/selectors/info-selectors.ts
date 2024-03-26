import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "..";
import { rootSelector } from "./root-selector";
import type { ImageInput, LineInput, PageUpdateInput, SegmentInput } from "kalila-graphql";
import {
  selectAllImageElements,
  selectAllLines,
  selectAllSegments,
  selectAllTextElements,
} from "../base-selectors";
import { selectGroupedLines } from "../internal-selectors";

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
  const update: PageUpdateInput = {
    id: state.info?.id!,
    number: state.info?.number!,
    mediumId: state.info?.mediumId!,
    version
  };

  if (state.changed.info) {
    const info = {
      tags: state.info?.tags ?? [],
      foliation: state.info?.foliation,
      pagination: state.info?.pagination,
      commentary: state.info?.commentary ?? [],
    }
    update.info = info;
  }

  if (state.changed.text) {
    update.text = selectAllTextElements(state.text).map((text) => {
      return {
        id: text.id,
        order: text.order,
        position: text.position!,
        region: text.region! as number[],
      };
    });
  }

  const groupedLines = selectGroupedLines(state);

  const lines = {
    body: groupedLines.body.map((line) => ({
      id: line.id!,
      order: line.order!,
      elementId: line.elementId!,
      region: line.region! as number[],
      states: line.states as string[],
      tokens: line.tokens as string[],
    } as LineInput)),
    margin: groupedLines.margin.map((line) => ({
      id: line.id!,
      order: line.order!,
      elementId: line.elementId!,
      region: line.region! as number[],
      states: line.states as string[],
      tokens: line.tokens as string[],
    } as LineInput))
  }

  if (state.changed.lines) {
    update.bodyLines = lines.body;
    update.marginLines = lines.margin;
  }

  if (state.changed.images) {
    update.images = selectAllImageElements(state.images).map((image) => ({
      id: image.id,
      order: image.order,
      position: image.position!,
      region: image.region! as number[],
      unitId: image.unitId,
      location: image.location,
      legendId: image.legendId,
      legend: image.legend,
      motifs: image.motifs,
      style: image.style,
    } as ImageInput));
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
      tags: segment.tags,
      lacuna: segment.lacuna ?? false,
      type: segment.type ?? 'n',
    } as SegmentInput));
    if (!update.bodyLines) {
      update.bodyLines = lines.body;
      update.marginLines = lines.margin;
    }
  }


  return update
});
