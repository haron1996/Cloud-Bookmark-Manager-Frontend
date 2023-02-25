export { matchers } from './matchers.js';

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
	() => import('./nodes/21'),
	() => import('./nodes/22'),
	() => import('./nodes/23')];

export const server_loads = [];

export const dictionary = {
	"/": [4],
	"/about": [5],
	"/accounts": [6],
	"/accounts/email": [7],
	"/accounts/sign_in": [8],
	"/accounts/thankyou": [9],
	"/appv1": [10],
	"/appv1/my_links": [11,[2]],
	"/appv1/my_links/trash": [13,[2]],
	"/appv1/my_links/[folder_id=folder_id]": [12,[2]],
	"/appv1/settings": [14,[3]],
	"/appv1/settings/billing": [15,[3]],
	"/appv1/settings/members": [16,[3]],
	"/appv1/settings/my_profile": [17,[3]],
	"/appv1/settings/my_profile/change_email": [18,[3]],
	"/appv1/settings/my_profile/change_password": [19,[3]],
	"/appv1/settings/my_profile/confirm_email": [20,[3]],
	"/appv1/share/[folder_id=folder_id]": [21],
	"/auth/continue_with_google": [22],
	"/contact": [23]
};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';