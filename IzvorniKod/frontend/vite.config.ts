import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    define: {
      "process.env.DEV": JSON.stringify(env.DEV),
    },
    plugins: [react()],
    build: {
      outDir: "./src/main/resources/static",
      empyOutDir: true,
    },
  };
});
