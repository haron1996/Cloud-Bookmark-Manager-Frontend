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

	function closeEmailVerificationWarningPopup() {
		let el: HTMLElement | null | undefined;

		el = window.event?.currentTarget as HTMLElement | null | undefined;

		el = el?.closest('.verify_email_warning') as HTMLDivElement | null;

		if (el) {
			el.classList.remove('show_verify_email_warning');
		}
	}
</script>

<!-- {#if !$loading && !$session.Account?.email_verified} -->
<div class="verify_email_warning" id="verify_email_warning">
	<span>Verify your email to receive the activity and other important emails.</span>
	<div class="button" on:click|preventDefault|stopPropagation={handleSendOtp} on:keyup>
		<span>Verify now</span>
	</div>
	<i
		class="las la-times"
		on:click|preventDefault|stopPropagation={closeEmailVerificationWarningPopup}
		on:keyup
	/>
</div>

<!-- {/if} -->
<style lang="scss">
	.verify_email_warning {
		min-width: max-content;
		padding: 1em;
		background-color: #fff4cf;
		display: flex;
		align-items: center;
		gap: 1em;
		position: absolute;
		bottom: 0.5em;
		left: 50%;
		-webkit-transform: translateX(-50%);
		transform: translateX(-50%);
		z-index: 6000;
		border: 0.1rem solid #ffb200;
		border-radius: 0.3rem;
		display: none;
		box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,
			rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;

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

	:global(.show_verify_email_warning) {
		display: flex !important;
	}

	:global(.hide_verify_email_warning) {
		display: none !important;
	}
</style>
