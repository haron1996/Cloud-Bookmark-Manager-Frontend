import type { Folder } from '$lib/types/folder';
import { folders, selectedFolders } from '../../stores/stores';
import { getSession } from './getSession';
import { hideRenameFolderForm } from './hideRenameFolderForm';

let myFolders: Partial<Folder>[] = [];

export async function renameFolder(folder_name: string | undefined, folder_id: string | undefined) {
	if (folder_name === undefined || folder_id === undefined) return;

	hideRenameFolderForm();

	const response = await fetch('http://localhost:5000/private/folder/rename', {
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
			new_folder_name: folder_name,
			folder_id: folder_id
		}) // body data type must match "Content-Type" header
	});

	const result = await response.json();

	const folder: Folder = result[0];

	//const renamedFolderPosition =

	const unsubscribe = folders.subscribe((value) => {
		myFolders = value;
	});

	unsubscribe();

	const index: number = myFolders.findIndex((object) => {
		return object.folder_id === folder.folder_id;
	});

	myFolders.splice(index, 1, folder);

	folders.set(myFolders);

	selectedFolders.set([]);

	selectedFolders.update((values) => (values = [folder, ...values]));

	// folders.update((values) => (values = values.filter((v) => v.folder_id !== folder.folder_id)));

	// folders.update((values) => (values = [folder, ...values]));
}
