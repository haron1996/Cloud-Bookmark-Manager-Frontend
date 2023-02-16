<script lang="ts">
	import {
		foldersCut,
		linksCut,
		selectedLinks,
		selectedFolders,
		rightClickedElement,
		folders,
		links
	} from './../../stores/stores';
	import moveIcon from '$lib/images/si_Move.svg';
	import { showAddLinkForm } from '$lib/utils/showAddLinkForm';
	import { showCreateFolderForm } from '$lib/utils/toggleCreateFolderForm';
	import { showRenameFolderForm } from '$lib/utils/showRenameFolderForm';
	import { showRenameLinkForm } from '$lib/utils/showRenameLinkForm';
	import { hideContextMenu } from '$lib/utils/hideContextMenu';
	import { toggleMoveItemsPopup } from '$lib/utils/toggleMoveItemsPopup';
	import { toggleDeleteItemsConfirmationPopup } from '$lib/utils/toggleDeleteItemsConfirmationPopup';
	import { cutFolders, emptyFoldersCut } from '$lib/utils/cutFolders';
	import { cutLinks, emptyLinksCut } from '$lib/utils/cutLinks';
	import { moveFolders } from '$lib/utils/moveFoldersToAnotherFolder';
	import { moveLinks } from '$lib/utils/moveLinks';
	import {
		moveLinksAndFoldersToRoot,
		moveLinksAndFoldersToSelectedDestinationFolder
	} from '$lib/utils/moveLinksAndFolders';
	import { selectAllItems } from '$lib/utils/selectAllItems';
	import { openAllLinksInFolder } from '$lib/utils/openAllLinksInFolder';
	import { handleClickOnMoveButton } from '$lib/utils/handleClickOnMoveButton';
	import { handleClickOnRenameButton } from '$lib/utils/handleClickOnRenameButton';
	import { page } from '$app/stores';
	import { moveFoldersToRoot } from '$lib/utils/moveFoldersToRoot';
	import type { Folder } from '$lib/types/folder';
	import type { Link } from '$lib/types/link';
	import { restoreFoldersFromTrash } from '$lib/utils/restoreFoldersFromTrash';
	import { restoreLinksFromTrash } from '$lib/utils/restoreLinksFromTrash';
	import { restoreLinksAndFoldersFromTrash } from '$lib/utils/restoreLinksAndFoldersFromTrash';
	import { deleteFoldersForever } from '$lib/utils/deleteFoldersForever';
	import { deleteLinksForever } from '$lib/utils/deleteLinksForever';
	import { deleteLinksAndFoldersForever } from '$lib/utils/deleteLinksAndFoldersForever';
	import { mouseEvent } from './../../stores/stores';
	import { hideMenuBar } from '$lib/utils/toggleMenuBar';

	let totalItems: (Partial<Folder> | Partial<Link>)[] = [];

	$: selectedItems = [...$selectedFolders, ...$selectedLinks];

	$: if ($folders === null && $links === null) {
		totalItems = [];
	} else if ($folders === null && $links !== null) {
		totalItems = [...$links];
	} else if ($folders !== null && $links === null) {
		totalItems = [...$folders];
	} else if ($folders !== null && $links !== null) {
		totalItems = [...$folders, ...$links];
	}

	function handleClickOnCutButton() {
		hideContextMenu();

		if ($selectedFolders.length > 0 && $selectedLinks.length < 1) {
			emptyLinksCut();
			cutFolders($selectedFolders);
		} else if ($selectedFolders.length < 1 && $selectedLinks.length > 0) {
			emptyFoldersCut();
			cutLinks($selectedLinks);
		} else if ($selectedFolders.length > 0 && $selectedLinks.length > 0) {
			cutFolders($selectedFolders);
			cutLinks($selectedLinks);
		}
	}

	async function handleClickOnPasteButton() {
		hideContextMenu();

		hideMenuBar();

		if ($rightClickedElement.classList.contains('folder') && $selectedFolders.length === 1) {
			if ($foldersCut.length > 0 && $linksCut.length < 1) {
				await moveFolders($foldersCut, $selectedFolders[0].folder_id);
			} else if ($foldersCut.length < 1 && $linksCut.length > 0) {
				if ($selectedFolders[0].folder_id !== undefined) {
					await moveLinks($linksCut, $selectedFolders[0].folder_id);
				}
			} else if ($foldersCut.length > 0 && $linksCut.length > 0) {
				await moveLinksAndFoldersToSelectedDestinationFolder(
					$foldersCut,
					$linksCut,
					$selectedFolders[0].folder_id
				);
			}
		} else if ($rightClickedElement.classList.contains('links')) {
			if ($page.url.pathname === '/appv1/my_links') {
				if ($foldersCut.length > 0 && $linksCut.length < 1) {
					await moveFoldersToRoot($foldersCut);
				} else if ($foldersCut.length < 1 && $linksCut.length > 0) {
					await moveLinks($linksCut, '');
				} else if ($foldersCut.length > 0 && $linksCut.length > 0) {
					await moveLinksAndFoldersToRoot($foldersCut, $linksCut, '');
				}
			} else {
				if ($foldersCut.length > 0 && $linksCut.length < 1) {
					await moveFolders($foldersCut, $page.params.folder_id);
				} else if ($foldersCut.length < 1 && $linksCut.length > 0) {
					await moveLinks($linksCut, $page.params.folder_id);
				} else if ($foldersCut.length > 0 && $linksCut.length > 0) {
					await moveLinksAndFoldersToSelectedDestinationFolder(
						$foldersCut,
						$linksCut,
						$page.params.folder_id
					);
				}
			}

			window.location.reload();
		}
	}

	function handleClickOnSelectAllButton() {
		hideContextMenu();

		if ($folders === null && $links === null) {
			selectAllItems([], []);
		} else if ($folders === null && $links !== null) {
			selectAllItems([], $links);
		} else if ($folders !== null && $links === null) {
			selectAllItems($folders, []);
		} else if ($folders !== null && $links !== null) {
			selectAllItems($folders, $links);
		}
	}

	async function handleClickOnOpenAllLinksButton() {
		hideContextMenu();

		await openAllLinksInFolder();
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
			await deleteLinksAndFoldersForever($selectedFolders, $selectedLinks);
		} else if (
			$selectedFolders &&
			$selectedFolders.length > 0 &&
			$selectedLinks &&
			$selectedLinks.length < 1
		) {
			// delete folders
			console.log('permanently delete folders');
			await deleteFoldersForever($selectedFolders);
		} else if (
			$selectedFolders &&
			$selectedLinks &&
			$selectedFolders.length < 1 &&
			$selectedLinks.length > 0
		) {
			// delete links
			console.log('permanently delete links');
			await deleteLinksForever($selectedLinks);
		}
	}
