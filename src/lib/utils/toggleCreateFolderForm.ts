import { hideShowOptionsMenu } from '$lib/types/hideShowOptionsMenu';
import { createFolderMode, folderName } from '../../stores/stores';
import { hideContextMenu } from './hideContextMenu';
import { highlightInitialInputContent } from './selectInitialInputValue';
import { SwitchOffCreateMode } from './switchOffCreateMode';

let currentCreateFolderMode: Boolean;

export function showCreateFolderForm() {
	SwitchOffCreateMode();

	hideShowOptionsMenu();

	hideContextMenu();

	const unsubscribe = createFolderMode.subscribe((value) => {
		currentCreateFolderMode = value;
	});

	currentCreateFolderMode = !currentCreateFolderMode;

	unsubscribe();

	createFolderMode.set(currentCreateFolderMode);

	folderName.set('Untitled folder');

	setTimeout(() => {
		highlightInitialInputContent('create-folder-input');
	}, 100);
}
