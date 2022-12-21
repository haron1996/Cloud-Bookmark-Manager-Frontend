import type { Folder } from '$lib/types/folder';
import type { Link } from '$lib/types/link';
import { selectedFolders, selectedLinks } from '../../stores/stores';

export function selectAllItems(fs: Partial<Folder>[], ls: Partial<Link>[]) {
	selectedFolders.set([]);

	selectedLinks.set([]);

	selectedFolders.update((values) => [...values, ...fs]);

	selectedLinks.update((values) => [...values, ...ls]);
}
