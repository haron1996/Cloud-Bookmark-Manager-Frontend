<script lang="ts">
	import { page } from '$app/stores';
	import { handleClickOnMoveButton } from '$lib/utils/handleClickOnMoveButton';
	import { showRenameFolderForm } from '$lib/utils/showRenameFolderForm';
	import { showRenameLinkForm } from '$lib/utils/showRenameLinkForm';
	import { toggleDeleteItemsConfirmationPopup } from '$lib/utils/toggleDeleteItemsConfirmationPopup';
	import { stop_propagation } from 'svelte/internal';
	import { selectedFolders, selectedLinks } from '../../stores/stores';
	import { restoreLinksAndFoldersFromTrash } from '$lib/utils/restoreLinksAndFoldersFromTrash';
	import { restoreFoldersFromTrash } from '$lib/utils/restoreFoldersFromTrash';
	import { restoreLinksFromTrash } from '$lib/utils/restoreLinksFromTrash';

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
			console.log('restore links and folders');
			await restoreLinksAndFoldersFromTrash($selectedFolders, $selectedLinks);
		} else if (
			$selectedFolders &&
			$selectedFolders.length > 0 &&
			$selectedLinks &&
			$selectedLinks.length < 1
		) {
			// restore folders
			console.log('restore folders');
			await restoreFoldersFromTrash($selectedFolders);
		} else if (
			$selectedFolders &&
			$selectedLinks &&
			$selectedFolders.length < 1 &&
			$selectedLinks.length > 0
		) {
			// restore links
			console.log('restore links');
			await restoreLinksFromTrash($selectedLinks);
		}
	}

	async function handleClickOnDeleteForeverButton() {
		console.log($selectedFolders, $selectedLinks);
		if (
			$selectedFolders &&
			$selectedLinks &&
			$selectedFolders.length > 0 &&
			$selectedLinks.length > 0
		) {
			// delete both links and folders
			console.log('permanently delete links and folders');
		} else if (
			$selectedFolders &&
			$selectedFolders.length > 0 &&
			$selectedLinks &&
			$selectedLinks.length < 1
		) {
			// delete folders
			console.log('permanently delete folders');
		} else if (
			$selectedFolders &&
			$selectedLinks &&
			$selectedFolders.length < 1 &&
			$selectedLinks.length > 0
		) {
			// delete links
			console.log('permanently delete links');
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
				<span>Restore</span>
			</div>
			<div
				class="delete_forever"
				on:click|preventDefault|stopPropagation={handleClickOnDeleteForeverButton}
				on:keyup
			>
				<span>Delete forever</span>
			</div>
		{:else}
			<div
				class="rename"
				class:btn_disabled={selectedItems.length > 1}
				on:click|preventDefault|stopPropagation={handleClickOnRenameBtn}
				on:keyup
			>
				<span>Rename</span>
			</div>
			<div class="move" on:click|preventDefault|stopPropagation={handleClickOnMoveButton} on:keyup>
				<span>Move</span>
			</div>
			<div
				class="delete"
				on:click|preventDefault|stopPropagation={toggleDeleteItemsConfirmationPopup}
				on:keyup
			>
				<span>Delete</span>
			</div>
		{/if}
	</div>
{/if}

<style lang="scss">
	.actions_menu {
		height: 7vh;
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

		.rename,
		.move,
		.delete,
		.restore,
		.delete_forever {
			background-color: $gray;
			min-height: 3rem;
			min-width: 7rem;
			padding: 0 0.5em;
			width: max-content;
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			transition: all 200ms ease-in-out;

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
