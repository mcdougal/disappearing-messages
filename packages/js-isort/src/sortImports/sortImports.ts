import { PathAlias } from '../resolvePathAliases';

import cleanUpComments from './cleanUpComments';
import collapseModules from './collapseModules';
import compareModules from './compareModules';
import compareSpecifiers from './compareSpecifiers';
import generateCode from './generateCode';
import getBodyStart from './getBodyStart';
import getTopImports from './getTopImports';
import parseContent from './parseContent';

/**
 * Group and sort the imports in the given JavaScript source code string.
 */
export default (content: string, aliases: Array<PathAlias>): string => {
  // For natural sorting of alphanumeric strings
  const collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: `base`,
  });

  const { ast, topCommentsEnd } = parseContent(content);

  let importNodes = getTopImports(ast.program.body);

  cleanUpComments(importNodes);

  let newContent = content;

  if (importNodes.length > 0) {
    const bodyStart = getBodyStart(importNodes);

    importNodes = collapseModules(importNodes);

    importNodes.sort((nodeA, nodeB) => {
      return compareModules(nodeA, nodeB, aliases, collator);
    });

    importNodes.forEach((node) => {
      if (node.type === `ImportDeclaration`) {
        node.specifiers.sort((nodeA, nodeB) => {
          return compareSpecifiers(nodeA, nodeB, collator);
        });
      }
    });

    ast.program.body = importNodes;

    newContent = generateCode(content, ast, aliases, topCommentsEnd, bodyStart);
  }

  return newContent;
};
