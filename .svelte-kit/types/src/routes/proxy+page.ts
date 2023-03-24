// @ts-nocheck
// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';

let s: string | null

/** @param {Parameters<import('./$types').PageLoad>[0]} event */
export async function load({ fetch, params, url }: any) {
	if (browser) {
		s = window.localStorage.getItem('session');

		// if (s) {
		// 	throw redirect(302, `${url.origin}/appv1/my_links`);
		// }
	}

	return {s}
}

export const prerender = true;
