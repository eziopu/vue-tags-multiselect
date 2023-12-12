import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  root: "demo",
  server: {
    watch: {
      usePolling: true,
    },
  },
  build: {
    outDir: "../docs",
    rollupOptions: {
      input: {
        app: "index.html",
      },
    },
  },
});
