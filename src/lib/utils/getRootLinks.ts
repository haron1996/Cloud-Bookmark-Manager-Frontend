import type { Folder } from '$lib/types/folder';
import type { Link } from '$lib/types/link';
import { getSession } from './getSession';
import { folders, loading } from '../../stores/stores';
import { links } from '../../stores/stores';

export async function getLinksAndLinkFolders(folder_id: string) {
	loading.set(true);

	let folderID: string = '';

	if (folder_id === '') {
		folderID = 'null';
	} else {
		folderID = folder_id;
	}

	const account_id = JSON.parse(getSession()).Account.id;

	const getFoldersEndPoint = `http://localhost:5000/private/folder/get-folders/${account_id}/${folderID}`;

	const getLinksEndPoint = `http://localhost:5000/private/link/getRootLinks/${account_id}`;

	const responses = await Promise.all([
		await fetch(getFoldersEndPoint, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer${JSON.parse(getSession()).access_token}`
			}
		}),
		await fetch(getLinksEndPoint, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer${JSON.parse(getSession()).access_token}`
			}
		})
	]);

	const res1 = await responses[0].json();

	const rootFolders: Folder[] = res1[0];

	folders.set(rootFolders);

	const res2 = await responses[1].json();

	const rootLinks: Link[] = res2[0];

	links.set(rootLinks);

	loading.set(false);
}
