import { showOptionsMenu } from '../../stores/stores';

let showOptionMenuStatus: boolean;

export function toggleShowOptionsMenu() {
	const unsubscribe = showOptionsMenu.subscribe((value) => {
		showOptionMenuStatus = value;
	});

	unsubscribe();

	showOptionMenuStatus = !showOptionMenuStatus;

	showOptionsMenu.set(showOptionMenuStatus);
}
