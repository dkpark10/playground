import { defineConfig } from 'vite';
import path from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      formats: ['iife', 'umd'],
      name: 'heapqTs',
      entry: path.resolve(__dirname, 'src/index.ts'),
    },
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
      },
    },
    outDir: 'dist',
  },
  plugins: [dts()],
});
