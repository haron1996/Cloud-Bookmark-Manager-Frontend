export function containsSpecialChars(str: string | undefined) {
	if (str === undefined) return;

	const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
	return specialChars.test(str);
}
