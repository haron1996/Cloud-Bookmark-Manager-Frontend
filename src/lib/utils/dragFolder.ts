import { draggedFolder } from '../../../src/stores/stores';
import type { Folder } from '$lib/types/folder';

let el: HTMLElement;

let f: Partial<Folder> = {};

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
}
