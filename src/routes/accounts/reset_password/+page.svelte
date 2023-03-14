<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { toggleShowPassword } from '$lib/utils/toggleShowPassowd';
	import { stop_propagation } from 'svelte/internal';
	import { apiURL } from '../../../stores/stores';

	let newPassword: string = '';
	let passwordInvalid: boolean = false;
	let el: HTMLInputElement | null;
	let element: Element | null | undefined;
	let baseURL: string = '';

	function goToLoginPage() {
		goto(`${$page.url.origin}/accounts/sign_in`);
	}

	function goToRequestPasswordResetTokenPage() {
		goto(`${$page.url.origin}/accounts/request_password_reset_link`);
	}

	async function createNewPasswordRequest(password: string) {
		const unsub = apiURL.subscribe((value) => {
			baseURL = value;
		});

		unsub();

		const response = await fetch(`${baseURL}/public/updatePassword`, {
			method: 'PATCH',
			mode: 'cors',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json'
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
			body: JSON.stringify({
				password: password,
				token: $page.url.searchParams.get('token')
			})
		});

		try {
			const data = await response.json();

			console.log(data);

			if (data.message === 'password update successfully') {
				password = '';

				showPasswordCreatedNotif();

				setTimeout(() => {
					goToLoginPage();
				}, 7000);
			} else if (data.message === 'invalid password reset token') {
				showInvalidPasswordNotif();

				setTimeout(() => {
					goToRequestPasswordResetTokenPage();
				}, 7000);
			}
		} catch (error) {
			console.log(error);
		}
	}

	// show password created successfully notification
	function showPasswordCreatedNotif() {
		showPasswordCreated();

		setTimeout(() => {
			hidePasswordCreated();
		}, 6000);
	}

	function showPasswordCreated() {
		const el = document.getElementById('new_password_created') as HTMLDivElement | null;

		if (el === null) return;

		el.classList.add('show_new_password_created_notif');
	}

	function hidePasswordCreated() {
		const el = document.getElementById('new_password_created') as HTMLDivElement | null;

		if (el === null) return;

		el.classList.remove('show_new_password_created_notif');
	}

	// show password is invalid notification
	function showInvalidPasswordNotif() {
		showPasswordInvalid();

		setTimeout(() => {
			hidePasswordInvalid();
		}, 6000);
	}

	function showPasswordInvalid() {
		const el = document.getElementById('invalid_password_reset_token') as HTMLDivElement | null;

		if (el === null) return;

		el.classList.add('show_invalid_password_reset_token_notif');
	}

	function hidePasswordInvalid() {
		const el = document.getElementById('invalid_password_reset_token') as HTMLDivElement | null;

		if (el === null) return;

		el.classList.remove('show_invalid_password_reset_token_notif');
	}

	function showPassword() {
		el = document.getElementById('password') as HTMLInputElement | null;

		if (el === null) return;

		element = el.nextElementSibling?.firstElementChild;

		if (element === null || element === undefined) return;

		if (el.type === 'password') {
			el.type = 'text';

			el.classList.add('show_password');

			element.classList.add('password_visible');
		} else {
			el.type = 'password';

			el.classList.remove('show_password');

			element.classList.remove('password_visible');
		}
	}

	function handleFocusin() {
		passwordInvalid = false;
	}

	function handleSubmit() {
		if (newPassword.length < 6 || newPassword === '') {
			passwordInvalid = true;
			return;
		}

		createNewPasswordRequest(newPassword);
	}
</script>

