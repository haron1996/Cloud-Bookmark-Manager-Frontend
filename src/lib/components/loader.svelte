<script lang="ts">
	import { loading } from '../../stores/stores';
	import Loading from '$lib/gifs/loading-animation.gif';
</script>

{#if $loading}
	<div class="loader_container">
		<div class="loading-gif-container">
			<img src={Loading} alt="loading" />
		</div>
		<div class="loader" />
	</div>
{/if}

<style lang="scss">
	.loader_container {
		position: fixed;
		top: 4.5rem;
		left: 0;
		height: calc(100% - 4.5rem);
		width: 100vw;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 8000;
		background-color: white;

		.loading-gif-container {
			height: 20rem;
			width: 20rem;

			img {
				width: 100%;
				object-fit: contain;
			}
		}

		.loader {
			border: 0.2rem solid #f3f3f3;
			border-top: 0.2rem solid #3498db;
			border-radius: 50%;
			width: 3rem;
			height: 3rem;
			animation: spin 0.5s linear infinite;
			display: none;
		}

		@keyframes spin {
			0% {
				transform: rotate(0deg);
			}
			100% {
				transform: rotate(360deg);
			}
		}
	}
</style>
