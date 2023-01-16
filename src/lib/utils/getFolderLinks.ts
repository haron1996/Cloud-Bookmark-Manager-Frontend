import { getSession } from './getSession';
import type { Link } from '$lib/types/link';
import { get } from 'svelte/store';
import { linksToRenderInMoveItemsPopup, apiURL } from '../../stores/stores';

let baseURL: string = '';

export async function getFolderLinks(folderID: string | undefined) {
	if (folderID === undefined) return;

	const accountID = JSON.parse(getSession()).Account.id;

	const unsub = apiURL.subscribe((value) => {
		baseURL = value;
	});

	unsub();

	let url = `${baseURL}/private/link/get_folder_links/${accountID}/${folderID}`;
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

	if (result[0] !== null) {
		const links: Partial<Link>[] = result[0];

		linksToRenderInMoveItemsPopup.set(links);
	}
}
