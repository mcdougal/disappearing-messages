import path from 'path';

import { tsconfigResolver } from 'tsconfig-resolver';

import { getCachedAliases, loadCache, persistCachedAliases } from './cache';
import parseTypeScriptAliases from './parseTypeScriptAliases';
import { PathAlias } from './types';

export default async (filePath: string): Promise<Array<PathAlias>> => {
  const tsConfig = await tsconfigResolver({ cwd: path.dirname(filePath) });

  if (!tsConfig.exists) {
    return [];
  }

  const cache = loadCache();
  const cachedAliases = getCachedAliases(cache, tsConfig.path);

  let aliases: Array<PathAlias>;

  if (cachedAliases) {
    aliases = cachedAliases;
  } else {
    aliases = parseTypeScriptAliases(tsConfig);

    // Cache parsed aliases because it can take 1 second or more to load
    // the config file. This is too long if you are sorting imports on
    // every save or if you are running a git precommit hook.
    if (aliases) {
      persistCachedAliases(cache, tsConfig.path, aliases);
    }
  }

  return aliases;
};
