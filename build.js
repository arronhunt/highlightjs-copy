const esbuild = require("esbuild");

function createConfig(
  entryPoints,
  outfile,
  format,
  minify = false,
  loader = {}
) {
  return {
    entryPoints,
    outfile,
    bundle: true,
    minify,
    target: "es2015",
    platform: "neutral",
    format,
    loader,
  };
}

const configs = [
  // JavaScript
  createConfig(["./index.js"], "dist/highlightjs-copy.js", "iife"),
  createConfig(["./index.js"], "dist/highlightjs-copy.min.js", "iife", true),
  createConfig(["./index.js"], "dist/highlightjs-copy.cjs.js", "cjs"),
  createConfig(["./index.js"], "dist/highlightjs-copy.cjs.min.js", "cjs", true),
  createConfig(["./index.js"], "dist/highlightjs-copy.esm.js", "esm"),
  createConfig(["./index.js"], "dist/highlightjs-copy.esm.min.js", "esm", true),

  // CSS
  createConfig(
    ["./styles/highlightjs-copy.css"],
    "dist/highlightjs-copy.css",
    "cjs",
    false,
    { ".css": "css" }
  ),
  createConfig(
    ["./styles/highlightjs-copy.css"],
    "dist/highlightjs-copy.min.css",
    "cjs",
    true,
    { ".css": "css" }
  ),
];

Promise.all(configs.map((config) => esbuild.build(config))).catch((e) => {
  console.error(e);
  process.exit(1);
});
