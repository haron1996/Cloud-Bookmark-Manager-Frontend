import { renameLinkMode } from '../../stores/stores';

export function hideRenameLinkForm() {
	renameLinkMode.set(false);
}
