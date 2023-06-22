import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: "./runtimeConfig", replacement: "./runtimeConfig.browser" },
    ],
  },
  plugins: [react(), tsconfigPaths(), wasm(), topLevelAwait()],
  preview: {
    host: "localhost",
    port: 5002,
    strictPort: true,
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: true,
    cssCodeSplit: true,
  },
});
