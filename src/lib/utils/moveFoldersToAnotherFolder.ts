import type { Folder } from '$lib/types/folder';
import { getSession } from './getSession';
import { apiURL, contextMenuTargetElement, folders } from '../../stores/stores';
import { hideMoveItemsPopup } from './hideMoveItemsPopup';
import { resetFoldersCut } from './resetFoldersCut';
import { get } from 'svelte/store';
import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { resetSelectedFolders } from './resetSelectedFolders';
import { resetSelectedLinks } from './resetSelectedLinks';

const myFolders: Partial<Folder>[] = [];

const origin = '';

let baseUrl: string;

let domFolders: Partial<Folder>[];

export async function moveFolders(folders: Partial<Folder>[], folderID: string | undefined) {
	if (folderID) {
		await moveFoldersToAnotherFolder(folders, folderID);
	}

	// else {
	// 	await moveFoldersToRoot();
	// }
}

async function moveFoldersToAnotherFolder(folderz: Partial<Folder>[], folderID: string) {
	const unsub = apiURL.subscribe((value) => {
		baseUrl = value;
	});

	unsub();

	const response = await fetch(`${baseUrl}/private/folder/moveFolders`, {
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
			destination_folder_id: folderID,
			folder_ids: folderz.map((f) => f.folder_id)
		}) // body data type must match "Content-Type" header
	});

	const result = await response.json();

	const fs: Partial<Folder>[] = result[0];

	for (let index = 0; index < fs.length; index++) {
		const element = fs[index];

		// if (get(folders) === null) {
		// 	folders.set([...myFolders, element]);
		// } else {
		// 	folders.update((values) => [...values, element]);
		// }

		const getDomFolders = folders.subscribe((value) => {
			domFolders = value;
		});

		getDomFolders();

		folders.set(domFolders.filter((dmf) => dmf.folder_id !== element.folder_id));
	}

	resetSelectedFolders();

	resetSelectedLinks();

	resetFoldersCut();

	hideMoveItemsPopup();

	// const unsubscribe = page.subscribe((value) => {
	// 	origin = value.url.origin;
	// });

	// unsubscribe();

	// goto(`${origin}/appv1/my_links/${fs[0].subfolder_of?.String}`);
}

// async function moveFoldersToRoot() {
// 	console.log('move folders to root');
// }
