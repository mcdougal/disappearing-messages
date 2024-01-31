module.exports = {
  // Format non-JS files
  '**/*{.json,.graphql,.md,.css,.scss,.yml}': [`prettier --write`],

  // Format JS files and also sort imports. In order for generated files to
  // be ignored, they MUST follow the pattern `*.generated.*` (for example:
  // `foo.generated.ts`). It is not sufficient for them to just exist in a
  // `generated/*` directory.
  //
  // If you want to test the file matching patterns, lint-staged uses
  // `micromatch` under the hood, so you can manually run the micromatch
  // function in a Node REPL.
  '!(*generated)*.{js,ts,tsx}': [`js-isort --write`, `prettier --write`],
};
