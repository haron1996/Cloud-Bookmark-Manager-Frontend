<script lang="ts">
	import messageSentLottie from '$lib/gifs/message-sent.gif';
	import { messageSent } from '../../stores/stores';
</script>

{#if $messageSent}
	<div class="wrapper">
		<div class="gif_container">
			<img src={messageSentLottie} alt="checkmark gif" />
		</div>
	</div>
{/if}

<style lang="scss">
	.wrapper {
		position: fixed;
		top: 4.5rem;
		left: 0;
		width: 100vw;
		height: calc(100% - 4.5rem);
		z-index: 6000;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: white;

		.gif_container {
			height: 50rem;
			width: 50rem;
			display: flex;
			align-items: center;
			justify-content: center;

			img {
				object-fit: contain;
				max-inline-size: 100%;
			}
		}
	}
</style>
