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
		data-login_uri="handleCredentialResponse"
		data-auto_select="true"
		data-itp_support="true"
	/>

	<div
		class="g_id_signin"
		data-type="standard"
		data-shape="rectangular"
		data-theme="filled_blue"
		data-text="signin_with"
		data-size="large"
		data-logo_alignment="left"
		data-width="400"
	/>
	<script src="https://accounts.google.com/gsi/client" async defer></script>
</body>
