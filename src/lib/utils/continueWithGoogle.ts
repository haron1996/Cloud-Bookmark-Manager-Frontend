import { goto } from '$app/navigation';
import { session, apiURL, successMessage } from '../../stores/stores';
import type { Session } from '$lib/types/session';
import { MakeCheckMarkLotieVisible } from './showCheckMarkLottie';
import { page } from '$app/stores';
import { redirect } from '@sveltejs/kit';
import { showSuccessNotification } from './showSuccessNotification'
import { browser } from '$app/environment'

let s: Partial<Session> = {};

let origin: string;

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

	const data = await res.json();

	if (data[0] === null) return;

	s = data[0];

	session.set(s);

	window.localStorage.setItem('session', JSON.stringify(data[0]));

	//MakeCheckMarkLotieVisible();

	//successMessage.set(`You're logged in as ${s.Account?.email}`)

	//showSuccessNotification()

	// const getPageOrigin = page.subscribe((value) => {
	// 	origin = value.url.origin;
	// });

	// getPageOrigin();

	//goto(`${origin}/appv1/my_links`);

	
	window.location.reload()
}
