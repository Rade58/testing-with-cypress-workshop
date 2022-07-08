import path from 'path';
import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$util: path.resolve('./src/util'),
			$components: path.resolve('./src/components'),
			$stores: path.resolve('./src/stores')
		}
	}
};

export default config;
