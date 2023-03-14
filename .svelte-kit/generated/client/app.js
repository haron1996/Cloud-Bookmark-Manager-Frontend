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
	() => import('./nodes/23'),
	() => import('./nodes/24'),
	() => import('./nodes/25'),
	() => import('./nodes/26'),
	() => import('./nodes/27')];

export const server_loads = [];

export const dictionary = {
	"/": [4],
	"/about": [5],
	"/accounts": [6],
	"/accounts/accept_invite": [7],
	"/accounts/email": [8],
	"/accounts/request_password_reset_link": [9],
	"/accounts/reset_password": [10],
	"/accounts/sign_in": [11],
	"/accounts/thankyou": [12],
	"/admin_only/upload_hero_image": [13],
	"/appv1": [14],
	"/appv1/my_links": [15,[2]],
	"/appv1/my_links/trash": [17,[2]],
	"/appv1/my_links/[folder_id=folder_id]": [16,[2]],
	"/appv1/settings": [18,[3]],
	"/appv1/settings/billing": [19,[3]],
	"/appv1/settings/members": [20,[3]],
	"/appv1/settings/my_profile": [21,[3]],
	"/appv1/settings/my_profile/change_email": [22,[3]],
	"/appv1/settings/my_profile/change_password": [23,[3]],
	"/appv1/settings/my_profile/confirm_email": [24,[3]],
	"/appv1/share/[folder_id=folder_id]": [25],
	"/auth/continue_with_google": [26],
	"/contact": [27]
};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';