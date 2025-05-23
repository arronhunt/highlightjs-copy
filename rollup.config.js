import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import esbuild from "rollup-plugin-esbuild";

export default {
  input: "index.js",
  output: [
    {
      file: "dist/highlightjs-copy.esm.js",
      format: "esm",
      sourcemap: true,
      exports: "auto",
    },
    {
      file: "dist/highlightjs-copy.cjs.js",
      format: "cjs",
      sourcemap: true,
      exports: "auto",
    },
    {
      file: "dist/highlightjs-copy.umd.js",
      format: "umd",
      name: "HighlightJSCopy",
      sourcemap: true,
      exports: "auto",
    },
    {
      file: "dist/highlightjs-copy.min.js",
      format: "umd",
      name: "HighlightJSCopy",
      sourcemap: true,
      exports: "auto",
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    esbuild({
      minify: true,
      target: ["es2020", "chrome58", "firefox57", "safari11"],
      legalComments: "none",
      treeShaking: true,
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true,
    }),
  ],
};
