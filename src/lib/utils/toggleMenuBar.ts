let el: HTMLElement | null;

export function ToggleMenuBar() {
	el = document.getElementById('menu_bar') as HTMLDivElement | null;

	if (el === null) return

	el.classList.toggle('show_menu_bar');
}

export function hideMenuBar() {
	el = document.getElementById('menu_bar') as HTMLDivElement | null;

	if (el === null) return

	el.classList.remove('show_menu_bar');
}

export function showMenuBar() {
	el = document.getElementById('menu_bar') as HTMLDivElement;

	el.classList.add('show_menu_bar');
}