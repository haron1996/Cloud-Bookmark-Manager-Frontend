import { getSession } from './getSession';
import type { Folder } from '$lib/types/folder';
import { apiURL, folders } from '../../stores/stores';
import { hideContextMenu } from './hideContextMenu';
import { removeItemsSelected } from './removeItemsSelected';

let fs: Partial<Folder>[] = [];
let baseUrl: string;

export async function restoreFoldersFromTrash(f: Partial<Folder>[]) {
	if (f === null) return;

	const getBaseUrl = apiURL.subscribe((value) => {
		baseUrl = value;
	});

	getBaseUrl();

	const response = await fetch(`${baseUrl}/private/folder/restoreFoldersFromTrash`, {
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

	try {
		const result = await response.json();

		if (result[0] !== null) {
			fs = result[0];

			for (let index = 0; index < fs.length; index++) {
				const folder = fs[index];

				folders.update((values) => values.filter((fldr) => fldr.folder_id !== folder.folder_id));
			}
		} else {
			console.log('result is null');
		}

		removeItemsSelected();

		hideContextMenu();
	} catch (error) {
		console.log(error);

		hideContextMenu();
	}
}
