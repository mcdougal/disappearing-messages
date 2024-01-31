/* eslint-disable security/detect-non-literal-fs-filename */
import fs from 'fs';

import { PathAlias } from '../types';

import { Cache } from './types';

export default (
  cache: Cache,
  configAbsPath: string
): Array<PathAlias> | null => {
  let aliases: Array<PathAlias> | null = null;

  if (cache[configAbsPath]) {
    const configCache = cache[configAbsPath];
    const cacheMTime = new Date(configCache.mtime);
    const configMTime = fs.statSync(configAbsPath).mtime;

    if (configMTime <= cacheMTime) {
      aliases = configCache.aliases;
    }
  }

  return aliases;
};
