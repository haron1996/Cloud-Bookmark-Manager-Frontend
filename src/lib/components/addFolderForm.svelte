<script lang="ts">
	import { page } from '$app/stores';
	import { moveItemsMode } from './../../stores/stores';
	import { selectedDestinationFolder } from './../../stores/stores';
	import { currentFolder } from './../../stores/stores';
	import { folderName } from '../../stores/stores';
	import { createFolderMode } from '../../stores/stores';
	import { stop_propagation } from 'svelte/internal';
	import { CreateFolder } from '$lib/utils/createFolder';
	import { containsSpecialChars } from '$lib/utils/checkForSpecialChars';
	import { showCreateFolderForm } from '$lib/utils/toggleCreateFolderForm';
	import { createFolderFromMoveItemsPopup } from '$lib/utils/createFolderFromMoveItemsPopup';
	import { hideShowOptionsMenu } from '$lib/types/hideShowOptionsMenu';

	async function submitForm() {
		if ($moveItemsMode) {
			console.log('move items mode on');
			if ($selectedDestinationFolder.folder_id !== undefined) {
				await createFolderFromMoveItemsPopup($folderName, $selectedDestinationFolder.folder_id);
			} else {
				console.log($selectedDestinationFolder.folder_id);
				await createFolderFromMoveItemsPopup($folderName, '');
			}
		} else {
			await CreateFolder($folderName, $page.params.folder_id);
		}
	}
</script>

<div
	class="create-folder"
	on:click|preventDefault|stopPropagation={showCreateFolderForm}
	on:keydown
>
	<form
		on:click|preventDefault|stopPropagation={stop_propagation}
		on:keypress
		on:submit={() => {
			console.log('submited');
		}}
	>
		<div class="top">
			<div
				class="input"
				class:outline-red={$folderName === '' || containsSpecialChars($folderName)}
			>
				<div class="folder-icon">
					<svg
						width="24px"
						height="24px"
						stroke-width="1.5"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						color="#000000"
						><path
							d="M2 11V4.6a.6.6 0 01.6-.6h6.178a.6.6 0 01.39.144l3.164 2.712a.6.6 0 00.39.144H21.4a.6.6 0 01.6.6V11M2 11v8.4a.6.6 0 00.6.6h18.8a.6.6 0 00.6-.6V11M2 11h20"
							stroke="#000000"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</div>
				<input
					id="create-folder-input"
					type="text"
					bind:value={$folderName}
					placeholder="Enter folder name..."
					autocomplete="off"
					autocorrect="off"
					spellcheck="false"
				/>
			</div>
		</div>
		<div class="errors">
			{#if $folderName === ''}
				<span>Folder name is required</span>
			{/if}
			{#if containsSpecialChars($folderName)}
				<span>Folder name must not contain special characters</span>
			{/if}
		</div>
		<div class="bottom">
			<div class="buttons">
				<button
					on:click|preventDefault|stopPropagation|once={submitForm}
					type="submit"
					class:disabled={$folderName === '' || containsSpecialChars($folderName)}
				>
					<span>Create</span>
				</button>
				<button on:click|preventDefault|stopPropagation={showCreateFolderForm}>
					<span>Cancel</span>
				</button>
			</div>
		</div>
	</form>
</div>

<style lang="scss">
	.create-folder {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		backdrop-filter: blur(2px) brightness(50%);
		z-index: 1500;

		form {
			min-height: 23%;
			min-width: 30%;
			background-color: white;
			display: flex;
			flex-direction: column;
			box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,
				rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
			padding: 0.5em 1em;
			transform: scale(1);
			animation: zoomin 0.2s ease-in-out;

			.top {
				flex: 1;
				width: 100%;
				display: flex;
				align-items: center;

				.input {
					display: flex;
					align-items: center;
					width: 100%;
					border: 0.2rem solid $border-color-regular;
					height: 3.5rem;
					border: none;
					outline: 0.1rem solid $border-color-regular;

					.folder-icon {
						width: 10%;
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: center;

						svg {
							path {
								stroke: transparent;
								fill: rgba(0, 0, 0, 0.5);
							}
						}
					}

					input[type='text'] {
						width: 90%;
						border: none;
						outline: none;
						height: 100%;
						padding: 0 0.5em;
						font-family: 'Arial CE', sans-serif;

						&::placeholder {
							font-family: 'Arial CE', sans-serif;
						}
					}

					&:hover {
						outline-color: $secondary-blue;
					}

					&:focus-within {
						outline-color: $secondary-blue;

						.folder-icon svg path {
							fill: $text-color-regular;
						}
					}
				}

				.outline-red {
					outline-color: $form_error_red;

					&:hover {
						outline-color: $form_error_red;
					}

					&:focus-within {
						outline-color: $form_error_red;
					}
				}
			}

			.errors {
				display: flex;
				flex-direction: column;

				span {
					font-family: 'Arial CE', sans-serif;
					font-size: 1.1rem;
					color: $form_error_red;
				}
			}

			.bottom {
				flex: 1;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: flex-end;

				.buttons {
					display: flex;
					align-items: center;
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
						transition: all 200ms ease-in-out;

						span {
							color: $text-color-regular;
							font-family: 'Arial CE', sans-serif;
						}

						&:hover {
							//background-color: $secondary-blue;
							//background-position: bottom;
							filter: brightness(90%);
						}
					}

					.disabled {
						opacity: 0.5;
						pointer-events: none;
					}
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
