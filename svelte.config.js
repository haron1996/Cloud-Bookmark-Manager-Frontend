//import adapter from '@sveltejs/adapter-auto';
//import adapter from 'svelte-adapter-static-digitalocean'

/** @type {import('@sveltejs/kit').Config} */

import node from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		scss: {
			prependData: `@import './src/vars.scss';`
		}
	}),

	kit: {
		adapter: node()
	}
};

export default config;
