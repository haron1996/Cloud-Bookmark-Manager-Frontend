import { getSession } from './getSession';
import type { Folder } from '$lib/types/folder';
import {
	apiURL,
	createFolderMode,
	folderName,
	folders,
	lastCreatedFolder,
	loading,
	selectedDestinationFolder
} from '../../stores/stores';
import { get } from 'svelte/store';
import { validateFolderName } from './validateFolderName';
import { page } from '$app/stores';
import { goto } from '$app/navigation';

let myFolders: Folder[] = [];

let folderID: string = '';

let path: string;

let baseUrl: string;

export async function CreateFolder(folder_name: string, parent_folder_id: string) {
	loading.set(true);

	const err = validateFolderName(folder_name);
	if (err !== '') {
		console.log(err);
		loading.set(false);
		return;
	}

	if (parent_folder_id === undefined) {
		folderID = 'null';
	} else {
		folderID = parent_folder_id;
	}

	createFolderMode.set(false);

	const unsub = apiURL.subscribe((value) => {
		baseUrl = value;
	});

	unsub();

	const response = await fetch(`${baseUrl}/private/folder/create`, {
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

	try {
		const result = await response.json();

		const folder: Folder = result[0];

		if (folder === null) return;

		if (get(folders) !== null) {
			folders.update((values) => [folder, ...values]);
		} else {
			folders.set([...myFolders, folder]);
		}

		lastCreatedFolder.set(folder);

		folderName.set('Untitled collection');

		const unsubscribe = page.subscribe((values) => {
			path = values.url.pathname;
		});

		unsubscribe();

		loading.set(false);

		if (path === '/appv1/my_links/recycle_bin') {
			goto('http://localhost:5173/appv1/my_links');
		}
	} catch (error) {
		console.log(error);
		loading.set(false);
	}
}
