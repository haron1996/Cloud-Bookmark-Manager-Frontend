import { draggedFolder } from '../../../src/stores/stores';
import type { Folder } from '$lib/types/folder';
import { getDomFolders } from './getDomFolders';

let el: HTMLElement;

let f: Partial<Folder> = {};

let currentDomFolders: NodeListOf<HTMLDivElement>;

export function dragFolder(e: DragEvent) {
	el = e.target as HTMLDivElement;

	el = el.closest('.folder') as HTMLDivElement;

	f = {
		folder_id: el.dataset.folderid,
		folder_name: el.dataset.foldername,
		account_id: el.dataset.accountid,
		label: el.dataset.folderlabel,
		path: el.dataset.folderpath
	};

	draggedFolder.set(f);

	currentDomFolders = getDomFolders();

	currentDomFolders.forEach((cdf) => {
		if (cdf.dataset.folderid) {
			if (cdf.dataset.folderid === f.folder_id) {
				cdf.classList.add('dragged_folder');
			}
		}
	});
}
