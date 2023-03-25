import { goto } from '$app/navigation';
import {
	apiURL,
	accessToken,
	session,
	invalid_email,
	invalid_password,
	showCheckMarkLottie,
	loggedInAs,
	successMessage
} from '../../stores/stores';
import type { Session } from '$lib/types/session';
import { MakeCheckMarkLotieVisible } from './showCheckMarkLottie';
import { page } from '$app/stores';
import { showSuccessNotification } from './showSuccessNotification'
import { browser } from '$app/environment'

let s: Partial<Session> = {};

let origin: string;

let baseURL = '';

let el: HTMLDivElement | null;

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

	//MakeCheckMarkLotieVisible();
	if (s.Account?.email) {
		loggedInAs.set(s.Account?.email)
	}
	
	//showLoginSuccessfulNotif()
	
	//successMessage.set(`You're logged in as ${s.Account?.email}`)

	//showSuccessNotification()

	const getPageOrigin = page.subscribe((value) => {
		origin = value.url.origin;
	});

	getPageOrigin();

	
	//goto(`${origin}/appv1/my_links`);

	window.location.replace(`${origin}/appv1/my_links`)
}

function showLoginSuccessfulNotif() {
	showNotif();

	setTimeout(() => {
		hideNotif();
	}, 6000);
}

function showNotif() {
	el = document.getElementById('login_successful') as HTMLDivElement | null;

	if (el === null) return;

	el.classList.add('show_login_successful_notification');
}

function hideNotif() {
	el = document.getElementById('login_successful') as HTMLDivElement | null;

	if (el === null) return;

	el.classList.remove('show_login_successful_notification');
}
