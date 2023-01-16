import type { Folder } from '$lib/types/folder';
import { getSession } from './getSession';
import { apiURL } from '../../stores/stores';

let baseURL: string = '';

export async function getFolder(folderID: string): Promise<Partial<Folder>> {
	const unsub = apiURL.subscribe((value) => {
		baseURL = value;
	});

	unsub();

	let url = `${baseURL}/private/folder/${folderID}`;

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

	const folder: Partial<Folder> = result[0];

	return folder;
}
