import os from 'os';

import generate from '@babel/generator';
import { File } from '@babel/types';

import { PathAlias } from '../../resolvePathAliases';

import getBreakpoints from './getBreakpoints';
import trimEnd from './trimEnd';
import trimStart from './trimStart';

/**
 * Turn the transformed AST back into a JavaScript source code string.
 */
export default (
  content: string,
  ast: File,
  aliases: Array<PathAlias>,
  topCommentsEnd: number,
  bodyStart: number
): string => {
  const breakpoints = getBreakpoints(ast.program.body, aliases);

  let importsCode = generate(ast).code;

  // Make sure there are no blank lines
  importsCode = importsCode
    .split(os.EOL)
    .filter((l) => {
      return l;
    })
    .join(os.EOL);

  // Add extra lines between groups
  breakpoints.forEach((moduleName) => {
    importsCode = importsCode.replace(
      `'${moduleName}';`,
      `'${moduleName}';${os.EOL}`
    );
  });

  const headerCode = trimEnd(content.slice(0, topCommentsEnd));
  const bodyCode = trimStart(content.slice(bodyStart));

  let newContent = ``;

  if (headerCode) {
    newContent = `${headerCode}${os.EOL}`;
  }

  newContent = `${newContent}${importsCode}`;

  if (bodyCode) {
    newContent = `${newContent}${os.EOL}${os.EOL}${bodyCode}`;
  }

  return newContent;
};
