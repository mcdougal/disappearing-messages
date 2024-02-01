import noTypeAssertion from './rules/noTypeAssertion';
import orderUnassignedImports from './rules/orderUnassignedImports';
import packageImports from './rules/packageImports';

export = {
  rules: {
    'no-type-assertion': noTypeAssertion,
    'order-unassigned-imports': orderUnassignedImports,
    'package-imports': packageImports,
  },
};
