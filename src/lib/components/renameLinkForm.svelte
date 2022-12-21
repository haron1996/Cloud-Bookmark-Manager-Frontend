<script lang="ts">
	import { hideRenameLinkForm } from '$lib/utils/hideRenameLinkForm';
	import { renameLinkMode, selectedLinks } from '../../stores/stores';
	import { stop_propagation } from 'svelte/internal';
	import { hideContextMenu } from '$lib/utils/hideContextMenu';
	import { renameLink } from '$lib/utils/renameLink';

	$: link = $selectedLinks[0];

	async function submitForm() {
		renameLinkMode.set(false);

		await renameLink(link.link_title, link.link_id);
	}
</script>

<div class="rename_link" on:click|preventDefault|stopPropagation={hideRenameLinkForm} on:keyup>
	<form on:click|preventDefault|stopPropagation={stop_propagation} on:keyup>
		<div class="input">
			<input
				type="text"
				id="rename_link_title_input"
				placeholder="Enter link title"
				autocomplete="off"
				autocorrect="off"
				spellcheck="false"
				bind:value={link.link_title}
			/>
		</div>
		<div class="buttons">
			<button
				type="submit"
				class:disabled={link.link_title === ''}
				on:click|preventDefault|stopPropagation={submitForm}
			>
				<span>Rename</span>
			</button>
			<button on:click|preventDefault|stopPropagation={hideRenameLinkForm} on:keyup>
				<span>Cancel</span>
			</button>
		</div>
	</form>
</div>

<style lang="scss">
	.rename_link {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		backdrop-filter: blur(1px) brightness(50%);
		z-index: 26;

		form {
			min-height: 23%;
			min-width: 30%;
			background-color: white;
			display: flex;
			flex-direction: column;
			box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,
				rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
			padding: 0.7em;
			transform: scale(1);
			animation: zoomin 0.2s ease-in-out;

			.input {
				flex: 1;
				display: flex;
				align-items: center;
				width: 100%;

				input[type='text'] {
					width: 100%;
					border: none;
					outline: 0.1rem solid $border-color-regular;
					height: 100%;
					padding: 0 0.5em;
					font-family: 'Arial CE', sans-serif;
					height: 3.5rem;

					&::placeholder {
						font-family: 'Arial CE', sans-serif;
					}

					&:hover {
						outline-color: $secondary-blue;
					}

					&:focus {
						outline-color: $secondary-blue;
					}
				}
			}

			.buttons {
				flex: 1;
				width: 100%;
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
					background-image: linear-gradient(to top, $red 50%, $gray 50%);
					background-size: 100% 200%;
					background-position: top;
					transition: background-position 100ms ease-in-out;

					span {
						font-family: 'Product Sans Medium', sans-serif;
						font-size: 1.3rem;
						color: $text-color-regular;
					}

					&:hover {
						background-position: bottom;

						span {
							color: white;
						}
					}
				}

				button[type='submit'] {
					background-color: $main-blue;
					background-image: linear-gradient(to top, $green 50%, $main-blue 50%);

					span {
						color: white;
					}

					&:hover {
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
