import { EmptyStatement, ImportDeclaration } from '@babel/types';

type ModuleMap = Record<string, ImportDeclaration>;

/**
 * Group specifiers for modules imported more than once.
 */
export default (
  importNodes: Array<EmptyStatement | ImportDeclaration>
): Array<EmptyStatement | ImportDeclaration> => {
  const collapsedNodes: Array<EmptyStatement | ImportDeclaration> = [];
  const importNodesByModule: ModuleMap = {};
  const namespaceImportNodesByModule: ModuleMap = {};

  importNodes.forEach((node) => {
    if (node.type !== `ImportDeclaration`) {
      return;
    }

    const specifiers = node.specifiers;

    const isNamespaceImportNode = node.specifiers.some((specifier) => {
      return specifier.type === `ImportNamespaceSpecifier`;
    });

    const targetMapping = isNamespaceImportNode
      ? namespaceImportNodesByModule
      : importNodesByModule;

    const module = node.source.value;

    if (!targetMapping[module]) {
      collapsedNodes.push(node);
      targetMapping[module] = node;
    } else {
      const baseNode = targetMapping[module];
      const baseSpecifiers = baseNode.specifiers;

      specifiers.forEach((specifier) => {
        const alreadyAdded = baseSpecifiers.some((baseSpecifier) => {
          return baseSpecifier.local.name === specifier.local.name;
        });

        if (!alreadyAdded) {
          baseSpecifiers.push(specifier);
        }
      });

      if (node.leadingComments) {
        baseNode.leadingComments = (baseNode.leadingComments || []).concat(
          node.leadingComments
        );
      }

      if (node.trailingComments) {
        baseNode.trailingComments = (baseNode.trailingComments || []).concat(
          node.trailingComments
        );
      }

      if (node.extra) {
        baseNode.extra = node.extra;
      }
    }
  });

  return collapsedNodes;
};
