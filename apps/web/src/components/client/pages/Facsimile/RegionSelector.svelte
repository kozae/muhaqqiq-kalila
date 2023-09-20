<script lang="ts">
  import { Layer, Rect, Transformer } from "svelte-konva";
  import type { RectConfig } from "konva/lib/shapes/Rect";
  import { getWidthAndHeight, fromRect } from "./helpers/polygon.helper";
  import { editRegionPoints$ } from "../facsimile-events";
  import type { IRect } from "konva/lib/types";

  export let init: number[] = [];
  export let scaleRatio: number = 1;

  const dimensions = getWidthAndHeight(init);
  const rectangle: RectConfig = {
    rotation: init[8],
    x: init[0] * scaleRatio,
    y: init[1] * scaleRatio,
    width: dimensions.width * scaleRatio,
    height: dimensions.height * scaleRatio,
    scaleX: 1,
    scaleY: 1,
    fill: "#F0EF3C",
    name: "highlighter",
    draggable: true,
    opacity: 0.5,
    dragBoundFunc: function (pos) {
      const stage = this.getStage();
      const stageWidth = stage!.width();
      const stageHeight = stage!.height();
      const scale = this.getAbsoluteScale();
      const shapeWidth = this.width() * scale.x;
      const shapeHeight = this.height() * scale.y;
      let x = pos.x;
      let y = pos.y;
      if (pos.x < 0) {
        x = 0;
      }
      if (pos.x > stageWidth - shapeWidth) {
        x = stageWidth - shapeWidth;
      }
      if (pos.y < 0) {
        y = 0;
      }
      if (pos.y > stageHeight - shapeHeight) {
        y = stageHeight - shapeHeight;
      }
      return {
        x: x,
        y: y,
      };
    },
  };

  let transformer: any;
  let selectedShapeName = "";

  function handleStageMouseDown(e: any) {
    const konvaEvent = e.detail;
    // clicked on stage - clear selection
    if (konvaEvent.target === konvaEvent.target.getStage()) {
      selectedShapeName = "";
      updateTransformer();
      return;
    }

    // clicked on transformer - do nothing
    const clickedOnTransformer =
      konvaEvent.target.getParent().className === "Transformer";
    if (clickedOnTransformer) {
      return;
    }

    // find clicked rect by its name
    selectedShapeName = konvaEvent.target.name();

    updateTransformer();
  }

  function handleTransformEnd() {
    editRegionPoints$.next(fromRect(rectangle, scaleRatio));
  }

  function updateTransformer() {
    if (!transformer) return;

    // here we need to manually attach or detach Transformer node
    const stage = transformer.getStage();

    const selectedNode = stage.findOne("." + selectedShapeName);

    // do nothing if selected node is already attached
    if (selectedNode === transformer.node()) {
      return;
    }

    if (selectedNode) {
      // attach to another node
      transformer.nodes([selectedNode]);
    } else {
      // remove transformer
      transformer.nodes([]);
    }
  }
</script>

<Layer on:mousedown={handleStageMouseDown} on:touchstart={handleStageMouseDown}>
  <Rect
    config={rectangle}
    on:transformend={handleTransformEnd}
    on:dragend={handleTransformEnd}
  />
  <Transformer bind:handle={transformer} config={{ borderStroke: "#1b2e3c" }} />
</Layer>
