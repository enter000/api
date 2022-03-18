module.exports = {
  extends: ['stylelint-config-standard',
            'stylelint-config-rational-order',
            'stylelint-prettier/recommended',
            'stylelint-config-standard-scss'],
  plugins: ['stylelint-order', 'stylelint-scss'],
  rules: {
    'selector-class-pattern': [
      '^(?:(?:o|c|u|t|s|is|has|_|js|qa)-)?[a-z0-9]+(?:-[a-z0-9]+)*(?:__[a-z0-9]+(?:-[a-z0-9]+)*)?(?:--[a-z0-9]+(?:-[a-z0-9]+)*)?(?:\\[.+\\])?$',
      {
        'message': 'Please use BEM for class naming'
      }
    ],
    'order/order': ['dollar-variables', 'custom-properties', 'declarations'],
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'scss/percent-placeholder-pattern': null,
    'declaration-empty-line-before': null,
    'string-quotes': 'single',
    'scss/dollar-variable-pattern': null,
    'scss/dollar-variable-empty-line-before': 'always',
  }
};
