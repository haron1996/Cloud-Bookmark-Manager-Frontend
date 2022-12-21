<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		goto('http://localhost:5173/appv1/settings/my_profile');
	});
</script>
