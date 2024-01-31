/* eslint-disable security/detect-non-literal-fs-filename */
import fs from 'fs';

import getAliasesCacheFilePath from './getAliasesCacheFilePath';
import { Cache } from './types';

export default (): Cache => {
  let cache: Cache = {};

  if (fs.existsSync(getAliasesCacheFilePath())) {
    let cacheJson: string | null;

    try {
      cacheJson = fs.readFileSync(getAliasesCacheFilePath()).toString();
    } catch (error) {
      cacheJson = null;
    }

    if (cacheJson !== null) {
      try {
        cache = JSON.parse(cacheJson);
      } catch (error) {
        // Return empty cache if file is corrupted
      }
    }
  }

  return cache;
};
