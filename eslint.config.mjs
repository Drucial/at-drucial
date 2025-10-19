import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";
import stylistic from "@stylistic/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import react from "eslint-plugin-react";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    plugins: {
      "@stylistic": stylistic,
      "simple-import-sort": simpleImportSort,
      react: react,
      import: importPlugin,
      "unused-imports": unusedImports,
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      // No unused imports (auto-removable with --fix)
      "unused-imports/no-unused-imports": "error",
      // No unused variables or imports
      "unused-imports/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      // Enforce separate type imports
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "separate-type-imports",
          disallowTypeAnnotations: false,
        },
      ],
      "@typescript-eslint/no-import-type-side-effects": "warn",
      // Enforce type over interface
      "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
      // Enforce top-level type imports (import type { X } instead of import { type X })
      "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
      // Enforce aliased imports - prevent relative imports using ../
      "no-restricted-imports": [
        "warn",
        {
          patterns: [
            {
              group: ["../*", "../../*"],
              message:
                "Use '@/' alias imports instead of relative parent imports (../ or ../../)",
            },
          ],
        },
      ],
      // Import sorting
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Side effect imports first
            ["^\\u0000"],
            // Node.js built-ins
            [
              "^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)",
            ],
            // React and Next.js
            ["^react", "^next"],
            // Other packages
            ["^@?\\w"],
            // Absolute imports and other imports
            ["^"],
            // Relative imports
            ["^\\."],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      // Enforce function declarations over arrow functions for components
      "react/function-component-definition": [
        "warn",
        {
          namedComponents: "function-declaration",
          unnamedComponents: "arrow-function",
        },
      ],
      // React prop sorting
      "react/jsx-sort-props": [
        "error",
        {
          callbacksLast: true,
          shorthandFirst: true,
          multiline: "last",
          ignoreCase: true,
          reservedFirst: true,
        },
      ],
      // Padding between statements
      "@stylistic/padding-line-between-statements": [
        "error",
        // Blank line after imports
        { blankLine: "always", prev: "import", next: "*" },
        { blankLine: "any", prev: "import", next: "import" },
        // Blank line before return statements
        { blankLine: "always", prev: "*", next: "return" },
        // Blank line before and after function declarations
        { blankLine: "always", prev: "*", next: "function" },
        { blankLine: "always", prev: "function", next: "*" },
        // Blank line before and after type/interface declarations
        { blankLine: "always", prev: "*", next: "type" },
        { blankLine: "always", prev: "type", next: "*" },
        { blankLine: "always", prev: "*", next: "interface" },
        { blankLine: "always", prev: "interface", next: "*" },
        // Blank line before and after class declarations
        { blankLine: "always", prev: "*", next: "class" },
        { blankLine: "always", prev: "class", next: "*" },
        // Blank line before and after export statements
        { blankLine: "always", prev: "*", next: "export" },
        { blankLine: "always", prev: "export", next: "*" },
        { blankLine: "any", prev: "export", next: "export" },
      ],
    },
  },
];

export default eslintConfig;
