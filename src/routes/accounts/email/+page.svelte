<script lang="ts">
	import { goto } from '$app/navigation';
	import { createNewAccount } from '$lib/utils/createNewAccount';
	import { errors, user } from '../../../stores/stores';
	//import { loading } from '../../../stores/stores';

	function signinInstead() {
		//goto('http://localhost:5173/accounts/sign_in');
		window.location.href = '/appv1/my_links';
	}

	let loading: boolean = false;

	async function submitSignupForm() {
		loading = true;
		await createNewAccount($user);
		loading = false;
	}
</script>

<div class="content">
	<div class="container">
		<form class:email_error={$errors.includes('Email address exists')}>
			<div class="heading">
				<span class="sign_in_heading">Sign up with email</span>
				<span
					class="sign_up_heading"
					on:click|preventDefault|stopPropagation={signinInstead}
					on:keyup>Sign in instead</span
				>
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
					on:click|preventDefault|stopPropagation|once={submitSignupForm}
				>
					{#if loading}
						<div class="loader" />
					{:else}
						<span>Sign up</span>
					{/if}
				</button>
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

		.container {
			height: 80%;
			min-width: 60%;
			display: flex;
			align-items: center;
			justify-content: center;

			form {
				height: 100%;
				width: 50%;
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 1.5em;

				.heading {
					text-align: left;
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;

					span {
						font-size: 1.6rem;
						font-weight: 500;
						font-family: 'Product Sans Medium', sans-serif;
					}

					span.sign_up_heading {
						font-size: 1.3rem;
						font-family: 'Arial CE', sans-serif;
						text-decoration: underline;
						text-decoration-color: $text-color-medium;
						color: $text-color-medium;
						cursor: pointer;
						transition: all 200ms ease-in-out;

						&:hover {
							color: $text-color-regular;
							text-decoration-color: $yellow;
						}
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
						gap: 0.2em;

						label {
							font-size: 1.3rem;
							font-family: 'Arial CE', sans-serif;
							color: $text-color-regular;
						}

						input[type='text'] {
							padding: 0.5em;
							border: 0.1rem solid $border-color-regular;
							outline: none;
							transition: all 200ms ease-in-out;
							font-family: 'Product Sans Medium', sans-serif;
							color: $text-color-regular;

							&::placeholder {
								color: $text-color-medium;
								font-family: 'Arial CE', sans-serif;
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
							font-family: 'Product Sans Medium', sans-serif;

							&::placeholder {
								color: $text-color-medium;
								font-family: 'Arial CE', sans-serif;
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
						gap: 0.2em;

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

							&::placeholder {
								color: $text-color-medium;
								font-family: 'Arial CE', sans-serif;
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
						padding: 0.5em 0;
						cursor: pointer;
						background-color: $yellow;
						transition: all 200ms ease-in-out;
						min-height: 4rem;
						display: flex;
						align-items: center;
						justify-content: center;

						span {
							font-size: 1.5rem;
							color: $text-color-regular;
							font-family: 'Arial CE', sans-serif;
						}

						.loader {
							border: 0.2rem solid #f3f3f3; /* Light grey */
							border-top: 0.2rem solid rgb(16, 143, 100); /* Blue */
							border-right: 0.2rem solid rgb(16, 143, 100); /* Blue */
							border-left: 0.2rem solid rgb(16, 143, 100); /* Blue */
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
							box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset,
								rgba(0, 0, 0, 0.9) 0px 0px 0px 1px;
						}
					}

					.disabled {
						pointer-events: none;
						background-color: rgb(239, 239, 239) !important;
					}

					.loading {
						pointer-events: none;
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
