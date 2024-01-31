# js-isort

`js-isort` is a command line tool for grouping, sorting and de-duping JS imports.

The following transformations take place:

1. Groups imports by module specificity (e.g. built-in vs. external vs. internal)
2. Collapses imports defined on multiple lines into one line
3. Sorts imports alphabetically within groups (uses [natural sort order](https://en.wikipedia.org/wiki/Natural_sort_order))
4. Sorts import specifiers alphabetically (uses [natural sort order](https://en.wikipedia.org/wiki/Natural_sort_order))
5. Separates groups with an empty line

## Grouping

```ts
// 1. Side effects (NOT sorted alphabetically because order may matter)
import './global-styles.css';
import 'babel-polyfill';

// 2. Node.js builtin modules
import fs from 'fs';
import http from 'http';

// 3. External modules
import classNames from 'classnames';
import React from 'react';

// 4. Path aliases from tsconfig.json that point to a separate npm workspace
import { prisma } from '@/common-server/prismaClient';
import { CurrentUser } from '@/common/auth';

// 5. Path aliases from tsconfig.json that point to this workspace
import { getUserByEmailWhereClause } from '@/api/users';

// 6. Relative parent modules (sorted by depth)
import middleware from '../../middleware';
import getUserId from '../getUserId';

// 7. Relative sibling modules
import queries from './queries';
import styles from './styles';

// 8. Imports from the index.ts file
import main from './';
```

## Deduplication

If you have this:

```ts
import { Mutation } from 'react-apollo';
import { ApolloProvider } from 'react-apollo';
import ReactApollo from 'react-apollo';
```

You will get this:

```ts
import ReactApollo, { ApolloProvider, Mutation } from 'react-apollo';
```

## Specifiers

If you have this:

```ts
import foo1, { foo1000, foo200, foo30, foo4, bar } from 'foo';
```

You will get this:

```ts
import foo1, { bar, foo4, foo30, foo200, foo1000 } from 'foo';
```

## Aliases

`js-isort` will automatically find the closest `tsconfig.json` file in order to resolve path aliases.

Note: it can be expensive to import the config, so `js-isort` will cache the aliases in a temporary file. The cache is invalidated when the config file is updated.

## Comments

Comments at the top of the file will stay in place. All other comments will move with the associated import.

## JS Syntax Support

`js-isort` uses Babel under the hood, with a couple Stage 3 language features and support for JSX enabled.
