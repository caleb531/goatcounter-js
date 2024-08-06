import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";

export default [
  // We need to compile the type declaration file as a separate input/output
  // entry because otherwise (if we combine the dts() plugin with the ESM
  // compilation), the dts() plugin will overwrite the contents of our ESM
  // bundle with the contents of the definitions file (even if we define a
  // separte output path); it's also important that the types are compiled
  // first, so that TypeScript doesn't complain when building the subsequent
  // library bundle
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.cjs.d.ts",
        format: "cjs",
      },
      {
        file: "dist/index.es.d.ts",
        format: "es",
      },
    ],
    plugins: [dts()],
  },
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.cjs.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/index.es.js",
        format: "es",
        sourcemap: true,
      },
    ],
    plugins: [json(), commonjs(), esbuild({ minify: true })],
  },
];
