import { renameFolderMode } from '../../stores/stores';
import { highlightInitialInputContent } from './selectInitialInputValue';

export function showRenameFolderForm() {
	renameFolderMode.set(true);

	setTimeout(() => {
		highlightInitialInputContent('rename_folder_input');
	}, 20);
}
