import {
  ImportDefaultSpecifier,
  ImportNamespaceSpecifier,
  ImportSpecifier,
} from '@babel/types';

type Node = ImportDefaultSpecifier | ImportNamespaceSpecifier | ImportSpecifier;

/**
 * Sort two import specifiers based on their name.
 */
export default (nodeA: Node, nodeB: Node, collator: Intl.Collator): number => {
  if (
    nodeA.type === `ImportDefaultSpecifier` &&
    nodeB.type === `ImportDefaultSpecifier`
  ) {
    return collator.compare(nodeA.local.name, nodeB.local.name);
  }

  if (nodeA.type === `ImportDefaultSpecifier`) {
    return -1;
  }

  if (nodeB.type === `ImportDefaultSpecifier`) {
    return 1;
  }

  if (
    nodeA.type !== `ImportNamespaceSpecifier` &&
    nodeB.type !== `ImportNamespaceSpecifier`
  ) {
    const importedNameA =
      nodeA.imported.type === `Identifier`
        ? nodeA.imported.name
        : nodeA.imported.value;

    const importedNameB =
      nodeB.imported.type === `Identifier`
        ? nodeB.imported.name
        : nodeB.imported.value;

    const imported = collator.compare(importedNameA, importedNameB);

    if (imported !== 0) {
      return imported;
    }
  }

  return collator.compare(nodeA.local.name, nodeB.local.name);
};
