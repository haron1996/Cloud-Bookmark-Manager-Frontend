import { goto } from '$app/navigation';
import {
	apiURL,
	accessToken,
	session,
	invalid_email,
	invalid_password,
	showCheckMarkLottie
} from '../../stores/stores';
import type { Session } from '$lib/types/session';
import { MakeCheckMarkLotieVisible } from './showCheckMarkLottie';
import { page } from '$app/stores';

let s: Partial<Session> = {};

let origin: string;

let baseURL = '';

export async function SignIn(email: string, password: string) {
	const unsub = apiURL.subscribe((value) => {
		baseURL = value;
	});

	unsub();

	const response = await fetch(`${baseURL}/public/account/signin`, {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'include', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json'
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify({
			email: email,
			password: password
		}) // body data type must match "Content-Type" header
	});

	const promise = await response.json();

	if (promise.message) {
		promise.message === 'invalid email' ? invalid_email.set(true) : invalid_password.set(true);
		return;
	}

	s = promise[0];

	if (s === null) return;

	session.set(s);

	window.localStorage.removeItem('session');

	window.localStorage.setItem('session', JSON.stringify(s));

	MakeCheckMarkLotieVisible();

	const getPageOrigin = page.subscribe((value) => {
		origin = value.url.origin;
	});

	getPageOrigin();

	setTimeout(() => {
		goto(`${origin}/appv1/my_links`);
	}, 3000);
}
