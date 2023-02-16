import { Session } from '$lib/types/session';
import {
	accessToken,
	session,
	showCheckMarkLottie,
	showOtpModal,
	apiURL
} from '../../stores/stores';
import { MakeCheckMarkLotieVisible } from './showCheckMarkLottie';

let s: Session;
let baseUrl: string;

export const VerifyOTP = async (otp: string, s: Session) => {
	const unsubscribe = apiURL.subscribe((value) => {
		baseUrl = value;
	});

	unsubscribe();

	const response = await fetch(`${baseUrl}/public/verifyOTP`, {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'include', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer${s.access_token}`
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify({
			email: s.Account.email,
			code: otp
		}) // body data type must match "Content-Type" header
	});

	const data = await response.json();

	if (data.message) {
		// handle this error
		console.log(data.message);
		return;
	}

	s = data[0];

	if (s === null) return;

	session.set(s);

	window.localStorage.removeItem('session');

	window.localStorage.setItem('session', JSON.stringify(s));

	showOtpModal.set(false);

	MakeCheckMarkLotieVisible();

	const el = document.getElementById('verify_email_warning') as HTMLDivElement | null;

	if (el) {
		el.classList.remove('show_verify_email_warning');
	}
};