<div class="wrapper">
	<form>
		<div class="top">
			<h4>Create new password</h4>
			<p>Your new password should be at least 6 characters long</p>
		</div>
		<div class="middle" class:short_password_error={passwordInvalid}>
			<label for="password">Enter new password</label>
			<div
				class="input"
				on:focusin|preventDefault|stopPropagation={handleFocusin}
				on:contextmenu|stopPropagation={stop_propagation}
			>
				<input
					type="password"
					name="password"
					id="password"
					required
					autocomplete="off"
					spellcheck="false"
					bind:value={newPassword}
				/>
				<div class="see_password" on:contextmenu|preventDefault|stopPropagation={stop_propagation}>
					<i
						class="las la-eye"
						on:click|preventDefault|stopPropagation={toggleShowPassword}
						on:keyup
					/>
				</div>
			</div>
			<small>Password must be at least 6 characters long</small>
		</div>
		<button type="submit" on:click|preventDefault|stopPropagation={handleSubmit}>
			<span>Create new password</span>
		</button>
	</form>
</div>

<div class="new_password_created" id="new_password_created">
	<i class="las la-lock" />
	<span>You have created a new password</span>
</div>

<div class="invalid_password_reset_token" id="invalid_password_reset_token">
	<i class="las la-lock" />
	<span>Your password reset token was invalid</span>
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
			gap: 1.5em;
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

				label {
					font-family: 'Arial CE', sans-serif;
					color: $text-color-regular;
					font-size: 1.3rem;
				}

				.input {
					display: flex;
					border: 0.1rem solid $border-color-regular;
					height: 3.5rem;
					border-radius: 0.25rem;

					input[type='password'] {
						border: none;
						height: 100%;
						outline: none;
						font-family: 'Arial CE', sans-serif;
						color: $text-color-medium;
						font-size: 1.3rem;
						width: 90%;
						max-width: 90%;
						padding: 0 0.5em;
					}

					.see_password {
						min-width: 10%;
						display: flex;
						align-items: center;
						justify-content: center;
						border: 0.1rem solid transparent;
						padding: 0 0.1em;

						i {
							font-size: 2rem;
							cursor: pointer;
						}
					}

					&:focus-within,
					&:hover {
						border-color: $blue;
						outline: 0.1rem dashed $blue;
						outline-offset: 0.2rem;
						border-radius: 0;
					}
				}

				small {
					color: $form-error-red;
					font-family: 'Arial CE', sans-serif;
					font-size: 1.2rem;
					display: none;
				}
			}

			.short_password_error {
				.input {
					border-color: $form-error-red;
				}

				small {
					color: $form-error-red;
					display: flex;
				}
			}

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
		}
	}

	// email sent notif
	.new_password_created {
		background-color: white;
		min-width: max-content;
		position: absolute;
		left: 50%;
		right: 50%;
		bottom: -100%;
		transform: translate(-50%, -50%);
		padding: 0 1em;
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
			font-size: 1.3rem;
			font-family: 'Arial CE', sans-serif;
			color: $text-color-medium;
			font-weight: 500;
		}
	}

	// invalid password
	.invalid_password_reset_token {
		background-color: #ff0303;
		min-width: max-content;
		position: absolute;
		left: 50%;
		right: 50%;
		bottom: -100%;
		transform: translate(-50%, -50%);
		padding: 0 1em;
		height: 4rem;
		display: flex;
		align-items: center;
		gap: 1em;
		border-radius: 0.3rem;
		box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
		transition: 500ms;

		i {
			color: white;
			font-size: 2rem;
		}

		span {
			font-size: 1.3rem;
			font-family: 'Arial CE', sans-serif;
			color: white;
			font-weight: 500;
		}
	}

	// show email sent notif
	:global(.show_new_password_created_notif) {
		bottom: 1em !important;
	}

	// invalid password notif
	:global(.show_invalid_password_reset_token_notif) {
		bottom: 1em !important;
	}

	:global(.show_password) {
		border: none;
		height: 100%;
		outline: none;
		font-family: 'Arial CE', sans-serif;
		color: $text-color-medium;
		font-size: 1.3rem;
		width: 90%;
		max-width: 90%;
		padding: 0 0.5em;
	}

	:global(.password_visible) {
		color: $blue !important;
	}
</style>
