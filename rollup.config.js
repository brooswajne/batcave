import typescript from '@rollup/plugin-typescript';
import {
	main,
	module,
} from './package.json';

export default {
	input: './utils/index.ts',
	output: [ {
		dir: './',
		entryFileNames: module,
		format: 'esm',
	}, {
		dir: './',
		entryFileNames: main,
		format: 'umd',
		name: 'js-utils',
	} ],
	plugins: [ typescript( ) ],
};
