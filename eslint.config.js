import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";

export default tseslint.config(
    { ignores: ["dist"] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2022,
            globals: globals.browser,
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        plugins: {
            react,
        },
        rules: {
            ...react.configs.recommended.rules,
            ...react.configs["jsx-runtime"].rules,
            "no-undef": "warn",
            "prefer-const": "error",
            "linebreak-style": ["error", "unix"],
            "prefer-arrow-callback": "error",
            "comma-dangle": [
                "error",
                {
                    "arrays": "only-multiline",
                    "objects": "always-multiline",
                    "imports": "always-multiline",
                    "exports": "always-multiline",
                    "functions": "never",
                },
            ],
        },
    }
);
