let el: HTMLElement;

export function ToggleMenuBar() {
	el = document.getElementById('menu_bar') as HTMLDivElement;

	el.classList.toggle('show_menu_bar');
}

export function hideMenuBar() {
	el = document.getElementById('menu_bar') as HTMLDivElement;

	el.classList.remove('show_menu_bar');
}

export function showMenuBar() {
	el = document.getElementById('menu_bar') as HTMLDivElement;

	el.classList.add('show_menu_bar');
}