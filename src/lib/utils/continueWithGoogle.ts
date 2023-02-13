import { goto } from '$app/navigation';
import { session, apiURL } from '../../stores/stores';
import type { Session } from '$lib/types/session';
import { MakeCheckMarkLotieVisible } from './showCheckMarkLottie';

let s: Partial<Session> = {};

let baseURL = '';

export async function continueWithGoogle(v: any) {
	const unsub = apiURL.subscribe((value) => {
		baseURL = value;
	});

	unsub();

	const url = `${baseURL}/public/continueWithGoogle`;

	const res = await fetch(url, {
		method: 'POST',
		mode: 'cors',
		referrerPolicy: 'no-referrer-when-downgrade',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name: v.name,
			email: v.email,
			picture: v.picture
		})
	});

	console.log(res);

	const data = await res.json();

	if (data[0] === null) return;

	s = data[0];

	session.set(s);

	window.localStorage.setItem('session', JSON.stringify(data[0]));

	MakeCheckMarkLotieVisible();

	window.location.href = '/appv1/my_links';

	setTimeout(() => {
		window.location.href = '/appv1/my_links';
	}, 3000);
}
