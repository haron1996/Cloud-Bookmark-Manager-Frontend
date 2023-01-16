import type { Folder } from '$lib/types/folder';
import { folders, apiURL } from '../../stores/stores';
import { getSession } from './getSession';
import { hideContextMenu } from './hideContextMenu';
import { removeItemsSelected } from './removeItemsSelected';

const f: Partial<Folder>[] = [];

let baseURL: string = '';

export async function deleteFoldersForever(f: Partial<Folder>[]) {
	const unsub = apiURL.subscribe((value) => {
		baseURL = value;
	});

	unsub();

	const response = await fetch(`${baseURL}/private/folder/deleteFoldersForever`, {
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

	try {
		const result = await response.json();

		f = result[0];

		if (f === null) return;

		for (let index = 0; index < f.length; index++) {
			const element = f[index];

			folders.update((values) => values.filter((value) => value.folder_id !== element.folder_id));
		}

		removeItemsSelected();

		hideContextMenu();
	} catch (error) {
		console.log(error);
	}
}
