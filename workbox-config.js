module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.{js,css,html,json}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};