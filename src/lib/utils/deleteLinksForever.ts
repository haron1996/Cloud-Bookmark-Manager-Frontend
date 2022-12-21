import type { Link } from '$lib/types/link';
import { links } from '../../stores/stores';
import { getSession } from './getSession';
import { hideContextMenu } from './hideContextMenu';
import { removeItemsSelected } from './removeItemsSelected';

const l: Partial<Link>[] = [];

export async function deleteLinksForever(l: Partial<Link>[]) {
	const response = await fetch('http://localhost:5000/private/link/deleteLinksForever', {
		method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
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

		l = result[0];

		if (l === null) return;

		for (let index = 0; index < l.length; index++) {
			const element = l[index];

			links.update((values) => values.filter((value) => value.link_id !== element.link_id));
		}

		removeItemsSelected();

		hideContextMenu();
	} catch (error) {
		console.log(error);
	}
}
