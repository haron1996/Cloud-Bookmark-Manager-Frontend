export { matchers } from './client-matchers.js';

export const nodes = [() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21')];

export const server_loads = [];

export const dictionary = {
	"/": [4],
	"/accounts": [5],
	"/accounts/email": [6],
	"/accounts/sign_in": [7],
	"/appv1": [8],
	"/appv1/contact": [9],
	"/appv1/my_links": [10,[2]],
	"/appv1/my_links/recycle_bin": [12,[2]],
	"/appv1/my_links/[folder_id=folder_id]": [11,[2]],
	"/appv1/settings": [13,[3]],
	"/appv1/settings/billing": [14,[3]],
	"/appv1/settings/members": [15,[3]],
	"/appv1/settings/my_profile": [16,[3]],
	"/appv1/settings/my_profile/change_email": [17,[3]],
	"/appv1/settings/my_profile/change_password": [18,[3]],
	"/appv1/settings/my_profile/confirm_email": [19,[3]],
	"/auth/continue_with_google": [20],
	"/auth/thankyou": [21]
};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};