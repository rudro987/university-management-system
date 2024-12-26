import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    rules: {
      "no-unused-vars": "error",  // Enforce no unused variables
      "no-undef": "error",  // Enforce no undefined variables
      "prefer-const": "error", // Enforce `const` for variables that are not reassigned
      'no-unused-expressions': 'error', // Disallow unused expressions
      "no-console": "warn", // Allow during development but warn for production readiness

      // Additional TypeScript-Specific Rules
      "@typescript-eslint/no-explicit-any": "warn", // Warn against `any` usage
      // "@typescript-eslint/explicit-function-return-type": "error", // Enforce return types on functions
      "@typescript-eslint/no-empty-function": "warn", // Warn against empty functions
      "prettier/prettier": "warn", // Warn on Prettier formatting violations
    },
  },
  {
    ignores: ["**/node_modules/", "**/dist/"], // Ignore node_modules and dist folders
  },
  {
    extends: ["prettier"], // Extends Prettier rules
  }
);