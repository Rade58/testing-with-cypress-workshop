// import path from 'path';
import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	// kit: {
	// 	adapter: adapter()
	// }
	kit: {
		adapter: adapter()

		// WE MOVED THIS TO vite.config.js
		/* vite() {
			return {
				resolve: {
					alias: {

						$util: path.resolve('./src/util'),
						$components: path.resolve('./src/components'),
						$stores: path.resolve('./src/stores')
					}
				}
			};
		} */
	}
};

export default config;
