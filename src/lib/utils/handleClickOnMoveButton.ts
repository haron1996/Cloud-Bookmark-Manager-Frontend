import { hideContextMenu } from './hideContextMenu';
import { toggleMoveItemsPopup } from './toggleMoveItemsPopup';

export function handleClickOnMoveButton() {
	hideContextMenu();

	toggleMoveItemsPopup();
}
