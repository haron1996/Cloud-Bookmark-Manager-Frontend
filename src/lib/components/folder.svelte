<script lang="ts">
	import {
		foldersCut,
		controlKeyIsPressed,
		selectedLinks,
		selectedFolders,
		showFolderInTrashAlert,
		currentCollectionMember,
		loading,
		breadcrumbRoot,
		apiURL
	} from './../../stores/stores';
	import type { Folder } from '$lib/types/folder';
	import { prevent_default, stop_propagation } from 'svelte/internal';
	import { showContextMenu } from '$lib/utils/showContextMenu';
	import { hideContextMenu } from '$lib/utils/hideContextMenu';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import interact from 'interactjs';
	import { parse } from 'cookie';
	import { dragFolder } from '$lib/utils/dragFolder';
	import { ListenToDrop } from '$lib/utils/handleElementDrop';
	import { FolderDragOver } from '$lib/utils/handleFolderDragOver';
	import { FolderDragLeave } from '$lib/utils/handleFolderDragLeave';
	import { hideMenuBar } from '$lib/utils/toggleMenuBar';
	import { getSession } from '$lib/utils/getSession';

	export let folder: Partial<Folder>;

	let folderSelected: Partial<Folder> = {};
	let subfolderOf: string | undefined = '';
	let path: string;
	let el: HTMLElement;
	let baseURL: string = '';

	const getBaseUrl = apiURL.subscribe((value) => {
		baseURL = value;
	});

	getBaseUrl();

	function handleCheckBoxClick() {
		if (
			$currentCollectionMember.collection_access_level !== undefined &&
			$currentCollectionMember.collection_access_level === 'view'
		)
			return;

		const checkBox = window.event?.currentTarget as HTMLDivElement | null;

		if (checkBox === null) return;

		subfolderOf = checkBox.dataset.subfolderof;

		if (subfolderOf === undefined) return;

		folderSelected = {
			folder_id: checkBox?.dataset.folderid,
			folder_name: checkBox?.dataset.foldername,
			subfolder_of:
				subfolderOf === ''
					? { String: subfolderOf, Valid: false }
					: { String: subfolderOf, Valid: true }
		};

		if ($selectedFolders.map((f) => f.folder_id).includes(folderSelected.folder_id)) {
			removeFolderFromSelectedFolders(folderSelected);
		} else {
			appendFolderToSelectedFolders(folderSelected);
		}

		hideContextMenu();

		hideMenuBar();
	}

	function appendFolderToSelectedFolders(folder: Partial<Folder>) {
		$selectedFolders = [...$selectedFolders, folder];
	}

	function removeFolderFromSelectedFolders(folder: Partial<Folder>) {
		// if (folderID === undefined) return;

		$selectedFolders = $selectedFolders.filter((f) => f.folder_id !== folder.folder_id);
	}

	function handleFolderClick() {
		if (
			$currentCollectionMember.collection_access_level !== undefined &&
			$currentCollectionMember.collection_access_level === 'view'
		)
			return;

		const el = window.event?.currentTarget as HTMLDivElement | null;

		if (el === null) return;

		if (el.dataset.folderid) {
			if ($page.url.pathname === '/appv1/my_links/shared_with_me') {
				checkIfCurrentFolderHasBeenSHaredWithUser(el.dataset.folderid);
			}
		}

		subfolderOf = el.dataset.subfolderof;

		if (subfolderOf === undefined) return;

		folderSelected = {
			folder_id: el.dataset.folderid,
			folder_name: el.dataset.foldername,
			subfolder_of:
				subfolderOf === ''
					? { String: subfolderOf, Valid: false }
					: { String: subfolderOf, Valid: true }
		};

		if ($controlKeyIsPressed) {
			if ($selectedFolders.map((f) => f.folder_id).includes(folderSelected.folder_id)) {
				removeFolderFromSelectedFolders(folderSelected);
			} else {
				appendFolderToSelectedFolders(folderSelected);
			}
		} else {
			selectedFolders.set([]);

			appendFolderToSelectedFolders(folderSelected);

			selectedLinks.set([]);
		}

		hideContextMenu();

		hideMenuBar();

		if (
			$currentCollectionMember.collection_access_level !== undefined &&
			$currentCollectionMember.collection_access_level === 'view'
		) {
			alert('user not allowed to edit');
		}
	}

	function handleFolderContextMenu(e: MouseEvent) {
		if (
			$currentCollectionMember.collection_access_level !== undefined &&
			$currentCollectionMember.collection_access_level === 'view'
		)
			return;

		hideMenuBar();

		showContextMenu(e);

		const folder = window.event?.currentTarget as HTMLDivElement;

		subfolderOf = folder.dataset.subfolderof;

		if (subfolderOf === undefined) return;

		folderSelected = {
			folder_id: folder.dataset.folderid,
			folder_name: folder.dataset.foldername,
			subfolder_of:
				subfolderOf === ''
					? { String: subfolderOf, Valid: false }
					: { String: subfolderOf, Valid: true }
		};

		if (!$selectedFolders.map((f) => f.folder_id).includes(folderSelected.folder_id)) {
			selectedLinks.set([]);

			selectedFolders.set([]);

			appendFolderToSelectedFolders(folderSelected);
		}
	}

	function handleClickOnFolderName() {
		hideMenuBar();

		const getCurrentPath = page.subscribe((value) => {
			path = value.url.pathname;
		});

		getCurrentPath();

		if (path === '/appv1/my_links/trash') {
			showFolderInTrashAlert.set(true);
			// alert(`Restore before you can open`)
			return;
		}

		const target = window.event?.currentTarget as HTMLSpanElement;

		const folder = target.closest('.folder') as HTMLDivElement;

		const folderID: string | undefined = folder.dataset.folderid;

		if (folderID === undefined) return;

		goto(`${$page.url.origin}/appv1/my_links/${folderID}`);

		//window.location.href = `/appv1/my_links/${folderID}`;
	}

	function handleFolderDragEnd(e: DragEvent) {
		el = e.target as HTMLDivElement;

		el = el.closest('.folder') as HTMLDivElement;

		el.classList.remove('folder_drag_over');

		el.classList.remove('dragged_folder');
	}

	async function checkIfCurrentFolderHasBeenSHaredWithUser(folderID: string) {
		if (getSession() === null) {
			loading.set(false);
			return;
		}

		const accountID = JSON.parse(getSession()).Account.id;

		const url = `${baseURL}/private/checkIfFolderHasBeenSharedWithUser/${accountID}/${folderID}`;

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

		if (result.message === 'collection be belongs to user') {
			breadcrumbRoot.set('Home');
			return;
		}

		breadcrumbRoot.set('Shared with me');

		console.log(result[0]);

		currentCollectionMember.set(result[0]);
	}
