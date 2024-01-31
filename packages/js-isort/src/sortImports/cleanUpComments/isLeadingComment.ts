import { Comment, EmptyStatement, ImportDeclaration } from '@babel/types';

import isTrailingComment from './isTrailingComment';

export default (
  node: ImportDeclaration | EmptyStatement,
  comment: Comment,
  prevNode: ImportDeclaration | EmptyStatement | null
): boolean => {
  if (!comment.loc || !node.loc) {
    return false;
  }

  return (
    comment.loc.end.line < node.loc.start.line &&
    (!prevNode || !isTrailingComment(prevNode, comment))
  );
};
