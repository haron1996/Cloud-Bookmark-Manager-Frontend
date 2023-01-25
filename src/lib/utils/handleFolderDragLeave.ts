import { getDomFolders } from './getDomFolders';

let currentDomFolders: NodeListOf<HTMLDivElement>;

export function FolderDragLeave(e: DragEvent) {
	currentDomFolders = getDomFolders();

	currentDomFolders.forEach((cdf) => {
		cdf.classList.remove('folder_drag_over');
	});
}
