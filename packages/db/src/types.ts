import {
  BuildQueryResult,
  DBQueryConfig,
  ExtractTablesWithRelations,
} from 'drizzle-orm';

import * as schema from './schema';

// See: https://github.com/drizzle-team/drizzle-orm/issues/695#issuecomment-1881454650

type Schema = typeof schema;
type TSchema = ExtractTablesWithRelations<Schema>;

type IncludeColumns<TableName extends keyof TSchema> = DBQueryConfig<
  'one' | 'many',
  boolean,
  TSchema,
  TSchema[TableName]
>['columns'];

export type QueryResult<
  TableName extends keyof TSchema,
  Columns extends IncludeColumns<TableName> | undefined = undefined,
> = BuildQueryResult<
  TSchema,
  TSchema[TableName],
  {
    columns: Columns;
  }
>;
