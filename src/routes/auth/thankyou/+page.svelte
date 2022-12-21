<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';

	afterNavigate(() => {
		setTimeout(() => {
			goto('http://localhost:5173/appv1/my_links');
		}, 3000);
	});
</script>

<div class="thankyou">
	<div class="container">
		<h1>Thank you for choosing 6k.plus! 🔥</h1>
		<div class="loading-bar-container">
			<span>Setting up your account...</span>
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
	</div>
</div>

<style lang="scss">
	.thankyou {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		.container {
			width: 60%;
			height: 60%;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 2em;

			h1 {
				font-family: 'Product Sans Medium', sans-serif;
				color: $text-color-regular;
			}

			.loading-bar-container {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 1em;

				span {
					font-size: 1.4rem;
					font-family: 'Arial CE', sans-serif;
					color: $text-color-regular;
				}

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
		}
	}
</style>
