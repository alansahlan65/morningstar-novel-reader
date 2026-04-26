import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1200
  },
  plugins: [react()],
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"]
  }
});
