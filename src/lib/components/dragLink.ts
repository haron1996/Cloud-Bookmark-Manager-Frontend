import type { Link } from '$lib/types/link';
import { draggedLink } from '../../../src/stores/stores';

let el: HTMLElement;

let l: Partial<Link> = {};

export function dragLink(e: DragEvent) {
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
