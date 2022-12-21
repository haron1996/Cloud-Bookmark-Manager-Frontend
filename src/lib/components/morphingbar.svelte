<script lang="ts">
	import { loading } from '../../stores/stores';
</script>

<div class="container">
	<svg
		id="loading-bar"
		xmlns="http://www.w3.org/2000/svg"
		width="36"
		height="22"
		viewBox="0 0 36 22"
	>
		<g>
			<rect id="loading-bar-left" width="8" height="22" />
			<rect id="loading-bar-middle" width="8" height="22" x="14" />
			<rect id="loading-bar-right" width="8" height="22" x="28" />
		</g>
	</svg>
</div>

<style lang="scss">
	.container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 26;
		backdrop-filter: brightness(50%);

		#loading-bar {
			&-left {
				animation: loading-bar-morph 1s linear 0.1s infinite;
				transform-origin: center;
			}
			&-middle {
				animation: loading-bar-morph 1s linear 0.2s infinite;
				transform-origin: center;
			}
			&-right {
				animation: loading-bar-morph 1s linear 0.4s infinite;
				transform-origin: center;
			}

			@keyframes loading-bar-morph {
				0% {
					transform: scaleY(1);
				}
				25% {
					transform: scaleY(0.3);
				}
				50% {
					transform: scaleY(0.7);
				}
				75% {
					transform: scaleY(0.15);
				}
			}
		}
	}
</style>
