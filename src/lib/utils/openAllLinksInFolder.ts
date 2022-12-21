import { selectedFolders } from '../../stores/stores';
import type { Folder } from '$lib/types/folder';
import type { Link } from '$lib/types/link';
import { getSession } from './getSession';

let allSelectedFolders: Partial<Folder>[] = [];

export async function openAllLinksInFolder() {
	const unsub = selectedFolders.subscribe((values) => {
		allSelectedFolders = values;
	});

	unsub();

	if (allSelectedFolders.length === 1 && allSelectedFolders[0].folder_id !== undefined) {
		try {
			const folder_id = allSelectedFolders[0].folder_id;
			const account_id = JSON.parse(getSession()).Account.id;

			const getLinksEndPoint = `http://localhost:5000/private/link/get_folder_links/${account_id}/${folder_id}`;

			const response = await fetch(getLinksEndPoint, {
				method: 'GET',
				mode: 'cors',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer${JSON.parse(getSession()).access_token}`
				}
			});

			const result = await response.json();

			const links: Partial<Link>[] = result[0];

			for (let index = 0; index < links.length; index++) {
				const link = links[index];
				if (link.link_url !== undefined) {
					setTimeout(() => {
						window.open(link.link_url);
					}, 200);
				}
			}
		} catch (error) {
			console.log(error);
		}
	}
}
