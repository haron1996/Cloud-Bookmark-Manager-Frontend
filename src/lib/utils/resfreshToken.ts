import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { Session } from '$lib/types/session';
import { apiURL, session } from '../../stores/stores';

let baseURL: string;
let origin: string;

export const RefreshToken = async (s: Partial<Session>) => {
	const unsub = page.subscribe((value) => {
		origin = value.url.origin;
	});

	unsub();

	const getBaseUrl = apiURL.subscribe((value) => {
		baseURL = value;
	});

	getBaseUrl();

	const response = await fetch(`${baseURL}/public/refreshToken`, {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'include', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify({
			refresh_token: s.refresh_token
		}) // body data type must match "Content-Type" header
	});

	const data = await response.json();

	if (data.message) {
		// handle this error
		console.log(data.message);
		goto(`${origin}/accounts/sign_in`);
		return;
	}

	s = data[0];

	if (s === null) return;

	session.set(s);

	window.localStorage.removeItem('session');

	window.localStorage.setItem('session', JSON.stringify(s));

	const unsubscribe = apiURL.subscribe((value) => {
		baseURL = value;
	});

	unsubscribe();

	//goto(`${origin}/appv1/my_links`);
};
