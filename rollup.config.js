import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

export default {
  input: "index.js",
  output: [
    {
      file: "dist/highlightjs-copy.esm.js",
      format: "esm",
      sourcemap: true,
      exports: "named",
    },
    {
      file: "dist/highlightjs-copy.cjs.js",
      format: "cjs",
      sourcemap: true,
      exports: "named",
    },
    {
      file: "dist/highlightjs-copy.umd.js",
      format: "umd",
      name: "HighlightJSCopy",
      sourcemap: true,
      exports: "named",
    },
    {
      file: "dist/highlightjs-copy.min.js",
      format: "umd",
      name: "HighlightJSCopy",
      sourcemap: true,
      exports: "named",
      plugins: [terser()],
    },
  ],
  plugins: [resolve(), commonjs()],
};