</script>

<div
	class="folder"
	draggable="true"
	class:folder_cut={$foldersCut.map((f) => f.folder_id).includes(folder.folder_id)}
	data-folderid={folder.folder_id}
	data-foldername={folder.folder_name}
	data-accountid={folder.account_id}
	data-folderlabel={folder.label}
	data-folderpath={folder.path}
	data-subfolderof={folder.subfolder_of?.String}
	class:folder-selected={$selectedFolders.map((f) => f.folder_id).includes(folder.folder_id)}
	on:click|preventDefault|stopPropagation={handleFolderClick}
	on:keyup
	on:contextmenu|preventDefault|stopPropagation={handleFolderContextMenu}
	on:dragstart={dragFolder}
	on:dragover|preventDefault={FolderDragOver}
	on:dragleave={FolderDragLeave}
	on:drop|preventDefault={ListenToDrop}
	on:dragend={handleFolderDragEnd}
>
	<div class="top">
		<div class="icon">
			<svg
				width="60px"
				height="60px"
				stroke-width="1.04"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				color="#000000"
				><path
					d="M2 11V4.6a.6.6 0 01.6-.6h6.178a.6.6 0 01.39.144l3.164 2.712a.6.6 0 00.39.144H21.4a.6.6 0 01.6.6V11M2 11v8.4a.6.6 0 00.6.6h18.8a.6.6 0 00.6-.6V11M2 11h20"
					stroke="#000000"
					stroke-width="1.04"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</div>
	</div>
	<div class="bottom">
		<div class="folder-name">
			<span
				class="folder_name"
				on:click|preventDefault|stopPropagation={handleClickOnFolderName}
				on:keyup
			>
				{folder.folder_name}
			</span>
			<span class="last_update"
				>{folder.folder_updated_at ? folder.folder_updated_at : folder.folder_created_at}</span
			>
		</div>
	</div>

	<div
		class="check-box"
		on:click|preventDefault|stopPropagation={handleCheckBoxClick}
		on:keyup
		data-folderid={folder.folder_id}
		data-foldername={folder.folder_name}
		data-accountid={folder.account_id}
		data-folderlabel={folder.label}
		data-folderpath={folder.path}
		data-subfolderof={folder.subfolder_of?.String}
	>
		<svg
			width="24px"
			height="24px"
			stroke-width="1.5"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			color="#000000"
			><path
				d="M5 13l4 4L19 7"
				stroke="#000000"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</div>
