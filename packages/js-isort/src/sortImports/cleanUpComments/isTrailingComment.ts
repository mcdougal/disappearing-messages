import { Comment, EmptyStatement, ImportDeclaration } from '@babel/types';

export default (
  node: ImportDeclaration | EmptyStatement,
  comment: Comment
): boolean => {
  if (!comment.loc || !node.loc) {
    return false;
  }

  return (
    comment.loc.start.line >= node.loc.start.line &&
    comment.loc.end.line <= node.loc.end.line
  );
};
