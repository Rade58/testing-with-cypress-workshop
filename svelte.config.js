import path from 'path';
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
		adapter: adapter(),

		// HERE WE CAN SET UP PATH ALIASES
		vite() {
			return {
				resolve: {
					alias: {
						// LETS ADD THO ALIASES FOR
						// ONE FOR /src/util
						// OTHER FOR /src/components

						$util: path.resolve('./src/util'),
						$components: path.resolve('./src/components'),
						$stores: path.resolve('./src/stores')
					}
				}
			};
		}
	}
};

export default config;
