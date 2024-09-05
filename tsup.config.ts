import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: ['src/'],
  outDir: 'dist',
  dts: false,
  clean: true,
  sourcemap: false,
  minify: true,
  format: 'iife',
  target: 'es6',
});