</script>

<div class="context_menu" id="context_menu">
	{#if $page.url.pathname === '/appv1/my_links/trash'}
		{#if ($rightClickedElement && $rightClickedElement.classList.contains('folder')) || ($rightClickedElement && $rightClickedElement.classList.contains('link'))}
			<div
				class="restore"
				on:click|preventDefault|stopPropagation={handleClickOnRestoreButton}
				on:keyup
			>
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
							d="M4 6v6s0 3 7 3 7-3 7-3V6"
							stroke="#000000"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/><path
							d="M11 3c7 0 7 3 7 3s0 3-7 3-7-3-7-3 0-3 7-3zM11 21c-7 0-7-3-7-3v-6M19 22v-6m0 0l3 3m-3-3l-3 3"
							stroke="#000000"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</div>
				<span>Restore</span>
			</div>
			<div
				class="delete_forever"
				on:click|preventDefault|stopPropagation={handleClickOnDeleteForeverButton}
				on:keyup
			>
				<div class="icon">
					<svg
						width="24px"
						height="24px"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						color="#000000"
						><path
							d="M20 9l-1.995 11.346A2 2 0 0116.035 22h-8.07a2 2 0 01-1.97-1.654L4 9M21 6h-5.625M3 6h5.625m0 0V4a2 2 0 012-2h2.75a2 2 0 012 2v2m-6.75 0h6.75"
							stroke="#000000"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</div>
				<span>Delete</span>
			</div>
		{/if}
	{:else}
		{#if $rightClickedElement && $rightClickedElement.classList.contains('folder')}
			<div
				class="open_all"
				class:button_disabled={$selectedFolders.length > 1}
				on:click|preventDefault|stopPropagation={handleClickOnOpenAllLinksButton}
				on:keyup
			>
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
							d="M8 21h12.4a.6.6 0 00.6-.6V3.6a.6.6 0 00-.6-.6H3.6a.6.6 0 00-.6.6V16M10 6h8M6 6h1M3.5 20.5L12 12m0 0v4m0-4H8"
							stroke="#000000"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/></svg
					>
				</div>
				<span>Open all links</span>
			</div>
		{/if}
		{#if $rightClickedElement && $rightClickedElement.classList.contains('links')}
			<!-- {#if $mouseEvent.type === 'click'} -->
			<div class="new_link" on:click|preventDefault|stopPropagation={showAddLinkForm} on:keyup>
				<div class="icon icon_new_link">
					<svg
						width="26px"
						height="26px"
						stroke-width="1.5"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						color="#000000"
						><path
							d="M6 12h6m6 0h-6m0 0V6m0 6v6"
							stroke="#000000"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/></svg
					>
				</div>
				<span>New link</span>
			</div>
			<div
				class="new_folder"
				on:click|preventDefault|stopPropagation={showCreateFolderForm}
				on:keyup
			>
				<div class="icon">
					<svg
						width="18px"
						height="18px"
						stroke-width="1.5"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						color="#000000"
						><path
							d="M18 6h2m2 0h-2m0 0V4m0 2v2M21.4 20H2.6a.6.6 0 01-.6-.6V11h19.4a.6.6 0 01.6.6v7.8a.6.6 0 01-.6.6zM2 11V4.6a.6.6 0 01.6-.6h6.178a.6.6 0 01.39.144l3.164 2.712a.6.6 0 00.39.144H14"
							stroke="#000000"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/></svg
					>
				</div>
				<span>New folder</span>
			</div>
			<!-- {/if} -->
			<div
				class="select_all"
				class:button_display_none={$mouseEvent.type === 'click'}
				class:button_disabled={totalItems.length < 1}
				on:click|preventDefault|stopPropagation={handleClickOnSelectAllButton}
				on:keyup
			>
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
							d="M8 12h4m4 0h-4m0 0V8m0 4v4M7 4H4v3M4 11v2M11 4h2M11 20h2M20 11v2M17 4h3v3M7 20H4v-3M17 20h3v-3"
							stroke="#000000"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/></svg
					>
				</div>
				<span>Select all</span>
			</div>
		{/if}
		{#if ($rightClickedElement && $rightClickedElement.classList.contains('links')) || ($rightClickedElement && $rightClickedElement.classList.contains('folder'))}
			<!-- {#if $foldersCut.length > 0 && !$foldersCut.some((f) => {
				return $folders.map((folder) => folder.folder_id).includes(f.folder_id);
			})} -->
			<div
				style="display: none;"
				on:click|preventDefault|stopPropagation={handleClickOnPasteButton}
				on:keyup
				class="paste"
				class:button_display_none={$mouseEvent.type === 'click'}
				class:button_disabled={($foldersCut.length < 1 && $linksCut.length < 1) ||
					($foldersCut &&
						$folders &&
						$foldersCut.some((folder) => {
							return $folders.map((f) => f.folder_id).includes(folder.folder_id);
						}) &&
						$rightClickedElement.classList.contains('links')) ||
					($linksCut &&
						$links &&
						$linksCut.some((link) => {
							return $links.map((li) => li.link_id).includes(link.link_id);
						}) &&
						$rightClickedElement.classList.contains('links'))}
			>
				<div class="icon">
					<svg
						width="24px"
						height="24px"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						color="#000000"
						><path
							d="M8.5 4H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2.5"
							stroke="#000000"
							stroke-width="1.5"
							stroke-linecap="round"
						/><path
							d="M8 6.4V4.5a.5.5 0 01.5-.5c.276 0 .504-.224.552-.496C9.2 2.652 9.774 1 12 1s2.8 1.652 2.948 2.504c.048.272.276.496.552.496a.5.5 0 01.5.5v1.9a.6.6 0 01-.6.6H8.6a.6.6 0 01-.6-.6z"
							stroke="#000000"
							stroke-width="1.5"
							stroke-linecap="round"
						/></svg
					>
				</div>
				<span
					>{$rightClickedElement.classList.contains('folder')
						? 'Paste into folder'
						: 'Paste here'}</span
				>
			</div>
			<!-- {/if} -->
		{/if}
		{#if ($rightClickedElement && $rightClickedElement.classList.contains('folder')) || ($rightClickedElement && $rightClickedElement.classList.contains('link'))}
			<!-- {#if !($selectedFolders.length + $selectedLinks.length > 1)} -->
			<div
				class="rename"
				class:button_disabled={selectedItems.length > 1}
				on:click|preventDefault|stopPropagation={handleClickOnRenameButton}
				on:keyup
			>
				<div class="icon">
					<svg
						width="18px"
						height="18px"
						stroke-width="1.5"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						color="#000000"
						><path
							d="M13.02 5.828L15.85 3l4.949 4.95-2.829 2.828m-4.95-4.95l-9.606 9.607a1 1 0 00-.293.707v4.536h4.536a1 1 0 00.707-.293l9.606-9.607m-4.95-4.95l4.95 4.95"
							stroke="#000000"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/></svg
					>
				</div>
				<span>Rename</span>
			</div>
			<!-- {/if} -->
			<div
				class="move_to"
				on:click|preventDefault|stopPropagation={handleClickOnMoveButton}
				on:keyup
			>
				<div class="icon icon_move">
					<img src={moveIcon} alt="move" />
				</div>
				<span>Move to</span>
			</div>
			<div
				style="display: none"
				class="cut"
				on:click|preventDefault|stopPropagation={handleClickOnCutButton}
				on:keyup
			>
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
							d="M6.236 8a3 3 0 10-4.472-4 3 3 0 004.472 4zm0 0L16 16M17 12h1M22 12h1M6.236 16a3 3 0 11-4.472 4 3 3 0 014.472-4zm0 0L16 8"
							stroke="#000000"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/></svg
					>
				</div>
				<span>Cut</span>
			</div>
			<div
				class="delete"
				on:click|preventDefault|stopPropagation={toggleDeleteItemsConfirmationPopup}
				on:keyup
			>
				<div class="icon">
					<svg
						width="18px"
						height="18px"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						color="#000000"
						><path
							d="M20 9l-1.995 11.346A2 2 0 0116.035 22h-8.07a2 2 0 01-1.97-1.654L4 9M21 6h-5.625M3 6h5.625m0 0V4a2 2 0 012-2h2.75a2 2 0 012 2v2m-6.75 0h6.75"
							stroke="#000000"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/></svg
					>
				</div>
				<span>Delete</span>
			</div>
		{/if}
	{/if}
</div>

<style lang="scss">
	.context_menu {
		position: fixed;
		z-index: 26;
		background-color: white;
		height: max-content;
		width: 20rem;
		display: flex;
		flex-direction: column;
		box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
		padding: 0.5em;
		border-radius: 0.3rem;
		display: none;

		.open_all,
		.new_folder,
		.new_link,
		.rename,
		.move_to,
		.paste,
		.select_all,
		.cut,
		.delete,
		.restore,
		.delete_forever {
			display: flex;
			height: 3.5rem;
			align-items: center;
			cursor: pointer;
			gap: 1em;
			padding-left: 1em;
			border-bottom: 0.1rem solid rgb(0, 0, 0, 0.1);

			.icon {
				height: 2rem;
				width: 2rem;
				display: flex;
				align-items: center;
				justify-content: center;

				svg path {
					stroke: $text-color-regular;
				}

				img {
					max-inline-size: 100%;
					width: 90%;
					height: 90%;
				}
			}

			span {
				font-size: 1.3rem;
				font-family: 'Arial CE', sans-serif;
				color: $text-color-regular;
			}

			&:hover {
				background-color: rgb(239, 239, 239);
				border-radius: inherit;
			}
		}

		.button_display_none {
			display: none;
		}

		.button_disabled {
			opacity: 0.5;
			pointer-events: none;
		}
	}
</style>
