import type { Config } from 'jest'

const config: Config = {
  preset: 'react-native',
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/utilities/**/*.ts'],
  coverageDirectory: 'coverage',
  rootDir: '.',
  roots: ['<rootDir>/src'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.+(ts|tsx|js)',
    '<rootDir>/src/**/?(*.)+(spec|test).+(ts|tsx|js)'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
        isolatedModules: true
      }
    ]
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'yml'],
  testPathIgnorePatterns: ['mocks'],
  testEnvironment: 'jsdom'
}

export default config
