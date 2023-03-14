// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {}

declare namespace globalThis {
	var handleToken: (response: Object) => void;
}

declare namespace globalThis {
	var handleCredentialResponse: (response: Object) => void;
}