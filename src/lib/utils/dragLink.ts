import type { Link } from '$lib/types/link';
import { currentCollectionMember, draggedLink } from '../../stores/stores';
import type { CollectionMember } from '$lib/types/collectionMember';

let el: HTMLElement;

let l: Partial<Link> = {};

let cm: Partial<CollectionMember> = {}

export function dragLink(e: DragEvent) {
	const getCurrentCollectionMember = currentCollectionMember.subscribe((value) => {
		cm = value
	})

	getCurrentCollectionMember()


	if (cm.collection_access_level !== undefined &&
		cm.collection_access_level === 'view') return
	el = e.target as HTMLDivElement;

	el = el.closest('.link') as HTMLDivElement;

	l = {
		link_id: el.dataset.linkid,
		link_title: el.dataset.linktitle,
		account_id: el.dataset.accountid,
		link_url: el.dataset.linkurl
	};

	draggedLink.set(l);
}
