import { hideContextMenu } from './hideContextMenu';
import { rightClickedElement } from '../../stores/stores';
import { showRenameFolderForm } from './showRenameFolderForm';
import { showRenameLinkForm } from './showRenameLinkForm';

let el: HTMLElement;

export function handleClickOnRenameButton() {
	hideContextMenu();

	rightClickedElement.subscribe((value) => {
		el = value;
		console.log(el);
	});

	if (el.classList.contains('folder')) {
		showRenameFolderForm();
	} else if (el.classList.contains('link')) {
		showRenameLinkForm();
	}
}
