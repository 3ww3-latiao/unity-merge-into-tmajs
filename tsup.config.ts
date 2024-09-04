import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: ['src/'],
  outDir: 'dist',
  dts: false,
  sourcemap: true,
  clean: true,
  format: ['cjs', 'esm'],
});
