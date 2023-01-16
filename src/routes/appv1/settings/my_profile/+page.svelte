<script lang="ts">
	import { goto } from '$app/navigation';

	let name: string = 'HARON KIBET RUTOH';
	let password: string = 'BRM/2018/30333';
	let email: string = 'kwandapchumba@gmail.com';

	function goToChangeEmail() {
		//goto('http://localhost:5173/appv1/settings/my_profile/change_email');
		window.location.href = '/appv1/settings/my_profile/change/email';
	}

	function goChangePassword() {
		//goto('http://localhost:5173/appv1/settings/my_profile/change_password');
		window.location.href = '/appv1/settings/my_profile/change_password';
	}
</script>

<svelte:head>
	<title>My profile - Nested</title>
</svelte:head>

<div class="profile">
	<div class="photo">
		<p>Photo</p>
		<label class="label">
			<input type="file" required />
			<span>Upload photo</span>
		</label>
	</div>
	<div class="profile_info">
		<p>Profile info</p>
		<div class="content">
			<div class="profile_name">
				<label for="name">
					<span>Profile name</span>
				</label>
				<input type="text" name="name" id="name" bind:value={name} spellcheck="false" />
			</div>
			<div class="password">
				<label for="password">
					<span>Password</span>
				</label>
				<div class="input_and_btn">
					<input type="password" name="password" id="password" bind:value={password} disabled />
					<button on:click|preventDefault|stopPropagation={goChangePassword}>
						<span>Change password</span>
					</button>
				</div>
			</div>
			<div class="email_address">
				<label for="email">
					<span>Email address</span>
					<div class="status">
						<!-- <div class="verified">
							<svg
								width="18px"
								height="18px"
								stroke-width="1.5"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								color="#000000"
								><path
									d="M1.5 12.5l4.076 4.076a.6.6 0 00.848 0L9 14M16 7l-4 4"
									stroke="#000000"
									stroke-width="1.5"
									stroke-linecap="round"
								/><path
									d="M7 12l4.576 4.576a.6.6 0 00.848 0L22 7"
									stroke="#000000"
									stroke-width="1.5"
									stroke-linecap="round"
								/>
							</svg>
							<span>Verified</span>
						</div> -->
						<div class="not_verified">
							<svg
								width="18px"
								height="18px"
								stroke-width="1.5"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								color="#000000"
								><path
									d="M20.043 21H3.957c-1.538 0-2.5-1.664-1.734-2.997l8.043-13.988c.77-1.337 2.699-1.337 3.468 0l8.043 13.988C22.543 19.336 21.58 21 20.043 21zM12 9v4"
									stroke="#000000"
									stroke-width="1.5"
									stroke-linecap="round"
								/><path
									d="M12 17.01l.01-.011"
									stroke="#000000"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
							<span>Not verified</span>
						</div>
					</div>
				</label>
				<input type="email" name="email" id="email" bind:value={email} disabled />
				<div class="change_or_verify">
					<button class="change_email" on:click|preventDefault|stopPropagation={goToChangeEmail}>
						<span>Change email</span>
					</button>
					<button class="verify_email">
						<span>Verify email</span>
					</button>
				</div>
			</div>
		</div>
	</div>
	<div class="buttons">
		<button class="save_changes">
			<span>Save changes</span>
		</button>
		<button class="delete_account">
			<svg
				width="20px"
				height="20px"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				color="#000000"
				><path
					d="M20 9l-1.995 11.346A2 2 0 0116.035 22h-8.07a2 2 0 01-1.97-1.654L4 9M21 6h-5.625M3 6h5.625m0 0V4a2 2 0 012-2h2.75a2 2 0 012 2v2m-6.75 0h6.75"
					stroke="#000000"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			<span>Delete account</span>
		</button>
	</div>
</div>

