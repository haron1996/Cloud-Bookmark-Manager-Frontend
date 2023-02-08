<script lang="ts">
	import { Session } from '$lib/types/session';
	import { getSession } from '$lib/utils/getSession';
	import { sendOTP } from '$lib/utils/sendOtp';
	import { VerifyOTP } from '$lib/utils/verifyOTP';
	import { onMount } from 'svelte';
	import { stop_propagation } from 'svelte/internal';
	import { showOtpModal, session } from '../../stores/stores';

	let otpModalIsVisible: boolean;
	//let email: string;
	let s: Session;
	let otp: string;

	const unsubscribe = () => {
		showOtpModal.subscribe((val) => {
			otpModalIsVisible = val;
		});
	};

	onMount(() => {
		unsubscribe();

		s = JSON.parse(getSession());
	});

	const hideOtpModal = () => {
		showOtpModal.set(false);
	};

	const handleSendOtp = () => {
		sendOTP(s);
	};

	const submitOTP = async () => {
		await VerifyOTP(otp, s);
	};
</script>

{#if otpModalIsVisible}
	<div class="otp_modal" on:click|preventDefault|stopPropagation={hideOtpModal} on:keyup>
		<div class="card" on:click|preventDefault|stopPropagation={stop_propagation} on:keyup>
			<div class="top">
				<p>Verify email</p>
				<i class="las la-times" on:click|preventDefault|stopPropagation={hideOtpModal} on:keyup />
			</div>
			<div class="bottom">
				<p>
					An OTP has been sent to your email (<span>{$session.Account?.email}</span>) and is valid
					for 30 minutes. Use it to verify your email.
				</p>
				<input type="text" name="otp" id="otp" placeholder="Enter OTP here" bind:value={otp} />
				<button type="submit" on:click|preventDefault|stopPropagation={submitOTP}>
					<span>Submit OTP</span>
				</button>
				<p>
					Didn't receive OTP? Check the spam folder or <span
						on:click|preventDefault|stopPropagation={handleSendOtp}
						on:keyup
						class="resend_otp">resend OTP</span
					>
				</p>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.otp_modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 7000;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(8px);

		.card {
			min-height: max-content;
			width: 40rem;
			background-color: rgb(255, 255, 255);
			border-radius: 0.6rem;
			box-shadow: $modal_box_shadow;
			display: flex;
			flex-direction: column;
			padding: 1.5em;
			animation: animate_card 0.5s ease-in-out;
			gap: 2em;
			animation: animate_card 0.5s ease-in;

			.top {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: space-between;
				//padding: 1em 0;

				p {
					font-size: 1.5rem;
					font-family: 'Arial CE', sans-serif;
					color: $text-color-dropbox;
				}

				i {
					font-size: 1.5rem;
					color: $text-color-medium;
					cursor: pointer;
					transition: color 200ms ease-in-out;

					&:hover {
						color: $text-color-dropbox;
					}
				}
			}

			.bottom {
				flex: 5;
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;
				gap: 1em;

				p {
					font-size: 1.3rem;
					font-family: 'Arial CE', sans-serif;
					color: $text-color-medium;

					span {
						text-decoration: underline;
					}

					span.resend_otp {
						cursor: pointer;
						transition: color 200ms ease-in-out;

						&:hover {
							color: $blue;
						}
					}
				}

				input[type='text'] {
					outline: none;
					border: 0.1rem solid $border-color-regular;
					padding: 0.5em;
					border-radius: 0.3rem;
					font-family: 'Arial CE', sans-serif;
					font-size: 1.3rem;
					letter-spacing: 0.2rem;

					&::placeholder {
						color: $text-color-medium;
						font-family: 'Arial CE', sans-serif;
						font-size: 1.3rem;
						letter-spacing: normal;
					}

					&:focus {
						border-color: $blue;
					}
				}

				button[type='submit'] {
					padding: 0.5em 0;
					border: 0.1rem solid $blue;
					background-color: $blue;
					border-radius: 0.3rem;
					cursor: pointer;
					filter: brightness(100%);
					transition: all 200ms ease-in-out;

					span {
						color: white;
						font-size: 1.5rem;
						font-family: 'Arial CE', sans-serif;
					}

					&:hover {
						filter: brightness(80%);
					}
				}
			}

			@keyframes animate_card {
				0% {
					transform: translateY(-50px);
					opacity: 0;
				}

				100% {
					transform: translateY(0);
					opacity: 1;
				}
			}
		}
	}
</style>
