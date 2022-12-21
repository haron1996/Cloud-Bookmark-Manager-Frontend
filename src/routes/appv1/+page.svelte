<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';

	afterNavigate(() => {
		goto('http://localhost:5173/appv1/my_links');
	});
</script>

<div class="home" />

<style lang="scss">
	.home {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: white;
	}
</style>
