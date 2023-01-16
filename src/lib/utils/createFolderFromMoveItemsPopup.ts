import { validateFolderName } from './validateFolderName';
import { createFolderMode, selectedDestinationFolder, apiURL } from '../../stores/stores';
import { getSession } from './getSession';
import type { Folder } from '$lib/types/folder';
import { page } from '$app/stores';
import { folders } from '../../stores/stores';
import { get } from 'svelte/store';
import { hideMoveItemsPopup } from './hideMoveItemsPopup';

let myFolders: Partial<Folder>[] = [];

let folderID: string = '';

let currentPath: string = '';

let baseURL: string = '';

let currentFolderIdParam: string | undefined;

export async function createFolderFromMoveItemsPopup(
	folder_name: string,
	parent_folder_id: string
) {
	const err = validateFolderName(folder_name);
	if (err !== '') {
		console.log(err);
		return;
	}

	if (parent_folder_id === '') {
		folderID = 'null';
	} else {
		folderID = parent_folder_id;
	}

	createFolderMode.set(false);

	const unsub = apiURL.subscribe((value) => {
		baseURL = value;
	});

	unsub();

	const response = await fetch(`${baseURL}/private/folder/create`, {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
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
			folder_name: folder_name,
			parent_folder_id: folderID
		}) // body data type must match "Content-Type" header
	});

	const result = await response.json();

	const folder: Partial<Folder> = result[0];

	myFolders = [...myFolders, folder];

	selectedDestinationFolder.set(folder);

	const unsubscribe = page.subscribe((value) => {
		currentPath = value.url.pathname;
	});

	unsubscribe();

	if (currentPath === '/appv1/my_links') {
		if (!folder.subfolder_of?.Valid) {
			if (get(folders) !== null) {
				folders.update((values) => [folder, ...values]);
			} else {
				folders.set(myFolders);
			}
		}
	} else {
		const unsub = page.subscribe((values) => {
			currentFolderIdParam = values.params.folder_id;
		});

		unsub();

		if (folder.subfolder_of?.Valid) {
			if (currentFolderIdParam === folder.subfolder_of.String) {
				if (get(folders) === null) {
					folders.set([folder, ...myFolders]);
				} else {
					folders.update((values) => [folder, ...values]);
				}
				console.log('created folder belongs to current folder');
			}
		}
	}

	//hideMoveItemsPopup();
}
