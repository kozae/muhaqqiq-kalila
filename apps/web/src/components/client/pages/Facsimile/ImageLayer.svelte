<script lang="ts">
  import { Image, Layer } from "svelte-konva";
  import imageData from "./data/image-data";
</script>

<Layer config={{ listening: false }}>
  <Image
    config={{
      image: $imageData?.img,
      width: $imageData?.width,
      height: $imageData?.height,
    }}
  />
</Layer>
