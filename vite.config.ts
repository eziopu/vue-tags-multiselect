import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ["vue-demi"],
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "vue-tags-multiselect",
      fileName: "vue-tags-multiselect",
    },
    rollupOptions: {
      external: ["vue", "vue-demi"],
      output: {
        globals: {
          vue: "Vue",
          "vue-demi": "VueDemi",
        },
      },
    },
  },
});
