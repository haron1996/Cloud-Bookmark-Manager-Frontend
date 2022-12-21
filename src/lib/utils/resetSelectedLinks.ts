import { selectedLinks } from '../../stores/stores';

export function resetSelectedLinks() {
	selectedLinks.set([]);
}