</div>

<style lang="scss">
	.folder {
		height: 30rem;
		width: 30rem;
		border: 0.1rem solid $border-color-regular;
		border-radius: 0.6rem;
		position: relative;
		transition: box-shadow 0.3s ease-in-out;
		backdrop-filter: brightness(95%);

		.top {
			height: 80%;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			.icon {
				height: 100%;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;

				svg {
					width: 60%;
					height: 60%;

					path {
						stroke: transparent;
						fill: $yellow;
					}
				}
			}
		}

		.bottom {
			height: 20%;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			.folder-name {
				width: 90%;
				height: 100%;
				padding: 0.5em 0;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				span {
					font-size: 1.3rem;
					font-family: 'Arial CE', sans-serif;
					color: $text-color-regular;
					cursor: pointer;
					transition: color 0.3ms linear;
					min-width: 60%;
					height: max-content;
					display: flex;
					align-items: center;
					justify-content: center;
					text-decoration-line: underline;
					text-decoration-style: solid;
					//text-decoration-skip: spaces;
					text-decoration-color: transparent;
					//background-color: $yellow;
				}

				span.last_update {
					font-family: 'Arial CE', sans-serif;
					color: $text-color-medium;
					font-size: 1.2rem;
					display: none;
				}
			}
		}

		.check-box {
			height: 1.7rem;
			width: 1.7rem;
			display: flex;
			align-items: center;
			justify-content: center;
			border: 0.15rem solid $text-color-regular;
			position: absolute;
			top: 1%;
			right: 1%;
			background-color: white;
			opacity: 0;
			border-radius: 100vh;
			transform: scale(1);
			box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
			transition: opacity 0.2s linear, transform 0.2s linear;

			svg {
				visibility: hidden;
				pointer-events: none;

				path {
					stroke: $stroke;
					pointer-events: none;
				}
			}

			&:hover {
				transform: scale(1.1);

				svg {
					visibility: visible;
				}
			}
		}

		&:hover {
			backdrop-filter: brightness(95%);
			box-shadow: 0 0.125rem 0.5rem 0 rgb(0 0 0 / 22%);

			.check-box {
				opacity: 1;
			}

			.bottom {
				.folder-name {
					span.folder_name {
						text-decoration-color: $text-color-regular;
					}
				}
			}
		}

		&:hover {
			.bottom {
				.folder-name {
					span.folder_name {
						text-emphasis-color: $yellow !important;
					}
				}
			}
		}
	}

	.folder_cut {
		border-width: 0.2rem;
		border-style: dashed;
		opacity: 0.5;
		pointer-events: none;
	}

	:global(.folder-selected) {
		backdrop-filter: brightness(95%);

		.top {
			.icon {
				svg {
					path {
						stroke: transparent;
						fill: $main-blue;
					}
				}
			}
		}

		.bottom {
			.folder-name {
				span.folder_name {
					text-decoration-color: $main-blue !important;
				}
			}
		}

		.check-box {
			background-color: $main-blue !important;
			opacity: 1 !important;
			border-color: $main-blue;

			svg {
				visibility: visible;

				path {
					stroke: white !important;
				}
			}
		}

		&:hover {
			box-shadow: none !important;
		}
	}

	:global(.dragged_folder) {
		opacity: 0.4 !important;
		background-color: lightblue;
	}

	:global(.folder_drag_over) {
		outline-offset: 0.4rem;
		outline: 0.2rem solid $blue;
		border-radius: 0 !important;
		//transition: outline 200ms ease-in-out !important;
	}
</style>
