<script lang="ts">
	import { continueWithGoogle } from '$lib/utils/continueWithGoogle';
	import { decodeJwt } from '$lib/utils/decodejwt';

	globalThis.handleCredentialResponse = async (response: any) => {
		const v = decodeJwt(response.credential);

		await continueWithGoogle(v);
	};
</script>

<body>
	<div
		id="g_id_onload"
		data-client_id="459207285092-ft93uvlaq38cncinc24kv53uicajmueh.apps.googleusercontent.com"
		data-context="signup"
		data-ux_mode="popup"
		data-callback="handleCredentialResponse"
		data-auto_select="false"
		data-itp_support="false"
		data-auto_prompt="false"
	/>

	<div
		class="g_id_signin"
		data-type="icon"
		data-shape="square"
		data-theme="filled_white"
		data-text="continue_with"
		data-size="large"
	/>

	<script src="https://accounts.google.com/gsi/client" async defer></script>
</body>
