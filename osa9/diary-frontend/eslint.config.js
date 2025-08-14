import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"
import { globalIgnores } from "eslint/config"
import stylistic from "@stylistic/eslint-plugin";

export default tseslint.config([
    globalIgnores(["dist"]),
    {
        extends: [
            js.configs.recommended,
            tseslint.configs.recommendedTypeChecked,
            {
                languageOptions: {
                    parserOptions: {
                        projectService: true,
                        tsconfigRootDir: import.meta.dirname,
                    },
                },
            },
            reactHooks.configs["recommended-latest"],
            reactRefresh.configs.vite,
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            "@stylistic": stylistic,
        },
        rules: {
            "@stylistic/semi": "error",
            "@typescript-eslint/no-unsafe-assignment": "error",
            "@typescript-eslint/no-explicit-any": "error",
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/restrict-template-expressions": "off",
            "@typescript-eslint/restrict-plus-operands": "off",
            "@typescript-eslint/no-unused-vars": [
                "error",
                { "argsIgnorePattern": "^_" }
            ],
            "@stylistic/indent": ["error", 4],
            "@stylistic/quotes": ["error", "double"],
        },
        "ignores": ["build/*"],
        files: ["**/*.{ts,tsx}"],
    },
])
