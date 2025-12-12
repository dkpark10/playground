import { defineConfig } from 'vite'
import * as path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },

  build: {
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      input: 'src/injected.ts',
      output: {
        entryFileNames: 'injected.js',
        format: 'iife',
      },
    },
  },
});
