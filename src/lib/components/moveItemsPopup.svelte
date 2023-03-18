<script lang="ts">
	import { apiURL, linksToRenderInMoveItemsPopup } from './../../stores/stores';
	import { links } from './../../stores/stores';
	import { page } from '$app/stores';
	import { selectedLinks } from './../../stores/stores';
	import { getSession } from '$lib/utils/getSession';
	import { selectedFolders } from './../../stores/stores';
	import { foldersToRenderInMoveFoldersPopup } from './../../stores/stores';
	import { toggleMoveItemsPopup } from '$lib/utils/toggleMoveItemsPopup';
	import { selectedDestinationFolder, folders } from '../../stores/stores';
	import type { Folder } from '$lib/types/folder';
	import { getFolderChildren } from '$lib/utils/getFolderChildren';
	import { onMount } from 'svelte';
	import { onDestroy, stop_propagation } from 'svelte/internal';
	import { moveFolders } from '$lib/utils/moveFoldersToAnotherFolder';
	import { moveFoldersToRoot } from '$lib/utils/moveFoldersToRoot';
	import 'animate.css';
	import { showCreateFolderForm } from '$lib/utils/toggleCreateFolderForm';
	import { moveLinks } from '$lib/utils/moveLinks';
	import {
		moveLinksAndFoldersToRoot,
		moveLinksAndFoldersToSelectedDestinationFolder
	} from '$lib/utils/moveLinksAndFolders';
	import { getRootFoldersOnly } from '$lib/utils/getRootFoldersOnly';
	import { getFolderLinks } from '$lib/utils/getFolderLinks';
	import { getRootLinksOnly } from '$lib/utils/getRootLinksOnly';

	onMount(async () => {
		foldersToRenderInMoveFoldersPopup.set($folders);
	});

	onDestroy(() => {
		selectedDestinationFolder.set({});

		foldersToRenderInMoveFoldersPopup.set([]);

		linksToRenderInMoveItemsPopup.set([]);
	});

	$: $selectedDestinationFolder, getDestinationFolderNodes(), getDestinationFolderLinks();

	$: $selectedDestinationFolder.folder_id === undefined
		? getRootLinksOnly()
		: console.log('selected destination folder is present');

	async function getDestinationFolderNodes() {
		if ($selectedDestinationFolder.folder_id !== undefined) {
			await getFolderChildren($selectedDestinationFolder);
		}
	}

	async function getDestinationFolderLinks() {
		if ($selectedDestinationFolder.folder_id !== undefined) {
			await getFolderLinks($selectedDestinationFolder.folder_id);
		}
	}

	let selected_destination_folder: Partial<Folder> = {};

	function handleFolderClick() {
		setFolderAsMoveDestinatonFolder();
	}

	function setFolderAsMoveDestinatonFolder() {
		const element = window.event?.currentTarget as HTMLDivElement | null;

		const el = element?.closest('.folder') as HTMLDivElement | null;

		const folderID: string | undefined = el?.dataset.folderid;

		if (folderID === undefined) return;

		const folderName: string | undefined = el?.dataset.foldername;

		if (folderName === undefined) return;

		const parentFolderID: string | undefined = el?.dataset.subfolderof;

		if (parentFolderID === undefined) return;

		const folder: Partial<Folder> = {
			folder_id: folderID,
			folder_name: folderName,
			subfolder_of: { String: parentFolderID, Valid: parentFolderID === '' ? false : true }
		};

		const unsubscribe = selectedDestinationFolder.subscribe((value) => {
			selected_destination_folder = value;
		});

		unsubscribe();

		if (selected_destination_folder.folder_id === folder.folder_id) {
			selectedDestinationFolder.set({});
		} else {
			selectedDestinationFolder.set(folder);
		}
	}

	function openFolder() {
		setFolderAsMoveDestinatonFolder();
	}

	async function returnToPreviousFolder() {
		if (!$selectedDestinationFolder.subfolder_of?.Valid) {
			selectedDestinationFolder.set({});

			foldersToRenderInMoveFoldersPopup.set(await getRootFoldersOnly());
		} else {
			loadPreviousFolder($selectedDestinationFolder);
		}
	}

	async function loadPreviousFolder(folder: Partial<Folder>) {
		let url = `${$apiURL}/private/folder/getOne/${JSON.parse(getSession()).Account.id}/${
			folder.subfolder_of?.String
		}`;

		const res = await fetch(url, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer${JSON.parse(getSession()).access_token}`
			}
		});

		const result = await res.json();

		const f: Partial<Folder> = result[0];

		selectedDestinationFolder.set(f);
	}

	async function handleClickOnSelectButton() {
		if ($selectedFolders.length > 0 && $selectedLinks.length < 1) {
			console.log('move folders');
			if ($selectedDestinationFolder.folder_id !== undefined) {
				await moveFolders($selectedFolders, $selectedDestinationFolder.folder_id);
			} else {
				moveFoldersToRoot($selectedFolders);
			}
		} else if ($selectedFolders.length < 1 && $selectedLinks.length > 0) {
			console.log('move links');
			if ($selectedDestinationFolder.folder_id !== undefined) {
				await moveLinks($selectedLinks, $selectedDestinationFolder.folder_id);
				console.log('move links to selected destination folder');
			} else {
				await moveLinks($selectedLinks, '');
			}
		} else if ($selectedFolders.length > 0 && $selectedLinks.length > 0) {
			if ($selectedDestinationFolder.folder_id !== undefined) {
				console.log('move links and folders to selected destination folder');
				await moveLinksAndFoldersToSelectedDestinationFolder(
					$selectedFolders,
					$selectedLinks,
					$selectedDestinationFolder.folder_id
				);
			} else {
				console.log('move links and folders to root');
				await moveLinksAndFoldersToRoot($selectedFolders, $selectedLinks, '');
			}
		}
	}

	async function handleClickOnCreateFolderIcon() {
		showCreateFolderForm();
	}
</script>

<div
	class="move_items_container"
	on:click|preventDefault|stopPropagation={toggleMoveItemsPopup}
	on:keyup
>
	<div class="card" on:click|preventDefault|stopPropagation={stop_propagation} on:keyup>
		<div class="top_bar">
			<div class="left">
				<div class="folder_name">
					<div class="folder_icon">
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
					<span>
						{$selectedDestinationFolder.folder_name === undefined
							? 'My folders'
							: $selectedDestinationFolder.folder_name}
					</span>
				</div>
			</div>
			<div class="right">
				<div
					class="back_button"
					class:back-button-disabled={$selectedDestinationFolder.folder_id === undefined}
					on:click|preventDefault|stopPropagation={returnToPreviousFolder}
					on:keyup
				>
					<i class="las la-arrow-left" />
					<span>Previous</span>
				</div>
			</div>
		</div>
		<div class="folders">
			{#if $foldersToRenderInMoveFoldersPopup}
				{#each $foldersToRenderInMoveFoldersPopup as { folder_id, folder_name, subfolder_of, account_id, label, path }}
					<div
						class="folder"
						class:selected-destination-folder={folder_id === $selectedDestinationFolder.folder_id}
						class:folder_disabled={$selectedFolders
							.map((folder) => folder.folder_id)
							.includes(folder_id)}
						data-folderid={folder_id}
						data-foldername={folder_name}
						data-subfolderof={subfolder_of?.String}
						data-accountid={account_id}
						data-label={label}
						data-path={path}
						on:click|preventDefault|stopPropagation={handleFolderClick}
						on:keyup
					>
						<div class="top">
							<div class="folder_icon">
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
						</div>
						<div class="bottom" on:click|preventDefault|stopPropagation={openFolder} on:keyup>
							<span>{folder_name}</span>
						</div>
					</div>
				{/each}
			{/if}
		</div>
		<div class="bottom_bar">
			<div class="left">
				<div class="create_folder_icon">
					<svg
						width="24px"
						height="24px"
						stroke-width="1.5"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						color="#000000"
						on:click|preventDefault|stopPropagation={handleClickOnCreateFolderIcon}
						on:keyup
						><path
							d="M18 6h2m2 0h-2m0 0V4m0 2v2M21.4 20H2.6a.6.6 0 01-.6-.6V11h19.4a.6.6 0 01.6.6v7.8a.6.6 0 01-.6.6zM2 11V4.6a.6.6 0 01.6-.6h6.178a.6.6 0 01.39.144l3.164 2.712a.6.6 0 00.39.144H14"
							stroke="#000000"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/></svg
					>
				</div>
			</div>
			<div class="right">
				<div
					class="select"
					on:click|preventDefault|stopPropagation={handleClickOnSelectButton}
					on:keyup
					class:select-button-disabled={($selectedFolders &&
						$selectedFolders
							.map((f) => f.folder_id)
							.includes($selectedDestinationFolder.folder_id)) ||
						($foldersToRenderInMoveFoldersPopup &&
							$selectedFolders.some((f) => {
								return $foldersToRenderInMoveFoldersPopup
									.map((folder) => folder.folder_id)
									.includes(f.folder_id);
							})) ||
						($page.url.pathname === '/appv1/my_links' &&
							$selectedDestinationFolder.folder_id === undefined &&
							$selectedLinks.every((link) => link.folder_id?.Valid === false)) ||
						($selectedLinks.length > 0 &&
							$selectedDestinationFolder.folder_id &&
							$selectedLinks.every(
								(link) => link.folder_id?.String === $selectedDestinationFolder.folder_id
							))}
				>
					<span>Move item</span>
				</div>
				<div class="cancel" on:click|preventDefault|stopPropagation={toggleMoveItemsPopup} on:keyup>
					<span>Cancel</span>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.move_items_container {
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

		.card {
			height: 90%;
			width: 90%;
			background-color: white;
			display: flex;
			flex-direction: column;
			padding: 2em;
			animation: zoomIn 0.5s ease-in-out;
			border-radius: 0.5rem;
			box-shadow: $modal_box_shadow;

			.top_bar {
				height: 8%;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.left {
					flex: 1;
					height: 100%;
					display: flex;
					align-items: center;

					.folder_name {
						display: flex;
						align-items: center;
						gap: 0.5em;
						width: max-content;
						height: 100%;
						width: 100%;

						.folder_icon {
							width: max-content;
							height: max-content;
							display: flex;
							align-items: center;
							justify-content: center;

							svg {
								path {
									stroke: transparent;
									fill: $text-color-regular-2;
								}
							}
						}

						span {
							font-size: 1.3rem;
							font-family: 'Product Sans Medium', sans-serif;
							color: $text-color-regular-2;
						}
					}
				}

				.right {
					flex: 1;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: flex-end;

					.back_button {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 10rem;
						height: 3.5rem;
						background-color: $gray;
						gap: 0.5em;
						cursor: pointer;
						transition: all 200ms ease-in-out;
						border-radius: 0.3rem;

						i {
							font-size: 2rem;
						}

						span {
							font-size: 1.3rem;
							font-family: 'Product Sans Medium', sans-serif;
							color: $text-color-regular-2;
						}

						&:hover {
							filter: brightness(95%);
						}
					}

					.back-button-disabled {
						opacity: 0.5;
						pointer-events: none;
					}
				}
			}

			.folders {
				height: calc(100% - 16%);
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				align-content: flex-start;
				overflow-y: auto;
				gap: 0;

				.folder {
					height: 17rem;
					width: 17rem;
					display: flex;
					flex-direction: column;

					.top {
						flex: 2;
						display: flex;
						align-items: center;
						justify-content: center;

						.folder_icon {
							width: 100%;
							height: 100%;
							display: flex;
							align-items: center;
							justify-content: center;

							svg {
								height: 12rem;
								width: 12rem;

								path {
									fill: $yellow;
									stroke: transparent;
								}
							}
						}
					}

					.bottom {
						flex: 1;
						display: flex;
						align-items: center;
						justify-content: center;

						span {
							color: $text-color-regular-2;
							font-size: 1.3rem;
							font-family: 'Product Sans Medium', sans-serif;
							cursor: pointer;
							text-decoration-line: underline;
							text-decoration-style: solid;
							text-decoration-skip: spaces;
							text-decoration-skip-ink: none;
							text-decoration-color: transparent;
						}
					}

					&:hover {
						.bottom {
							span {
								text-decoration-color: $text-color-regular;
							}
						}
					}
				}

				.folder_disabled {
					opacity: 0.5;
					pointer-events: none;
				}

				.selected-destination-folder {
					.top {
						.folder_icon {
							svg {
								path {
									fill: $yellow;
								}
							}
						}
					}

					.bottom {
						span {
							text-decoration-color: $yellow !important;
						}
					}
				}
			}

			.bottom_bar {
				height: 8%;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.left {
					flex: 1;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: flex-start;

					.create_folder_icon {
						display: flex;
						align-items: center;
						justify-content: center;

						svg {
							cursor: pointer;

							path {
								stroke: $text-color-regular-2;
								pointer-events: none;
							}

							&:hover {
								path {
									stroke: $text-color-regular;
								}
							}
						}
					}
				}

				.right {
					flex: 1;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					gap: 0.5em;

					div.select,
					div.cancel {
						padding: 0.5em 1em;
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

					div.select {
						background-image: linear-gradient(to top, #0081c9 50%, $blue 50%);

						span {
							color: white;
						}

						&:hover {
							background-position: bottom;

							span {
								color: white;
							}
						}
					}

					.select-button-disabled {
						opacity: 0.5;
						pointer-events: none;
					}
				}
			}

			@keyframes zoomIn {
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
			}
		}
	}
</style>
