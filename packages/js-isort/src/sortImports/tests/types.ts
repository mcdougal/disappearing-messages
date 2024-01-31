import { PathAlias } from '../../resolvePathAliases';

export interface Test {
  name: string;
  testFile: string;
  aliases: Array<PathAlias>;
}
