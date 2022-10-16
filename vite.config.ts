import { configDefaults, defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, "examples/**", ".vscode/**", ".github/**"],
    alias: {
      "schemix/lib": resolve(__dirname, "lib"),
      "schemix": resolve(__dirname, "lib", "index"),
      /** in-library resolutions */
      "modules": resolve(__dirname, "lib", "modules"),
      "util": resolve(__dirname, "lib", "util"),
      "typings": resolve(__dirname, "lib", "typings"),
    }
  },
});
