import type { Folder } from '$lib/types/folder';
import type { Link } from '$lib/types/link';
import { folders, links, apiURL } from '../../stores/stores';
import { getSession } from './getSession';
import { hideContextMenu } from './hideContextMenu';
import { removeItemsSelected } from './removeItemsSelected';

let fs: Partial<Folder>[];
let ls: Partial<Link>[];
let baseURL = '';

export async function deleteLinksAndFoldersForever(f: Partial<Folder>[], l: Partial<Link>[]) {
	const unsub = apiURL.subscribe((value) => {
		baseURL = value;
	});

	unsub();

	const fsResponse = await fetch(`${baseURL}/private/folder/deleteFoldersForever`, {
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
			folder_ids: f.map((folder) => folder.folder_id)
		}) // body data type must match "Content-Type" header
	});

	const lsResponse = await fetch(`${baseURL}/private/link/deleteLinksForever`, {
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
		const responses = await Promise.all([fsResponse, lsResponse]);

		const responseYaFolders = await responses[0].json();
		const responseYaLinks = await responses[1].json();

		fs = responseYaFolders[0];

		ls = responseYaLinks[0];

		if (fs !== null) {
			for (let index = 0; index < fs.length; index++) {
				const element = fs[index];

				folders.update((values) => values.filter((value) => value.folder_id !== element.folder_id));
			}
		}

		if (ls !== null) {
			for (let index = 0; index < ls.length; index++) {
				const element = ls[index];

				links.update((values) => values.filter((value) => value.link_id !== element.link_id));
			}
		}

		removeItemsSelected();

		hideContextMenu();
	} catch (error) {
		console.log(error);
	}
}
