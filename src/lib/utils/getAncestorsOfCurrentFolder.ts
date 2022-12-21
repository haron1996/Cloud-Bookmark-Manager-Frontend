import { getSession } from './getSession';
import type { Folder } from '$lib/types/folder';
import { ancestorsOfCurrentFolder } from '../../stores/stores';
import { get } from 'svelte/store';
import { resetAncestorsOfCurrentFolder } from './resetAncestorsOfCurrentFolder';

export async function getAncestorsOfCurrentFolder(folderID: string) {
	// console.log(folderID);
	// return;
	let url = `http://localhost:5000/private/folder/getFolderAncestors/${folderID}`;

	const res = await fetch(url, {
		method: 'GET',
		mode: 'cors',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer${JSON.parse(getSession()).access_token}`
		}
	});

	try {
		const results = await res.json();

		if (results[0] === undefined) {
			console.log(results.message);
		} else {
			const folders: Partial<Folder>[] = results[0];

			resetAncestorsOfCurrentFolder();

			for (let index = 0; index < folders.length; index++) {
				const folder = folders[index];

				ancestorsOfCurrentFolder.update((values) => [...values, folder]);
			}
		}
	} catch (error) {
		console.log(error);
	}
}
