<script context="module" lang="ts">
	import { decodeJwt } from '$lib/utils/decodejwt';
	import { continueWithGoogle } from '$lib/utils/continueWithGoogle';

	declare module globalThis {
		var handleToken: (response: Object) => void;
	}

	globalThis.handleToken = async (response: any) => {
		const v = decodeJwt(response.credential);

		console.log(v);

		await continueWithGoogle(v);
	};
</script>

<body>
	<div
		id="g_id_onload"
		data-client_id="459207285092-4bjlivofrpo73pgv4v2g6cimlu40pk98.apps.googleusercontent.com"
		data-context="signup"
		data-callback="handleToken"
		data-auto_select="true"
		data-itp_support="true"
	/>
	<!-- <div
		id="g_id_onload"
		data-client_id="459207285092-4bjlivofrpo73pgv4v2g6cimlu40pk98.apps.googleusercontent.com"
		data-context="signup"
		data-ux_mode="popup"
		data-callback="handleToken"
		data-auto_prompt="false"
	/>

	<div
		class="g_id_signin"
		data-type="standard"
		data-shape="rectangular"
		data-theme="filled_blue"
		data-text="signup_with"
		data-size="large"
		data-logo_alignment="left"
	/> -->

	<script src="https://accounts.google.com/gsi/client" async defer></script>
</body>
