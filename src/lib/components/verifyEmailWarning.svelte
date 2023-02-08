<script lang="ts">
	import { getSession } from '$lib/utils/getSession';
	import { Session } from '$lib/types/session';
	import { onMount } from 'svelte';
	import { sendOTP } from '$lib/utils/sendOtp';
	import { session, loading } from '../../stores/stores';

	let s: Session;

	onMount(() => {
		s = JSON.parse(getSession());
	});

	const handleSendOtp = () => {
		sendOTP(s);
	};
</script>

{#if !$loading && !$session.Account?.email_verified}
	<div class="verify_email_warning">
		<span>Verify your email to receive the activity and other important emails.</span>
		<div class="button" on:click|preventDefault|stopPropagation={handleSendOtp} on:keyup>
			<span>Verify now</span>
		</div>
		<i class="las la-times" />
	</div>
{/if}

<style lang="scss">
	.verify_email_warning {
		min-width: max-content;
		padding: 1em;
		background-color: #fff4cf;
		display: flex;
		align-items: center;
		gap: 1em;
		box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
		position: absolute;
		bottom: 0.5em;
		left: 50%;
		-webkit-transform: translateX(-50%);
		transform: translateX(-50%);
		z-index: 6000;
		border: 0.1rem solid #ffb200;
		border-radius: 0.3rem;

		span {
			font-size: 1.3rem;
			font-family: 'Arial CE', sans-serif;
			color: $text-color-regular;
		}

		.button {
			background-color: #277bc0;
			padding: 0.2em 0.5em;
			min-width: max-content;
			border-radius: 0.3rem;
			cursor: pointer;

			span {
				color: white;
			}
		}

		i {
			font-size: 1.6rem;
			cursor: pointer;
		}
	}
</style>
