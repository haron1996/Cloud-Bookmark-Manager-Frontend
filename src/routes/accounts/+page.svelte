<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';

	afterNavigate(async () => {
		await goto('http://localhost:5173/accounts/sign_in');
	});
</script>
