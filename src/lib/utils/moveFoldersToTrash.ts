import type { Folder } from '$lib/types/folder';
import { folders } from '../../stores/stores';
import { getSession } from './getSession';
import { removeItemsSelected } from './removeItemsSelected';
import { toggleDeleteItemsConfirmationPopup } from './toggleDeleteItemsConfirmationPopup';

export async function moveFoldersToTrash(fs: Partial<Folder>[]) {
	const response = await fetch('http://localhost:5000/private/folder/moveFoldersToTrash', {
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
			folder_ids: fs.map((f) => f.folder_id)
		}) // body data type must match "Content-Type" header
	});

	const result = await response.json();

	const trashedFolders: Partial<Folder>[] = result[0];

	for (let index = 0; index < trashedFolders.length; index++) {
		const element = trashedFolders[index];

		folders.update((values) => values.filter((value) => value.folder_id !== element.folder_id));
	}

	removeItemsSelected();

	toggleDeleteItemsConfirmationPopup();
}
