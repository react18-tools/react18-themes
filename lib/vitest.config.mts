import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["vitest.setup.ts"],
    coverage: {
      include: ["src/**"],
      exclude: ["src/**/index.ts", "src/**/declaration.d.ts", "src/server/**"],
      reporter: ["text", "json", "clover", "html"],
    },
  },
});
