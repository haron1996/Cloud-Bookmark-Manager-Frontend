import { getSession } from './getSession';
import { get } from 'svelte/store';
import {
	apiURL,
	errorNotifVisible,
	links,
	loading,
	successNotifVisible
} from '../../stores/stores';
import type { Link } from '$lib/types/link';
import { addLinkMode } from '../../stores/stores';
import { newLink } from '../../stores/stores';
import { page } from '$app/stores';
import { goto } from '$app/navigation';

export let errorInvalidUrl: string = '';

let myLinks: Link[] = [];

let origin: string;
let path: string;
let baseUrl: string;

export async function addLink(url: string, folderID: string) {
	//loading.set(true);

	if (url === 'https://example.com') {
		errorInvalidUrl = 'Please enter a valid url';

		//loading.set(false);

		return;
	}

	addLinkMode.set(false);

	// shows success notification
	successNotifVisible.set(true);

	setTimeout(() => {
		successNotifVisible.set(false);
	}, 3000);

	const getApiPath = apiURL.subscribe((value) => {
		baseUrl = value;
	});

	getApiPath();

	const response = await fetch(`${baseUrl}/private/link/add`, {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'include', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer${JSON.parse(getSession()).access_token}`
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify({
			url: url,
			folder_id: folderID
		}) // body data type must match "Content-Type" header
	});

	try {
		const result = await response.json();

		if (result[0] === null) {
			console.log('no result returned');

			//loading.set(false);

			return;
		}

		if (result.message) {
			errorNotifVisible.set(true);

			setTimeout(() => {
				errorNotifVisible.set(false);
			}, 3000);

			return;
		}

		const link: Link = result[0];

		if (get(links) !== null) {
			links.update((values) => [link, ...values]);
		} else {
			links.set([...myLinks, link]);
		}

		newLink.set('');

		const unsubscribe = page.subscribe((values) => {
			path = values.url.pathname;
		});

		unsubscribe();

		//loading.set(false);

		const getPageOrigin = page.subscribe((value) => {
			origin = value.url.origin;
		});

		getPageOrigin();

		if (path === '/appv1/my_links/recycle_bin') {
			goto(`${origin}/appv1/my_links`);
		}
	} catch (error) {
		alert(error);

		//loading.set(false);
	}
}
