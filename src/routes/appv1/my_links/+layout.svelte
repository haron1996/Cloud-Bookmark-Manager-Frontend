<!-- <script context="module" lang="ts">
	export async function checkIfIsLoggedIn() {
		let s: string = '';

		const unsub = accessToken.subscribe((value) => {
			s = value;
		});

		unsub();

		if (s === '' || s === undefined) {
			return {
				status: 302,
				redirect: '/accounts/sign_in'
			};
		}

		const response = await fetch('http://localhost:5000/public/checkIfIsAuthenticated', {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'omit', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json'
				//authorization: `Bearer${JSON.parse(s).access_token}`
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body: JSON.stringify({
				token: s
			}) // body data type must match "Content-Type" header
		});

		const result = await response.json();

		if (result.message) {
			if (result.message === 'account not found') {
				return {
					status: 302,
					redirect: '/accounts/sign_in'
				};
			} else if (result.message === 'user not found') {
				return {
					status: 302,
					redirect: '/accounts/sign_in'
				};
			} else if (result.message === 'false') {
				return {
					status: 302,
					redirect: '/accounts/sign_in'
				};
			}
		}
	}

	checkIfIsLoggedIn();
</script> -->
<script lang="ts">
	import {
		accessToken,
		activePath,
		errors,
		foldersFound,
		linksFound,
		linksToRenderInMoveItemsPopup,
		openedFolder,
		userIsLoggedin
	} from './../../../stores/stores';
	import ActionsMenu from '$lib/components/actionsMenu.svelte';
	import { confirmDeleteItemsMode } from './../../../stores/stores';
	import DeleteItemConfirmationPopup from '$lib/components/deleteItemConfirmationPopup.svelte';
	import { selectedDestinationFolder } from './../../../stores/stores';
	import { accountID } from './../../../stores/stores';
	import { moveItemsMode } from './../../../stores/stores';
	import MoveItemsPopup from '$lib/components/moveItemsPopup.svelte';
	import { renameLinkMode } from './../../../stores/stores';
	import RenameLinkForm from '$lib/components/renameLinkForm.svelte';
	import { renameFolderMode } from './../../../stores/stores';
	import RenameFolderForm from '$lib/components/renameFolderForm.svelte';
	import { rightClickedElement } from './../../../stores/stores';
	import { selectedLinks } from './../../../stores/stores';
	import { currentFolder } from './../../../stores/stores';
	import { controlKeyIsPressed, selectedFolders } from './../../../stores/stores';
	import { createFolderMode } from './../../../stores/stores';
	import { loading } from './../../../stores/stores';
	import Navbar from '$lib/components/navbar.svelte';
	import Breadcrumb from '$lib/components/breadcrumb.svelte';
	import Folder from '$lib/components/folder.svelte';
	import Link from '$lib/components/link.svelte';
	import Spinner from '$lib/components/spinner.svelte';
	import Morphingbar from '$lib/components/morphingbar.svelte';
	import { folders } from '../../../stores/stores';
	import { links } from '../../../stores/stores';
	import CreateFolderForm from '$lib/components/addFolderForm.svelte';
	import Contextmenu from '$lib/components/contextmenu.svelte';
	import { showContextMenu } from '$lib/utils/showContextMenu';
	import AddLinkForm from '$lib/components/addLinkForm.svelte';
	import { addLinkMode } from './../../../stores/stores';
	import { page } from '$app/stores';
	import { afterNavigate, goto } from '$app/navigation';
	import { getSession } from '$lib/utils/getSession';
	import { afterUpdate, beforeUpdate, onMount } from 'svelte';
	import Loader from '$lib/components/loader.svelte';
	import { getFolder } from '$lib/utils/getFolder';
	import { mouseEvent } from './../../../stores/stores';
	import { hideShowOptionsMenu } from '$lib/types/hideShowOptionsMenu';
	import { hideSelectShowCategoryMenu } from '$lib/utils/hideSelectSearchCategory';
	import { showSearchForm } from './../../../stores/stores';
	import { hideSearchFormPopup } from '$lib/utils/toggleSearchForm';
	import SignIn from '$lib/components/signIn.svelte';
	import { json } from '@sveltejs/kit';
	import { resetLinksCut } from '$lib/utils/resetLinksCut';
	import { checkIfIsAuthenticated } from '$lib/utils/checkIfAccountIsAuthenticated';
	import { browser } from '$app/environment';
	import { getLinksAndLinkFolders } from '$lib/utils/getRootLinks';
	import SucessNotif from '$lib/components/sucess_notif.svelte';
	import ErrorNotif from '$lib/components/error_notif.svelte';
	import { hideProfileMenu } from '$lib/utils/toggleProfileMenu';
	import Menu from '$lib/components/menu.svelte';
	import SearchResults from '$lib/components/searchResults.svelte';

	let el: HTMLElement;

	// $: if ($accessToken === '' || $accessToken === undefined) {
	// 	if (browser) {
	// 		goto('http://localhost:5173/accounts/sign_in');
	// 	}
	// }

	afterNavigate(async () => {
		// hide profile popup
		hideProfileMenu();

		await checkIfIsAuthenticated();
		//checkIfUserIsLoggedIn();

		setCurrentFolder();

		getAccountID();

		//console.log(Navigation)
	});

	afterUpdate(() => {
		checkIfNoFoldersAndLinks();
	});

	function checkIfNoFoldersAndLinks() {
		el = document.getElementById('addLinkOrCreateFolderBtn') as HTMLDivElement;

		if (el) {
			el.classList.add('animate__animated', 'animate__bounceIn');
		}
	}

	onMount(() => {
		//checkIfUserIsLoggedIn();

		getCurrentFolderAfterNavigate();
	});

	// beforeUpdate(() => {
	// 	checkIfUserIsLoggedIn();
	// });

	function checkIfUserIsLoggedIn() {
		if (getSession() === null) {
			userIsLoggedin.set(false);

			goto('http://localhost:5173/accounts/sign_in');

			return;
		} else {
			console.log(getSession());
			userIsLoggedin.set(true);
		}
	}

	function getCurrentFolderAfterNavigate() {
		setCurrentFolder();
	}

	function getAccountID() {
		if (getSession() === null) return;

		accountID.set(JSON.parse(getSession()).Account.id);
	}

	function setCurrentFolder() {
		if ($page.params.folder_id === undefined) {
			currentFolder.set('');
		} else {
			currentFolder.set($page.params.folder_id);
		}
	}

	function handleWindowKeyDown(e: KeyboardEvent) {
		if (e.ctrlKey) {
			controlKeyIsPressed.set(true);
		}
	}

	function handleWindowKeyUp(e: KeyboardEvent) {
		if (e.code === 'ControlLeft' || e.code === 'ControlRight') {
			controlKeyIsPressed.set(false);
		}
	}

	function handleClickOnAddLinkOrFolderButton(e: MouseEvent) {
		hideShowOptionsMenu();

		hideSelectShowCategoryMenu();

		el = window.event?.currentTarget as HTMLDivElement;

		el = el.closest('.links') as HTMLDivElement;

		rightClickedElement.set(el);

		showContextMenu(e);
	}

	function handleLinksSectionContextMenu(e: MouseEvent) {
		hideSelectShowCategoryMenu();

		hideShowOptionsMenu();

		hideSearchFormPopup();

		showContextMenu(e);
	}

	$: if ($page.url.pathname === '/appv1/my_links') {
		activePath.set('My links');
	} else if ($page.url.pathname === '/appv1/my_links/recycle_bin') {
		activePath.set('Recycle bin');
	}
	// else if ($page.data.folder_id && $openedFolder.folder_name) {
	// 	activePath.set($openedFolder.folder_name);
	// }
