import type { Link } from '$lib/types/link';
import type { Folder } from '$lib/types/folder';
import { folders, links, apiURL } from '../../stores/stores';
import { getSession } from './getSession';
import { toggleDeleteItemsConfirmationPopup } from './toggleDeleteItemsConfirmationPopup';
import { removeItemsSelected } from './removeItemsSelected';
import { hideContextMenu } from './hideContextMenu';
import { resetSelectedFolders } from './resetSelectedFolders';
import { resetSelectedLinks } from './resetSelectedLinks';

let baseURL: string = '';

export async function moveLinksAndFoldersToTrash(fs: Partial<Folder>[], ls: Partial<Link>[]) {
	const unsub = apiURL.subscribe((value) => {
		baseURL = value;
	});

	unsub();

	const foldersPromise = await fetch(`${baseURL}/private/folder/moveFoldersToTrash`, {
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
			folder_ids: fs.map((f) => f.folder_id)
		}) // body data type must match "Content-Type" header
	});

	const linksPromise = await fetch('http://localhost:5000/private/link/moveLinksToTrash', {
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
			link_ids: ls.map((li) => li.link_id)
		}) // body data type must match "Content-Type" header
	});

	try {
		const results = await Promise.all([foldersPromise, linksPromise]);

		const res1 = await results[0].json();
		const foldersResponse: Partial<Folder>[] = res1[0];

		const res2 = await results[1].json();
		const linksResponse: Partial<Link>[] = res2[0];

		for (let index = 0; index < foldersResponse.length; index++) {
			const folder = foldersResponse[index];
			folders.update((values) => values.filter((value) => value.folder_id !== folder.folder_id));
		}

		for (let index = 0; index < linksResponse.length; index++) {
			const link = linksResponse[index];
			links.update((values) => values.filter((value) => value.link_id !== link.link_id));
		}

		removeItemsSelected();

		resetSelectedFolders();

		resetSelectedLinks();

		hideContextMenu();

		toggleDeleteItemsConfirmationPopup();
	} catch (error) {
		console.log(error);
	}
}
