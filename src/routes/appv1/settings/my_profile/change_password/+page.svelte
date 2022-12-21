<svelte:head>
	<title>Change password - Nested</title>
</svelte:head>

<div class="change_password">
	<form>
		<div class="current_password">
			<label for="current_password">Current password</label>
			<input
				type="password"
				name="current_password"
				id="current_password"
				placeholder="Enter current password"
			/>
		</div>
		<div class="new_passwords">
			<div class="new_password">
				<label for="new_password">New password</label>
				<input
					type="password"
					name="new_password"
					id="new_password"
					placeholder="Enter new password"
				/>
			</div>
			<div class="new_password_confirmation">
				<label for="new_password_confirmation">New password confirmation</label>
				<input
					type="password"
					name="new_password_confirmation"
					id="new_password_confirmation"
					placeholder="Enter new password confirmation"
				/>
			</div>
		</div>
		<button type="submit">
			<span> Save changes </span>
		</button>
	</form>
</div>

<style lang="scss">
	.change_password {
		position: fixed;
		left: 20%;
		top: 7vh;
		width: calc(100% - 20%);
		max-width: calc(100% - 20%);
		height: calc(100vh - 7vh);
		max-height: calc(100vh - 7vh);

		form {
			padding: 2em;
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			gap: 2em;

			.current_password {
				display: flex;
				flex-direction: column;
				gap: 0.5em;

				label {
					font-size: 1.3rem;
					font-family: 'Arial CE', sans-serif;
					color: $text-color-regular;
				}

				input[type='password'] {
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

			.new_passwords {
				display: flex;
				align-items: center;
				gap: 2em;

				.new_password {
					display: flex;
					flex-direction: column;
					gap: 0.5em;
					flex: 1;

					label {
						font-size: 1.3rem;
						font-family: 'Arial CE', sans-serif;
						color: $text-color-regular;
					}

					input[type='password'] {
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

				.new_password_confirmation {
					display: flex;
					flex-direction: column;
					gap: 0.5em;
					flex: 1;

					label {
						font-size: 1.3rem;
						font-family: 'Arial CE', sans-serif;
						color: $text-color-regular;
					}

					input[type='password'] {
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
		}
	}
</style>
