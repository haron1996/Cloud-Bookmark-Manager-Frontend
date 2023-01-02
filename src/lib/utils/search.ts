import type { Folder } from '$lib/types/folder';
import type { Link } from '$lib/types/link';
import { foldersFound, linksFound } from '../../stores/stores';
import { getSession } from './getSession';

let l: Partial<Link>[] = [];

let f: Partial<Folder>[] = [];

export async function searchLinksAndFolders(searchPhrase: string) {
	const searchLinksPromise = await fetch(
		`http://localhost:5000/private/link/searchLinks/${searchPhrase}`,
		{
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer${JSON.parse(getSession()).access_token}`
			}
		}
	);

	const searchFoldersPromise = await fetch(
		`http://localhost:5000/private/folder/searchFolders/${searchPhrase}`,
		{
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer${JSON.parse(getSession()).access_token}`
			}
		}
	);

	const searchResults = await Promise.all([searchLinksPromise, searchFoldersPromise]);

	const searchLinksRes = await searchResults[0].json();

	const searchFoldersRes = await searchResults[1].json();

	l = searchLinksRes[0];

	f = searchFoldersRes[0];

	if (l !== null) {
		linksFound.set(l);
	} else {
		linksFound.set([]);
	}

	if (f !== null) {
		foldersFound.set(f);
	} else {
		foldersFound.set([]);
	}
}
