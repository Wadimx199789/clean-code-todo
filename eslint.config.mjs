import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  js.configs.recommended,
  {
    languageOptions: { globals: globals.browser },
    rules: {
      "no-var": "error",
      "prefer-const": "error",
      "no-console": "warn",
    },
  },
]);
