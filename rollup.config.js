export default [
	{
		input: 'index.js',
		external: ['path', 'fs'],
		plugins: [],
		output: {
			exports: 'named',
			interop: false,
			file: 'dist/cjs/index.js',
			format: 'cjs',
		},
	},
];
