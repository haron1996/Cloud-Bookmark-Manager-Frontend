<script lang="ts">
	import {
		accessToken,
		activePath,
		currentCollectionMember,
		errors,
		foldersFound,
		linksFound,
		linksToRenderInMoveItemsPopup,
		openedFolder,
		session,
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
	//import { checkIfIsAuthenticated } from '$lib/utils/checkIfAccountIsAuthenticated';
	import { browser } from '$app/environment';
	import { getLinksAndLinkFolders } from '$lib/utils/getRootLinks';
	import SuccessNotif from '$lib/components/sucess.svelte';
	import ErrorNotif from '$lib/components/error_notif.svelte';
	import { hideProfileMenu } from '$lib/utils/toggleProfileMenu';
	import Menu from '$lib/components/menu.svelte';
	import SearchResults from '$lib/components/searchResults.svelte';
	//import { checkIfUserIsLoggedIn } from '$lib/utils/checkIfUserIsLoggedIn';
	import New from '$lib/components/new.svelte';
	import { SwitchOnCreateMode } from '$lib/utils/switchOnCreateMode';
	import Menubar from '$lib/components/menubar.svelte';
	import VerifyEmailWarning from '$lib/components/verifyEmailWarning.svelte';
	import OtpModal from '$lib/components/otpModal.svelte';
	import { checkIfIsAuthenticated } from '$lib/utils/checkIfAccountIsAuthenticated';
	import { checkIfUserIsLoggedIn } from '$lib/utils/checkIfUserIsLoggedIn';
	import Checkmark from '$lib/components/checkmark.svelte';
	import FolderInTrashAlert from '$lib/components/folderInTrashAlert.svelte';
	import SearchLoading from '$lib/components/searchLoading.svelte';
	import ThankYou from '$lib/components/thank-you.svelte';
	import Contact from '$lib/components/contact.svelte';
	import MessageSent from '$lib/components/messageSent.svelte';
	import { hideMenuBar } from '$lib/utils/toggleMenuBar';
	import { hideContextMenu } from '$lib/utils/hideContextMenu';
	import src from '$lib/images/no_items.jpg';
	import ShareCollection from '$lib/components/shareCollection.svelte';
	import Loading from '$lib/components/loading.svelte';

	let el: HTMLElement;

	// $: if ($accessToken === '' || $accessToken === undefined) {
	// 	if (browser) {
	// 		goto('http://localhost:5173/accounts/sign_in');
	// 	}
	// }

	afterNavigate(async () => {
		hideMenuBar();
		// await checkIfUserIsLoggedIn();

		setSession();

		// checkIfUserHasAccessToken();

		// hide profile popup
		hideProfileMenu();

		setCurrentFolder();

		getAccountID();

		showEmailVerificationWarningPopup();
	});

	afterUpdate(() => {
		checkIfNoFoldersAndLinks();
	});

	function checkIfUserHasAccessToken() {
		if (window.localStorage.getItem('session') === null) {
			goto('https://www.bookmarkbucket.com/accounts/sign_in');
			return;
		}
	}

	function checkIfNoFoldersAndLinks() {
		el = document.getElementById('addLinkOrCreateFolderBtn') as HTMLDivElement;

		if (el) {
			el.classList.add('animate__animated', 'animate__bounceIn');
		}
	}

	onMount(() => {
		getCurrentFolderAfterNavigate();
	});

	// beforeUpdate(() => {
	// 	checkIfUserIsLoggedIn();
	// });

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

	function setSession() {
		session.set(JSON.parse(getSession()));
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
		if (
			$currentCollectionMember.collection_access_level !== undefined &&
			$currentCollectionMember.collection_access_level === 'view'
		)
			return;

		hideMenuBar();

		hideSelectShowCategoryMenu();

		hideShowOptionsMenu();

		hideSearchFormPopup();

		showContextMenu(e);
	}

	// show email verification status warning if email is not verified
	function showEmailVerificationWarningPopup() {
		if (browser) {
			const el = document.getElementById('verify_email_warning') as HTMLDivElement | null;

			if (el && !$session.Account?.email_verified) {
				el.classList.add('show_verify_email_warning');
			}
		}
	}

	function handleAddItemWhenParentCollectionIsEmpty() {
		hideContextMenu();

		hideMenuBar();

		SwitchOnCreateMode();
	}

	$: if ($page.url.pathname === '/appv1/my_links') {
		activePath.set('Home');
	} else if ($page.url.pathname === '/appv1/my_links/recycle_bin') {
		activePath.set('Trash');
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

<SuccessNotif />

<ErrorNotif />

<Menu />

<SearchResults />

<Menubar />

<OtpModal />

<!-- {#if !$userIsLoggedin}
	<SignIn />
{/if} -->

<Contextmenu />

<New />

<VerifyEmailWarning />

<Checkmark />

<FolderInTrashAlert />

<SearchLoading />

<Contact />

<MessageSent />

<ShareCollection />

<Loading />

<div class="container">
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
				{#each $links as link}
					<Link {link} />
				{/each}
				{#each $folders as folder}
					<Folder on:click {folder} />
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
						{#if $page.url.pathname === '/appv1/my_links/trash'}
							<span>No items in trash</span>
						{:else if $page.url.pathname === '/appv1/my_links/shared_with_me'}
							<p>Nothing has been shared with you yet!</p>
						{:else}
							<!-- <div
								class="button"
								id="addLinkOrCreateFolderBtn"
								on:click|preventDefault|stopPropagation={SwitchOnCreateMode}
								on:keyup
							>
								<span>New</span>
								<i class="las la-plus" />
							</div> -->
							<!-- <span
								class="add_link"
								on:click|preventDefault|stopPropagation={handleAddItemWhenParentCollectionIsEmpty}
								on:keyup>Click to add</span
							> -->
							<img {src} alt="no-items" />
							<div class="text">
								<p>This collection is empty...</p>
								<button
									on:click|preventDefault|stopPropagation={handleAddItemWhenParentCollectionIsEmpty}
								>
									<i class="las la-plus" />
									<span>Add link or create collection</span>
									<i class="las la-angle-down" />
								</button>
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
			top: 4.5rem;
			left: 0;
			width: 100%;
			height: calc(100% - 4.5rem);
			max-height: calc(100% - 4.5rem);
			padding: 1em;
			display: flex;
			gap: 1.5em;
			overflow: auto;
			flex-wrap: wrap;
			align-content: flex-start;

			.no_items_container {
				height: 100%;
				width: 100vw;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				// span {
				// 	font-size: 1.3rem;
				// 	font-family: 'Product Sans Medium', sans-serif;
				// 	color: $text-color-regular-2;
				// 	transition: all 200ms ease-in-out;
				// }

				// span.add_link {
				// 	cursor: pointer;

				// 	&:hover {
				// 		text-decoration: underline;
				// 	}
				// }

				// .button {
				// 	height: 3.5rem;
				// 	width: 9rem;
				// 	display: flex;
				// 	align-items: center;
				// 	justify-content: center;
				// 	gap: 1em;
				// 	background-color: $blue;
				// 	cursor: pointer;
				// 	border-radius: 0.3rem;

				// 	span {
				// 		font-family: 'Arial CE', sans-serif;
				// 		color: white;
				// 		font-size: 1.3rem;
				// 	}

				// 	i {
				// 		font-size: 1.5rem;
				// 		background-color: white;
				// 		border-radius: 100vh;
				// 	}
				// }

				img {
					width: 30rem;
					object-fit: contain;
				}

				.text {
					display: flex;
					flex-direction: column;
					gap: 1em;
					align-items: center;
					justify-content: center;

					p {
						font-size: 1.3rem;
						font-family: 'Arial CE', sans-serif;
						color: $text-color-dropbox;
					}

					button {
						display: flex;
						align-items: center;
						gap: 0.5em;
						border: 0.1rem solid #ffea20;
						outline-color: transparent;
						background-color: #ffea20;
						min-width: max-content;
						padding: 0.5em 1em;
						cursor: pointer;
						border-radius: 0.2rem;

						i {
							font-size: 1.8rem;
							color: $text-color-dropbox;
						}

						span {
							font-size: 1.3rem;
							font-family: 'Arial CE', sans-serif;
							color: $text-color-dropbox;
						}

						&:hover {
							outline: 0.1rem dashed $border-color-regular;
							outline-offset: 0.2rem;
						}
					}
				}
			}
		}
	}
</style>
