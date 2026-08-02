import { defineConfig } from "vite"
import path from "path"

// Separate build for standalone CSS entry points (advi-ui/base,
// advi-ui/theme/default, advi-ui/theme/midnight). These are plain
// stylesheets, not JS-driven, so they're built outside vite.config.ts's
// library build — each input below becomes its own CSS file in dist/,
// with no colocated JS chunk.
export default defineConfig({
  build: {
    outDir: "dist",
    emptyOutDir: false,
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        base: path.resolve(__dirname, "src/styles/base.scss"),
        "theme/default": path.resolve(__dirname, "src/styles/themes/default/index.scss"),
        "theme/midnight": path.resolve(__dirname, "src/styles/themes/midnight/index.scss"),
      },
      output: {
        assetFileNames: "[name].css",
      },
    },
  },
})
