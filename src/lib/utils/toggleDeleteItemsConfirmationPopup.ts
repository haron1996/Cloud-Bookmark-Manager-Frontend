import { confirmDeleteItemsMode } from '../../stores/stores';
import { hideContextMenu } from './hideContextMenu';

let currentPopupMode: boolean;

export function toggleDeleteItemsConfirmationPopup() {
	hideContextMenu();

	const unsubscribe = confirmDeleteItemsMode.subscribe((value) => {
		currentPopupMode = value;
	});

	unsubscribe();

	currentPopupMode = !currentPopupMode;

	confirmDeleteItemsMode.set(currentPopupMode);
}
