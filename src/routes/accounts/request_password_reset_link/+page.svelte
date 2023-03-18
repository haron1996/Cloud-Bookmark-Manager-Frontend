<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { EmailAddressIsValid } from '$lib/utils/checkIfEmailIsValid';
	import { onMount } from 'svelte';
	import { apiURL } from '../../../stores/stores';

	let email: string = '';
	let el: HTMLElement | null;
	let emailIsInvalid: boolean = false;
	let baseURL: string = '';

	onMount(async () => {
		await focusInput();
	});

	function showEmailSentNotif() {
		showNotif();

		setTimeout(() => {
			hideNotif();
		}, 4000);
	}

	function showNotif() {
		el = document.getElementById('email_sent_notification') as HTMLDivElement | null;

		if (el === null) return;

		el.classList.add('show_email_sent_notification');
	}

	function hideNotif() {
		el = document.getElementById('email_sent_notification') as HTMLDivElement | null;

		if (el === null) return;

		el.classList.remove('show_email_sent_notification');
	}

	async function focusInput() {
		el = document.getElementById('email') as HTMLInputElement | null;

		if (el) {
			el.focus();
		}
	}

	function handleEmailInputFocus() {
		emailIsInvalid = false;
	}

	async function requestPasswordResetLink(emailAddress: string) {
		const unsub = apiURL.subscribe((value) => {
			baseURL = value;
		});

		unsub();

		const response = await fetch(`${baseURL}/public/requestResetPasswordLink`, {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json'
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
			body: JSON.stringify({
				email: emailAddress
			})
		});

		try {
			const data = await response.json();

			if (data.message === 'reset password link has been sent') {
				email = '';

				showEmailSentNotif();
			} else {
				alert(data.message);
			}
		} catch (error) {
			console.log(error);
		}
	}

	async function handleSubmit() {
		if (email === '') {
			emailIsInvalid = true;
			return;
		}

		let valid: boolean = EmailAddressIsValid(email);
		if (!valid) {
			emailIsInvalid = true;
			return;
		}

		await requestPasswordResetLink(email);
	}
</script>

<div class="wrapper">
	<form>
		<div class="top">
			<h4>Request password reset link</h4>
			<p>Please enter the email address you'd like your password reset information sent to</p>
		</div>
		<div class="middle" class:invalid_email_error={emailIsInvalid}>
			<div class="input">
				<label for="email">Enter email address</label>
				<input
					type="email"
					name="email"
					id="email"
					autocomplete="off"
					required
					bind:value={email}
					spellcheck="false"
					on:focus|preventDefault|stopPropagation={handleEmailInputFocus}
					on:keyup
				/>
			</div>
			<small>Please enter a valid email address</small>
		</div>
		<div class="bottom">
			<button type="submit" on:click|preventDefault|stopPropagation={handleSubmit}>
				<span>Send me password reset link</span>
			</button>
			<a href={`${$page.url.origin}/accounts/sign_in`}> Go back to login page</a>
		</div>
	</form>
</div>

<div class="email_sent_notification" id="email_sent_notification">
	<i class="las la-check" />
	<span>Password reset details sent</span>
	<i class="las la-times" />
</div>

<style lang="scss">
	.wrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100dvw;
		height: 100dvh;
		background-color: rgb(253, 253, 189);
		display: flex;
		align-items: center;
		justify-content: center;

		form {
			min-height: max-content;
			width: 50rem;
			padding: 1.5em;
			background-color: white;
			display: flex;
			flex-direction: column;
			gap: 2em;
			border-radius: 0.5rem;
			box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

			.top {
				display: flex;
				flex-direction: column;
				gap: 0.2em;

				h4 {
					color: $text-color-dropbox;
					font-family: 'Arial CE', sans-serif;
					font-size: 1.5rem;
				}

				p {
					font-family: 'Arial CE', sans-serif;
					font-size: 1.3rem;
					color: $text-color-medium;
					line-height: 1.6;
				}
			}

			.middle {
				display: flex;
				flex-direction: column;
				gap: 0.5em;

				.input {
					display: flex;
					flex-direction: column;
					gap: 0.6em;

					label {
						font-family: 'Arial CE', sans-serif;
						color: $text-color-regular;
						font-size: 1.3rem;
					}

					input[type='email'] {
						border: 0.1rem solid $text-color-regular;
						height: 3.5rem;
						padding: 0 0.5em;
						outline-color: transparent;
						border-radius: 0.25rem;
						font-family: 'Arial CE', sans-serif;
						color: $text-color-medium;
						font-size: 1.3rem;

						&:focus-visible,
						&:hover {
							border-color: $blue;
							outline: 0.1rem dashed $blue;
							outline-offset: 0.2rem;
							border-radius: 0;
						}
					}
				}

				small {
					color: $form-error-red;
					font-family: 'Arial CE', sans-serif;
					font-size: 1.2rem;
					display: none;
				}
			}

			// middle section style when email is empty or undefined
			.invalid_email_error {
				.input {
					input[type='email'] {
						border-color: $form-error-red;
					}
				}

				small {
					display: inline-block;
				}
			}
			// end of when email is empty

			.bottom {
				display: flex;
				flex-direction: column;
				gap: 1em;

				button {
					border-color: transparent;
					padding: 0.5em 0;
					border-radius: 0.25rem;
					cursor: pointer;
					background-color: $blue;
					transition: all 100ms ease-in-out;

					span {
						font-family: 'Arial CE', sans-serif;
						color: white;
						font-size: 1.3rem;
					}

					&:hover {
						outline: 0.1rem dashed $blue;
						outline-offset: 0.2rem;
						border-radius: 0;
						filter: brightness(90%);
					}
				}

				a {
					font-family: 'Arial CE', sans-serif;
					font-size: 1.3rem;
					text-decoration: none;

					color: $blue;

					&:hover {
						text-decoration: underline;
					}
				}
			}
		}
	}

	// email sent notif
	.email_sent_notification {
		background-color: white;
		min-width: max-content;
		position: absolute;
		left: 50%;
		right: 50%;
		bottom: 1em;
		bottom: -100%;
		transform: translate(-50%, -50%);
		padding: 0 1.5em;
		height: 4rem;
		display: flex;
		align-items: center;
		gap: 1em;
		border-radius: 0.3rem;
		box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
		transition: 500ms;

		i {
			color: #03c988;
			font-size: 2rem;
		}

		span {
			font-size: 1.4rem;
			font-family: 'Arial CE', sans-serif;
			color: $text-color-dropbox;
			font-weight: 500;
		}
	}

	// show email sent notif
	:global(.show_email_sent_notification) {
		bottom: 1em !important;
	}
</style>
