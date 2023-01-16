import { apiURL } from '../../stores/stores';

let baseURL: string = '';

export function checkIfUserIsLoggedIn() {
	const s: string | null = window.localStorage.getItem('session');

	if (s === null) {
		window.location.href = '/accounts/sign_in';
	} else {
		const unsub = apiURL.subscribe((value) => {
			baseURL = value;
		});

		unsub();

		checkIfIsAuthenticated(s, baseURL);
	}
}

async function checkIfIsAuthenticated(s: string, baseURL: string) {
	const response = await fetch(`${baseURL}/public/checkIfIsAuthenticated`, {
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

	if (result.message !== 'true') {
		console.log(result.message);
		window.location.href = '/accounts/sign_in';
	}
}
