import { parse } from '@babel/parser';
import { File } from '@babel/types';

interface ParsedContent {
  ast: File;
  topCommentsEnd: number;
}

/**
 * Parse the given JS source code string into an AST.
 */
export default (content: string): ParsedContent => {
  const ast = parse(content, {
    allowAwaitOutsideFunction: true,
    allowImportExportEverywhere: true,
    allowReturnOutsideFunction: true,
    errorRecovery: true,
    plugins: [
      `classProperties`,
      `dynamicImport`,
      `exportDefaultFrom`,
      `exportNamespaceFrom`,
      `objectRestSpread`,
      `jsx`,
      `typescript`,
    ],
    ranges: true,
    sourceType: `module`,
    strictMode: false,
  });

  // Do not move comments at the top of the file
  let topCommentsEnd = 0;

  if (ast.program.body.length > 0) {
    const topComments = ast.program.body[0].leadingComments || [];

    if (topComments.length > 0) {
      const lastCommentEnd = topComments[topComments.length - 1].end;

      if (lastCommentEnd) {
        topCommentsEnd = lastCommentEnd;
        ast.program.body[0].leadingComments = [];
      }
    }
  }

  return { ast, topCommentsEnd };
};