<style lang="scss">
	.profile {
		position: fixed;
		top: 7vh;
		left: 20%;
		width: calc(100% - 20%);
		max-width: calc(100% - 20%);
		height: calc(100vh - 7vh);
		max-height: calc(100vh - 7vh);
		background-color: white;
		padding: 2em;
		display: flex;
		flex-direction: column;
		gap: 3em;
		overflow-y: auto;

		.photo {
			background-color: white;
			display: flex;
			flex-direction: column;
			gap: 1em;

			p {
				font-size: 1.3rem;
				font-family: 'Arial CE', sans-serif;
				color: $text-color-regular;
			}

			.label {
				cursor: pointer;
				border: 1px solid $border-color-regular;
				padding: 0.5em 1em;
				background: transparent;
				display: inline-block;
				width: max-content;
				transition: all 200ms ease-in-out;

				input[type='file'] {
					position: absolute;
					top: -1000px;
				}

				span {
					font-size: 1.3rem;
					font-family: 'Arial CE', sans-serif;
					color: $text-color-regular-2;
				}

				&:hover {
					box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset,
						rgba(0, 0, 0, 0.9) 0px 0px 0px 1px;
					box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
					//border-color: transparent;
				}
			}
		}

		.profile_info {
			background-color: white;
			border-top: 0.1rem solid $border-color-regular;
			display: flex;
			flex-direction: column;
			gap: 1.5em;
			padding-top: 3em;

			p {
				font-size: 1.3rem;
				font-family: 'Arial CE', sans-serif;
				color: $text-color-regular;
			}

			.content {
				display: flex;
				flex-direction: column;
				gap: 3em;

				.profile_name {
					display: flex;
					flex-direction: column;
					gap: 0.4em;

					label {
						span {
							font-size: 1.3rem;
							font-family: 'Arial CE', sans-serif;
							color: $text-color-medium;
						}
					}

					input[type='text'] {
						padding: 0.5em;
						border: 0.1rem solid $border-color-regular;
						outline: none;
						background-color: rgb(239, 243, 246);
						font-family: 'Arial CE', sans-serif;
						color: $text-color-regular;

						&:hover {
							box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
						}

						&:focus {
							box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
						}
					}
				}

				.password {
					display: flex;
					flex-direction: column;
					gap: 0.4em;

					label {
						span {
							font-size: 1.3rem;
							font-family: 'Arial CE', sans-serif;
							color: $text-color-medium;
						}
					}

					.input_and_btn {
						display: flex;
						flex-direction: column;
						gap: 1.5em;

						input[type='password'] {
							width: 100%;
							padding: 0.5em;
							border: 0.1rem solid $border-color-regular;
							outline: none;
							background-color: rgb(239, 243, 246);
						}

						button {
							width: calc(20%);
							padding: 0.5em 0;
							cursor: pointer;
							background-color: white;
							border: 0.1rem solid rgb(255, 178, 0);
							transition: all 200ms ease-in-out;

							span {
								font-size: 1.3rem;
								font-family: 'Arial CE', sans-serif;
								color: $text-color-medium;
							}

							&:hover {
								background-color: rgb(255, 178, 0);

								span {
									color: $text-color-regular;
								}
							}
						}
					}
				}

				.email_address {
					display: flex;
					flex-direction: column;
					gap: 1.5em;

					label {
						display: flex;
						align-items: center;
						gap: 1.5em;

						span {
							font-size: 1.3rem;
							font-family: 'Arial CE', sans-serif;
							color: $text-color-medium;
						}

						.status {
							display: flex;
							align-items: center;

							// .verified {
							// 	display: flex;
							// 	align-content: center;
							// 	gap: 0.5em;

							// 	svg {
							// 		path {
							// 			stroke: rgb(43, 196, 138);
							// 		}
							// 	}

							// 	span {
							// 		color: rgb(43, 196, 138);
							// 		font-family: 'Arial CE', sans-serif;
							// 	}
							// }

							.not_verified {
								display: flex;
								align-content: center;
								gap: 0.5em;

								svg {
									path {
										stroke: rgb(255, 178, 0);
									}
								}

								span {
									color: rgb(255, 178, 0);
									font-family: 'Arial CE', sans-serif;
								}
							}
						}
					}

					input[type='email'] {
						width: 100%;
						padding: 0.5em;
						border: 0.1rem solid $border-color-regular;
						outline: none;
						background-color: rgb(239, 243, 246);
						font-family: 'Arial CE', sans-serif;
						color: $text-color-medium;
					}

					.change_or_verify {
						display: flex;
						align-items: center;
						gap: 1.5em;

						button {
							width: calc(100% - 80%);
							padding: 0.5em 0;
							cursor: pointer;
							background-color: transparent;
							background-color: transparent;
							border: 0.1rem solid rgb(255, 178, 0);
							transition: all 200ms ease-in-out;
							box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

							span {
								font-size: 1.3rem;
								font-family: 'Arial CE', sans-serif;
								color: $text-color-medium;
							}

							&:hover {
								background-color: rgb(255, 178, 0);

								span {
									color: $text-color-regular;
								}
							}
						}
					}
				}
			}
		}

		.buttons {
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-top: 0.1rem solid $border-color-regular;
			padding-top: 3em;

			button {
				width: calc(100% - 80%);
				padding: 1em 0;
				cursor: pointer;
				// background-color: #3ccf4e;
				background-color: $blue;
				border: none;
				transition: all 200ms ease-in-out;
				box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

				span {
					font-size: 1.3rem;
					font-family: 'Product Sans Medium', sans-serif;
					color: white;
				}

				&:hover {
					//background-color: #00bd56;
					background-color: rgb(0, 20, 255);
				}
			}

			button.delete_account {
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: white;
				border: 0.1rem solid #ed4f32;
				gap: 1em;

				svg {
					path {
						stroke: #ed4f32;
						fill: #ed4f32;
					}
				}

				span {
					color: #ed4f32;
				}

				&:hover {
					background-color: #ed4f32;
					background-color: #ed4f32;

					svg {
						path {
							stroke: white;
							fill: white;
						}
					}

					span {
						color: white;
					}
				}
			}
		}
	}
</style>
