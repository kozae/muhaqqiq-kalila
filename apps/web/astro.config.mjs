import { defineConfig } from "astro/config";
import aws from "astro-sst/lambda";
import svelte from "@astrojs/svelte";
import tailwindcss from "@astrojs/tailwind";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
  output: "server",
  adapter: aws(),
  integrations: [svelte(), tailwindcss()],
  vite: {
    plugins: [wasm(), topLevelAwait()],
    worker: {
      format: "es",
      plugins: [wasm(), topLevelAwait()],
    },
  },
});
