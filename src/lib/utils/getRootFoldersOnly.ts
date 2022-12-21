import { getSession } from './getSession';
import type { Folder } from '$lib/types/folder';

export async function getRootFoldersOnly(): Promise<Partial<Folder>[]> {
	console.log('getting root folders only...');

	const account_id = JSON.parse(getSession()).Account.id;

	const getFoldersEndPoint = `http://localhost:5000/private/folder/get-folders/${account_id}`;

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
