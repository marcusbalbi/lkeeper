module.exports = {
  rootDir: './',
  preset: 'ts-jest',
  testEnvironment: 'node',
  globalSetup: './tests/globalSetup.ts',
  // setupFiles: ['./tests/setup.ts'],
  moduleNameMapper: {
    '^@root(.*)$': '<rootDir>/$1',
    '^@src/(.*)$': '<rootDir>/src/$1',
  },
};
