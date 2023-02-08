<script lang="ts">
	import checkmark from '$lib/gifs/checkmark.gif';
	import { showCheckMarkLottie } from '../../stores/stores';
</script>

{#if $showCheckMarkLottie}
	<div class="wrapper">
		<div class="gif_container">
			<img src={checkmark} alt="checkmark gif" />
		</div>
	</div>
{/if}

<style lang="scss">
	.wrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 6000;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: white;
	}
</style>
