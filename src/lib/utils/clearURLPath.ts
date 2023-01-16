import { page } from '$app/stores';

let urlOrigin: string = '';

export function clearURLPath(): string {
	const unsubscribe = page.subscribe((value) => {
		urlOrigin = value.url.origin;
	});

	unsubscribe();

	return urlOrigin;
}
