/* eslint-disable security/detect-non-literal-fs-filename */
import fs from 'fs';
import path from 'path';

import sortImports from '../sortImports';

import { Test } from './types';

export default (testFilesDir: string, tests: Array<Test>): void => {
  tests.forEach(({ name, testFile, aliases }) => {
    it(name, () => {
      const inputContent = fs.readFileSync(
        path.join(
          __dirname,
          `testFiles`,
          testFilesDir,
          `${testFile}.input.txt`
        ),
        `utf8`
      );

      expect(() => {
        return sortImports(inputContent, aliases);
      }).toThrow();
    });
  });
};
