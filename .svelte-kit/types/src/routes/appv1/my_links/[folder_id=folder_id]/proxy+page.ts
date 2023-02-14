// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import { session, apiURL } from '../../../../stores/stores';
import type { Folder } from '$lib/types/folder';
import type { Link } from '$lib/types/link';
import { resetAncestorsOfCurrentFolder } from '$lib/utils/resetAncestorsOfCurrentFolder';

let s: Partial<import('$lib/types/session').Session>;
let folders: Partial<Folder>[] = [];
let links: Partial<Link>[] = [];
let currentFolderAncestors: Partial<Folder>[];
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
		const res = await fetch(`${apiEndPoint}/public/refreshToken`, {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer'
		});

		console.log(res);

		throw redirect(302, `${url.origin}/accounts/sign_in`);
	}
}
