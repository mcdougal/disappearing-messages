import noTypeAssertion from './rules/noTypeAssertion';
import packageImports from './rules/packageImports';

export = {
  rules: {
    'no-type-assertion': noTypeAssertion,
    'package-imports': packageImports,
  },
};
