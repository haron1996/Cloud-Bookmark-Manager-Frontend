import { showContactForm } from '../../stores/stores';
import { hideMenuBar } from './toggleMenuBar';

export const makeContactFormVisible = () => {
	hideMenuBar();

	showContactForm.set(true);
};

export const hideContactForm = () => {
	showContactForm.set(false);
};
