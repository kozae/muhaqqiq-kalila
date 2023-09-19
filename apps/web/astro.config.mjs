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
  build: {
    inlineStylesheets: "always",
  },
  vite: {
    plugins: [wasm()],
    optimizeDeps: {
      exclude: [
        "codemirror",
        "@codemirror/autocomplete",
        "@codemirror/commands",
        "@codemirror/language",
        "@codemirror/lint",
        "@codemirror/search",
        "@codemirror/state",
        "@codemirror/view",
        "style-mod",
      ],
    },
    ssr: {
      external: [
        "codemirror",
        "@codemirror/autocomplete",
        "@codemirror/commands",
        "@codemirror/language",
        "@codemirror/lint",
        "@codemirror/search",
        "@codemirror/state",
        "@codemirror/view",
        "style-mod",
      ],
    },
    worker: {
      format: "es",
      plugins: [wasm(), topLevelAwait()],
    },
  },
});
