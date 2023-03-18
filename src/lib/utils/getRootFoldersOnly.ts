import { getSession } from './getSession';
import type { Folder } from '$lib/types/folder';
import { apiURL } from '../../stores/stores';

let baseURL: string = '';

export async function getRootFoldersOnly(): Promise<Partial<Folder>[]> {
	const account_id = JSON.parse(getSession()).Account.id;

	const unsub = apiURL.subscribe((value) => {
		baseURL = value;
	});

	unsub();

	const getFoldersEndPoint = `${baseURL}/private/folder/getRootFoldersByUserID`;

	const response = await fetch(getFoldersEndPoint, {
		method: 'GET',
		mode: 'cors',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer${JSON.parse(getSession()).access_token}`
		}
	});

	const result = await response.json();

	const folders: Partial<Folder>[] = result[0];

	return folders;
}
