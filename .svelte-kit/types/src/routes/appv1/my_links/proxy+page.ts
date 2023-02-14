// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import { apiURL, session } from '../../../stores/stores';
import type { Folder } from '$lib/types/folder';
import type { Link } from '$lib/types/link';

let s: Partial<import('$lib/types/session').Session>;
let folders: Partial<Folder>[] = [];
let links: Partial<Link>[] = [];
let apiEndPoint: string;

/** @param {Parameters<import('./$types').PageLoad>[0]} event */

export async function load({ fetch, params, url, route, setHeaders }: any) {
	const getSession = session.subscribe((value) => {
		s = value;
	});

	getSession();

	const getApiEndPoint = apiURL.subscribe((value) => {
		apiEndPoint = value;
	});

	getApiEndPoint();

	if (s.access_token) {
		const res = await fetch(`${apiEndPoint}/private/getLinksAndFolders/${s.Account?.id}/null`, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer${s.access_token}`
			}
		});

		const result = await res.json();

		folders = result[0].folders;

		links = result[0].links;

		return { links, folders };
	} else {
		const res = await fetch(`${apiEndPoint}/public/refreshToken`, {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'include',
			redirect: 'follow',
			referrerPolicy: 'no-referrer'
		});

		const data = await res.json();

		if (data.message) {
			console.log(data.message);
			throw redirect(302, `${url.origin}/accounts/sign_in`);
		}

		s = data[0];

		console.log(s);

		// if (s === null) return;

		// session.set(s);

		//throw redirect(302, `${url.origin}/accounts/sign_in`);
	}
}
