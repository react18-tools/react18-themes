const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use with
 * internal (bundled by their consumer) libraries
 * that utilize React.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
	extends: [
		"@vercel/style-guide/eslint/browser",
		"@vercel/style-guide/eslint/typescript",
		"@vercel/style-guide/eslint/react",
	].map(require.resolve),
	env: {
		node: true,
		commonjs: true,
		browser: true,
		es6: true,
	},
	parserOptions: {
		project,
	},
	globals: {
		JSX: true,
	},
	settings: {
		"import/resolver": {
			typescript: {
				project,
			},
		},
	},
	ignorePatterns: ["node_modules/", "dist/", ".eslintrc.js", "coverage"],
	// add rules configurations here
	rules: {
		"no-console": "off",
		"@typescript-eslint/no-unsafe-member-access": "off",
		"@typescript-eslint/no-unsafe-call": "off",
		"@typescript-eslint/no-confusing-void-expression": "off",
		"@typescript-eslint/consistent-type-definitions": "off",
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/no-unused-vars": "off",
	},
};
