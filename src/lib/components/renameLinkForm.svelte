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
		<div class="top">
			<span>Rename link</span>
			<i class="las la-times" />
		</div>
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
			padding: 2em;
			//transform: scale(1);
			animation: zoomin 0.5s ease-in-out;
			border-radius: 0.6rem;
			gap: 1em;

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
					background-image: linear-gradient(to top, #e1e8eb 50%, $gray 50%);
					background-size: 100% 200%;
					background-position: top;
					transition: all 200ms ease-in-out;
					border-radius: 0.3rem;

					span {
						font-family: 'Product Sans Medium', sans-serif;
						font-size: 1.3rem;
						color: $text-color-regular;
					}

					&:hover {
						background-position: bottom;

						span {
							color: $text-color-regular;
						}
					}
				}

				button[type='submit'] {
					background-image: linear-gradient(to top, #0081c9 50%, $blue 50%);

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
</style>
