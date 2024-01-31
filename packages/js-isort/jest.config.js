/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: `ts-jest`,
  testEnvironment: `node`,
  testPathIgnorePatterns: [`<rootDir>/node_modules/`, `<rootDir>/.build/`],
};
