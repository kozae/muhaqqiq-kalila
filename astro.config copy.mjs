import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import tailwindcss from "@astrojs/tailwind";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
  integrations: [svelte(), tailwindcss()],
  vite: {
    worker: {
      format: "es",
      plugins: [wasm(), topLevelAwait()],
    },
  },
});
