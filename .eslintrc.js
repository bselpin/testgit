module.exports = {
	env: {
		browser: true,
		node: true,
		es2020: true,
	},
	extends: ["next", "next/core-web-vitals", "prettier"],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: "module",
	},
	rules: {
		"react/react-in-jsx-scope": "off",
		"react-hooks/exhaustive-deps": "off",
		"@next/next/no-img-element": "off",
		"react/no-unknown-property": "off",
	},
}
