import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/**/*.ts"],
  format: ["esm", "cjs"],
  esbuildOptions: (options) => {
    options.footer = {
      js: `
      try{
      module.exports = module.exports.default;
      }catch{}
      `,
    };
  },
  cjsInterop: true,
  dts: true,
  splitting: false,
  sourcemap: false,
  minify: true,
  clean: true,
});
