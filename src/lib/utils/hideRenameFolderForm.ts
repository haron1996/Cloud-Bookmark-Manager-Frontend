import { renameFolderMode } from '../../stores/stores';

export function hideRenameFolderForm() {
	renameFolderMode.set(false);
}
