import { configDefaults, defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, "examples/**", ".vscode/**", ".github/**"],
    alias: {
      "schemix/lib": resolve(__dirname, "lib"),
      "schemix": resolve(__dirname, "lib", "index"),
    }
  },
});
