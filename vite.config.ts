/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, './lib/index.ts'),
      fileName: 'jtjs_react',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['@jtjs/browser', '@jtjs/view', 'react', 'react-dom'],
    },
  },
  test: {
    environment: 'happy-dom',
  },
});
