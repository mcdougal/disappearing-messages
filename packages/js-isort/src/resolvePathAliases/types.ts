export type PathAlias =
  | { alias: string; workspace: `internal` }
  | { alias: string; workspace: `external` };