</script>

<svelte:window on:keydown={handleWindowKeyDown} on:keyup={handleWindowKeyUp} />

{#if $createFolderMode}
	<CreateFolderForm />
{/if}

{#if $addLinkMode}
	<AddLinkForm />
{/if}

{#if $renameFolderMode}
	<RenameFolderForm />
{/if}

{#if $renameLinkMode}
	<RenameLinkForm />
{/if}

{#if $moveItemsMode}
	<MoveItemsPopup />
{/if}

{#if $confirmDeleteItemsMode}
	<DeleteItemConfirmationPopup />
{/if}

<SucessNotif />

<ErrorNotif />

<Menu />

<SearchResults />

<!-- {#if !$userIsLoggedin}
	<SignIn />
{/if} -->

<Contextmenu />

<div class="container">
	<script lang="ts">
		const s = window.localStorage.getItem('session');

		if (s === null) {
			location.replace('http://localhost:5173/accounts/sign_in');
		} else {
			checkIfIsAuthenticated();

			async function checkIfIsAuthenticated() {
				const response = await fetch('http://localhost:5000/public/checkIfIsAuthenticated', {
					method: 'POST', // *GET, POST, PUT, DELETE, etc.
					mode: 'cors', // no-cors, *cors, same-origin
					cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
					credentials: 'omit', // include, *same-origin, omit
					headers: {
						'Content-Type': 'application/json'
						//authorization: `Bearer${JSON.parse(s).access_token}`
						// 'Content-Type': 'application/x-www-form-urlencoded',
					},
					redirect: 'follow', // manual, *follow, error
					referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
					body: JSON.stringify({
						token: JSON.parse(s).access_token
					}) // body data type must match "Content-Type" header
				});

				const result = await response.json();

				if (result.message) {
					if (result.message === 'account not found') {
						console.log(result.message);
						alert(result.message);
						location.replace('http://localhost:5173/accounts/sign_in');
					} else if (result.message === 'false') {
						console.log(result.message);
						alert(result.message);
						location.replace('http://localhost:5173/accounts/sign_in');
					} else if (result.message === 'token is expired') {
						console.log(result.message);
						alert(result.message);
						location.replace('http://localhost:5173/accounts/sign_in');
					}
				}
			}
		}
	</script>

	<ActionsMenu />

	<Navbar on:click />

	<div
		class="links"
		id="links"
		on:contextmenu|preventDefault|stopPropagation={handleLinksSectionContextMenu}
		on:keyup
	>
		{#if $loading}
			<Loader />
		{:else if !$loading}
			{#if $folders.length > 0 && $links.length > 0}
				{#each $folders as folder}
					<Folder on:click {folder} />
				{/each}
				{#each $links as link}
					<Link {link} />
				{/each}
			{:else if $folders.length > 0 && $links.length < 1}
				{#each $folders as folder}
					<Folder on:click {folder} />
				{/each}
			{:else if $links.length > 0 && $folders.length < 1}
				{#each $links as link}
					<Link {link} />
				{/each}
			{:else if $folders.length === 0 && $links.length === 0}
				{#if $page.url.pathname}
					<div class="no_items_container">
						{#if $page.url.pathname === '/appv1/my_links/recycle_bin'}
							<span>No items in trash</span>
						{:else}
							<div
								class="button"
								id="addLinkOrCreateFolderBtn"
								on:click|preventDefault|stopPropagation={handleClickOnAddLinkOrFolderButton}
								on:keyup
							>
								<div class="plus_icon">
									<svg
										width="24px"
										height="24px"
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
										/>
									</svg>
								</div>
								<span>Click to add link or create folder</span>
							</div>
						{/if}
					</div>
				{/if}
			{/if}
		{/if}
	</div>
	<slot />
</div>

<style lang="scss">
	.container {
		width: 100%;
		height: 100%;
		position: relative;
		//background-color: green;

		.links {
			position: absolute;
			top: 7vh;
			left: 0;
			width: 100%;
			height: 100%;
			max-height: calc(100vh - 14vh);
			padding: 1.5em;
			display: flex;
			gap: 1.5em;
			overflow-y: auto;
			flex-wrap: wrap;
			align-content: flex-start;
			//background-color: #f3ecb0;

			.no_items_container {
				height: 100%;
				width: 100vw;
				display: flex;
				align-items: center;
				justify-content: center;

				span {
					font-size: 1.3rem;
					font-family: 'Product Sans Medium', sans-serif;
					color: $text-color-regular-2;
				}

				.button {
					background-color: $yellow;
					display: flex;
					align-items: center;
					padding: 0 1em;
					height: 4rem;
					gap: 0.5em;
					cursor: pointer;
					transition: all 200ms ease-in-out;
					box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

					.plus_icon {
						background-color: white;
						height: 1.7rem;
						width: 1.7rem;
						display: flex;
						align-items: center;
						justify-content: center;
						border-radius: 100vh;

						svg {
							path {
								stroke: $text-color-regular;
							}
						}
					}

					span {
						color: $text-color-regular;
						font-size: 1.3rem;
						font-family: 'Arial CE', sans-serif;
						font-weight: 500;
					}

					&:hover {
						box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset,
							rgba(0, 0, 0, 0.9) 0px 0px 0px 1px;
					}
				}
			}
		}
	}
</style>
