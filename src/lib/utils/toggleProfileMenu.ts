import { profileMenuVisible } from '../../stores/stores';

let status: boolean;

export function toggleProfileMenu() {
	const unsubscribe = profileMenuVisible.subscribe((value) => {
		status = value;
	});

	unsubscribe();

	profileMenuVisible.set((status = !status));
}

export function showProfileMenu() {
	profileMenuVisible.set(true);
}

export function hideProfileMenu() {
	profileMenuVisible.set(false);
}
