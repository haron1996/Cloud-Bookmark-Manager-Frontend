import { goto } from '$app/navigation';
import type { newUser } from '$lib/types/newUser';
import type { Session } from '$lib/types/session';
import { accessToken, session, apiURL, email_exists, showThankYouGif } from '../../stores/stores';

let s: Partial<Session> = {};

let baseURL = '';

export async function createNewAccount(a: Partial<newUser>) {
	const unsub = apiURL.subscribe((value) => {
		baseURL = value;
	});

	unsub();

	const response = await fetch(`${baseURL}/public/account/create`, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify({
			full_name: a.full_name,
			email_address: a.email_address,
			password: a.password
		})
	});

	try {
		const data = await response.json();

		if (data.message) {
			if (data.message === 'email already exists') {
				email_exists.set(true);
			} else {
				console.log(data.message);
			}
			return;
		}

		s = data[0];

		if (s === null) return;

		if (s.access_token) {
			accessToken.set(s.access_token);
		}

		session.set(s);

		window.localStorage.removeItem('session');

		window.localStorage.setItem('session', JSON.stringify(s));

		showThankYouGif.set(true);

		setTimeout(() => {
			showThankYouGif.set(false);
		}, 3500);

		setTimeout(() => {
			goto(`${origin}/appv1/my_links`);
		}, 3000);
	} catch (error) {
		console.log(error);
	}
}
