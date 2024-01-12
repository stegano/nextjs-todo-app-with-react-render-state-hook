module.exports = {
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["prettier", "unused-imports"],
  extends: [
    "next/core-web-vitals",
    "plugin:react/recommended",
    "airbnb",
    "airbnb-typescript",
    "plugin:react/jsx-runtime",
    "plugin:prettier/recommended",
    "plugin:storybook/recommended",
  ],
  rules: {
    "react/prop-types": "off",
    "react/jsx-props-no-spreading": "off",
    "func-names": "off",
    "prettier/prettier": "error",
    "import/prefer-default-export": "off",
    "import/extensions": "off",
    "no-unused-vars": "off",
    // or "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
  },
  ignorePatterns: ["references"],
};
