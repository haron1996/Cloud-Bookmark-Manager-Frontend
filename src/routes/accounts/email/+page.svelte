<script lang="ts">
	import { goto } from '$app/navigation';
	import { EmailAddressIsValid } from '$lib/utils/checkIfEmailIsValid';
	import { createNewAccount } from '$lib/utils/createNewAccount';
	import { stop_propagation } from 'svelte/internal';
	import { user, email_exists } from '../../../stores/stores';
	import Mainnav from '$lib/components/mainnav.svelte';
	import Googlebutton from '$lib/components/googlebutton.svelte';

	let nameIsEmpty: boolean = false;
	let emailIsEmpty: boolean = false;
	let passwordIsEmpty: boolean = false;
	let passwordIsShort: boolean = false;
	let emailIsValid: boolean = true;

	function signinInstead() {
		//goto('http://localhost:5173/accounts/sign_in');
		window.location.href = '/accounts/sign_in';
	}

	let loading: boolean = false;

	async function submitSignupForm() {
		if ($user.password) {
			if ($user.password?.length < 6) {
				passwordIsShort = true;
				return;
			}
		} else {
			passwordIsEmpty = true;
			return;
		}

		if ($user.email_address && $user.password && $user.full_name === undefined) {
			nameIsEmpty = true;
			return;
		} else if ($user.full_name && $user.password) {
			if ($user.email_address === undefined || $user.email_address === '') {
				emailIsEmpty = true;
				return;
			} else {
				if (!EmailAddressIsValid($user.email_address)) {
					emailIsValid = false;
					return;
				}
			}
		} else if ($user.full_name && $user.email_address && $user.password === undefined) {
			passwordIsEmpty = true;
			return;
		} else if (
			$user.full_name === undefined &&
			$user.email_address === undefined &&
			$user.password === undefined
		) {
			nameIsEmpty = true;
			emailIsEmpty = true;
			passwordIsEmpty = true;
			return;
		}

		loading = true;

		await createNewAccount($user);

		loading = false;
	}
</script>

<svelte:head>
	<title>Sign Up | Bookmark Bucket</title>
</svelte:head>

<Googlebutton />

