// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import type { Folder } from '$lib/types/folder';
import type { Link } from '$lib/types/link';
import { browser } from '$app/environment';
import { GetNewAccessToken } from '$lib/utils/GetNewAccessToken';
import { Session } from '$lib/types/session';
import { apiURL } from '../../../../stores/stores'

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

			const res = await fetch(`${apiEndPoint}/private/getCollectionsSharedWithMe/${s.Account?.id}/null`, {
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
				const newSession: Partial<Session> = await GetNewAccessToken(fetch, url);

				window.localStorage.removeItem('session');

				window.localStorage.setItem('session', JSON.stringify(newSession));

				const getApiEndPoint = apiURL.subscribe((value) => {
					apiEndPoint = value;
				});

				getApiEndPoint();

				const res = await fetch(
					`${apiEndPoint}/private/getCollectionsSharedWithMe/${newSession.Account?.id}/null`,
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

				folders = newResult[0]

				return {folders}
			}

			folders = result[0]

			return {folders}
		} 
	}
}
