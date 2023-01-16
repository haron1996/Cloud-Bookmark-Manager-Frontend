import { getSession } from './getSession';
import { links, linksFound, apiURL } from '../../stores/stores';
import type { Link } from '$lib/types/link';
import { toggleDeleteItemsConfirmationPopup } from './toggleDeleteItemsConfirmationPopup';
import { removeItemsSelected } from './removeItemsSelected';

let l: Partial<Link>[] = [];

let baseURL: string = '';

export async function moveLinksToTrash(ls: Partial<Link>[]) {
	const unsub = apiURL.subscribe((value) => {
		baseURL = value;
	});

	unsub();

	const response = await fetch(`${baseURL}/private/link/moveLinksToTrash`, {
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
			link_ids: ls.map((li) => li.link_id)
		}) // body data type must match "Content-Type" header
	});

	const result = await response.json();

	const trashedLinks: Partial<Link>[] = result[0];

	const unsubscribe = linksFound.subscribe((values) => {
		l = [...l, ...values];
	});

	unsubscribe();

	for (let index = 0; index < trashedLinks.length; index++) {
		const element = trashedLinks[index];

		links.update((values) => values.filter((value) => value.link_id !== element.link_id));

		l = l.filter((l) => l.link_id !== element.link_id);
	}

	linksFound.set(l);

	removeItemsSelected();

	toggleDeleteItemsConfirmationPopup();
}
