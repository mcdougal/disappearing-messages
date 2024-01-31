import { EmptyStatement, ImportDeclaration, Statement } from '@babel/types';

/**
 * Get the beginning import declarations in the given list of nodes.
 */
export default (
  nodes: Array<Statement>
): Array<ImportDeclaration | EmptyStatement> => {
  const imports: Array<ImportDeclaration | EmptyStatement> = [];

  nodes.find((node) => {
    if (node.type === `ImportDeclaration`) {
      imports.push(node);
      return false;
    }

    if (node.type === `EmptyStatement`) {
      imports.push(node);
      return false;
    }

    return true;
  });

  return imports;
};
