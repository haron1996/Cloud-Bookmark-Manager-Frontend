import { currentCollectionMember, draggedFolder } from '../../../src/stores/stores';
import type { Folder } from '$lib/types/folder';
import type {CollectionMember} from '$lib/types/collectionMember'
import { getDomFolders } from './getDomFolders';

let el: HTMLElement;

let f: Partial<Folder> = {};

let currentDomFolders: NodeListOf<HTMLDivElement>;

let cm: Partial<CollectionMember> = {}

export function dragFolder(e: DragEvent) {
	const getCurrentCollectionMember = currentCollectionMember.subscribe((value) => {
		cm = value
	})

	getCurrentCollectionMember()


	if (cm.collection_access_level !== undefined &&
		cm.collection_access_level === 'view') return
		
	el = e.target as HTMLDivElement;

	el = el.closest('.folder') as HTMLDivElement;

	f = {
		folder_id: el.dataset.folderid,
		folder_name: el.dataset.foldername,
		account_id: el.dataset.accountid,
		label: el.dataset.folderlabel,
		path: el.dataset.folderpath
	};

	draggedFolder.set(f);

	currentDomFolders = getDomFolders();

	currentDomFolders.forEach((cdf) => {
		if (cdf.dataset.folderid) {
			if (cdf.dataset.folderid === f.folder_id) {
				cdf.classList.add('dragged_folder');
			}
		}
	});
}
