import { moveItemsMode } from '../../stores/stores';

export function hideMoveItemsPopup() {
	moveItemsMode.set(false);
}
