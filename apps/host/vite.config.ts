import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: "./runtimeConfig", replacement: "./runtimeConfig.browser" },
      { find: "@", replacement: "/src" },
    ],
  },
  plugins: [
    react(),
    federation({
      name: "host-app",
      remotes: {
        pagesApp: "/pagesApp/assets/remoteEntry.js",
      },
      shared: [
        "react",
        "react-dom",
        "@fontsource/amiri",
        "@fontsource/material-icons",
        "@fontsource/noto-naskh-arabic",
        "@fontsource/noto-sans-display",
        // "@headlessui/react",
        "@heroicons/react",
        "animate.css",
      ],
    }),
  ],
  preview: {
    host: "localhost",
    port: 5000,
    strictPort: true,
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
