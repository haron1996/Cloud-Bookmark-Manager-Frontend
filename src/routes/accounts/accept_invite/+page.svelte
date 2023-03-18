<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getFoldersAndLinksMovedToTrash } from '$lib/utils/getFoldersAndLinksMovedToTrash';
	import { getSession } from '$lib/utils/getSession';
	import { toggleShowPassword } from '$lib/utils/toggleShowPassowd';
	import { onMount, stop_propagation } from 'svelte/internal';
	import { apiURL, session } from '../../../stores/stores';
	import type { Session } from '$lib/types/session';

	let baseURL: string;

	let loading: boolean = false;

	let el: HTMLDivElement | null;

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

	interface requestBody {
		token: string | null;
		fullname: string;
		password: string;
	}

	let newInviteDetails: Partial<inviteDetails> = {};

	let newRequestBody: Partial<requestBody> = {
		token: $page.url.searchParams.get('token'),
		fullname: '',
		password: ''
	};

	async function getCollectionNameAndInviter() {
		loading = true;

		const promise = await fetch(
			`${baseURL}/public/getCollectionAndInviterNames/${$page.url.searchParams.get('token')}`,
			{
				method: 'GET',
				mode: 'cors',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);

		try {
			const result = await promise.json();
			if (result.message) {
				let msg: string = result.message;

				if (msg !== '') {
					showInvalidTokenError();

					setTimeout(() => {
						hideInvalidTokenError();

						goto(`${$page.url.origin}/accounts/sign_in`);
					}, 4000);
				}
			} else {
				newInviteDetails = result[0];
			}
		} catch (error) {
			console.log(error);
		}

		loading = false;
	}

	async function acceptInviteRequest() {
		const body = JSON.stringify({
			token: newRequestBody.token,
			fullname: newRequestBody.fullname,
			password: newRequestBody.password
		});

		const response = await fetch(`${baseURL}/public/acceptInvite`, {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
			body: body
		});

		try {
			const result = await response.json();

			let msg: string = result.message;

			if (msg) {
				showInvalidTokenError();

				setTimeout(() => {
					hideInvalidTokenError();

					goto(`${$page.url.origin}/accounts/sign_in`);
				}, 4000);

				return;
			}

			const s: Partial<Session> = result[0];

			if (s === null) return;

			session.set(s);

			window.localStorage.removeItem('session');

			window.localStorage.setItem('session', JSON.stringify(s));

			goto(`${$page.url.origin}/appv1/my_links/shared_with_me`);
		} catch (error) {
			console.log(error);
		}
	}

	// show invalid token error
	function showInvalidTokenError() {
		el = document.getElementById('invalid_token_error') as HTMLDivElement | null;

		if (el === null) {
			loading = false;

			return;
		}

		el.style.top = '1em';
	}

	// hide invalid token error
	function hideInvalidTokenError() {
		el = document.getElementById('invalid_token_error') as HTMLDivElement | null;

		if (el === null) {
			loading = false;

			return;
		}

		el.style.top = '-100%';
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
					bind:value={newRequestBody.fullname}
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
						bind:value={newRequestBody.password}
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
			<button type="submit" on:click|preventDefault|stopPropagation={acceptInviteRequest}>
				<span>Join {newInviteDetails.inviter_name}</span>
			</button>
		</div>
	</form>
</div>

{#if loading || (!loading && newInviteDetails.collection_name === undefined && newInviteDetails.inviter_name === undefined)}
	<div class="loader_wrapper"><div class="loader" /></div>
{/if}

<div class="invalid_token_error" id="invalid_token_error">
	<i class="las la-exclamation-triangle" />
	<span>Invite token is invalid or not found</span>
	<i class="las la-times" />
</div>

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

	.invalid_token_error {
		background-color: $red;
		min-width: max-content;
		position: absolute;
		left: 50%;
		right: 50%;
		top: -100%;
		transform: translate(-50%, -50%);
		padding: 0 1.5em;
		height: 4rem;
		display: flex;
		align-items: center;
		gap: 1em;
		border-radius: 0.3rem;
		box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
		transition: 500ms;
		z-index: 10000;

		i {
			color: white;
			font-size: 2rem;
		}

		span {
			font-size: 1.4rem;
			font-family: 'Arial CE', sans-serif;
			color: white;
			font-weight: 500;
		}

		i.la-times {
			cursor: pointer;
		}
	}

	:global(.show_password) {
		border: none;
		height: 100%;
		outline: none;
		font-family: 'Arial CE', sans-serif;
		font-size: 1.3rem;
		width: 90%;
		max-width: 90%;
		padding: 0 0.5em;
	}

	:global(.password_visible) {
		color: $blue !important;
	}
</style>
