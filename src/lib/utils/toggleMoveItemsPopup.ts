import { page } from '$app/stores';
import {
	foldersToRenderInMoveFoldersPopup,
	moveItemsMode,
	selectedDestinationFolder
} from '../../stores/stores';
import { getFolder } from './getFolder';

let moveItemsPopupVisible: Boolean;

let folderIdParam: string | undefined;

export async function toggleMoveItemsPopup() {
	const unsub = page.subscribe((value) => {
		folderIdParam = value.params.folder_id;
	});

	if (folderIdParam) {
		selectedDestinationFolder.set(await getFolder(folderIdParam));
	}

	const unsubscribe = moveItemsMode.subscribe((value) => {
		moveItemsPopupVisible = value;
	});

	unsub();

	unsubscribe();

	if (moveItemsPopupVisible) {
		foldersToRenderInMoveFoldersPopup.set([]);

		moveItemsMode.set(false);
	} else {
		moveItemsMode.set(true);
	}
}
