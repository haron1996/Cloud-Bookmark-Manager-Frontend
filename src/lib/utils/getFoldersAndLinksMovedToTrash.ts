import { getSession } from './getSession';
import type { Folder } from '$lib/types/folder';
import type { Link } from '$lib/types/link';
import { folders, links, loading } from '../../stores/stores';

let f: Partial<Folder>[] = [];
let l: Partial<Link>[] = [];

export async function getFoldersAndLinksMovedToTrash() {
	loading.set(true);

	const accountID = JSON.parse(getSession()).Account.id;

	let url = `http://localhost:5000/private/getFoldersAndLinksMovedToTrash/${accountID}`;

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
		const result = await res.json();

		f = result[0].folders;

		l = result[0].links;

		if (f !== undefined && f !== null) {
			folders.set(f);
		} else {
			folders.set([]);
		}

		if (l !== undefined && l !== null) {
			links.set(l);
		} else {
			links.set([]);
		}

		// folders.set(f);
		// links.set(l);

		loading.set(false);
	} catch (error) {
		console.log(error);

		loading.set(false);
	}
}
