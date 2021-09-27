module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ["build"],
  globalSetup: './src/__testHelpers__/jestGlobalSetup.ts',
  globalTeardown: './src/__testHelpers__/jestGlobalTeardown.ts',
};