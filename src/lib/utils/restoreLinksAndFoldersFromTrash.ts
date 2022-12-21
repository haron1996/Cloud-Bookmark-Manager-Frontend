import type { Folder } from '$lib/types/folder';
import type { Link } from '$lib/types/link';
import { getSession } from './getSession';
import { folders } from '../../stores/stores';
import { links } from '../../stores/stores';
import { hideContextMenu } from './hideContextMenu';
import { removeItemsSelected } from './removeItemsSelected';

let fs: Partial<Folder>[] = [];
let ls: Partial<Link>[] = [];

export async function restoreLinksAndFoldersFromTrash(f: Partial<Folder>[], l: Partial<Link>[]) {
	const fresponse = await fetch('http://localhost:5000/private/folder/restoreFoldersFromTrash', {
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
			folder_ids: f.map((folder) => folder.folder_id)
		}) // body data type must match "Content-Type" header
	});

	const lresponse = await fetch('http://localhost:5000/private/link/restoreLinksFromTrash', {
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
		const responses = await Promise.all([fresponse, lresponse]);

		const fres = await responses[0].json();

		const lres = await responses[1].json();

		fs = fres[0];

		ls = lres[0];

		for (let index = 0; index < fs.length; index++) {
			const folder = fs[index];

			folders.update((values) => values.filter((fldr) => fldr.folder_id !== folder.folder_id));
		}

		for (let index = 0; index < ls.length; index++) {
			const link = ls[index];

			links.update((values) => values.filter((lnk) => lnk.link_id !== link.link_id));
		}

		removeItemsSelected();

		hideContextMenu();
	} catch (error) {
		console.log(error);
	}
}
