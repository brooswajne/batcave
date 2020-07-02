module.exports = {
	root: true,
	env: {
		node: true,
		es6: true,
	},
	parserOptions: {
		ecmaVersion: 2019,
		sourceType: 'module',
	},
	parser: '@typescript-eslint/parser',
	plugins: [ '@typescript-eslint' ],
	extends: [ 'eslint:recommended' ],

	overrides: [ {
		files: [
			'*.test.js',
			'*.test.ts',
		],
		env: { mocha: true },
	} ],

	rules: {

		// errors

		'accessor-pairs': [ 'error', {
			'enforceForClassMembers': true,
		} ],
		'array-bracket-spacing': [ 'error', 'always' ],
		'block-spacing': [ 'error', 'always' ],
		'brace-style': [ 'error', '1tbs', {
			'allowSingleLine': true,
		} ],
		'camelcase': 'error',
		'comma-dangle': [ 'error', 'always-multiline' ],
		'comma-style': [ 'error', 'last' ],
		'comma-spacing': [ 'error' ],
		'computed-property-spacing': [ 'error', 'never', {
			'enforceForClassMembers': true,
		} ],
		'consistent-return': [ 'error', {
			'treatUndefinedAsUnspecified': true,
		} ],
		'curly': [ 'error', 'multi-line' ],
		'dot-location': [ 'error', 'property' ],
		'eol-last': [ 'error', 'always' ],
		'eqeqeq': [ 'error', 'always', {
			'null': 'ignore',
		} ],
		'func-call-spacing': [ 'error', 'never' ],
		'indent': [ 'error', 'tab', {
			'flatTernaryExpressions': true,
		} ],
		'key-spacing': 'error',
		'linebreak-style': [ 'error', 'unix' ],
		'new-cap': 'error',
		'new-parens': [ 'error', 'always' ],
		'no-array-constructor': 'error',
		'no-cond-assign': [ 'error', 'except-parens' ],
		'no-console': 'error',
		'no-duplicate-imports': 'error',
		'no-eval': 'error',
		'no-extend-native': 'error',
		'no-floating-decimal': 'error',
		'no-implied-eval': 'error',
		'no-label-var': 'error',
		'no-multi-spaces': 'error',
		'no-multi-str': 'error',
		'no-multiple-empty-lines': 'error',
		'no-new': 'error',
		'no-new-func': 'error',
		'no-new-object': 'error',
		'no-new-wrappers': 'error',
		'no-path-concat': 'error',
		'no-return-assign': [ 'error', 'except-parens' ],
		'no-template-curly-in-string': 'error',
		'no-throw-literal': 'error',
		'no-trailing-spaces': 'error',
		'no-self-compare': 'error',
		'no-undef-init': 'error',
		'no-unmodified-loop-condition': 'error',
		'no-useless-call': 'error',
		'no-useless-constructor': 'error',
		'no-useless-rename': 'error',
		'no-unused-vars': [ 'error', {
			'args': 'none',
			'ignoreRestSiblings': true,
		} ],
		'no-useless-return': 'error',
		'no-var': 'error',
		'no-whitespace-before-property': 'error',
		'object-curly-spacing': [ 'error', 'always' ],
		'object-property-newline': [ 'error', {
			'allowAllPropertiesOnSameLine': true,
		} ],
		'one-var': [ 'error', 'never' ],
		'operator-linebreak': [ 'error', 'before' ],
		'prefer-const': 'error',
		'quotes': [ 'error', 'single' ],
		'rest-spread-spacing': [ 'error', 'never' ],
		'semi': [ 'error', 'always' ],
		'semi-spacing': 'error',
		'space-before-blocks': 'error',
		'space-before-function-paren': [ 'error', 'never' ],
		'space-infix-ops': 'error',
		'use-isnan': [ 'error', {
			'enforceForSwitchCase': true,
			'enforceForIndexOf': true,
		} ],
		'wrap-iife': [ 'error', 'inside', {
			'functionPrototypeMethods': true,
		} ],
		'yield-star-spacing': 'error',
		'yoda': [ 'error', 'never', {
			'exceptRange': true,
		} ],

		// warnings

		'handle-callback-err': 'warn',
		'keyword-spacing': 'warn',
		'no-extra-bind': 'warn',
		'no-extra-parens': [ 'warn', 'all' ],
		'no-lone-blocks': 'warn',
		'no-unneeded-ternary': 'warn',
		'space-in-parens': [ 'warn', 'never', {
			'exceptions': [ 'empty' ],
		} ],
		'space-unary-ops': [ 'warn', {
			'words': true,
			'nonwords': false,
		} ],
		'spaced-comment': 'warn',
		'valid-typeof': [ 'warn', {
			'requireStringLiterals': true,
		} ],

	},
};
