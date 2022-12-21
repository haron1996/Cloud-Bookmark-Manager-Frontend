import { selectedFolders } from '../../stores/stores';

export function resetSelectedFolders() {
	selectedFolders.set([]);
}
