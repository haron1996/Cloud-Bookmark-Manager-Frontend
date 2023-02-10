import type { Folder } from '$lib/types/folder';
import { getSession } from './getSession';
import { page } from '$app/stores';
import { folders, apiURL } from '../../stores/stores';
import { resetFoldersCut } from './resetFoldersCut';
import { hideMoveItemsPopup } from './hideMoveItemsPopup';
import { goto } from '$app/navigation';

let baseURL: string = '';
let origin: string

export async function moveFoldersToRoot(folderz: Partial<Folder>[]) {
	const unsub = apiURL.subscribe((value) => {
		baseURL = value;
	});

	unsub();

	const response = await fetch(`${baseURL}/private/folder/moveFoldersToRoot`, {
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
			folder_ids: folderz.map((f) => f.folder_id)
		}) // body data type must match "Content-Type" header
	});

	const result = await response.json();

	const foldersMoved: Partial<Folder>[] = result[0];

	for (let index = 0; index < foldersMoved.length; index++) {
		const element = foldersMoved[index];
		folders.update((values) => [element, ...values]);
	}

	resetFoldersCut();

	hideMoveItemsPopup();

	const getPageOrigin = page.subscribe((value) => {
		origin = value.url.origin
	})

	getPageOrigin()

	goto(`${origin}/appv1/my_links`);
}
