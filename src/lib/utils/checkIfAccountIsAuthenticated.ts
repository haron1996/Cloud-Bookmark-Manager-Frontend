import { goto } from '$app/navigation';

export async function checkIfIsAuthenticated() {
	const s = window.localStorage.getItem('session');

	if (s === null) {
		goto('http://localhost:5173/accounts/sign_in');
		return;
	}

	const response = await fetch('http://localhost:5000/public/checkIfIsAuthenticated', {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'omit', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json'
			//authorization: `Bearer${JSON.parse(s).access_token}`
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify({
			token: JSON.parse(s).access_token
		}) // body data type must match "Content-Type" header
	});

	const result = await response.json();

	if (result.message) {
		if (result.message === 'account not found') {
			goto('http://localhost:5173/accounts/sign_in');
			return;
		} else if (result.message === 'user not found') {
			goto('http://localhost:5173/accounts/sign_in');
			return;
		} else if (result.message === 'false') {
			//window.alert('You need to login first!');
			goto('http://localhost:5173/accounts/sign_in');
			return;
		}
	}
}
