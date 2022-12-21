<script lang="ts">
	import { loading } from '../../stores/stores';
</script>

{#if $loading}
	<div class="loader_container">
		<div class="loader" />
	</div>
{/if}

<style lang="scss">
	.loader_container {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;
		//background-color: white;
		//backdrop-filter: blur(1px);

		.loader {
			border: 0.2rem solid #f3f3f3;
			border-top: 0.2rem solid #3498db;
			border-radius: 50%;
			width: 3rem;
			height: 3rem;
			animation: spin 0.5s linear infinite;
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
