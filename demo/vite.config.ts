import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  root: resolve(process.cwd(), "demo"),
  plugins: [vue()],
  optimizeDeps: {
    exclude: ["vue-demi"],
  },
  build: {
    outDir: "../docs",
    rollupOptions: {
      input: {
        app: "./demo/index.html",
      },
    },
  },
  define: {
    __DEV__: JSON.stringify(!process.env.prod),
    __BROWSER__: "true",
    "process.env": {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  },
});
