import { hideShowOptionsMenu } from '$lib/types/hideShowOptionsMenu';
import { addLinkMode } from '../../stores/stores';
import { hideContextMenu } from './hideContextMenu';
import { highlightInitialInputContent } from './selectInitialInputValue';

export function showAddLinkForm() {
	hideShowOptionsMenu();

	hideContextMenu();

	addLinkMode.set(true);

	setTimeout(() => {
		highlightInitialInputContent('url_input');
	}, 20);
}
