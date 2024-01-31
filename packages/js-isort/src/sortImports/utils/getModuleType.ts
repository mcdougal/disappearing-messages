import { ImportDeclaration } from '@babel/types';

import { PathAlias } from '../../resolvePathAliases';

const NODE_BUILTINS = [
  `assert`,
  `buffer`,
  `child_process`,
  `cluster`,
  `crypto`,
  `dgram`,
  `dns`,
  `domain`,
  `events`,
  `fs`,
  `http`,
  `https`,
  `net`,
  `node:url`,
  `os`,
  `path`,
  `punycode`,
  `querystring`,
  `readline`,
  `stream`,
  `string_decoder`,
  `timers`,
  `tls`,
  `tty`,
  `url`,
  `util`,
  `v8`,
  `vm`,
  `zlib`,
];

export type ModuleType =
  | `sideEffect`
  | `builtin`
  | `external`
  | `aliasOtherWorkspace`
  | `aliasThisWorkspace`
  | `parent`
  | `sibling`
  | `index`;

/**
 * Return the group for the given module:
 *
 * - sideEffect: import with a side effect (e.g. `import 'foo'`)
 * - builtin: Node builtin module
 * - external: 3rd party module
 * - alias: Path alias from something like Webpack
 * - parent: Relative path pointing to a parent module
 * - sibling: Relative path pointing to a sibling module
 * - index: Reference to the index file in the current directory
 */
export default (
  node: ImportDeclaration,
  aliases: Array<PathAlias>
): ModuleType => {
  if (!node.specifiers || node.specifiers.length === 0) {
    return `sideEffect`;
  }

  const module = node.source.value;

  if (module === `./`) {
    return `index`;
  }

  if (module.startsWith(`..`)) {
    return `parent`;
  }

  if (module.startsWith(`.`)) {
    return `sibling`;
  }

  if (NODE_BUILTINS.includes(module)) {
    return `builtin`;
  }

  const matchingAlias = aliases.find(({ alias }) => {
    return module === alias || module.startsWith(`${alias}/`);
  });

  if (matchingAlias) {
    const moduleTypeByWorkspaceType: {
      [key in PathAlias['workspace']]: ModuleType;
    } = {
      external: `aliasOtherWorkspace`,
      internal: `aliasThisWorkspace`,
    };

    return moduleTypeByWorkspaceType[matchingAlias.workspace];
  }

  return `external`;
};
