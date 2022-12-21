import type { Folder } from '$lib/types/folder';
import { getSession } from './getSession';

export async function getFolder(folderID: string): Promise<Partial<Folder>> {
	let url = `http://localhost:5000/private/folder/${folderID}`;

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
