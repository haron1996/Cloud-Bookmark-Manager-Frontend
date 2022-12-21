import { showSelectSearchCategory } from '../../stores/stores';

let status: boolean;

export function toggleSelectSearchCategoryMenu() {
	const unsubscribe = showSelectSearchCategory.subscribe((value) => {
		status = value;
	});

	unsubscribe();

	showSelectSearchCategory.set((status = !status));
}
