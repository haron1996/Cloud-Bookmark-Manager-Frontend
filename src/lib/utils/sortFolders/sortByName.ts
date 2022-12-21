import type { Folder } from '../../types/folder';

export function sortFoldersByName(f: Folder[]) {
	f.sort((a, b) => {
		const fa = a.folder_name?.toLowerCase(),
			fb = b.folder_name?.toLowerCase();

		if (fa === undefined || fb === undefined) return 0;

		if (fa < fb) {
			return -1;
		}

		if (fa > fb) {
			return 1;
		}

		return 0;
	});
}
