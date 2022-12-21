<script lang="ts">
	import { selectedFolders } from './../../stores/stores';
	import { containsSpecialChars } from '$lib/utils/checkForSpecialChars';
	import { hideRenameFolderForm } from '$lib/utils/hideRenameFolderForm';
	import { stop_propagation } from 'svelte/internal';
	import { renameFolder } from '$lib/utils/renameFolder';

	$: folder = $selectedFolders[0];

	async function submitForm() {
		await renameFolder(folder.folder_name, folder.folder_id);
	}
</script>

<div class="rename_folder" on:click|preventDefault|stopPropagation={hideRenameFolderForm} on:keyup>
	<form
		on:click|preventDefault|stopPropagation={stop_propagation}
		on:keyup
		class:form_validation_error={folder.folder_name === '' ||
			containsSpecialChars(folder.folder_name)}
	>
		<div class="top">
			<div class="input">
				<div class="icon">
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
						/></svg
					>
				</div>
				<input
					type="text"
					id="rename_folder_input"
					placeholder="Enter folder name"
					bind:value={folder.folder_name}
					spellcheck="false"
					autocomplete="off"
					autocorrect="off"
				/>
			</div>
		</div>
		<div class="errors">
			{#if folder.folder_name === ''}
				<span>Folder name is required</span>
			{/if}
			{#if containsSpecialChars(folder.folder_name)}
				<span>Folder name must not contain special characters</span>
			{/if}
		</div>
		<div class="bottom">
			<button type="submit" on:click|preventDefault|stopPropagation={submitForm}>
				<span>Rename</span>
			</button>
			<button on:click|preventDefault|stopPropagation={hideRenameFolderForm} on:keyup>
				<span>Cancel</span>
			</button>
		</div>
	</form>
</div>

<style lang="scss">
	.rename_folder {
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

					.icon {
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

						.icon svg path {
							fill: $text-color-regular;
						}
					}
				}
			}

			.errors {
				display: flex;
				flex-direction: column;

				span {
					font-family: 'Arial CE', sans-serif;
					font-size: 1.1rem;
					color: rgb(164, 38, 44);
				}
			}

			.bottom {
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

		.form_validation_error {
			.top {
				.input {
					outline-color: $form_error_red;

					.icon {
						svg {
							path {
								stroke: transparent !important;
								fill: $form_error_red !important;
							}
						}
					}

					&:hover {
						outline-color: $form_error_red;
					}

					&:focus-within {
						outline-color: $form_error_red;
					}
				}
			}

			.bottom {
				button[type='submit'] {
					opacity: 0.5;
					pointer-events: none;
				}
			}
		}
	}
</style>
