/* eslint-disable security/detect-non-literal-regexp */

export default (patterns: Array<string>, importPath: string): boolean => {
  return patterns.some((pattern) => {
    const regex = new RegExp(pattern);

    if (regex.test(importPath)) {
      return true;
    }

    return false;
  });
};
