import type { Folder } from '$lib/types/folder';
import { getSession } from './getSession';
import { foldersToRenderInMoveFoldersPopup } from '../../stores/stores';

export async function getFolderChildren(folder: Partial<Folder>) {
	const accountID = JSON.parse(getSession()).Account.id;

	let url = `http://localhost:5000/private/folder/getFolderChildren/${folder.folder_id}/${accountID}`;

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
