module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    indent: ['error', 2],
    'eol-last': ['error', 'never'],
    'multiline-ternary': ['error', 'never'],
    'react/prop-types': [0],
    'react/display-name': [0],
    'react-hooks/rules-of-hooks': 'error' // Проверяем правила хуков
  }
}