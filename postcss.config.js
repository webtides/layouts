const layouts = require('./dist/cjs/index.js').default;

module.exports = {
	plugins: [
		layouts(),
	],
}
