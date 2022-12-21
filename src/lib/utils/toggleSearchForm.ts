import { showSearchForm } from '../../stores/stores';

export function showSearchFormPopup() {
	showSearchForm.set(true);
}

export function hideSearchFormPopup() {
	showSearchForm.set(false);
}
