<script lang="ts">
	import { loadingMessage } from '../../stores/stores';
</script>

<div class="loading_toss" id="loading_toss">
	<div class="loader" />
	<span>{$loadingMessage}</span>
</div>

<style lang="scss">
	.loading_toss {
		position: absolute;
		left: 50%;
		right: 50%;
		transform: translate(-50%, -50%);
		min-width: max-content;
		padding: 0.5em 1.5em;
		z-index: 10000;
		display: flex;
		align-items: center;
		justify-content: space-between;
		transition: all 0.5s ease-in-out;
		box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
		background-color: rgb(0, 35, 91);
		border-radius: 0.5rem;
		gap: 1em;
		bottom: -100%;

		.loader {
			border: 0.2rem solid #f3f3f3; /* Light grey */
			border-top: 0.2rem solid #3498db; /* Blue */
			border-radius: 50%;
			width: 1.5rem;
			height: 1.5rem;
			animation: spin 0.5s linear infinite;

			@keyframes spin {
				0% {
					transform: rotate(0deg);
				}
				100% {
					transform: rotate(360deg);
				}
			}
		}

		span {
			font-size: 1.3rem;
			font-family: 'Arial CE', sans-serif;
			color: white;
		}

		@keyframes animateMe {
			0% {
				opacity: 0;
			}

			100% {
				opacity: 1;
			}
		}
	}
</style>
