<script lang="ts">
	import { errorNotifVisible } from '../../stores/stores';
</script>

{#if $errorNotifVisible}
	<div class="error_notif">
		<div class="err">
			<svg
				width="24px"
				height="24px"
				stroke-width="1.5"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				color="#000000"
				><path
					d="M9 22l3-3m3-3l-3 3m0 0l-3-3m3 3l3 3M20 17.607c1.494-.585 3-1.918 3-4.607 0-4-3.333-5-5-5 0-2 0-6-6-6S6 6 6 8c-1.667 0-5 1-5 5 0 2.689 1.506 4.022 3 4.607"
					stroke="#000000"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</div>
		<span>Ouch! Something went wrong! 😞</span>
		<svg
			class="cancel"
			width="24px"
			height="24px"
			stroke-width="1.5"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			color="#000000"
			><path
				d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
				stroke="#000000"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</div>
{/if}

<style lang="scss">
	.error_notif {
		position: fixed;
		right: 3em;
		top: 14vh;
		width: max-content;
		min-height: 9rem;
		padding: 1em;
		border: 0.2rem solid rgb(235, 69, 95);
		background-color: rgb(255, 227, 225);
		min-width: 40rem;
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
		transition: background-color 200ms ease-in-out;
		animation: animate_notif 200ms ease-in-out;

		.err {
			height: 2.5rem;
			width: 2.5rem;
			border-radius: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			top: -1em;
			left: -1em;
			background-color: white;

			svg {
				path {
					stroke: rgb(235, 69, 95);
				}
			}
		}

		span {
			font-size: 1.4rem;
			font-family: 'Arial CE', sans-serif;
			color: red;
		}

		svg.cancel {
			height: 2rem;
			width: 2rem;
			cursor: pointer;

			path {
				stroke: red;
			}
		}

		&:hover {
			background-color: rgb(255, 209, 209);
		}

		@keyframes animate_notif {
			0% {
				transform: translateX(100%);
			}

			100% {
				transform: translateX(0);
			}
		}
	}
</style>
