const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  rootDir: './',
  testEnvironment: 'node',
  // globalSetup: './tests/globalSetup.ts',
  // setupFiles: ['./tests/setup.ts'],
  // coverageDirectory: './tests/coverage',
  // collectCoverage: true,
  // coverageReporters: ['html'],
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@root(.*)$': '<rootDir>/$1',
    '^@src/(.*)$': '<rootDir>/src/$1',
  },
};
