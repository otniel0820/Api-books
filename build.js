const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["./src/index.ts"],
    bundle: true,
    minify: true,
    logLevel: "info",
    platform: "node",
    outfile: "./dist/index.js",
  })
  .catch(() => process.exit(1));
