import { showSelectSearchCategory } from '../../stores/stores';

export function hideSelectShowCategoryMenu() {
	showSelectSearchCategory.set(false);
}
