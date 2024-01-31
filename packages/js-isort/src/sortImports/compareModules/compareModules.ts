import { EmptyStatement, ImportDeclaration } from '@babel/types';

import { PathAlias } from '../../resolvePathAliases';
import { getModuleType } from '../utils';

import rankModule from './rankModule';

/**
 * Sort two import declarations based on their module.
 */
export default (
  nodeA: EmptyStatement | ImportDeclaration,
  nodeB: EmptyStatement | ImportDeclaration,
  aliases: Array<PathAlias>,
  collator: Intl.Collator
): number => {
  const aIsImport = nodeA.type === `ImportDeclaration`;
  const bIsImport = nodeB.type === `ImportDeclaration`;

  if (!aIsImport || !bIsImport) {
    return 0;
  }

  const nodeARank = rankModule(nodeA, aliases);
  const nodeBRank = rankModule(nodeB, aliases);

  if (nodeARank < nodeBRank) {
    return -1;
  }

  if (nodeARank > nodeBRank) {
    return 1;
  }

  // Do not sort `import 'foo'` declarations because they have side
  // effects so the order may matter
  if (getModuleType(nodeA, aliases) === `sideEffect`) {
    const startA = nodeA.start ?? 0;
    const startB = nodeB.start ?? 0;

    if (startA < startB) {
      return -1;
    }

    if (startA > startB) {
      return 1;
    }

    return 0;
  }

  const abcCompare = collator.compare(nodeA.source.value, nodeB.source.value);

  if (abcCompare !== 0) {
    return abcCompare;
  }

  if (nodeA.specifiers && nodeB.specifiers) {
    const isNamespaceImportA = nodeA.specifiers.some((specifier) => {
      return specifier.type === `ImportNamespaceSpecifier`;
    });

    const isNamespaceImportB = nodeB.specifiers.some((specifier) => {
      return specifier.type === `ImportNamespaceSpecifier`;
    });

    if (isNamespaceImportA && !isNamespaceImportB) {
      return -1;
    }
    if (!isNamespaceImportA && isNamespaceImportB) {
      return 1;
    }
  }

  if (!nodeA.specifiers && nodeB.specifiers) {
    return -1;
  }

  return abcCompare;
};
