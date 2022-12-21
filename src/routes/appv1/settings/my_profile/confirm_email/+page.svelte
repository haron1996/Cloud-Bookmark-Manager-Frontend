<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import GmaiLogo from '$lib/images/gmail.png';
	import OutlookLogo from '$lib/images/outlook.png';
	import HeyLogo from '$lib/images/hey-logo.png';

	let email: string = '';

	afterNavigate(() => {
		const newEmail = sessionStorage.getItem('new_email');

		if (newEmail === null) return;

		email = newEmail;
	});
</script>

<div class="confirm_email">
	<form>
		<div class="title">
			<p>Check <span>{email}</span> for a code</p>
		</div>
		<div class="input">
			<label for="code">Email verification code</label>
			<input
				type="text"
				name="code"
				id="code"
				placeholder="Enter the code here"
				autocomplete="off"
			/>
		</div>
		<button>
			<span>Verify email address</span>
		</button>
		<div class="mail_clients">
			<div class="gmail">
				<div class="gmail_logo">
					<img src={GmaiLogo} alt="" />
				</div>
				<span>Open Gmail</span>
			</div>
			<div class="outlook">
				<div class="outlook_logo">
					<img src={OutlookLogo} alt="" />
				</div>
				<span>Open Outlook</span>
			</div>
			<div class="hey">
				<div class="hey_logo">
					<img src={HeyLogo} alt="" />
				</div>
				<span>Open Hey</span>
			</div>
		</div>
		<div class="check_spam">
			<span>Can't find your code? Check your spam folder!</span>
		</div>
	</form>
</div>

<style lang="scss">
	.confirm_email {
		position: fixed;
		top: 7vh;
		left: 20%;
		height: calc(100vh - 7vh);
		max-height: calc(100vh - 7vh);
		width: calc(100% - 20%);
		max-width: calc(100% - 20%);
		overflow: auto;

		form {
			width: 100%;
			height: 100%;
			padding: 2em;
			display: flex;
			flex-direction: column;
			gap: 1.5em;

			.title {
				display: flex;
				align-items: center;
				width: 100%;

				p {
					font-size: 1.2rem;
					font-family: 'Product Sans Medium', sans-serif;
					color: $text-color-regular;
					text-transform: uppercase;

					span {
						font-size: 1.2rem;
						font-family: 'Product Sans Medium', sans-serif;
						color: $text-color-regular;
						text-decoration: underline;
					}
				}
			}

			.input {
				display: flex;
				flex-direction: column;
				gap: 0.3em;

				label {
					font-size: 1.3rem;
					font-family: 'Arial CE', sans-serif;
					color: $text-color-regular;
				}

				input[type='text'] {
					border: 0.1rem solid $border-color-regular;
					outline: none;
					padding: 0.5em;
					font-family: 'Arial CE', sans-serif;
					color: $text-color-regular;
					background-color: rgb(239, 243, 246);
					transition: all 200ms ease-in-out;

					&:hover {
						box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
					}

					&:focus {
						box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
					}
				}
			}

			button {
				border: none;
				background-color: $blue;
				width: 20%;
				padding: 0.5em;
				cursor: pointer;
				transition: all 200ms ease-in-out;

				span {
					font-size: 1.3rem;
					font-family: 'Product Sans Medium', sans-serif;
					font-weight: 500;
					color: white;
				}

				&:hover {
					box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset,
						rgba(0, 0, 0, 0.9) 0px 0px 0px 1px;
				}
			}

			.mail_clients {
				display: flex;
				align-items: center;
				gap: 2em;

				.gmail {
					display: flex;
					align-items: center;
					gap: 0.5em;
					cursor: pointer;

					.gmail_logo {
						height: 2.5rem;
						width: 2.5rem;
						display: flex;
						align-items: center;
						justify-content: center;

						img {
							height: 100%;
							width: 100%;
							object-fit: contain;
						}
					}

					span {
						font-family: 'Arial CE', sans-serif;
						text-decoration: underline;
						text-decoration-color: transparent;
						color: $text-color-medium;
						font-size: 1.2rem;
					}

					&:hover {
						span {
							color: $text-color-regular;
							text-decoration-color: $text-color-regular;
						}
					}
				}

				.outlook {
					display: flex;
					align-items: center;
					gap: 0.5em;
					cursor: pointer;

					.outlook_logo {
						height: 2.5rem;
						width: 2.5rem;
						display: flex;
						align-items: center;
						justify-content: center;

						img {
							height: 100%;
							width: 100%;
							object-fit: contain;
						}
					}

					span {
						font-family: 'Arial CE', sans-serif;
						text-decoration: underline;
						text-decoration-color: transparent;
						color: $text-color-medium;
						font-size: 1.2rem;
					}

					&:hover {
						span {
							color: $text-color-regular;
							text-decoration-color: $text-color-regular;
						}
					}
				}

				.hey {
					display: flex;
					align-items: center;
					gap: 0.5em;
					cursor: pointer;

					.hey_logo {
						height: 4rem;
						width: 4rem;
						display: flex;
						align-items: center;
						justify-content: center;

						img {
							height: 100%;
							width: 100%;
							object-fit: contain;
						}
					}

					span {
						font-family: 'Arial CE', sans-serif;
						text-decoration: underline;
						text-decoration-color: transparent;
						color: $text-color-medium;
						font-size: 1.2rem;
					}

					&:hover {
						span {
							color: $text-color-regular;
							text-decoration-color: $text-color-regular;
						}
					}
				}
			}

			.check_spam {
				span {
					font-size: 1.3rem;
					color: $text-color-medium;
				}
			}
		}
	}
</style>
