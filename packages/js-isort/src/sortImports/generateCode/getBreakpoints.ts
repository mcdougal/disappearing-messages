import { ImportDeclaration, Statement } from '@babel/types';

import { PathAlias } from '../../resolvePathAliases';
import { getModuleType, ModuleType } from '../utils';

/**
 * Get the names of the modules at the end of their groups. We will need to
 * insert line breaks after these modules.
 */
export default (
  bodyNodes: Array<Statement>,
  aliases: Array<PathAlias>
): Array<string> => {
  const breakpoints: Array<string> = [];

  let lastImportNode: ImportDeclaration | null = null;
  let lastImportModuleType: ModuleType | null = null;

  bodyNodes.forEach((node) => {
    if (node.type === `ImportDeclaration`) {
      const moduleType = getModuleType(node, aliases);

      if (lastImportNode && moduleType !== lastImportModuleType) {
        breakpoints.push(lastImportNode.source.value);
      }

      lastImportModuleType = moduleType;
      lastImportNode = node;
    }
  });

  return breakpoints;
};
