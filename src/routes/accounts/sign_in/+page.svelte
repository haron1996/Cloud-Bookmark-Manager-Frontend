<script lang="ts">
	import { goto } from '$app/navigation';
	import { SignIn } from '$lib/utils/signin';
	import { stop_propagation } from 'svelte/internal';
	import { invalid_email, invalid_password } from '../../../stores/stores';
	import Mainnav from '$lib/components/mainnav.svelte';
	import { EmailAddressIsValid } from '$lib/utils/checkIfEmailIsValid';
	import helloGif from '$lib/gifs/login-hello.gif';

	let email: string = '';

	let password: string = '';

	let submitting: boolean = false;

	let emailIsEmpty: boolean = false;

	let passwordIsEmpty: boolean = false;

	async function submitCreds() {
		if (email === '' && password === '') {
			emailIsEmpty = true;

			passwordIsEmpty = true;

			return;
		} else if (email === '' && password !== '') {
			emailIsEmpty = true;

			return;
		} else if (email !== '' && password === '') {
			passwordIsEmpty = true;
			return;
		}

		if (!EmailAddressIsValid(email)) {
			invalid_email.set(true);
			return;
		}

		submitting = true;

		await SignIn(email, password);

		submitting = false;
	}

	async function signupInstead() {
		//await goto('http://localhost:5173/accounts/email');
		window.location.href = '/accounts/email';
	}
</script>

<svelte:head>
	<title>Sign In | Bookmark Bucket</title>
</svelte:head>

<Mainnav />

<div class="content">
	<div class="container">
		<form>
			<div class="heading">
				<h3 class="sign_in_heading">Hey 👋, sign in to your account</h3>
			</div>
			<div class="inputs">
				<div class="email" class:invalid_email={$invalid_email} class:email_required={emailIsEmpty}>
					<label for="email">Email address</label>
					<input
						type="email"
						name="email"
						id="email"
						placeholder="Enter your email address"
						spellcheck="false"
						bind:value={email}
					/>
					<span class="required">Required</span>
					<span class="invalid">Invalid</span>
				</div>
				<div
					class="password"
					class:invalid_password={$invalid_password}
					class:password_required={passwordIsEmpty}
				>
					<label for="password">Password</label>
					<input
						type="password"
						name="password"
						id="password"
						placeholder="Enter your password"
						on:contextmenu|stopPropagation={stop_propagation}
						bind:value={password}
					/>
					<span class="required">Required</span>
					<span class="invalid">Invalid</span>
				</div>
			</div>
			<div class="button">
				<button type="submit" on:click|preventDefault|stopPropagation={submitCreds}>
					<span>{submitting ? 'Processing...' : 'Sign in to my account'}</span>
				</button>
			</div>
			<div class="sign_up_instead">
				<span
					class="sign_up_heading"
					on:click|preventDefault|stopPropagation={signupInstead}
					on:keyup>Don't have an account? Create my free account.</span
				>
			</div>
		</form>
	</div>
	<div class="gif">
		<img src={helloGif} alt="hello" />
	</div>
</div>

<style lang="scss">
	.content {
		position: fixed;
		top: 4.5rem;
		left: 0;
		width: 100vw;
		height: calc(100% - 4.5rem);
		overflow: auto;
		display: flex;
		align-items: center;

		.container {
			flex: 1;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			form {
				min-width: 60%;
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 3em;
				background-color: white;

				.heading {
					text-align: left;
					width: 100%;
					display: flex;
					align-items: center;

					h3 {
						font-size: 2rem;
						font-weight: 500;
						font-family: 'Product Sans Medium', sans-serif;
						color: #181d31;
					}
				}

				.inputs {
					width: 100%;
					display: flex;
					flex-direction: column;
					gap: 2em;

					.email {
						display: flex;
						flex-direction: column;
						gap: 0.2em;

						label {
							font-size: 1.3rem;
							font-family: 'Arial CE', sans-serif;
							color: $text-color-regular;
						}

						input[type='email'] {
							padding: 0.5em;
							border: 0.1rem solid $border-color-regular;
							outline: none;
							transition: all 200ms ease-in-out;
							font-family: 'Arial CE', sans-serif;
							border-radius: 0.3rem;

							&::placeholder {
								color: $text-color-medium;
								font-family: 'Arial CE', sans-serif;
							}

							&:hover {
								box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
									rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
							}

							&:focus {
								box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
									rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
							}
						}

						span {
							font-family: 'Arial CE', sans-serif;
							font-size: 1.3rem;
							font-weight: 500;
							color: $form_error_red;
							display: none;
						}
					}

					.email_required {
						input[type='email'] {
							border-color: $form_error_red;
						}

						span.required {
							display: inline-block;
						}
					}

					.invalid_email {
						input[type='email'] {
							border-color: $form_error_red;
						}

						span.invalid {
							display: inline-block;
						}
					}

					.password {
						display: flex;
						flex-direction: column;
						gap: 0.2em;
						font-family: 'Arial CE', sans-serif;

						label {
							font-size: 1.3rem;
							font-family: 'Arial CE', sans-serif;
							color: $text-color-regular;
						}

						input[type='password'] {
							padding: 0.5em;
							border: 0.1rem solid $border-color-regular;
							outline: none;
							transition: all 200ms ease-in-out;
							font-family: 'Arial CE', sans-serif;
							border-radius: 0.3rem;

							&::placeholder {
								color: $text-color-medium;
								font-family: 'Arial CE', sans-serif;
							}

							&:hover {
								box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
									rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
							}

							&:focus {
								box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
									rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
							}
						}

						span {
							font-family: 'Arial CE', sans-serif;
							font-size: 1.3rem;
							font-weight: 500;
							color: $form_error_red;
							display: none;
						}
					}

					.password_required {
						input[type='password'] {
							border-color: $form_error_red;
						}

						span.required {
							display: inline-block;
						}
					}

					.invalid_password {
						input[type='password'] {
							border-color: $form_error_red;
						}

						span.invalid {
							display: inline-block;
						}
					}
				}

				.button {
					width: 100%;

					button[type='submit'] {
						width: 100%;
						border: none;
						cursor: pointer;
						transition: all 200ms ease-in-out;
						background-color: $blue;
						border-radius: 0.3rem;
						min-height: 4.5rem;

						span {
							font-size: 1.4rem;
							color: white;
							font-family: 'Arial CE', sans-serif;
						}

						&:hover {
							filter: brightness(90%);
						}
					}
				}

				.sign_up_instead {
					width: 100%;
					text-align: left;

					span {
						font-size: 1.3rem;
						font-family: 'Arial CE', sans-serif;
						color: $text-color-medium;
						cursor: pointer;
						transition: all 200ms ease-in-out;

						&:hover {
							color: $blue;
						}
					}
				}
			}
		}

		.gif {
			flex: 1;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: white;

			img {
				object-fit: contain;
			}
		}
	}
</style>
