import { PathAlias } from '../types';

export type Cache = Record<string, { mtime: Date; aliases: Array<PathAlias> }>;
