import type { Link } from '$lib/types/link';
import { linksToRenderInMoveItemsPopup, apiURL } from '../../stores/stores';
import { getSession } from './getSession';

let baseURL: string = '';

export async function getRootLinksOnly() {
	const unsub = apiURL.subscribe((value) => {
		baseURL = value;
	});

	unsub();

	const account_id = JSON.parse(getSession()).Account.id;

	const getLinksEndPoint = `${baseURL}/private/link/getRootLinks/${account_id}`;

	const res = await fetch(getLinksEndPoint, {
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
	} else {
		linksToRenderInMoveItemsPopup.set([]);
	}
}
