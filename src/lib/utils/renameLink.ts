import { getSession } from './getSession';
import type { Link } from '$lib/types/link';
import { links } from '../../stores/stores';
import { selectedLinks } from '../../stores/stores';

let myLinks: Partial<Link>[] = [];

export async function renameLink(link_title: string | undefined, link_id: string | undefined) {
	if (link_title === undefined || link_id === undefined) return;

	const response = await fetch('http://localhost:5000/private/link/rename', {
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
			link_title: link_title,
			link_id: link_id
		}) // body data type must match "Content-Type" header
	});

	const result = await response.json();

	const link: Link = result[0];

	//const renamedFolderPosition =

	const unsubscribe = links.subscribe((value) => {
		myLinks = value;
	});

	unsubscribe();

	const index: number = myLinks.findIndex((object) => {
		return object.link_id === link.link_id;
	});

	myLinks.splice(index, 1, link);

	links.set(myLinks);

	selectedLinks.set([]);

	selectedLinks.update((values) => (values = [link, ...values]));
}
