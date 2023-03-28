<script lang="ts">
	import { currentFolder } from './../../stores/stores';
	import { addLinkMode } from '../../stores/stores';
	import { onMount, stop_propagation } from 'svelte/internal';
	import { newLink } from '../../stores/stores';
	import { addLink } from '$lib/utils/addLink';

	let folderID: string = '';

	let keyCodeIsBackspace: boolean = false;

	function exitAddLinkMode() {
		addLinkMode.set(false);

		//newLink.set('https://example.com');
	}

	function handleFormSubmit() {
		addLink($newLink, $currentFolder);
		newLink.set('');
	}

	function appendHttpsToUrl() {
		if (!keyCodeIsBackspace) {
			if (!$newLink.includes(`https`)) {
				$newLink = `https://${$newLink}`;
			}
		}
	}

	function handleInputKeyDown(e: KeyboardEvent) {
		// if (e.code === 'Backspace') {
		// 	keyCodeIsBackspace = true;
		// } else {
		// 	keyCodeIsBackspace = false
		// }

		e.code === 'Backspace' ? (keyCodeIsBackspace = true) : (keyCodeIsBackspace = false);
	}

	$: console.log($newLink);
</script>

<div
	class="add_link_form_wrapper"
	on:click|preventDefault|stopPropagation={exitAddLinkMode}
	on:keyup
>
	<form on:click|preventDefault|stopPropagation={stop_propagation} on:keyup>
		<div class="top">
			<span>Add link</span>
			<i class="las la-times" />
		</div>
		<div class="input_wrapper">
			<input
				type="url"
				id="url_input"
				placeholder="https://example.com"
				pattern="https://.*"
				bind:value={$newLink}
				autocomplete="off"
				autocorrect="off"
				spellcheck="false"
				on:contextmenu|stopPropagation={stop_propagation}
				on:input|stopPropagation={appendHttpsToUrl}
				on:keydown|stopPropagation={handleInputKeyDown}
			/>
		</div>
		<div class="buttons">
			<button
				type="submit"
				on:click|preventDefault|stopPropagation={handleFormSubmit}
				class:disabled={$newLink === '' || $newLink === 'https://example.com'}
			>
				<span>Add</span>
			</button>
			<button on:click|preventDefault|stopPropagation={exitAddLinkMode}>
				<span>Cancel</span>
			</button>
		</div>
	</form>
</div>

<style lang="scss">
	.add_link_form_wrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(8px);

		form {
			min-height: 20rem;
			min-width: 40rem;
			background-color: white;
			display: flex;
			flex-direction: column;
			box-shadow: $modal_box_shadow;
			padding: 1em;
			transform: scale(1);
			animation: zoomin 0.5s ease-in-out;
			gap: 2em;
			border-radius: 0.6rem;

			.top {
				height: 10%;
				display: flex;
				align-items: center;
				justify-content: space-between;

				span {
					font-family: 'Arial CE', sans-serif;
					font-size: 1.5rem;
					color: $text-color-regular;
				}

				i {
					font-size: 1.8rem;
					color: $text-color-regular;
					cursor: pointer;
					background-color: transparent;
					border-radius: 100vh;
					padding: 0.1em;
					transition: background-color 150ms ease-in-out;

					&:hover {
						background-color: $gray;
					}
				}
			}

			.input_wrapper {
				flex: 1;
				display: flex;
				align-items: center;

				input[type='url'] {
					width: 100%;
					height: 3.5rem;
					border: none;
					outline: 0.1rem solid $border-color-regular;
					padding: 0.5em;
					font-family: 'Arial CE', sans-serif;
					border-radius: 0.3rem;

					&::placeholder {
						font-family: 'Arial CE', sans-serif;
					}

					&:focus {
						outline-color: $yellow;
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
					height: 3.5rem;
					min-width: 7rem;
					border: none;
					background-color: $gray;
					cursor: pointer;
					display: flex;
					align-items: center;
					justify-content: center;
					// background-image: linear-gradient(to top, $red 50%, $gray 50%);
					// background-size: 100% 200%;
					// background-position: top;
					// transition: background-position 100ms ease-in-out;
					transition: all 200ms ease-in-out;
					border-radius: 0.3rem;

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
					// background-color: $main-blue;
					// background-image: linear-gradient(to top, $green 50%, $main-blue 50%);
					background-color: $yellow;

					span {
						color: $text-color-regular;
					}

					&:hover {
						//background-color: $secondary-blue;
						background-position: bottom;
					}
				}

				.disabled {
					opacity: 0.5;
					pointer-events: none;
				}
			}

			@keyframes zoomin {
				0% {
					transform: translateY(-50px);
					opacity: 0;
				}

				100% {
					transform: translateY(0);
					opacity: 1;
				}
			}

			// @media screen and (max-width: 440px) {
			// 	min-width: 98%;
			// 	min-height: 30%;
			// }

			// @media screen and (min-width: 441px) and (max-width: 1200px) {
			// 	min-width: 90%;
			// 	min-height: 30%;
			// }
		}
	}
</style>
