module.exports = {
  "extends": [
    "react-app",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  "rules": {
    "prettier/prettier": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "no-async-promise-executor": "off",
    "no-case-declarations": "off",
    "comma-dangle": "off",
    "@typescript-eslint/no-case-declarations": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-inferrable-types": "off"
  },
  "settings": {
    "react": {
      "version": "999.999.999"
    }
  }
}
