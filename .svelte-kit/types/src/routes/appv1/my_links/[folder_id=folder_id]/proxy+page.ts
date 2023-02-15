// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import { session, apiURL } from '../../../../stores/stores';
import type { Folder } from '$lib/types/folder';
import type { Link } from '$lib/types/link';
import { resetAncestorsOfCurrentFolder } from '$lib/utils/resetAncestorsOfCurrentFolder';
import { GetNewAccessToken } from '$lib/utils/GetNewAccessToken';
import { browser } from '$app/environment';
import { Session } from '$lib/types/session';

let s: Partial<import('$lib/types/session').Session>;
let folders: Partial<Folder>[] = [];
let links: Partial<Link>[] = [];
let currentFolderAncestors: Partial<Folder>[];
let apiEndPoint: string;

/** @param {Parameters<import('./$types').PageLoad>[0]} event */

export async function load({ fetch, params, url, route, setHeaders }: any) {
	// START

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

			const res = await fetch(
				`${apiEndPoint}/private/getLinksAndFolders/${s.Account?.id}/${params.folder_id}`,
				{
					method: 'GET',
					mode: 'cors',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
						authorization: `Bearer${s.access_token}`
					}
				}
			);

			const result = await res.json();

			// IF TOKEN HAS EXPIRED
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
					`${apiEndPoint}/private/getLinksAndFolders/${newSession.Account?.id}/${params.folder_id}`,
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

				const res2 = await fetch(
					`${apiEndPoint}/private/folder/getFolderAncestors/${params.folder_id}`,
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

				const result2 = await res2.json();

				if (result2[0] === undefined) {
					console.log(result2.message);
				} else {
					currentFolderAncestors = result2[0];

					resetAncestorsOfCurrentFolder();
				}

				return { links, folders, currentFolderAncestors };
			}

			// END OF IF TOKEN HAS EXPIRED

			folders = result[0].folders;

			links = result[0].links;

			// get ancestors or current folder
			const res2 = await fetch(
				`${apiEndPoint}/private/folder/getFolderAncestors/${params.folder_id}`,
				{
					method: 'GET',
					mode: 'cors',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
						authorization: `Bearer${s.access_token}`
					}
				}
			);

			const result2 = await res2.json();

			if (result2[0] === undefined) {
				console.log(result2.message);
			} else {
				currentFolderAncestors = result2[0];

				resetAncestorsOfCurrentFolder();
			}

			return { links, folders, currentFolderAncestors };
		} else {
			throw redirect(302, `${url.origin}/appv1/my_links`);
		}
	}

	// END
}
