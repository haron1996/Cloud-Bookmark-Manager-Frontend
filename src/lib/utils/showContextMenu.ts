import { page } from '$app/stores';
import { contextMenuTargetElement, mouseEvent, rightClickedElement } from '../../stores/stores';
import { contextMenuIsInViewport } from './checkIfContextMenuIsInViewport';
import { hideContextMenu } from './hideContextMenu';
import { removeItemsSelected } from './removeItemsSelected';

let path: string;

export function showContextMenu(e: MouseEvent) {
	mouseEvent.set(e);

	const target = window.event?.currentTarget as HTMLElement;

	const unsub = page.subscribe((values) => {
		path = values.url.pathname;
	});

	unsub();

	//console.log(target, path);

	if (path === '/appv1/my_links/recycle_bin' && target.classList.contains('links')) {
		removeItemsSelected();
		hideContextMenu();
		return;
	}

	contextMenuTargetElement.set(target);

	if (target.classList.contains('links')) {
		rightClickedElement.set(target);
	} else if (target.classList.contains('folder')) {
		rightClickedElement.set(target);
	} else if (target.classList.contains('link')) {
		rightClickedElement.set(target);
	}

	const cMenu = document.getElementById('context_menu') as HTMLDivElement | null;

	if (cMenu === null) return;

	cMenu.style.display = 'flex';
	cMenu.style.left = `${e.clientX}px`;
	cMenu.style.top = `${e.clientY}px`;

	setTimeout(() => {
		contextMenuIsInViewport(cMenu, e);
	}, 5);
}
