// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import { apiURL, session } from '../../../stores/stores';
import type { Folder } from '$lib/types/folder';
import type { Link } from '$lib/types/link';
import { browser } from '$app/environment';
import { GetNewAccessToken } from '$lib/utils/GetNewAccessToken';
import { Session } from '$lib/types/session';

let s: Partial<import('$lib/types/session').Session>;
let folders: Partial<Folder>[] = [];
let links: Partial<Link>[] = [];
let apiEndPoint: string;

/** @param {Parameters<import('./$types').PageLoad>[0]} event */

export async function load({ fetch, params, url, route }: any) {
	if (browser) {
		const sessionString: string | null = window.localStorage.getItem('session');

		if (sessionString === '' || sessionString === null) {
			//alert('no session');
			window.localStorage.clear();
			throw redirect(302, `${url.origin}`);
		}

		if (sessionString) {
			s = JSON.parse(sessionString);

			const getApiEndPoint = apiURL.subscribe((value) => {
				apiEndPoint = value;
			});

			getApiEndPoint();

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

			if (result.message) {
				// this token has expired
				//alert(result.message);

				// get new session
				const newSession: Partial<Session> = await GetNewAccessToken(fetch, url);

				// add new session to local storage
				window.localStorage.removeItem('session');

				window.localStorage.setItem('session', JSON.stringify(newSession));

				// get api endpoint
				const getApiEndPoint = apiURL.subscribe((value) => {
					apiEndPoint = value;
				});

				getApiEndPoint();

				// fetch links using new session
				const res = await fetch(
					`${apiEndPoint}/private/getLinksAndFolders/${newSession.Account?.id}/null`,
					{
						method: 'GET',
						mode: 'cors',
						credentials: 'include',
						headers: {
							'Content-Type': 'application/json',
							authorization: `Bearer${newSession.access_token}`
						}
					}
				);

				const newResult = await res.json();

				// get folders from new result
				folders = newResult[0].folders;

				// get links from new result
				links = newResult[0].links;

				return { links, folders };
			}

			folders = result[0].folders;

			links = result[0].links;

			return { links, folders };
		} else {
			throw redirect(302, `${url.origin}/appv1/my_links`);
		}
	}

	// const getSession = session.subscribe((value) => {
	// 	s = value;
	// });

	// getSession();

	// const getApiEndPoint = apiURL.subscribe((value) => {
	// 	apiEndPoint = value;
	// });

	// getApiEndPoint();

	// if (s.access_token) {
	// 	const res = await fetch(`${apiEndPoint}/private/getLinksAndFolders/${s.Account?.id}/null`, {
	// 		method: 'GET',
	// 		mode: 'cors',
	// 		credentials: 'include',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			authorization: `Bearer${s.access_token}`
	// 		}
	// 	});

	// 	const result = await res.json();

	// 	folders = result[0].folders;

	// 	links = result[0].links;

	// 	return { links, folders };
	// } else {
	// 	throw redirect(302, `${url.origin}/appv1/my_links`);
	// }
}
