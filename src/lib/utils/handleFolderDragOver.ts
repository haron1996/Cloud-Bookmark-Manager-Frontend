import { getDomFolders } from './getDomFolders';
import { draggedFolder } from '../../../src/stores/stores';
import type { Folder } from '$lib/types/folder';

let el: HTMLElement;
let f: Partial<Folder> = {};
let folderID: string;

let currentDomFolders: NodeListOf<HTMLDivElement>;

export function FolderDragOver(e: DragEvent) {
	el = e.target as HTMLElement;

	el = el.closest('.folder') as HTMLDivElement;

	if (el.dataset.folderid) {
		folderID = el.dataset.folderid;
	}

	const unsubscribe = draggedFolder.subscribe((value) => {
		f = value;
	});

	unsubscribe();

	currentDomFolders = getDomFolders();

	currentDomFolders.forEach((df) => {
		df.classList.remove('folder_drag_over');
	});

	if (folderID !== f.folder_id) {
		el.classList.add('folder_drag_over');
	}
}
