const esbuild = require("esbuild");
// Build with esbuild for both commonjs and global
esbuild
  .build({
    entryPoints: ["./index.js"],
    bundle: true,
    outfile: "dist/highlightjs-copy.js",
    format: "iife",
    globalName: "HighlightCopy",
    minify: true,
    sourcemap: true,
    target: ["es2015"],
    define: {
      "process.env.NODE_ENV": '"production"',
    },
  })
  .catch(() => process.exit(1));

// Build with esbuild for esm
esbuild.build({
  entryPoints: ["./index.js"],
  bundle: true,
  outfile: "dist/highlightjs-copy.esm.js",
  minify: true,
  sourcemap: true,
  target: ["var"],
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});
