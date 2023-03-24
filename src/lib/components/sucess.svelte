<script lang="ts">
	import { successMessage } from '../../stores/stores';
</script>

<div class="success_notification" id="success_notification">
	<div class="check">
		<i class="las la-check" />
	</div>
	<span>{$successMessage}</span>
	<i class="las la-times" />
</div>

<style lang="scss">
	.success_notification {
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
		animation: animateMe 0.5s ease-in-out;
		display: none;
		bottom: 0;
		opacity: 0;

		.check {
			position: absolute;
			top: -0.5em;
			left: -0.5em;
			font-size: 2.5rem;
			height: 2rem;
			width: 2rem;
			border-radius: 100vh;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: rgb(0, 35, 91);
			display: none;

			i {
				color: white;
				font-size: 1.5rem;
			}
		}

		span {
			font-size: 1.3rem;
			font-family: 'Arial CE', sans-serif;
			color: white;
		}

		i.la-times {
			font-size: 1.8rem;
			color: white;
			cursor: pointer;
			display: none;
		}
	}
</style>
