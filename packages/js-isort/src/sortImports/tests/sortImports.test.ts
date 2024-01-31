/* eslint-disable no-secrets/no-secrets */
import runErrorTests from './runErrorTests';
import runTests from './runTests';

describe(`sortImports`, () => {
  describe(`empty states`, () => {
    runTests(`emptyStates`, [
      {
        name: `does not change for empty file`,
        testFile: `emptyFile`,
        aliases: [],
      },
      {
        name: `does not change when there are only empty lines`,
        testFile: `onlyEmptyLines`,
        aliases: [],
      },
      {
        name: `does not change when there are no imports`,
        testFile: `noImports`,
        aliases: [],
      },
      {
        name: `does not change when there are no imports and empty lines`,
        testFile: `noImportsAndEmptyLines`,
        aliases: [],
      },
      {
        name: `does not change when there are no imports and comments`,
        testFile: `noImportsAndComments`,
        aliases: [],
      },
    ]);
  });

  describe(`basic ordering`, () => {
    runTests(`basicOrdering`, [
      {
        name: `works on a single import`,
        testFile: `singleImport`,
        aliases: [],
      },
      {
        name: `works on ordered imports`,
        testFile: `orderedImports`,
        aliases: [],
      },
      {
        name: `works on out-of-order imports`,
        testFile: `outOfOrderImports`,
        aliases: [],
      },
      {
        name: `removes empty space at the bottom of the file`,
        testFile: `removesEmptySpace`,
        aliases: [],
      },
    ]);
  });

  describe(`import variations`, () => {
    runTests(`importVariations`, [
      {
        name: `ignores imports that aren't at the top of the file`,
        testFile: `ignoresImportsNotAtTopOfFile`,
        aliases: [],
      },
      {
        name: `keeps namespace import on a separate line`,
        testFile: `namespaceOnSeparateLine`,
        aliases: [],
      },
      {
        name: `works on all import styles`,
        testFile: `allImportStyles`,
        aliases: [],
      },
      {
        name: `works on all import styles with single quotes`,
        testFile: `allImportStylesWithSingleQuotes`,
        aliases: [],
      },
      {
        name: `works on multi-line imports`,
        testFile: `multiLineImports`,
        aliases: [],
      },
      {
        name: `does nothing with really long lines`,
        testFile: `reallyLongLines`,
        aliases: [],
      },
      {
        name: `does natural alphanumeric sorting`,
        testFile: `naturalAlphanumericSorting`,
        aliases: [],
      },
    ]);
  });

  describe(`comments`, () => {
    runTests(`comments`, [
      {
        name: `does nothing when there are only comments`,
        testFile: `onlyComments`,
        aliases: [],
      },
      {
        name: `keeps the comment pinned to the import`,
        testFile: `commentsPinnedToImport`,
        aliases: [],
      },
      {
        name: `keeps trailing comments pinned to the import`,
        testFile: `trailingCommentsPinnedToImport`,
        aliases: [],
      },
      {
        name: `does not move comments at the top of the file`,
        testFile: `topCommentsUnmoved`,
        aliases: [],
      },
      {
        name: `ignores comments directly below all the imports`,
        testFile: `ignoreCommentsBelowImports`,
        aliases: [],
      },
      {
        name: `keeps single-line block comments pinned to the import`,
        testFile: `singleLineBlockCommentsPinnedToImport`,
        aliases: [],
      },
      {
        name: `keeps multi-line block comments pinned to the import`,
        testFile: `multiLineBlockCommentsPinnedToImport`,
        aliases: [],
      },
      {
        name: `keeps multiple comments pinned to the import`,
        testFile: `multipleCommentsPinnedToImport`,
        aliases: [],
      },
      {
        name: `keeps mixed comments pinned to the import`,
        testFile: `mixedCommentsPinnedToImport`,
        aliases: [],
      },
      {
        name: `gets weird when an import has multiple trailing comments`,
        testFile: `multipleTrailingComments`,
        aliases: [],
      },
    ]);
  });

  describe(`grouping`, () => {
    runTests(`grouping`, [
      {
        name: `regroups imports based on specificity`,
        testFile: `groupsBySpecificity`,
        aliases: [{ alias: `utils`, workspace: `internal` }],
      },
      {
        name: `sorts within import groups`,
        testFile: `sortsWithinImportGroups`,
        aliases: [
          { alias: `components`, workspace: `internal` },
          { alias: `utils`, workspace: `internal` },
        ],
      },
      {
        name: `sorts imports within modules`,
        testFile: `sortsWithinModules`,
        aliases: [],
      },
      {
        name: `works on aliases of different import styles`,
        testFile: `aliasesDifferentStyles`,
        aliases: [
          { alias: `actions`, workspace: `internal` },
          { alias: `components`, workspace: `internal` },
          { alias: `styles`, workspace: `internal` },
        ],
      },
      {
        name: `supports external workspace aliases for monorepos`,
        testFile: `externalWorkspaceAliases`,
        aliases: [
          { alias: `actions`, workspace: `internal` },
          { alias: `@lib/utils`, workspace: `external` },
          { alias: `styles`, workspace: `internal` },
        ],
      },
      {
        name: `does not match alias if other module starts with same name`,
        testFile: `aliasDoesNotMatchModuleWithSameName`,
        aliases: [
          { alias: `components`, workspace: `internal` },
          { alias: `styles`, workspace: `internal` },
        ],
      },
      {
        name: `does not add a newline after last group if it doesn't need to`,
        testFile: `noNewlineAfterLastGroup`,
        aliases: [],
      },
      {
        name: `adds a newline after last group if it needs to`,
        testFile: `newlineAfterLastGroup`,
        aliases: [],
      },
      {
        name: `groups specifiers when modules are duplicated`,
        testFile: `groupsSpecifiersInDuplicateModules`,
        aliases: [],
      },
      {
        name: `combines comments when collapsing imports`,
        testFile: `combinesCommentsCollapsedImports`,
        aliases: [],
      },
      {
        name: `handles duplicated non-default imports`,
        testFile: `duplicatedNonDefaultImports`,
        aliases: [],
      },
      {
        name: `handles duplicated default imports with the same name`,
        testFile: `duplicatedDefaultImportsWithSameName`,
        aliases: [],
      },
      {
        name: `handles duplicated default imports with different names`,
        testFile: `duplicatedDefaultImportsWithDifferentName`,
        aliases: [],
      },
      {
        name: `handles duplicated namespace imports`,
        testFile: `duplicatedNamespaceImports`,
        aliases: [],
      },
    ]);
  });

  describe(`non-standard js syntax`, () => {
    runTests(`nonStandardJs`, [
      {
        name: `works on JSX`,
        testFile: `jsx`,
        aliases: [],
      },
      {
        name: `works on class properties`,
        testFile: `classProperties`,
        aliases: [],
      },
      {
        name: `works on object rest spread`,
        testFile: `objectRestSpread`,
        aliases: [],
      },
      {
        name: `supports typescript`,
        testFile: `typescript`,
        aliases: [],
      },
    ]);
  });

  describe(`very complicated examples`, () => {
    runTests(`complicated`, [
      {
        name: `works on a very complicated example`,
        testFile: `complicatedExample`,
        aliases: [
          { alias: `components`, workspace: `internal` },
          { alias: `utils`, workspace: `internal` },
        ],
      },
    ]);
  });

  describe(`errors`, () => {
    runErrorTests(`errors`, [
      {
        name: `throws an error if there is an unclosed comment`,
        testFile: `unclosedComment`,
        aliases: [],
      },
      {
        name: `throws an error if the import is closed twice`,
        testFile: `importClosedTwice`,
        aliases: [],
      },
    ]);
  });
});
