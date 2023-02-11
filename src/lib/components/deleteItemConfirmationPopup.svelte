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
			<span>Move {selectedItems.length > 1 ? `these items` : `this item`} to trash?</span>
			<i class="las la-times" />
		</div>
		<div class="middle">
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
		z-index: 6000;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(8px);

		.card {
			min-height: 20rem;
			width: 40rem;
			max-width: 40rem;
			background-color: white;
			display: flex;
			flex-direction: column;
			box-shadow: $modal_box_shadow;
			padding: 2em;
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

			.middle {
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
					transition: all 200ms ease-in-out;
					border-radius: 0.3rem;

					span {
						font-family: 'Arial CE', sans-serif;
						font-size: 1.3rem;
						color: $text-color-regular-2;
					}

					&:hover {
						filter: brightness(95%);
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
					transform: translateY(-50px);
					opacity: 0;
				}

				100% {
					transform: translateY(0);
					opacity: 1;
				}
			}

			@media screen and (max-width: 768px) {
				width: 95%;
				max-width: max-content;
			}
		}
	}
</style>
