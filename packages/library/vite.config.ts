import { defineConfig } from 'vite';
import path from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    target: 'es6',
    emptyOutDir: false,
    lib: {
      formats: process.env.VITE_MODULE === 'cjs' ? ['cjs'] : ['iife', 'umd'],
      name: 'heapqTs', // formats가 iife, umd일 때 필요한 전역변수 네이밍
      entry: path.resolve(__dirname, 'src/index.ts'),
    },
    rollupOptions: {
      output: {
        entryFileNames: `${process.env.VITE_MODULE === 'cjs' ? 'cjs' : 'es'}/[name].js`,
      },
    },
    outDir: 'dist',
  },
  plugins: [dts()],
});
