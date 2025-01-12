/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
  },
  build: {
    outDir: "./src/main/resources/static",
    emptyOutDir: true,
  },
  define: {
    "process.env.VITE_DEV": JSON.stringify(process.env.VITE_DEV),
    "process.env.VITE_GOOGLE_MAPS_API_KEY": JSON.stringify(
      process.env.VITE_GOOGLE_MAPS_API_KEY
    ),
  },
});
