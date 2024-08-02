import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  root: 'demo',
  resolve: {
    alias: {
      '@models': fileURLToPath(new URL('./models', import.meta.url)),
      '@tools': fileURLToPath(new URL('./components/tools', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
    watch: {
      usePolling: true,
    },
  },
  build: {
    outDir: '../docs',
    rollupOptions: {
      input: {
        app: 'demo/index.html',
      },
    },
  },
});
