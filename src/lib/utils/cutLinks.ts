import type { Link } from '$lib/types/link';
import { linksCut, selectedLinks } from '../../stores/stores';

export function cutLinks(ls: Partial<Link>[]) {
	emptyLinksCut();

	linksCut.update((values) => [...values, ...ls]);

	selectedLinks.set([]);
}

export function emptyLinksCut() {
	linksCut.set([]);
}
