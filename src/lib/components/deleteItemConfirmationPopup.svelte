<script lang="ts">
	import { selectedFolders, selectedLinks } from './../../stores/stores';
	import { toggleDeleteItemsConfirmationPopup } from '$lib/utils/toggleDeleteItemsConfirmationPopup';
	import { stop_propagation } from 'svelte/internal';
	import { moveFoldersToTrash } from '$lib/utils/moveFoldersToTrash';
	import { moveLinksToTrash } from '$lib/utils/moveLinksToTrash';
	import { moveLinksAndFoldersToTrash } from '$lib/utils/moveLinksAndFoldersToTrash';

	async function handleClickOnDeleteButton() {
		if ($selectedFolders.length > 0 && $selectedLinks.length < 1) {
			console.log('delete folders');
			await moveFoldersToTrash($selectedFolders);
		} else if ($selectedFolders.length < 1 && $selectedLinks.length > 0) {
			console.log('delete links');
			await moveLinksToTrash($selectedLinks);
		} else if ($selectedFolders.length > 0 && $selectedLinks.length > 0) {
			console.log('delete folders AND links');
			await moveLinksAndFoldersToTrash($selectedFolders, $selectedLinks);
		}
	}

	$: selectedItems = [...$selectedFolders, ...$selectedLinks];
</script>

<div
	class="delete_items_confirmation_popup"
	on:click|preventDefault|stopPropagation={toggleDeleteItemsConfirmationPopup}
	on:keyup
>
	<div class="card" on:click|preventDefault|stopPropagation={stop_propagation} on:keyup>
		<div class="top">
			<span>
				Are you sure you want to move {selectedItems.length > 1 ? `these items` : `this item`} to trash?
				You can restore {selectedItems.length > 1 ? `them` : `it`} later.
			</span>
		</div>
		<div class="buttons">
			<div
				class="button delete"
				on:click|preventDefault|stopPropagation={handleClickOnDeleteButton}
				on:keyup
			>
				<span>I'm sure</span>
			</div>
			<div
				class="button"
				on:click|preventDefault|stopPropagation={toggleDeleteItemsConfirmationPopup}
				on:keyup
			>
				<span>Cancel</span>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.delete_items_confirmation_popup {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		backdrop-filter: blur(2px) brightness(50%);
		z-index: 100;

		.card {
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
				display: flex;
				align-items: center;

				span {
					font-family: 'Arial CE', sans-serif;
					color: $text-color-dropbox;
					font-size: 1.3rem;
				}
			}

			.buttons {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				gap: 0.5em;

				.button {
					height: 3.5rem;
					min-width: 7rem;
					border: none;
					background-color: $gray;
					cursor: pointer;
					display: flex;
					align-items: center;
					justify-content: center;

					span {
						font-family: 'Product Sans Medium', sans-serif;
						font-size: 1.3rem;
						color: $text-color-regular-2;
					}

					&:hover {
						filter: brightness(80%);
					}
				}

				.delete {
					background-color: $red;
					display: flex;
					align-items: center;
					grid-area: 1em;

					span {
						color: white;
					}
				}
			}

			@keyframes zoomin {
				0% {
					transform: scale(0.3);
				}

				100% {
					transform: scale(1);
				}
			}
		}
	}
</style>
