import { EmptyStatement, ImportDeclaration } from '@babel/types';

/**
 * Get the range position of the start of the code body (i.e. the end of
 * the imports block).
 */
export default (
  importNodes: Array<EmptyStatement | ImportDeclaration>
): number => {
  const lastNode = importNodes[importNodes.length - 1];
  const trailingComments = lastNode.trailingComments;

  let importsEnd;

  if (trailingComments && trailingComments.length > 0) {
    const lastComment = trailingComments[trailingComments.length - 1];
    importsEnd = lastComment.end;
  } else {
    importsEnd = lastNode.end;
  }

  importsEnd = importsEnd ?? 0;

  // Body starts 1 character after the last character of the import block
  return importsEnd + 1;
};
