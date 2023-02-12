<script lang="ts">
	import { hideContactForm } from '$lib/utils/toggleContactForm';
	import { stop_propagation } from 'svelte/internal';
	import { showContactForm } from '../../stores/stores';

	const sendMessage = async () => {
		alert('send message');
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
					<label for="textarea">Describe your issue or suggestion.</label>
					<textarea name="textarea" id="textarea" cols="50" rows="10" />
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
						padding: 0.5em;
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
