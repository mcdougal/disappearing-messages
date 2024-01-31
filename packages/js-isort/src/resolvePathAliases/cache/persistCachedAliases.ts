/* eslint-disable security/detect-non-literal-fs-filename */
import fs from 'fs';

import { PathAlias } from '../types';

import getAliasesCacheFilePath from './getAliasesCacheFilePath';
import { Cache } from './types';

export default (
  cache: Cache,
  configAbsPath: string,
  aliases: Array<PathAlias>
): void => {
  const configMTime = fs.statSync(configAbsPath).mtime;

  const newCache: Cache = {
    ...cache,
    [configAbsPath]: {
      mtime: configMTime,
      aliases,
    },
  };

  fs.writeFileSync(getAliasesCacheFilePath(), JSON.stringify(newCache));
};
