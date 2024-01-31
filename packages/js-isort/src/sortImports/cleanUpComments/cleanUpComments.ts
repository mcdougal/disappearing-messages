import { EmptyStatement, ImportDeclaration } from '@babel/types';

import isLeadingComment from './isLeadingComment';
import isTrailingComment from './isTrailingComment';

/**
 * The Babel parser treats comments as belonging to both the line after
 * and the line before. When it renders, this can cause weird behavior.
 * For example, Babel turns this:
 *
 *   console.log(`foo`);
 *   // Comment above bar
 *   console.log(`bar`);
 *   // Comment above baz
 *   console.log(`baz`);
 *
 * Into:
 *
 *   console.log(`foo`); // Comment above bar
 *
 *   console.log(`bar`); // Comment above baz
 *
 *   console.log(`baz`);
 *
 * This function makes removes trailing and leading comments such that
 * Babel will generate code that makes sense.
 */
export default (
  importNodes: Array<ImportDeclaration | EmptyStatement>
): void => {
  importNodes.forEach((node, i) => {
    const prevNode = i > 0 ? importNodes[i - 1] : null;

    if (node.leadingComments) {
      node.leadingComments = node.leadingComments.filter((comment) => {
        return isLeadingComment(node, comment, prevNode);
      });
    }

    if (node.trailingComments) {
      node.trailingComments = node.trailingComments.filter((comment) => {
        return isTrailingComment(node, comment);
      });
    }
  });
};
