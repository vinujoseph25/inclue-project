
const config = {
  rootDir: '../src',
  coverageDirectory: '<rootDir>/../coverage',
  coverageThreshold: {
    "**/*.tsx": {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 90
    }
  },
  transform: {
    "^.+\\.[t|j]sx?$": ['ts-jest', { isolatedModules: true }],
    "^.+\\.(svg|png)$": "<rootDir>/../config/assetsTransform.js",
  },
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transformIgnorePatterns: [
    "node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)"
  ],
  moduleDirectories: ['src', 'node_modules'],
  moduleNameMapper: {
    '.*\\.(scss|css|graphql)$': '<rootDir>/../config/jestStyleMock.js',
  },
  clearMocks: true,
  setupFilesAfterEnv: []
};

module.exports = config;
