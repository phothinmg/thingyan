/* cspell:disable */
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],
  outDir: "./dist",
  splitting: true,
  sourcemap: true,
  dts: true,
  format: "esm",
  bundle: true,
  treeshake: true,
  minify: true,
  clean: true
});
