import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params, url }: any) {
	if (browser) {
		const sessionString: string | null = window.localStorage.getItem('session');
		if (sessionString) {
			throw redirect(302, `${url.origin}/appv1/my_links`);
		}
	}

	return;
}
