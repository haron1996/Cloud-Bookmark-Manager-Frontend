<script lang="ts">
	import { successNotifVisible } from '../../stores/stores';
</script>

{#if $successNotifVisible}
	<div class="success_notif">
		<div class="check">
			<svg
				width="24px"
				height="24px"
				stroke-width="1.5"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				color="#000000"
				><path
					d="M5 13l4 4L19 7"
					stroke="#000000"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</div>
		<span>Your link is being added 💪</span>
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
	.success_notif {
		position: fixed;
		right: 3em;
		top: 14vh;
		width: max-content;
		min-height: 9rem;
		padding: 1em;
		border: 0.2rem solid #6bcb77;
		background-color: white;
		background-color: #e1ffb1;
		min-width: 40rem;
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
		transition: background-color 200ms ease-in-out;
		animation: animate_notif 200ms ease-in-out;

		.check {
			height: 2rem;
			width: 2rem;
			border-radius: 100%;
			background-color: #6bcb77;
			background-color: green;
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			top: -1em;
			left: -1em;

			svg {
				path {
					stroke: white;
				}
			}
		}

		span {
			font-size: 1.4rem;
			font-family: 'Arial CE', sans-serif;
			color: #6bcb77;
			color: green;
		}

		svg.cancel {
			height: 2rem;
			width: 2rem;
			cursor: pointer;

			path {
				stroke: #6bcb77;
				stroke: green;
			}
		}

		&:hover {
			background-color: $gray;
			background-color: #c7f2a4;
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
