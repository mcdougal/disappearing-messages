export type ExitBehavior =
  | { action: `back` }
  | { action: `navigate`; path: string };
