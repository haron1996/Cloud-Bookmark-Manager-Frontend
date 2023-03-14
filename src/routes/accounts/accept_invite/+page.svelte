<script lang="ts">
	import { page } from '$app/stores';
	import { getSession } from '$lib/utils/getSession';
	import { toggleShowPassword } from '$lib/utils/toggleShowPassowd';
	import { onMount, stop_propagation } from 'svelte/internal';
	import { apiURL } from '../../../stores/stores';

	let baseURL: string;

	onMount(async () => {
		await getCollectionNameAndInviter();
	});

	const unsub = apiURL.subscribe((value) => {
		baseURL = value;
	});

	unsub();

	interface inviteDetails {
		collection_name: string;
		inviter_name: string;
	}

	let newInviteDetails: Partial<inviteDetails> = {};

	async function getCollectionNameAndInviter() {
		const promise = await fetch(
			`${baseURL}/public/getCollectionAndInviterNames/${$page.url.searchParams.get('token')}`,
			{
				method: 'GET',
				mode: 'cors',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer${JSON.parse(getSession()).access_token}`
				}
			}
		);

		try {
			const result = await promise.json();
			if (result.message) {
				console.log(result.message);
			} else {
				newInviteDetails = result[0];
				console.log(newInviteDetails);
			}
		} catch (error) {
			console.log(error);
		}
	}
</script>

<div class="wrapper">
	<form>
		<div class="top">
			<h4>
				Accept {newInviteDetails.inviter_name}'s invite to "{newInviteDetails.collection_name}"
				collection
			</h4>
			<p>Complete your details to accept invite</p>
		</div>
		<div class="center">
			<div class="fullname">
				<label for="name">Full name</label>
				<input
					type="text"
					name="name"
					id="name"
					placeholder="eg John Doe"
					autocomplete="off"
					spellcheck="false"
				/>
			</div>
			<div class="password">
				<label for="password">Password</label>
				<div class="input">
					<input
						type="password"
						name="password"
						id="password"
						placeholder="Create secure password"
					/>
					<div
						class="see_password"
						on:contextmenu|preventDefault|stopPropagation={stop_propagation}
					>
						<i
							class="las la-eye"
							on:click|preventDefault|stopPropagation={toggleShowPassword}
							on:keyup
						/>
					</div>
				</div>
			</div>
		</div>
		<div class="bottom">
			<button type="submit">
				<span>Join {newInviteDetails.inviter_name}</span>
			</button>
		</div>
	</form>
</div>

{#if newInviteDetails.collection_name === undefined || newInviteDetails.collection_name === '' || newInviteDetails.inviter_name === undefined || newInviteDetails.inviter_name === ''}
	<div class="loader_wrapper"><div class="loader" /></div>
{/if}

<style lang="scss">
	.wrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: white;
		display: flex;
		align-items: center;
		justify-content: center;

		form {
			min-width: 40rem;
			min-height: max-content;
			display: flex;
			flex-direction: column;
			gap: 2em;

			.top {
				display: flex;
				flex-direction: column;
				gap: 0.5em;

				h4 {
					font-size: 1.6rem;
					font-family: 'Arial CE', sans-serif;
					color: $text-color-dropbox;
				}

				p {
					font-family: 'Arial CE', sans-serif;
					font-size: 1.5rem;
				}
			}

			.center {
				display: flex;
				flex-direction: column;
				gap: 1.5em;

				.fullname {
					display: flex;
					flex-direction: column;
					gap: 0.3em;

					label {
						font-family: 'Arial CE', sans-serif;
						font-size: 1.3rem;
					}

					input {
						font-family: 'Arial CE', sans-serif;
						outline: none;
						border: 0.1rem solid $border-color-regular;
						height: 3.5rem;
						padding: 0 0.5em;
						border-radius: 0.3rem;

						&:hover,
						&:focus {
							border-color: $blue;
							outline: 0.1rem dashed $blue;
							outline-offset: 0.2rem;
							border-radius: 0;
						}
					}
				}

				.password {
					display: flex;
					flex-direction: column;
					gap: 0.3em;

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
				}
			}

			.bottom {
				display: flex;
				align-items: center;

				button {
					border-color: transparent;
					padding: 0.5em 0;
					border-radius: 0.25rem;
					cursor: pointer;
					background-color: $blue;
					transition: all 100ms ease-in-out;
					width: 100%;

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
	}

	.loader_wrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: #00235b;
		z-index: 9000;
		display: flex;
		align-items: center;
		justify-content: center;

		.loader {
			border: 0.2rem solid #f3f3f3;
			border-top: 0.2rem solid #3498db;
			border-radius: 50%;
			width: 5rem;
			height: 5rem;
			animation: spin 1s linear infinite;

			@keyframes spin {
				0% {
					transform: rotate(0deg);
				}
				100% {
					transform: rotate(360deg);
				}
			}
		}
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
