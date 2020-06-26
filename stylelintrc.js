module.exports = {
  extends: ["stylelint-config-sonarqube"],
  plugins: ["stylelint-scss"],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "include",
          "mixin",
          "extend",
          "if",
          "else",
          "for",
          "return",
          "each",
          "warn",
          "error",
          "function"
        ]
      }
    ],

    "selector-type-no-unknown": [
      true,
      {
        ignore: ["custom-elements"],
        ignoreTypes: ["modal"]
      }
    ],

    "block-no-empty": true,
    "max-nesting-depth": 5,
    "function-url-quotes": "never",
    "declaration-block-no-duplicate-properties": [true, {
      "ignore": "consecutive-duplicates"
    }],
    "no-descending-specificity": null,
    "declaration-bang-space-after":"never"
  }
};
