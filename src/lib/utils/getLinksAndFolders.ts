import type { Folder } from '$lib/types/folder';
import type { Link } from '$lib/types/link';
import { folders, links, loading, apiURL } from '../../stores/stores';
import { getSession } from './getSession';

let f: Partial<Folder>[] = [];
let l: Partial<Link>[] = [];

let folderID,
	baseURL = '';

export async function getLinksAndFolders(folder_id: string) {
	loading.set(true);

	if (getSession() === null) {
		loading.set(false);
		return;
	}

	const accountID = JSON.parse(getSession()).Account.id;

	if (folder_id === '') {
		folderID = 'null';
	} else {
		folderID = folder_id;
	}

	const unsub = apiURL.subscribe((value) => {
		baseURL = value;
	});

	unsub();

	const url = `${baseURL}/private/getLinksAndFolders/${accountID}/${folderID}`;
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

	f = result[0].folders;

	l = result[0].links;

	if (f !== null) {
		folders.set(f);
	} else {
		folders.set([]);
	}

	if (l !== null) {
		links.set(l);
	} else {
		links.set([]);
	}

	loading.set(false);
}
