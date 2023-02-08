import { getSession } from './getSession';
import type { Link } from '$lib/types/link';
import { apiURL, links } from '../../stores/stores';
import { hideContextMenu } from './hideContextMenu';

let ls: Partial<Link>[] = [];
let baseUrl: string;

export async function restoreLinksFromTrash(l: Partial<Link>[]) {
	if (l === null) return;

	const getBaseUrl = apiURL.subscribe((value) => {
		baseUrl = value;
	});

	getBaseUrl();

	const response = await fetch(`${baseUrl}/private/link/restoreLinksFromTrash`, {
		method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
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
			link_ids: l.map((link) => link.link_id)
		}) // body data type must match "Content-Type" header
	});

	try {
		const result = await response.json();

		if (result[0] !== null) {
			ls = result[0];

			for (let index = 0; index < ls.length; index++) {
				const link = ls[index];

				links.update((values) => values.filter((lnk) => lnk.link_id !== link.link_id));
			}
		} else {
			console.log('result is null');
		}

		hideContextMenu();
	} catch (error) {
		console.log(error);

		hideContextMenu();
	}
}
