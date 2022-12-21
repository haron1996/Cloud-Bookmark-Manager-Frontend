import { getSession } from './getSession';
import type { Folder } from '$lib/types/folder';
import type { Link } from '$lib/types/link';
import { page } from '$app/stores';
import { folders, links } from '../../stores/stores';
import { hideMoveItemsPopup } from './hideMoveItemsPopup';
import { get } from 'svelte/store';
import { resetLinksCut } from './resetLinksCut';
import { resetFoldersCut } from './resetFoldersCut';
import { goto } from '$app/navigation';

// let currentPath: string;

export async function moveLinksAndFoldersToRoot(
	folderz: Partial<Folder>[],
	linkz: Partial<Link>[],
	folderID: string
) {
	const moveFoldersPromise = await fetch('http://localhost:5000/private/folder/moveFoldersToRoot', {
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
			folder_ids: folderz.map((f) => f.folder_id)
		}) // body data type must match "Content-Type" header
	});

	const moveLinksPromise = await fetch('http://localhost:5000/private/link/move', {
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
			links: linkz.map((li) => li.link_id),
			folder_id: folderID
		}) // body data type must match "Content-Type" header
	});

	try {
		const responses = await Promise.all([moveFoldersPromise, moveLinksPromise]);

		const foldersResponse = await responses[0].json();
		const linksResponse = await responses[1].json();

		const foldersMoved: Partial<Folder>[] = foldersResponse[0];
		const linksMoved: Partial<Link>[] = linksResponse[0];

		if (get(folders) === null) {
			folders.set(foldersMoved);
		} else {
			folders.update((values) => [...foldersMoved, ...values]);
		}

		if (get(links) === null) {
			links.set(linksMoved);
		} else {
			links.update((values) => [...linksMoved, ...values]);
		}

		resetFoldersCut();

		resetLinksCut();

		hideMoveItemsPopup();

		goto('http://localhost:5173/appv1/my_links');
	} catch (error) {
		console.log(error);
	}
}

export async function moveLinksAndFoldersToSelectedDestinationFolder(
	folderz: Partial<Folder>[],
	linkz: Partial<Link>[],
	folderID: string | undefined
) {
	console.log(folderID);

	const moveFoldersPromise = await fetch('http://localhost:5000/private/folder/moveFolders', {
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
			destination_folder_id: folderID,
			folder_ids: folderz.map((f) => f.folder_id)
		}) // body data type must match "Content-Type" header
	});

	const moveLinksPromise = await fetch('http://localhost:5000/private/link/move', {
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
			links: linkz.map((li) => li.link_id),
			folder_id: folderID
		}) // body data type must match "Content-Type" header
	});

	try {
		const responses = await Promise.all([moveFoldersPromise, moveLinksPromise]);

		const foldersResponse = await responses[0].json();
		const linksResponse = await responses[1].json();

		const foldersMoved: Partial<Folder>[] = foldersResponse[0];
		const linksMoved: Partial<Link>[] = linksResponse[0];

		if (get(folders) === null) {
			folders.set(foldersMoved);
		} else {
			folders.update((values) => [...foldersMoved, ...values]);
		}

		if (get(links) === null) {
			links.set(linksMoved);
		} else {
			links.update((values) => [...linksMoved, ...values]);
		}

		hideMoveItemsPopup();

		resetFoldersCut();

		resetLinksCut();

		if (folderID) {
			goto(`http://localhost:5173/appv1/my_links/${folderID}`);
		}
	} catch (error) {
		console.log(error);
	}
}
