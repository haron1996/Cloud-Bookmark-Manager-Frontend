<script lang="ts">
	import { currentFolder } from './../../stores/stores';
	import { addLinkMode } from '../../stores/stores';
	import { stop_propagation } from 'svelte/internal';
	import { newLink } from '../../stores/stores';
	import { addLink } from '$lib/utils/addLink';

	let folderID: string = '';

	function exitAddLinkMode() {
		addLinkMode.set(false);

		newLink.set('https://example.com');
	}

	function handleFormSubmit() {
		addLink($newLink, $currentFolder);
	}
</script>

<div
	class="add_link_form_wrapper"
	on:click|preventDefault|stopPropagation={exitAddLinkMode}
	on:keyup
>
	<form on:click|preventDefault|stopPropagation={stop_propagation} on:keyup>
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
		display: flex;
		align-items: center;
		justify-content: center;
		backdrop-filter: blur(1px) brightness(50%);
		z-index: 150;

		form {
			min-height: 20%;
			min-width: 30%;
			background-color: white;
			display: flex;
			flex-direction: column;
			box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,
				rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
			padding: 0.5em 1em;
			transform: scale(1);
			animation: zoomin 0.2s ease-in-out;

			.input_wrapper {
				flex: 1;
				display: flex;
				align-items: center;

				input[type='url'] {
					width: 100%;
					height: 3.5rem;
					border: none;
					outline: 0.2rem solid $border-color-regular;
					padding: 0.5em;
					font-family: 'Arial CE', sans-serif;

					&::placeholder {
						font-family: 'Arial CE', sans-serif;
					}

					&:focus {
						outline-color: #219ebc;
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
					transform: scale(0);
				}

				100% {
					transform: scale(1);
				}
			}
		}
	}
</style>
