<script lang="ts">
	import thankyou from '$lib/gifs/thank-you.gif';
	import { showThankYouGif } from '../../stores/stores';
</script>

{#if $showThankYouGif}
	<div class="wrapper">
		<img src={thankyou} alt="checkmark gif" />
	</div>
{/if}

<style lang="scss">
	.wrapper {
		position: fixed;
		top: 4.5rem;
		left: 0;
		width: 100vw;
		height: calc(100% - 4.5rem);
		z-index: 7000;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: white;

		img {
			object-fit: contain;
		}
	}
</style>
