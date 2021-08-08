const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  rootDir: './',
  testEnvironment: 'node',
  // globalSetup: './common/tests/globalSetup.ts',
  // setupFilesAfterEnv: ['./common/tests/setup.ts'],
  coverageDirectory: '../tests/coverage',
  collectCoverage: false,
  coverageReporters: ['html'],
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@src(.*)$': '<rootDir>/$1',
  },
};
