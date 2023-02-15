// @ts-nocheck
import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';

/** @param {Parameters<import('./$types').PageLoad>[0]} event */
export async function load({ fetch, params, url }: any) {
	if (browser) {
		const sessionString: string | null = window.localStorage.getItem('session');
		if (sessionString) {
			throw redirect(302, `${url.origin}/appv1/my_links`);
		}
	}

	return;
}
