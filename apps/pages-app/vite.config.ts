import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "pages-app",
      filename: "remoteEntry.js",
      exposes: {
        "./PagesApp": "./src/App",
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
        // "aws-amplify",
      ],
    }),
  ],
  preview: {
    host: "localhost",
    port: 5001,
    strictPort: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    outDir: "../host/dist/pagesApp",
  },
});
