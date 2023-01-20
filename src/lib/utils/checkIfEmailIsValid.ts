export function EmailAddressIsValid(email: string): boolean {
	var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

	if (email.match(validRegex)) {
		return true;
	} else {
		return false;
	}
}
