import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  root: resolve(process.cwd(), "demo"),
  build: {
    outDir: "../demo_dist",
  },
  plugins: [vue()],
  define: {
    __DEV__: JSON.stringify(!process.env.prod),
    __BROWSER__: "true",
    "process.env": {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  },
});
