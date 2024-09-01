module.exports = {
  root: true,
  env: {
    es2021: true
  },
  extends: ['@react-native'],
  plugins: ['@typescript-eslint', 'react', 'react-native', 'jest'],
  rules: {
    'no-undef': 'off',
    semi: [2, 'never'],
    'comma-dangle': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
    ]
  }
}
