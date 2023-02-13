<script lang="ts">
	import { hideContactForm } from '$lib/utils/toggleContactForm';
	import { stop_propagation } from 'svelte/internal';
	import { apiURL, showContactForm } from '../../stores/stores';
	import { getSession } from '$lib/utils/getSession';
	import { MakeCheckMarkLotieVisible } from '$lib/utils/showCheckMarkLottie';
	import { showMessageSentLottie } from '$lib/utils/showMessageSentLottie';

	let message: string;
	let apiBaseUrl: string;
	const endPoint: string = '/private/contactSupport';

	const sendMessage = async () => {
		hideContactForm();

		const getApiBaseUrl = apiURL.subscribe((value) => {
			apiBaseUrl = value;
		});

		getApiBaseUrl();

		try {
			const response = await fetch(`${apiBaseUrl}${endPoint}`, {
				method: 'POST', // *GET, POST, PUT, DELETE, etc.
				mode: 'cors', // no-cors, *cors, same-origin
				cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
				credentials: 'include', // include, *same-origin, omit
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer${JSON.parse(getSession()).access_token}`
					// 'Content-Type': 'application/x-www-form-urlencoded',
				},
				redirect: 'follow', // manual, *follow, error
				referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
				body: JSON.stringify({
					message: message
				}) // body data type must match "Content-Type" header
			});

			if (response.ok) {
				const message = await response.json();

				console.log(message.message);

				showMessageSentLottie();
			} else {
				alert(response.status);
			}
		} catch (error) {
			alert(error);
		}

		message = '';
	};
</script>

{#if $showContactForm}
	<div class="wrapper" on:click|preventDefault|stopPropagation={hideContactForm} on:keyup>
		<div class="card" on:click|stopPropagation={stop_propagation} on:keyup>
			<div class="text">
				<p>Hi there! 👋 We're here to help. Ask us anything!</p>
			</div>
			<form>
				<div class="message">
					<label for="textarea">Briefly describe your issue or suggestion.</label>
					<textarea
						name="textarea"
						id="textarea"
						cols="50"
						rows="10"
						bind:value={message}
						spellcheck="false"
						autocomplete="off"
						maxlength="255"
						on:contextmenu|stopPropagation={stop_propagation}
					/>
				</div>
				<div class="buttons">
					<button type="submit" on:click|preventDefault|stopPropagation={sendMessage}>
						<span>Send message</span>
					</button>
					<button on:click|preventDefault|stopPropagation={hideContactForm}>
						<span>Cancel</span>
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<style lang="scss">
	.wrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 6000;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(8px);

		.card {
			min-height: max-content;
			width: 60rem;
			background-color: rgb(255, 255, 255);
			border-radius: 0.6rem;
			box-shadow: $modal_box_shadow;
			display: flex;
			flex-direction: column;
			padding: 2em;
			animation: animate_card 0.5s ease-in-out;
			gap: 2em;

			.text {
				flex: 1;
				display: flex;
				align-items: center;

				p {
					font-family: 'Arial CE', sans-serif;
					font-size: 1.5rem;
					color: $text-color-dropbox;
				}
			}

			form {
				display: flex;
				flex-direction: column;
				gap: 2em;
				width: 100%;

				.message {
					flex: 1;
					display: flex;
					flex-direction: column;
					gap: 0.7em;

					label {
						font-family: 'Arial CE', sans-serif;
						font-size: 1.3rem;
						color: $text-color-dropbox;
					}

					textarea {
						resize: none;
						border: 0.1rem solid $border-color-regular;
						font-family: 'Arial CE', sans-serif;
						padding: 1em;
						font-size: 1.3rem;
						border-radius: 0.3rem;

						&:focus {
							outline: none;
							border-color: $yellow;
						}
					}
				}

				.buttons {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					gap: 0.5em;

					button {
						min-height: max-content;
						min-width: max-content;
						border: none;
						background-color: $gray;
						cursor: pointer;
						display: flex;
						align-items: center;
						justify-content: center;
						border-radius: 0.3rem;
						transition: all 200ms ease-in-out;
						padding: 0.5em 1em;

						span {
							font-family: 'Product Sans Medium', sans-serif;
							font-size: 1.3rem;
							color: $text-color-regular;
						}

						&:hover {
							filter: brightness(90%);
						}
					}

					button[type='submit'] {
						background-color: $yellow;

						span {
							color: $text-color-regular;
							font-family: 'Arial CE', sans-serif;
						}

						&:hover {
							filter: brightness(90%);
						}
					}
				}
			}

			@keyframes animate_card {
				0% {
					transform: translateY(-50px);
					opacity: 0;
				}

				100% {
					transform: translateY(0);
					opacity: 1;
				}
			}

			@media screen and (max-width: 768px) {
				width: 97%;
			}
		}
	}
</style>
