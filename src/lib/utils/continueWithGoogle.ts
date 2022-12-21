import { goto } from '$app/navigation';
import { session } from '../../stores/stores';
import type { Session } from '$lib/types/session';

let s: Partial<Session> = {};

export async function continueWithGoogle(v: any) {
	const url = 'http://localhost:5000/public/account';

	const res = await fetch(url, {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name: v.name,
			email: v.email,
			picture: v.picture
		})
	});

	const data = await res.json();

	if (data[0] === null) return;

	s = data[0];

	session.set(s);

	window.localStorage.setItem('session', JSON.stringify(data[0]));

	goto('http://localhost:5173/auth/thankyou');
}
