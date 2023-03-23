<script lang="ts">
	import { page } from '$app/stores';
	import { handleClickOnMoveButton } from '$lib/utils/handleClickOnMoveButton';
	import { showRenameFolderForm } from '$lib/utils/showRenameFolderForm';
	import { showRenameLinkForm } from '$lib/utils/showRenameLinkForm';
	import { toggleDeleteItemsConfirmationPopup } from '$lib/utils/toggleDeleteItemsConfirmationPopup';
	import { stop_propagation } from 'svelte/internal';
	import { currentCollectionMember, selectedFolders, selectedLinks } from '../../stores/stores';
	import { restoreLinksAndFoldersFromTrash } from '$lib/utils/restoreLinksAndFoldersFromTrash';
	import { restoreFoldersFromTrash } from '$lib/utils/restoreFoldersFromTrash';
	import { restoreLinksFromTrash } from '$lib/utils/restoreLinksFromTrash';
	import { deleteLinksAndFoldersForever } from '$lib/utils/deleteLinksAndFoldersForever';
	import { deleteLinksForever } from '$lib/utils/deleteLinksForever';
	import { deleteFoldersForever } from '$lib/utils/deleteFoldersForever';
	import { removeItemsSelected } from '$lib/utils/removeItemsSelected';
	import { hideContextMenu } from '$lib/utils/hideContextMenu';
	import { resetSelectedLinks } from '$lib/utils/resetSelectedLinks';
	import { resetSelectedFolders } from '$lib/utils/resetSelectedFolders';

	$: selectedItems = [...$selectedFolders, ...$selectedLinks];

	function handleClickOnRenameBtn() {
		if ($selectedFolders.length === 1 && $selectedLinks.length === 0) {
			showRenameFolderForm();
		} else if ($selectedFolders.length === 0 && $selectedLinks.length === 1) {
			showRenameLinkForm();
		}
	}

	async function handleClickOnRestoreButton() {
		console.log($selectedFolders, $selectedLinks);
		if (
			$selectedFolders &&
			$selectedLinks &&
			$selectedFolders.length > 0 &&
			$selectedLinks.length > 0
		) {
			// restore both links and folders

			await restoreLinksAndFoldersFromTrash($selectedFolders, $selectedLinks);
		} else if (
			$selectedFolders &&
			$selectedFolders.length > 0 &&
			$selectedLinks &&
			$selectedLinks.length < 1
		) {
			// restore folders

			await restoreFoldersFromTrash($selectedFolders);
		} else if (
			$selectedFolders &&
			$selectedLinks &&
			$selectedFolders.length < 1 &&
			$selectedLinks.length > 0
		) {
			// restore links

			await restoreLinksFromTrash($selectedLinks);
		}
	}

	async function handleClickOnDeleteForeverButton() {
		if (
			$selectedFolders &&
			$selectedLinks &&
			$selectedFolders.length > 0 &&
			$selectedLinks.length > 0
		) {
			// delete both links and folders

			await deleteLinksAndFoldersForever($selectedFolders, $selectedLinks);
			resetSelectedFolders();
			resetSelectedLinks();
		} else if (
			$selectedFolders &&
			$selectedFolders.length > 0 &&
			$selectedLinks &&
			$selectedLinks.length < 1
		) {
			// delete folders

			await deleteFoldersForever($selectedFolders);
			resetSelectedFolders();
		} else if (
			$selectedFolders &&
			$selectedLinks &&
			$selectedFolders.length < 1 &&
			$selectedLinks.length > 0
		) {
			// delete links

			await deleteLinksForever($selectedLinks);
			// added
			resetSelectedLinks();
		}
	}
</script>

{#if $selectedFolders.length > 0 || $selectedLinks.length > 0}
	<div class="actions_menu" on:click|preventDefault|stopPropagation={stop_propagation} on:keyup>
		{#if $page.url.pathname === '/appv1/my_links/trash'}
			<div
				class="restore"
				on:click|preventDefault|stopPropagation={handleClickOnRestoreButton}
				on:keyup
			>
				<i class="las la-trash-restore" />
				<span>Restore</span>
			</div>
			<div
				class="delete_forever"
				on:click|preventDefault|stopPropagation={handleClickOnDeleteForeverButton}
				on:keyup
			>
				<i class="las la-trash" />
				<span>Delete</span>
			</div>
		{:else}
			<div
				class="rename"
				class:btn_disabled={selectedItems.length > 1}
				on:click|preventDefault|stopPropagation={handleClickOnRenameBtn}
				on:keyup
			>
				<i class="las la-edit" />
				<span>Rename</span>
			</div>
			<div class="move" on:click|preventDefault|stopPropagation={handleClickOnMoveButton} on:keyup>
				<i class="las la-expand-arrows-alt" />
				<span>Move</span>
			</div>
			<!-- class:btn_disabled={$currentCollectionMember.collection_access_level !== undefined &&
				$currentCollectionMember.collection_access_level === 'view'} -->
			<div
				class="delete"
				on:click|preventDefault|stopPropagation={toggleDeleteItemsConfirmationPopup}
				on:keyup
			>
				<i class="las la-trash" />
				<span>Delete</span>
			</div>
		{/if}
	</div>
{/if}

<style lang="scss">
	.actions_menu {
		height: 4.5rem;
		width: 100%;
		background-color: white;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 200;
		padding-left: 1.5em;
		display: flex;
		align-items: center;
		gap: 1em;
		border-bottom: 0.1rem solid $border-color-regular;
		//background-color: #002b5b;

		div {
			background-color: $gray;
			min-height: 3.5rem;
			min-width: 10rem;
			padding: 0 1em 0 0.3em;
			width: max-content;
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			transition: all 200ms ease-in-out;
			gap: 1em;
			border-radius: 0.3rem;

			i {
				font-size: 2rem;
			}

			span {
				font-size: 1.3rem;
				font-weight: 500;
				font-family: 'Product Sans Medium', sans-serif;
				color: $text-color-regular-2;
				transition: all 200ms ease-in-out;
			}

			&:hover {
				filter: brightness(90%);

				span {
					color: $text-color-regular;
				}
			}
		}

		.btn_disabled {
			opacity: 0.4;
			pointer-events: none;
		}
	}
</style>
