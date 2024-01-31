import { TsConfigResultSuccess } from 'tsconfig-resolver';

import { PathAlias } from './types';

export default (tsConfig: TsConfigResultSuccess): Array<PathAlias> => {
  if (
    !tsConfig.config.compilerOptions ||
    !tsConfig.config.compilerOptions.paths
  ) {
    return [];
  }

  const aliases = Object.entries(tsConfig.config.compilerOptions.paths).map(
    ([key, paths]) => {
      const alias = key.replace(/\/\*$/, ``);

      const hasExternalWorkspacePath = paths.some((path) => {
        return path.startsWith(`..`);
      });

      return hasExternalWorkspacePath
        ? { alias, workspace: `external` as const }
        : { alias, workspace: `internal` as const };
    }
  );

  return aliases;
};
