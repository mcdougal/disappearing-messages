/* eslint-disable security/detect-non-literal-fs-filename */
import fs from 'fs';
import os from 'os';
import path from 'path';

import resolvePathAliases from '../resolvePathAliases';

describe(`resolvePathAliases`, () => {
  const tests = [
    {
      name: `returns nothing when config is null`,
      targetFilePath: path.resolve(
        __dirname,
        `testConfigs`,
        `noConfig`,
        `targetFile.ts`
      ),
      expected: [],
    },
    {
      name: `returns nothing when TypeScript config does not define aliases`,
      targetFilePath: path.resolve(
        __dirname,
        `testConfigs`,
        `noAliases`,
        `targetFile.ts`
      ),
      expected: [],
    },
    {
      name: `works when TypeScript config defines aliases`,
      targetFilePath: path.resolve(
        __dirname,
        `testConfigs`,
        `withAliases`,
        `targetFile.ts`
      ),
      expected: [
        { alias: `foo`, workspace: `internal` },
        { alias: `@bar`, workspace: `internal` },
        { alias: `@foo/bar`, workspace: `internal` },
        { alias: `@foo/baz`, workspace: `external` },
      ],
    },
    {
      name: `works when TypeScript config defines aliases`,
      targetFilePath: path.resolve(
        __dirname,
        `testConfigs`,
        `withAliases`,
        `targetFile.ts`
      ),
      setup: (targetFilePath: string): void => {
        // Populate cache
        resolvePathAliases(targetFilePath);
      },
      expected: [
        { alias: `foo`, workspace: `internal` },
        { alias: `@bar`, workspace: `internal` },
        { alias: `@foo/bar`, workspace: `internal` },
        { alias: `@foo/baz`, workspace: `external` },
      ],
    },
  ];

  beforeEach(() => {
    const aliasesCachePath = path.join(
      os.tmpdir(),
      `js-isort-aliases-cache-5572930de0b0ebbc87ca7e77922d0c6a.json`
    );

    if (fs.existsSync(aliasesCachePath)) {
      fs.unlinkSync(aliasesCachePath);
    }
  });

  tests.forEach(({ name, targetFilePath, setup, expected }) => {
    test(name, async () => {
      if (setup) {
        setup(targetFilePath);
      }

      const actual = await resolvePathAliases(targetFilePath);

      expect(actual).toEqual(expected);
    });
  });
});
