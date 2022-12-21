export function getSession(): string {
	const s = window.localStorage.getItem('session') as string;

	return s;
}
