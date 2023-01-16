import type { Folder } from '$lib/types/folder';
import { getSession } from './getSession';
import { foldersToRenderInMoveFoldersPopup, apiURL } from '../../stores/stores';

let baseURL: string = '';

export async function getFolderChildren(folder: Partial<Folder>) {
	const accountID = JSON.parse(getSession()).Account.id;

	const unsub = apiURL.subscribe((value) => {
		baseURL = value;
	});

	unsub();

	let url = `${baseURL}/private/folder/getFolderChildren/${folder.folder_id}/${accountID}`;

	const res = await fetch(url, {
		method: 'GET',
		mode: 'cors',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer${JSON.parse(getSession()).access_token}`
		}
	});

	const result = await res.json();

	const folders: Partial<Folder>[] = result[0];

	foldersToRenderInMoveFoldersPopup.set(folders);
}
