import { ImportDeclaration } from '@babel/types';

import { PathAlias } from '../../resolvePathAliases';
import { getModuleType, ModuleType } from '../utils';

/**
 * Provide an intuitive ordering rank for the given module.
 */
export default (node: ImportDeclaration, aliases: Array<PathAlias>): number => {
  const rankByModuleType: { [key in ModuleType]: number } = {
    sideEffect: 0,
    builtin: 100,
    external: 200,
    aliasOtherWorkspace: 300,
    aliasThisWorkspace: 400,
    parent: 800 - (node.source.value?.match(/\./g)?.length ?? 0),
    sibling: 900,
    index: 1000,
  };

  return rankByModuleType[getModuleType(node, aliases)];
};
