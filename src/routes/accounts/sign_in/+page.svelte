<script lang="ts">
	import { goto } from '$app/navigation';
	import { SignIn } from '$lib/utils/signin';
	import { stop_propagation } from 'svelte/internal';
	import { invalid_email, invalid_password } from '../../../stores/stores';

	let email: string = '';

	let password: string = '';

	let submitting: boolean = false;

	async function submitCreds() {
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

<div class="content">
	<div class="container">
		<form>
			<div class="heading">
				<h3 class="sign_in_heading">Sign in to your account</h3>
			</div>
			<div class="inputs">
				<div class="email" class:invalid_email={$invalid_email}>
					<label for="email">Email address</label>
					<input
						type="email"
						name="email"
						id="email"
						placeholder="Enter your email address"
						bind:value={email}
					/>
					<span>Invalid email</span>
				</div>
				<div class="password" class:invalid_password={$invalid_password}>
					<label for="password">Password</label>
					<input
						type="password"
						name="password"
						id="password"
						placeholder="Enter your password"
						on:contextmenu|stopPropagation={stop_propagation}
						bind:value={password}
					/>
					<span>Invalid password</span>
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
					on:keyup>Don't have an account? Create your free account.</span
				>
			</div>
		</form>
	</div>
</div>

<style lang="scss">
	.content {
		position: fixed;
		top: 0vh;
		left: 0;
		width: 100vw;
		height: 100%;
		overflow: auto;
		display: flex;
		align-items: center;
		justify-content: center;
		backdrop-filter: blur(2px);
		// background-image: url('/src/lib/images/background.png');
		// background-position: center;
		// background-repeat: no-repeat;
		// background-size: cover;

		.container {
			height: 100%;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			form {
				min-height: max-content;
				width: 27%;
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 2em;
				background-color: rgb(227, 246, 255);
				padding: 2em;
				border-radius: 0.3rem;
				box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
					rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
				border-radius: 0.3rem;
				background-color: white;

				.heading {
					text-align: left;
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;

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
					gap: 1em;

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

					.invalid_email {
						input[type='email'] {
							border-color: $form_error_red;
						}

						span {
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

					.invalid_password {
						input[type='password'] {
							border-color: $form_error_red;
						}

						span {
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
							box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
								rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
								rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
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
	}
</style>
