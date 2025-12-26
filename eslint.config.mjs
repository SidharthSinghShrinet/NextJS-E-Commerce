import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  prettier,
  {
    rules: {
      // Core JS
      "no-unused-vars": "warn",
      "no-undef": "off",
      eqeqeq: ["error", "always"],
      "prefer-const": "error",
      // "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-console": "off",

      // React
      "react/jsx-key": "error",
      "react/self-closing-comp": "warn",

      // Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Security
      "no-eval": "error",
      "no-implied-eval": "error",

      // Backend / async
      "no-shadow": "warn",
      "require-await": "warn",
      "no-return-await": "warn",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
