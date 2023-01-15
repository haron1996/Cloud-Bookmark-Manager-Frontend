<script lang="ts">
	import { goto } from '$app/navigation';

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
				<span class="sign_in_heading">Sign in with email</span>
				<span
					class="sign_up_heading"
					on:click|preventDefault|stopPropagation={signupInstead}
					on:keyup>Sign up instead</span
				>
			</div>
			<div class="inputs">
				<div class="email">
					<label for="email">Email address</label>
					<input type="email" name="email" id="email" placeholder="Enter your email address" />
				</div>
				<div class="password">
					<label for="password">Password</label>
					<input type="password" name="password" id="password" placeholder="Enter your password" />
				</div>
			</div>
			<div class="button">
				<button type="submit">
					<span>Sign in</span>
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
		backdrop-filter: blur(2px);

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
						transition: all 200ms ease-in-out;

						span {
							font-size: 1.5rem;
							color: $text-color-regular;
							font-family: 'Arial CE', sans-serif;
						}

						&:hover {
							background-color: $yellow;
						}
					}
				}
			}
		}
	}
</style>
