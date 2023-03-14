<script lang="ts">
	import { page } from '$app/stores';
	import { EmailAddressIsValid } from '$lib/utils/checkIfEmailIsValid';
	import { getSession } from '$lib/utils/getSession';
	import { stop_propagation } from 'svelte/internal';
	import { apiURL, shareFormVisible } from '../../stores/stores';
	let email: string = '';

	let emails: string[] = [];

	let accessLevel: string = 'view';

	let baseUrl: string;

	let loading: boolean = false;

	let emailsInvited: string[] = [];

	function handleKeyDown(e: KeyboardEvent) {
		if (e.code === 'Comma' || e.code === 'Space' || e.code === 'Enter' || e.code === 'Semicolon') {
			e.preventDefault();

			if (!emails.includes(email)) {
				emails = [...emails, email];
			}

			email = '';
		}
	}

	function removeEmailFromEmails(e: MouseEvent) {
		const el = e.currentTarget as HTMLElement | null;

		if (el === null) return;

		const span = el?.previousElementSibling as HTMLSpanElement | null;

		if (span === null) return;

		const emailToRemove: string | null = span.textContent;

		if (emailToRemove === null) return;

		if (emails.includes(emailToRemove)) {
			emails = emails.filter((email) => email != emailToRemove);
		}
	}

	async function inviteUsersToCollectionRequest() {
		loading = true;

		if (emails.length < 1) {
			if (email !== '') {
				if (!emails.includes(email)) {
					emails = [...emails, email];

					email = '';
				} else {
					email = '';
				}
			} else {
				loading = false;

				accessLevel = 'view';

				return;
			}
		}

		if (emails.length >= 1) {
			if (email !== '') {
				if (!emails.includes(email)) {
					emails = [...emails, email];

					email = '';
				} else {
					email = '';
				}
			}
		}

		const unsub = apiURL.subscribe((value) => {
			baseUrl = value;
		});

		unsub();

		const body = JSON.stringify({
			collection_id: $page.params.folder_id,
			access_level: accessLevel,
			emails_to_invite: emails
		});

		const response = await fetch(`${baseUrl}/private/folder/share`, {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer${JSON.parse(getSession()).access_token}`
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
			body: body
		});

		try {
			const result = await response.json();

			if (response.statusText === 'OK') {
				emails = [];

				emailsInvited = result[0];

				showNumberOfPeopleInvitedNotif();

				setTimeout(() => {
					hideShareForm();
				}, 4500);
			} else {
				let error: string = result.message;

				if (error.includes('must be a valid email address')) {
					const el = document.getElementById(
						'one_or_more_emails_were_invalid'
					) as HTMLDivElement | null;

					if (el) {
						el.classList.add('show_one_or_more_emails_were_invalid');

						setTimeout(() => {
							el.classList.remove('show_one_or_more_emails_were_invalid');
						}, 4000);
					} else {
						alert('element not found');
					}
				}

				emails = [];

				email = '';

				loading = false;

				accessLevel = 'view';
			}
		} catch (error) {
			alert(error);
		}

		accessLevel = 'view';

		loading = false;
	}

	function showNumberOfPeopleInvitedNotif() {
		showNotif();

		setTimeout(() => {
			hideNotif();
		}, 4000);
	}

	function showNotif() {
		const el = document.getElementById('invites_sent_successfully') as HTMLDivElement | null;

		if (el === null) return;

		el.classList.add('show_number_of_people_invited');
	}

	function hideNotif() {
		const el = document.getElementById('invites_sent_successfully') as HTMLDivElement | null;

		if (el === null) return;

		el.classList.remove('show_number_of_people_invited');
	}

	function hideShareForm() {
		shareFormVisible.set(false);

		if (email !== '') {
			email = '';
		}

		if (email.length !== 0) {
			emails = [];
		}

		accessLevel = 'view';
	}
</script>

{#if $shareFormVisible}
	<div class="wrapper" on:click|preventDefault|stopPropagation={hideShareForm} on:keyup>
		<form on:click|preventDefault|stopPropagation={stop_propagation} on:keyup>
			<div class="top">
				<p>Share "Digital Marketing"</p>
				<span>Invited members will gain access to this collection</span>
			</div>
			<div class="bottom">
				<div class="input">
					<label for="email">
						<i class="las la-envelope" />
						<span>Invite by email</span>
					</label>
					<div class="emails">
						{#each emails as email}
							<div class="email">
								<span>{email}</span>
								<i
									class="las la-times"
									on:click|preventDefault|stopPropagation={removeEmailFromEmails}
									on:keyup
								/>
							</div>
						{/each}
					</div>
					<input
						type="email"
						id="email"
						name="email"
						class="email"
						autocomplete="off"
						spellcheck="false"
						placeholder="Enter one or more emails"
						bind:value={email}
						on:keydown|stopPropagation={handleKeyDown}
					/>
				</div>

				<fieldset>
					<!-- <legend>Select a maintenance drone:</legend> -->

					<div>
						<div
							class="checkbox"
							class:checkbox_checked={accessLevel === 'view'}
							data-rep="view"
							on:click|preventDefault|stopPropagation={() => {
								accessLevel = 'view';
							}}
							on:keyup
						>
							<i class="las la-check" />
						</div>
						<span>View Only</span>
					</div>

					<div>
						<div
							class="checkbox"
							class:checkbox_checked={accessLevel === 'edit'}
							data-rep="edit"
							on:click|preventDefault|stopPropagation={() => {
								accessLevel = 'edit';
							}}
							on:keyup
						>
							<i class="las la-check" />
						</div>
						<span>View & Edit</span>
					</div>

					<div>
						<div
							class="checkbox"
							class:checkbox_checked={accessLevel === 'admin'}
							data-rep="admin"
							on:click|preventDefault|stopPropagation={() => {
								accessLevel = 'admin';
							}}
							on:keyup
						>
							<i class="las la-check" />
						</div>
						<span>Admin</span>
					</div>
				</fieldset>

				<div class="buttons">
					<button
						type="submit"
						on:click|preventDefault|stopPropagation={inviteUsersToCollectionRequest}
						class:processing_request={loading}
					>
						<div class="loader" />
						<span>Invite</span>
					</button>
					<button on:click|preventDefault|stopPropagation={hideShareForm}>
						<span>Cancel</span>
					</button>
				</div>
			</div>
		</form>
	</div>
{/if}

<!-- invites sent successfully notification -->
<div class="invites_sent_successfully" id="invites_sent_successfully">
	<i class="las la-check" />
	<span
		>{emailsInvited.length > 1
			? `${emailsInvited.length} people have been invited`
			: `${emailsInvited[0]} has been invited`}</span
	>
</div>

<!-- one or more emails were invalid -->
<div class="one_or_more_emails_were_invalid" id="one_or_more_emails_were_invalid">
	<i class="las la-exclamation-triangle" />
	<span>One or more emails were invalid</span>
</div>

<style lang="scss">
	.wrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 9000;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(8px);

		form {
			min-width: 50rem;
			//min-height: 30rem;
			min-height: max-content;
			width: max-content;
			display: flex;
			flex-direction: column;
			max-width: 40rem;
			background-color: rgb(255, 255, 255);
			border-radius: 0.6rem;
			box-shadow: $modal_box_shadow;
			display: flex;
			flex-direction: column;
			gap: 2em;
			padding: 1.5em;
			animation: animate_form 0.5s ease-in-out;

			.top {
				display: flex;
				flex-direction: column;
				gap: 0.5em;

				p {
					font-family: 'Arial CE', sans-serif;
					color: $text-color-dropbox;
					font-size: 1.6rem;
				}

				span {
					font-family: 'Arial CE', sans-serif;
					color: $text-color-medium;
					font-size: 1.3em;
				}
			}

			.bottom {
				display: flex;
				flex-direction: column;
				gap: 1.5em;

				.input {
					display: flex;
					flex-direction: column;
					gap: 1em;

					label {
						display: flex;
						align-items: center;
						gap: 1em;
						width: 100%;

						i {
							font-size: 2rem;
							color: $text-color-medium;
						}

						span {
							font-family: 'Arial CE', sans-serif;
							color: $text-color-medium;
							font-size: 1.3em;
						}
					}

					.emails {
						display: flex;
						overflow: auto;
						flex-wrap: wrap;
						align-content: flex-start;
						width: 100%;
						min-height: max-content;
						gap: 0.5em;

						.email {
							background-color: #eeeeee;
							padding: 0.2em 0.4em;
							display: flex;
							align-items: center;
							gap: 0.3em;
							border-radius: 0.3rem;
							background-color: #85cdfd;

							span {
								font-family: 'Arial CE', sans-serif;
								color: $text-color-dropbox;
								font-size: 1.2rem;
							}

							i {
								color: $text-color-medium;
								font-size: 1.3rem;
								cursor: pointer;
								transition: all 200ms linear;

								&:hover {
									color: $text-color-dropbox;
								}
							}
						}
					}

					input[type='email'] {
						height: 3.5rem;
						padding: 0 0.5em;
						outline: none;
						border: 0.1rem solid $border-color-regular;
						border-radius: 0.3rem;
						font-family: 'Arial CE', sans-serif;
						color: $text-color-dropbox;

						&::placeholder {
							font-family: 'Arial CE', sans-serif;
						}

						&:focus {
							outline: 0.1rem dashed $border-color-regular;
							outline-offset: 0.2rem;
						}
					}
				}

				fieldset {
					border: none;
					display: flex;
					align-items: center;
					gap: 2em;

					div:not(.checkbox) {
						display: flex;
						align-items: center;
						gap: 1em;

						.checkbox {
							border: 0.1rem solid $border-color-regular;
							height: 1.4rem;
							width: 1.4rem;
							display: flex;
							align-items: center;
							justify-content: center;
							cursor: pointer;
							border-radius: 0.2rem;

							i {
								color: white;
								font-size: 1.5rem;
							}
						}

						.checkbox_checked {
							background-color: $blue;
							border-color: $blue;
						}

						span {
							font-size: 1.3rem;
							font-family: 'Arial CE', sans-serif;
							color: $text-color-medium;
						}
					}
				}

				.buttons {
					display: flex;
					align-items: center;
					justify-content: flex-end;
					gap: 0.5em;

					button {
						height: 3.5rem;
						padding: 0 1.5em;
						outline: none;
						border: none;
						cursor: pointer;
						border-radius: 0.2rem;
						transition: all 200ms linear;

						span {
							font-size: 1.3rem;
							font-family: 'Arial CE', sans-serif;
						}

						&:not([type='submit']) {
							background-color: #eeeeee;

							&:hover {
								box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, #eeeeee 0px 0px 0px 2px;
							}
						}
					}

					button[type='submit'] {
						background-color: $blue;

						span {
							color: white;
						}

						&:hover {
							box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, $blue 0px 0px 0px 2px;
						}
					}

					.processing_request {
						pointer-events: none;

						.loader {
							border: 0.2rem solid #ffffff;
							border-top: 0.2rem solid $blue;
							border-radius: 50%;
							width: 2rem;
							height: 2rem;
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

						span {
							display: none;
						}
					}
				}
			}

			@keyframes animate_form {
				0% {
					transform: translateY(-50px);
					opacity: 0;
				}

				100% {
					transform: translateY(0);
					opacity: 1;
				}
			}
		}
	}

	// invite(s) sent notification
	.invites_sent_successfully {
		background-color: white;
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
		background-color: $green;

		i {
			color: #03c988;
			font-size: 2rem;
			color: white;
		}

		span {
			font-size: 1.4rem;
			font-family: 'Arial CE', sans-serif;
			color: $text-color-dropbox;
			color: white;
			font-weight: 500;
		}
	}

	// one or more emails were invalid
	.one_or_more_emails_were_invalid {
		background-color: white;
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
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		transition: 500ms;
		z-index: 10000;
		background-color: $red;

		i {
			color: #03c988;
			font-size: 2rem;
			color: white;
		}

		span {
			font-size: 1.4rem;
			font-family: 'Arial CE', sans-serif;
			color: $text-color-dropbox;
			color: white;
			font-weight: 500;
		}
	}

	// GLOBAL CLASSESS TO BE ADDED BY JS
	:global(.show_number_of_people_invited) {
		top: 1em !important;
	}

	:global(.show_one_or_more_emails_were_invalid) {
		top: 1em !important;
	}
</style>
