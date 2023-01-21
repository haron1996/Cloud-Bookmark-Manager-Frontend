import { hideShowOptionsMenu } from '$lib/types/hideShowOptionsMenu';
import { addLinkMode } from '../../stores/stores';
import { hideContextMenu } from './hideContextMenu';
import { highlightInitialInputContent } from './selectInitialInputValue';
import { SwitchOffCreateMode } from './switchOffCreateMode';

export function showAddLinkForm() {
	SwitchOffCreateMode();

	hideShowOptionsMenu();

	hideContextMenu();

	addLinkMode.set(true);

	setTimeout(() => {
		highlightInitialInputContent('url_input');
	}, 20);
}
