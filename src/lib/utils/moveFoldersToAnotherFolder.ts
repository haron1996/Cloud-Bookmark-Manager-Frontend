import type { Folder } from '$lib/types/folder';
import { getSession } from './getSession';
import { contextMenuTargetElement, folders } from '../../stores/stores';
import { hideMoveItemsPopup } from './hideMoveItemsPopup';
import { resetFoldersCut } from './resetFoldersCut';
import { get } from 'svelte/store';
import { goto } from '$app/navigation';
import { page } from '$app/stores';

let myFolders: Partial<Folder>[] = [];

let origin: string = '';

export async function moveFolders(folders: Partial<Folder>[], folderID: string | undefined) {
	if (folderID !== undefined) {
		await moveFoldersToAnotherFolder(folders, folderID);
	} else {
		await moveFoldersToRoot();
	}
}

async function moveFoldersToAnotherFolder(folderz: Partial<Folder>[], folderID: string) {
	const response = await fetch('http://localhost:5000/private/folder/moveFolders', {
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

		if (get(folders) === null) {
			folders.set([...myFolders, element]);
		} else {
			folders.update((values) => [...values, element]);
		}

		//folders.update((values) => values.filter((val) => val.folder_id !== element.folder_id));
	}

	resetFoldersCut();

	hideMoveItemsPopup();

	// const unsub = contextMenuTargetElement.subscribe((value) => {
	// 	if (value) {
	// 		if (value.dataset.folderid) {
	// 			goto(`http://localhost:5173/appv1/my_links/${value.dataset.folderid}`);
	// 		}
	// 	}
	// });

	// unsub();

	const unsubscribe = page.subscribe((value) => {
		origin = value.url.origin;
	});

	unsubscribe();

	goto(`${origin}/appv1/my_links/${fs[0].subfolder_of?.String}`);
}

async function moveFoldersToRoot() {
	console.log('move folders to root');
}
