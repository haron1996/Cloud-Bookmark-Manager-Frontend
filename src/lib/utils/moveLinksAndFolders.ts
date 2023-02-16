import { getSession } from './getSession';
import type { Folder } from '$lib/types/folder';
import type { Link } from '$lib/types/link';
import { page } from '$app/stores';
import { folders, links, apiURL } from '../../stores/stores';
import { hideMoveItemsPopup } from './hideMoveItemsPopup';
import { get } from 'svelte/store';
import { resetLinksCut } from './resetLinksCut';
import { resetFoldersCut } from './resetFoldersCut';
import { goto } from '$app/navigation';
import { resetSelectedFolders } from './resetSelectedFolders';
import { resetSelectedLinks } from './resetSelectedLinks';

// let currentPath: string;

let baseURL = '';
let origin: string;
let domFolders: Partial<Folder>[];
let domLinks: Partial<Link>[];

export async function moveLinksAndFoldersToRoot(
	folderz: Partial<Folder>[],
	linkz: Partial<Link>[],
	folderID: string
) {
	const unsub = apiURL.subscribe((value) => {
		baseURL = value;
	});

	unsub();

	const moveFoldersPromise = await fetch(`${baseURL}/private/folder/moveFoldersToRoot`, {
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

	const moveLinksPromise = await fetch(`${baseURL}/private/link/move`, {
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

		// if (get(folders) === null) {
		// 	folders.set(foldersMoved);
		// } else {
		// 	folders.update((values) => [...foldersMoved, ...values]);
		// }

		// if (get(links) === null) {
		// 	links.set(linksMoved);
		// } else {
		// 	links.update((values) => [...linksMoved, ...values]);
		// }

		const getDomFolders = folders.subscribe((values) => {
			domFolders = values;
		});

		getDomFolders();

		const getDomLinks = links.subscribe((value) => {
			domLinks = value;
		});

		getDomLinks();

		for (let index = 0; index < foldersMoved.length; index++) {
			const element = foldersMoved[index];
			domFolders = domFolders.filter((dmf) => dmf.folder_id !== element.folder_id);
			folders.set(domFolders);
		}

		for (let index = 0; index < linksMoved.length; index++) {
			const element = linksMoved[index];
			domLinks = domLinks.filter((dml) => dml.link_id !== element.link_id);
			links.set(domLinks);
		}

		resetSelectedFolders();

		resetSelectedLinks();

		resetFoldersCut();

		resetLinksCut();

		hideMoveItemsPopup();

		// const getCurrentOrigin = page.subscribe((value) => {
		// 	origin = value.url.origin;
		// });

		// getCurrentOrigin();

		// goto(`${origin}/appv1/my_links`);
	} catch (error) {
		console.log(error);
	}
}

export async function moveLinksAndFoldersToSelectedDestinationFolder(
	folderz: Partial<Folder>[],
	linkz: Partial<Link>[],
	folderID: string | undefined
) {
	const unsub = apiURL.subscribe((value) => {
		baseURL = value;
	});

	unsub();

	const moveFoldersPromise = await fetch(`${baseURL}/private/folder/moveFolders`, {
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

	const moveLinksPromise = await fetch(`${baseURL}/private/link/move`, {
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

		// if (get(folders) === null) {
		// 	folders.set(foldersMoved);
		// } else {
		// 	folders.update((values) => [...foldersMoved, ...values]);
		// }

		// if (get(links) === null) {
		// 	links.set(linksMoved);
		// } else {
		// 	links.update((values) => [...linksMoved, ...values]);
		// }

		const getDomFolders = folders.subscribe((values) => {
			domFolders = values;
		});

		getDomFolders();

		const getDomLinks = links.subscribe((value) => {
			domLinks = value;
		});

		getDomLinks();

		for (let index = 0; index < foldersMoved.length; index++) {
			const element = foldersMoved[index];
			domFolders = domFolders.filter((dmf) => dmf.folder_id !== element.folder_id);
			folders.set(domFolders);
		}

		for (let index = 0; index < linksMoved.length; index++) {
			const element = linksMoved[index];
			domLinks = domLinks.filter((dml) => dml.link_id !== element.link_id);
			links.set(domLinks);
		}

		resetSelectedFolders();

		resetSelectedLinks();

		hideMoveItemsPopup();

		resetFoldersCut();

		resetLinksCut();

		// const getCurrentOrigin = page.subscribe((value) => {
		// 	origin = value.url.origin;
		// });

		// getCurrentOrigin();

		// if (folderID) {
		// 	goto(`${origin}/appv1/my_links/${folderID}`);
		// }
	} catch (error) {
		console.log(error);
	}
}
