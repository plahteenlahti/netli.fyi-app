module.exports = {
  preset: 'react-native',
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/utilities/**/*.ts'],
  coverageDirectory: 'coverage',
  transformIgnorePatterns: ['node_modules/react-native-keychain)']
}
