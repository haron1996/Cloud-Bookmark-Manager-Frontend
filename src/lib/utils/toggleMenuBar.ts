let el: HTMLElement;

export function ToggleMenuBar() {
	el = document.getElementById('menu_bar') as HTMLDivElement;

	el.classList.toggle('show_menu_bar');
}
