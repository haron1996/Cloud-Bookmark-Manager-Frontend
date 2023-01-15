//import adapter from '@sveltejs/adapter-node';
import adapter from '@sveltejs/adapter-auto';
//import adapter from 'svelte-adapter-static-digitalocean'
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */

const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		scss: {
			prependData: `@import './src/vars.scss';`
		}
	}),

	kit: {
		adapter: adapter()
	}
};

export default config;
