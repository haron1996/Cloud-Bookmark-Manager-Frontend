<script lang="ts">
	import { goto } from '$app/navigation';
	import { createNewAccount } from '$lib/utils/createNewAccount';
	import { stop_propagation } from 'svelte/internal';
	import { apiURL, errors, user } from '../../../stores/stores';
	//import { loading } from '../../../stores/stores';

	function signinInstead() {
		//goto('http://localhost:5173/accounts/sign_in');
		window.location.href = '/accounts/sign_in';
	}

	let loading: boolean = false;

	async function submitSignupForm() {
		loading = true;
		await createNewAccount($user);
		loading = false;
	}
</script>

<svelte:head>
	<title>Sign Up | Bookmark Bucket</title>
</svelte:head>

<div class="content">
	<div class="container">
		<form class:email_error={$errors.includes('Email address exists')}>
			<div class="heading">
				<h3 class="sign_in_heading">Create your free account</h3>
			</div>
			<div class="inputs">
				<div class="name">
					<label for="name">Full name</label>
					<input
						type="text"
						name="name"
						id="name"
						placeholder="Enter your full name"
						bind:value={$user.full_name}
					/>
				</div>
				<div class="email">
					<label for="email">Email address</label>
					<input
						type="email"
						name="email"
						id="email"
						placeholder="Enter your email address"
						bind:value={$user.email_address}
					/>
				</div>
				<div class="password">
					<label for="password">Password</label>
					<input
						type="password"
						name="password"
						id="password"
						placeholder="Enter your password"
						bind:value={$user.password}
						on:contextmenu|stopPropagation={stop_propagation}
					/>
				</div>
			</div>
			<div class="button">
				<button
					type="submit"
					class:disabled={$user.email_address === undefined ||
						$user.full_name === undefined ||
						$user.password === undefined ||
						$user.password.length < 6}
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
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		overflow: auto;
		display: flex;
		align-items: center;
		justify-content: center;
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
							box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
								rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
								rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
						}
					}

					.disabled {
						pointer-events: auto;
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
			}

			.email_error {
				.inputs {
					.email {
						label {
							color: #d61c4e;
						}

						input[type='email'] {
							border-color: #d61c4e;
						}
					}
				}
			}
		}
	}
</style>
