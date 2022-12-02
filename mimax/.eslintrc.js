module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'linebreak-style': ['warning', 'windows'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/no-unresolved': 'off',
    'import/no-dynamic-require': 'off',
    'global-require': 'off',
    'no-console': 'off',
    'no-useless-concat': 'off',
    'linebreak-style': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'no-trailing-spaces': 'off', 
    'react/jsx-no-bind': 'off',
    'prefer-arrow-callback': 'off',
    'prefer-template': 'off',
    'jsx-a11y/alt-text': 'off',
    'react/self-closing-comp': 'off',
    'func-names': 'off',
    'no-shadow': 'off',
  },
};
