import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';
import babel from 'rollup-plugin-babel';
import butternut from 'rollup-plugin-butternut';

export default [
	{
		input: 'src/index.js',
		output: {
			name: 'NSEvent',
			file: pkg.browser,
			format: 'umd'
		},
		plugins: [
			resolve(), // so Rollup can find `ms`
			commonjs(), // so Rollup can convert `ms` to an ES module
			babel({
				exclude: 'node_modules/**',
				babelrc: false,
				presets: [
					["env", { "modules": false }]
				],
				plugins: [
					'external-helpers'
				]
			})
		]
	},
	{
		input: 'src/index.js',
		external: ['ms'],
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		],
		plugins: [
			babel({
				exclude: 'node_modules/**',
				babelrc: false,
				presets: [
					["env", { "modules": false }]
				],
				plugins: [
					'external-helpers'
				]
			})
		]
	}
];
