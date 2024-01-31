#!/usr/bin/env node
import fs from 'fs';

import { program } from 'commander';

import resolvePathAliases from './resolvePathAliases';
import sortImports from './sortImports';

/* eslint-disable security/detect-non-literal-fs-filename */

const run = async (
  filePaths: Array<string>,
  writeToFile: boolean,
  ignore: Array<string>
): Promise<void> => {
  await Promise.all(
    filePaths.map(async (filePath) => {
      const aliases = await resolvePathAliases(filePath);

      const skip =
        ignore.length > 0 &&
        ignore.some((pathSubstring) => {
          return filePath.includes(pathSubstring);
        });

      if (skip) {
        return;
      }

      const fileContent = fs.readFileSync(filePath, `utf8`);
      const sortedContent = sortImports(fileContent, aliases);

      if (!writeToFile) {
        // eslint-disable-next-line no-console
        console.log(sortedContent);
      } else if (sortedContent !== fileContent) {
        fs.writeFile(filePath, sortedContent, (writeError) => {
          if (writeError) {
            throw writeError;
          }
        });
      }
    })
  );
};

if (require.main === module) {
  process.on(`unhandledRejection`, (error) => {
    throw error;
  });

  program
    .usage(`[options] [file ...]`)
    .description(
      `By default, output is written to stdout.
Stdin is read if it is piped to js-isort and no files are given.`
    )
    .option(`--write`, `Edit files in-place`)
    .option(`--ignore [values...]`, `Skip files matching the given path`, [])
    .parse(process.argv);

  program.parse();

  const filePaths = program.args;

  const options = program.opts();
  const writeToFile = options.write;
  const ignore = options.ignore;

  if (filePaths.length === 0) {
    program.help();
  } else {
    run(filePaths, writeToFile, ignore);
  }
}
