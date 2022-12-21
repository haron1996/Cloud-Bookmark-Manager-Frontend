import { ancestorsOfCurrentFolder } from '../../stores/stores';

export function resetAncestorsOfCurrentFolder() {
	ancestorsOfCurrentFolder.set([]);
}
