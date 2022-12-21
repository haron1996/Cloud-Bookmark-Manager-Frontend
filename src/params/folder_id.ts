/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param: string) {
	//return /^(?=.*\d)(?=.*[a-z])[a-z_-]{33}$/.test(param);
	return /^[a-z_-]{33}$/.test(param);
}
