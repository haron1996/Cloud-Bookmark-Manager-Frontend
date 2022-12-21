import type { Folder } from '../../types/folder';

export function sortFoldersByDate(f: Folder[]) {
	f.sort((a, b) => {
		if (a.folder_created_at === undefined || b.folder_created_at === undefined) return 0;

		let da = new Date(a.folder_created_at).getTime(),
			db = new Date(b.folder_created_at).getTime();

		return da - db;
	});
}