<div class="content">
	<Mainnav />
	<div class="container">
		<form>
			<div class="heading">
				<h3 class="sign_in_heading">Create your free account</h3>
			</div>
			<div class="inputs">
				<div class="name" class:name_required={nameIsEmpty}>
					<label for="name">Full name</label>
					<input
						type="text"
						name="name"
						id="name"
						placeholder="Enter your full name"
						bind:value={$user.full_name}
					/>
					<span>Required</span>
				</div>
				<div
					class="email"
					class:email_required={emailIsEmpty}
					class:email_exists={$email_exists}
					class:email_invalid={!emailIsValid}
				>
					<label for="email">Email address</label>
					<input
						type="email"
						name="email"
						id="email"
						placeholder="Enter your email address"
						bind:value={$user.email_address}
					/>
					{#if emailIsEmpty}
						<span class="email_required">Required</span>
					{/if}
					<span class="email_exists">Exists</span>
					{#if !emailIsValid}
						<span class="email_invalid">Invalid</span>
					{/if}
				</div>
				<div
					class="password"
					class:password_required={passwordIsEmpty}
					class:short_pass={passwordIsShort}
				>
					<label for="password">Password</label>
					<input
						type="password"
						name="password"
						id="password"
						placeholder="Enter your password"
						bind:value={$user.password}
						on:contextmenu|stopPropagation={stop_propagation}
					/>
					{#if passwordIsEmpty}
						<span class="password_required">Required</span>
					{/if}
					{#if passwordIsShort}
						<span class="password_length_error">Must be at least 6 characters long</span>
					{/if}
				</div>
			</div>
			<div class="button">
				<button
					type="submit"
					class:loading
					on:click|preventDefault|stopPropagation={submitSignupForm}
				>
					{#if loading}
						<div class="loader" />
					{:else}
						<span>Create my free account</span>
					{/if}
				</button>
			</div>
			<div class="sign_in_instead">
				<span
					class="sign_up_heading"
					on:click|preventDefault|stopPropagation={signinInstead}
					on:keyup>Already have an account? Sign in to your account</span
				>
			</div>
		</form>
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
		background-color: white;
		justify-content: center;

		.container {
			height: 100%;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: transparent;

			form {
				min-height: max-content;
				width: 40rem;
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 2em;
				background-color: transparent;

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
					gap: 1em;

					.name {
						display: flex;
						flex-direction: column;
						gap: 0.4em;

						label {
							font-size: 1.3rem;
							font-weight: 500;
							font-family: 'Arial CE', sans-serif;
							color: $text-color-regular;
						}

						input[type='text'] {
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
							color: $form_error_red;
							font-size: 1.3rem;
							font-weight: 500;
							display: none;
						}
					}

					.name_required {
						input[type='text'] {
							border-color: $form_error_red;
						}

						span {
							display: inline-block;
						}
					}

					.email {
						display: flex;
						flex-direction: column;
						gap: 0.4em;

						label {
							font-size: 1.3rem;
							font-weight: 500;
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
							color: $form_error_red;
							font-size: 1.3rem;
							font-weight: 500;
							display: none;
						}
					}

					.email_required {
						input[type='email'] {
							border-color: $form_error_red;
						}

						span.email_required {
							display: inline-block;
						}
					}

					.email_exists {
						input[type='email'] {
							border-color: $form_error_red;
						}

						span.email_exists {
							display: inline-block;
						}
					}

					.email_invalid {
						input[type='email'] {
							border-color: $form_error_red;
						}

						span.email_invalid {
							display: inline-block;
						}
					}

					.password {
						display: flex;
						flex-direction: column;
						gap: 0.4em;

						label {
							font-size: 1.3rem;
							font-weight: 500;
							font-family: 'Arial CE', sans-serif;
							color: $text-color-regular;
						}

						input[type='password'] {
							padding: 0.5em;
							border: 0.1rem solid $border-color-regular;
							outline: none;
							transition: all 200ms ease-in-out;
							border-radius: 0.3rem;

							&::placeholder {
								color: $text-color-medium;
								font-family: 'Arial CE', sans-serif;
							}

							&:hover {
								box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
									rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
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
							color: $form_error_red;
							font-size: 1.3rem;
							font-weight: 500;
							display: none;
						}
					}

					.password_required {
						input[type='password'] {
							border-color: $form_error_red;
						}

						span.password_required {
							display: inline-block;
						}
					}

					.short_pass {
						input[type='password'] {
							border-color: $form_error_red;
						}

						span.password_length_error {
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
						background-color: $blue;
						transition: all 200ms ease-in-out;
						min-height: 4.5rem;
						display: flex;
						align-items: center;
						justify-content: center;
						border-radius: 0.3rem;

						span {
							font-size: 1.5rem;
							color: white;
							font-family: 'Arial CE', sans-serif;
						}

						.loader {
							border: 0.2rem solid #f3f3f3; /* Light grey */
							border-top: 0.2rem solid $green; /* Blue */
							border-right: 0.2rem solid $green; /* Blue */
							border-left: 0.2rem solid $green; /* Blue */
							border-radius: 50%;
							width: 2.5rem;
							height: 2.5rem;
							animation: spin 0.8s linear infinite;

							@keyframes spin {
								0% {
									transform: rotate(0deg);
								}
								100% {
									transform: rotate(360deg);
								}
							}
						}

						&:hover {
							filter: brightness(90%);
						}
					}

					.loading {
						pointer-events: none;
					}
				}

				.sign_in_instead {
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

				// upto large mobile screen
				@media screen and (max-width: 425px) {
					width: 95%;
				}

				// large mobile screen to tablets
				@media screen and (min-width: 426px) and (max-width: 768px) {
					width: 80%;
				}
			}

			@media screen and (max-width: 425px) {
				align-items: flex-start;
				padding-top: 2em;
			}
		}
	}
</style>
