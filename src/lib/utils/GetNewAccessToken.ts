import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { Session } from '$lib/types/session';
import { redirect } from '@sveltejs/kit';
import { apiURL } from '../../stores/stores';

let apiEndPoint: string;
let ses: Partial<Session>;

export const GetNewAccessToken = async (fetch: any, url: any): Promise<Partial<Session>> => {
	const getApiEndpoint = apiURL.subscribe((value) => {
		apiEndPoint = value;
	});

	getApiEndpoint();

	const response = await fetch(`${apiEndPoint}/public/refreshToken`, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'include',
		redirect: 'follow',
		referrerPolicy: 'no-referrer'
	});

	const data = await response.json();

	if (data.message) {
		//alert(data.message);

		throw redirect(302, `${url.origin}/accounts/sign_in`);
	}

	ses = data[0];

	return ses;
};
