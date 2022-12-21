import type { newUser } from '$lib/types/newUser';
import type { Session } from '$lib/types/session';
import { accessToken, errors, session, user } from '../../stores/stores';
import { goto } from '$app/navigation';

let s: Partial<Session> = {};

export async function createNewAccount(a: Partial<newUser>) {
	const response = await fetch('http://localhost:5000/public/account/create', {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		// credentials: 'include', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json'
			// authorization: `Bearer${JSON.parse(getSession()).access_token}`
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify({
			full_name: a.full_name,
			email_address: a.email_address,
			password: a.password
		}) // body data type must match "Content-Type" header
	});

	try {
		const data = await response.json();

		if (data.message) {
			errors.update((values) => ['Email address exists', ...values]);
			// user.set({});
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

		goto('http://localhost:5173/auth/thankyou');
	} catch (error) {
		console.log(error);
	}
}
