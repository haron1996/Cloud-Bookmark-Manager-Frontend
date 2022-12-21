import { selectedFolders, selectedLinks } from '../../stores/stores';

export function removeItemsSelected() {
	selectedFolders.set([]);
	selectedLinks.set([]);
}
