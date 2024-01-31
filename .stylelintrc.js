module.exports = {
  extends: `stylelint-config-standard-scss`,
  plugins: [`stylelint-order`],
  rules: {
    // The use of `!important` is almost never necessary
    'declaration-no-important': true,

    // It's easier to find properties when they are always in a consistent order
    'order/properties-alphabetical-order': true,

    // Since our selectors are in camelCase, it's a little easier if our
    // mixin names are also in camelCase so that we're not mixing cases in
    // the same file.
    'scss/at-mixin-pattern': `[a-z][A-Za-z]*`,

    // Since our selectors are in camelCase, it's a little easier if our
    // variables are also in camelCase so that we're not mixing cases in
    // the same file.
    'scss/dollar-variable-pattern': `[a-z][A-Za-z]*`,

    // We import CSS classes into our TypeScript code, so the selectors should
    // follow the variable naming convention in TypeScript.
    'selector-class-pattern': [`[a-z][A-Za-z]*`],
  },
};
