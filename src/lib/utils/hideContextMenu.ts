export function hideContextMenu() {
	const cMenu = document.getElementById('context_menu') as HTMLDivElement | null;

	if (cMenu === null) return;

	cMenu.style.display = 'none';
}
