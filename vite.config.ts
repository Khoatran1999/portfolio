import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          motion: ["framer-motion"],
          form: ["react-hook-form", "zod", "@hookform/resolvers"],
          icons: ["lucide-react"],
        },
      },
    },
  },
});
