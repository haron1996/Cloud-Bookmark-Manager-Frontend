import { showOtpModal } from '../../stores/stores';
import { Session } from '$lib/types/session';

export const sendOTP = async (s: Session) => {
	const response = await fetch('http://localhost:5000/public/sendOTP', {
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
			email: s.Account.email
		}) // body data type must match "Content-Type" header
	});

	const data = await response.json();

	if (data.message === 'verification code has been sent') {
		showOtpModal.set(true);
	}
};
