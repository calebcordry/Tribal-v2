module.exports = {
  "extends": "airbnb",
  "plugins": [
      "react",
      "jsx-a11y",
      "import"
  ],
  "env": {
    "browser": true,
    "jest": true
  },
  "rules": {
    "react/prop-types": [0],
    "no-underscore-dangle": [0],
    "react/jsx-filename-extension": [0],
    "global-require": [0],
  }
};
