import { menuToggled } from '../../stores/stores';

let menu_toggled: boolean;

export function toggleMenu() {
	const unsubscribe = menuToggled.subscribe((value) => {
		menu_toggled = value;
	});

	unsubscribe();

	menuToggled.set((menu_toggled = !menu_toggled));
}
