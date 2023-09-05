import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const pwaOptions: Partial<VitePWAOptions> = {
  mode: "development",
  base: "/",
  includeAssets: ["favicon.svg"],
  srcDir: "src",
  manifest: {
    name: "Muhaqqiq Kalila",
    short_name: "MuKa",
    theme_color: "#4d4d0a",
    icons: [
      {
        src: "pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  },
};

export default defineConfig({
  resolve: {
    alias: [
      { find: "./runtimeConfig", replacement: "./runtimeConfig.browser" },
    ],
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
        type: "module",
        navigateFallback: "index.html",
      },
      workbox: { mode: "production" },
      ...pwaOptions,
    }),
    tsconfigPaths(),
    wasm(),
    topLevelAwait(),
  ],
  worker: {
    format: "es",
    plugins: [wasm(), topLevelAwait()],
  },
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
