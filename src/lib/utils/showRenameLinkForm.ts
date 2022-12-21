import { renameLinkMode } from '../../stores/stores';
import { highlightInitialInputContent } from './selectInitialInputValue';

export function showRenameLinkForm() {
	renameLinkMode.set(true);

	setTimeout(() => {
		highlightInitialInputContent('rename_link_title_input');
	}, 20);
}
