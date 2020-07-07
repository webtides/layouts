const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

const externals = [
	'path',
	'fs',
];

module.exports = [
	{
		input: 'postcss-layouts.js',
		external: externals,
		//plugins: [resolve(), commonjs()],
		plugins: [],
		output: {
			interop: false,
			file: 'dist/cjs/index.js',
			format: 'cjs',
		},
	},
	{
		input: 'postcss-layouts.js',
		external: externals,
		//plugins: [resolve(), commonjs()],
		plugins: [],
		output: {
			interop: false,
			file: 'dist/es/index.js',
			format: 'es',
		},
	},
];
