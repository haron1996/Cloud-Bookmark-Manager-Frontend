<script context="module" lang="ts">
	import { decodeJwt } from '$lib/utils/decodejwt';
	import { continueWithGoogle } from '$lib/utils/continueWithGoogle';

	// declare module globalThis {
	// 	var handleToken: (response: Object) => void;
	// }
</script>

<script lang="ts">
	globalThis.handleToken = async (response: any) => {
		const v = decodeJwt(response.credential);

		await continueWithGoogle(v);
	};
</script>

<body>
	<div
		id="g_id_onload"
		data-client_id="459207285092-ft93uvlaq38cncinc24kv53uicajmueh.apps.googleusercontent.com"
		data-context="signin"
		data-callback="handleToken"
		data-auto_select="true"
		data-itp_support="true"
		data-auto_prompt="true"
	/>

	<script src="https://accounts.google.com/gsi/client" async defer></script>
</body>
