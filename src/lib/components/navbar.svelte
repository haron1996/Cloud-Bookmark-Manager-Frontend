<script lang="ts">
	import user from '$lib/images/user.png';
	import 'animate.css';
	import { showAddLinkForm } from '$lib/utils/showAddLinkForm';
	import { showCreateFolderForm } from '$lib/utils/toggleCreateFolderForm';
	import { element, stop_propagation } from 'svelte/internal';
	import { page } from '$app/stores';
	import {
		activePath,
		ancestorsOfCurrentFolder,
		session,
		showOptionsMenu,
		openedFolder,
		menuToggled,
		profileMenuVisible,
		selectedFolders,
		selectedLinks,
		searchInputFocused,
		foldersFound,
		linksFound,
		query
	} from '../../stores/stores';
	import { json } from '@sveltejs/kit';
	import { getSession } from '$lib/utils/getSession';
	import { afterNavigate, goto } from '$app/navigation';
	import type { Session } from '$lib/types/session';
	import { loading } from '../../stores/stores';
	import { toggleShowOptionsMenu } from '$lib/utils/toggleShowOptionsMenu';
	import { hideShowOptionsMenu } from '$lib/types/hideShowOptionsMenu';
	import { hideContextMenu } from '$lib/utils/hideContextMenu';
	import { toggleMenu } from '$lib/utils/toggleMenu';
	import { toggleProfileMenu } from '$lib/utils/toggleProfileMenu';
	import { searchLinksAndFolders } from '$lib/utils/search';
	import Mark from 'mark.js';
	import { browser } from '$app/environment';

	let s: Partial<Session> = {};
	let el: HTMLOptionElement;
	let optionValue: string | undefined;

	$: selectedItems = [...$selectedFolders, ...$selectedLinks];

	afterNavigate(async () => {
		s = await JSON.parse(getSession());

		session.set(s);
	});

	function handleClickOnOption() {
		el = window.event?.currentTarget as HTMLOptionElement;

		const domain: string = 'https://www.bookmarkbucket.com/';

		optionValue = el.value;

		if (optionValue === '/appv1/my_links') {
			activePath.set('My links');
		} else if (optionValue === '/appv1/my_links/recycle_bin') {
			activePath.set('Recycle bin');
		}

		if (optionValue === undefined || optionValue === '') return;

		goto(`${domain}${optionValue}`);

		hideShowOptionsMenu();
	}

	function handleClickOnCustomSelect() {
		hideContextMenu();

		toggleShowOptionsMenu();
	}

	async function handleSearchInput() {
		if ($query === '') {
			foldersFound.set([]);

			linksFound.set([]);

			return;
		}

		await searchLinksAndFolders($query);

		//await highlightSearchResults();
	}

	async function highlightSearchResults() {
		const instance: Mark = new Mark(document.querySelectorAll('.folder'));

		let options: Mark.MarkOptions = {};

		instance.unmark({});

		instance.mark($query, options);
	}

	async function handleSearchFocus() {
		searchInputFocused.set(true);
	}

	async function handleSearchBlur() {
		searchInputFocused.set(false);
	}

	function handleClearSearch() {
		$query = '';

		searchInputFocused.set(false);

		foldersFound.set([]);

		linksFound.set([]);

		const input = document.getElementById('search') as HTMLInputElement | null;

		if (input === null) return;

		input.focus();
	}

	async function handleSearchFormSubmit() {
		await handleSearchInput();
	}

	function reportBug() {
		console.log();
	}
</script>

<svete:head>
	<script src="https://kit.fontawesome.com/d8939cb1a8.js" crossorigin="anonymous"></script>
</svete:head>

<nav>
	<div class="nav_links">
		{#if !$menuToggled}
			<div
				class="custom-select"
				on:click|preventDefault|stopPropagation={handleClickOnCustomSelect}
				on:keyup
			>
				<div class="active-link">
					<span>{$activePath}</span>
				</div>
				{#if $showOptionsMenu}
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
								d="M6 15l6-6 6 6"
								stroke="#000000"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</div>
				{:else}
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
								d="M6 9l6 6 6-6"
								stroke="#000000"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</div>
				{/if}

				{#if $showOptionsMenu}
					<div class="options" on:click|preventDefault|stopPropagation={stop_propagation} on:keyup>
						<option
							value="/appv1/my_links"
							class:active={$page.url.pathname === '/appv1/my_links'}
							on:click|preventDefault|stopPropagation={handleClickOnOption}>My links</option
						>
						<option
							value="/appv1/my_links/recycle_bin"
							class:active={$page.url.pathname === '/appv1/my_links/recycle_bin'}
							on:click|preventDefault|stopPropagation={handleClickOnOption}>Recycle bin</option
						>
						{#if $ancestorsOfCurrentFolder && $ancestorsOfCurrentFolder.length > 0}
							{#each $ancestorsOfCurrentFolder as { folder_name, folder_id, subfolder_of }}
								<option
									on:click|preventDefault|stopPropagation={() => {
										goto(`https://www.bookmarkbucket.com/appv1/my_links/${folder_id}`);
										hideShowOptionsMenu();
									}}
									value={folder_name}
									class:active={$openedFolder &&
										$openedFolder.folder_name &&
										$openedFolder.folder_id === folder_id}>{folder_name}</option
								>
							{/each}
						{/if}
					</div>
				{/if}
			</div>
			<form on:submit|preventDefault|stopPropagation={handleSearchFormSubmit}>
				<input
					type="search"
					name="search"
					id="search"
					placeholder="Search your links and folders..."
					autocomplete="off"
					bind:value={$query}
					on:input|stopPropagation={handleSearchInput}
					on:focus={handleSearchFocus}
				/>
				{#if $query !== ''}
					<i class="las la-times" on:click={handleClearSearch} on:keyup />
				{/if}
			</form>
			<div class="actions_menu">
				<div class="new_link" on:click|preventDefault|stopPropagation={showAddLinkForm} on:keyup>
					<i class="las la-plus" />
					<span>New link</span>
				</div>
				<div
					class="new_folder"
					on:click|preventDefault|stopPropagation={showCreateFolderForm}
					on:keyup
				>
					<i class="las la-folder-plus" />
					<span>New folder</span>
				</div>
				<div class="report_bug" on:click|preventDefault|stopPropagation={reportBug} on:keyup>
					<i class="las la-bug" />
					<span>Report bug</span>
				</div>
				<div class="suggest_feature">
					<i class="las la-lightbulb" />
					<span>Suggest feature</span>
				</div>
				<div class="help">
					<i class="las la-question" />
					<span>Contact support</span>
				</div>
			</div>
		{/if}
	</div>

	<div class="profile">
		<div class="me" on:click|preventDefault|stopPropagation={toggleProfileMenu} on:keyup>
			{#if $session}
				{#if $session.Account}
					{#if $session.Account?.picture !== ''}
						<img
							src={$session.Account?.picture}
							alt="profile"
							on:click={toggleProfileMenu}
							on:keyup
						/>
					{:else}
						<img src={user} alt="profile" />
					{/if}
				{:else}
					<img src={user} alt="profile" />
				{/if}
			{/if}
			{#if $profileMenuVisible && selectedItems.length < 1}
				<div class="profile_hover_popup_menu">
					<div
						class="settings"
						on:click={() => {
							goto('https://www.bookmarkbucket.com/appv1/settings/my_profile');
						}}
						on:keyup
					>
						<i class="las la-cog" />
						<span>My profile</span>
					</div>
					<div class="suggest_feature">
						<i class="las la-lightbulb" />
						<span>Suggest feature</span>
					</div>
					<div class="bug">
						<i class="las la-bug" />
						<span>Report bug</span>
					</div>
					<div class="help">
						<i class="las la-question" />
						<span>Contact support</span>
					</div>
					<div class="logout">
						<i class="las la-sign-out-alt" />
						<span>Log Out</span>
					</div>
				</div>
			{/if}
		</div>
		<div
			class="menu"
			class:toggle={$menuToggled}
			on:click|preventDefault|stopPropagation={toggleMenu}
			on:keyup
		>
			<div class="menu_bar" />
			<div class="menu_bar middle" />
			<div class="menu_bar" />
		</div>
	</div>
</nav>

<style lang="scss">
	::-webkit-scrollbar {
		width: 0.5rem;
		height: 0.5rem;
		// display: none;
		// -ms-overflow-style: none; /* IE and Edge */
		// scrollbar-width: none; /* Firefox */
	}

	nav {
		position: fixed;
		top: 0;
		left: 0;
		height: 7vh;
		width: 100%;
		display: flex;
		align-items: center;
		box-shadow: rgb(0 0 0 / 5%) 0px 6px 24px 0px, rgb(0 0 0 / 8%) 0px 0px 0px 1px;
		z-index: 100;
		background-color: #3a4f7a;

		.nav_links {
			flex: 10;
			display: flex;
			align-items: center;
			gap: 1em;
			height: 100%;
			display: flex;
			align-items: center;
			width: max-content;
			height: max-content;
			cursor: pointer;
			padding-left: 0.5em;

			form {
				background-color: red;
				width: 50%;
				height: 4rem;
				position: relative;
				border-radius: 0.3rem;

				input[type='search'] {
					border: none;
					outline: none;
					height: 100%;
					width: 100%;
					padding: 1em;
					font-size: 1.3rem;
					font-family: 'Arial CE', sans-serif;
					color: $text-color-regular;
					background-color: rgb(239, 243, 246);
					transition: background-color 200ms ease-in-out;
					border-radius: inherit;

					&::-webkit-search-cancel-button {
						appearance: none;
					}

					&::placeholder {
						font-size: 1.3rem;
						font-family: 'Arial CE', sans-serif;
						color: $text-color-medium;
					}

					&:focus {
						background-color: white;
					}

					&:hover {
						background-color: white;
					}
				}

				i {
					position: absolute;
					right: 0;
					bottom: 0;
					top: 0;
					height: 100%;
					width: 5rem;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 1.5rem;
					color: $text-color-regular;
					transition: color 200ms ease-in-out;

					&:hover {
						color: #ed4f32;
					}
				}
			}

			.actions_menu {
				//background-color: #ed4f32;
				display: flex;
				align-items: center;
				gap: 1em;

				div {
					display: flex;
					align-items: center;
					justify-content: center;
					min-width: max-content;
					border: 0.1rem solid whitesmoke;
					min-height: 3rem;
					gap: 1em;
					transition: all 200ms ease-in-out;
					padding-right: 1em;
					border-radius: 0.3rem;

					i {
						font-size: 2.3rem;
						font-weight: 700;
						color: whitesmoke;
					}

					span {
						font-family: 'Arial CE', sans-serif;
						font-size: 1.3rem;
						color: whitesmoke;
						font-weight: 600;
					}

					&:hover {
						border-color: rgb(255, 255, 255);
						box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

						i {
							color: rgb(255, 255, 255);
						}

						span {
							color: rgb(255, 255, 255);
						}
					}
				}
			}

			.custom-select {
				width: 25rem;
				height: 4rem;
				display: flex;
				align-items: center;
				background-color: rgb(30, 144, 255);
				background-color: white;
				box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
				position: relative;
				border-radius: 0.3rem;

				.active-link {
					width: 80%;
					height: 100%;
					display: flex;
					align-items: center;

					span {
						color: $text-color-regular;
						padding-left: 1em;
						font-size: 1.3rem;
						font-family: 'Product Sans Medium', sans-serif;
						text-decoration: underline;
						text-decoration-thickness: 0.2rem;
						text-decoration-skip-ink: none;
						text-underline-offset: 0.3em;
						text-decoration-color: transparent;
						transition: all 200ms ease-in-out;
					}
				}

				.icon {
					width: 20%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;

					svg {
						path {
							fill: white;
							fill: $text-color-regular;
							stroke: transparent;
						}
					}
				}

				.options {
					position: absolute;
					top: 100%;
					left: 0;
					right: 0;
					height: auto;
					background-color: rgb(30, 144, 255);
					background-color: white;
					box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
					z-index: 100;
					overflow: auto;
					max-height: 70vh;
					border-radius: 0.3rem;

					option {
						height: 4rem;
						padding-left: 1em;
						font-size: 1.3rem;
						font-family: 'Product Sans Medium', sans-serif;
						color: white;
						color: $text-color-regular-2;
						display: flex;
						align-items: center;
						border-bottom: 0.1rem solid rgba(0, 0, 0, 0.1);

						&:hover {
							background-color: rgb(214, 228, 229);
							color: $text-color-regular;
						}
					}

					// .active {
					// 	background-color: rgb(214, 228, 229);
					// 	color: $text-color-regular;
					// }
				}
			}
		}

		.profile {
			flex: 2;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			background-color: inherit;
			gap: 1em;
			padding-right: 2em;
			gap: 2em;

			.me {
				height: 3.5rem;
				width: 3.5rem;
				border-radius: 50%;
				cursor: pointer;
				transition: border-color 200ms linear;
				outline: none;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: rgba(255, 255, 255, 0.89);
				position: relative;
				//display: none;

				img {
					max-inline-size: 100%;
					height: 100%;
					width: 100%;
					object-fit: cover;
					border-radius: 50%;
				}

				.profile_hover_popup_menu {
					position: absolute;
					top: 115%;
					right: 0;
					min-width: 20vw;
					height: max-content;
					background-color: rgb(58, 79, 122);
					z-index: 500;
					display: flex;
					flex-direction: column;
					box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
					cursor: default;
					border-radius: 0.3rem;
					padding: 1em;

					div {
						height: 4rem;
						display: flex;
						align-items: center;
						gap: 1.5em;
						background-color: transparent;
						padding: 1em;
						border-radius: 0.25rem;
						transition: background-color 200ms ease-in-out;

						i {
							color: whitesmoke;
							font-size: 2.3rem;
							transition: color 200ms ease-in-out;
						}

						span {
							color: whitesmoke;
							font-family: 'Arial CE', sans-serif;
							font-size: 1.3rem;
							transition: color 200ms ease-in-out;
						}

						&:hover {
							cursor: pointer;
							background-color: rgb(255, 255, 255, 0.1);

							i {
								color: white;
							}

							span {
								color: white;
							}
						}
					}
				}
			}
		}

		.menu {
			height: 3rem;
			width: 3rem;
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			cursor: pointer;
			display: none;

			.menu_bar {
				width: 100%;
				height: 0.2rem;
				background-color: rgba(255, 255, 255, 0.89);
				transition: all 0.5s ease-in-out;
			}

			&:hover {
				.menu_bar {
					background-color: rgba(255, 255, 255);
				}
			}
		}

		.toggle {
			.menu_bar:first-of-type {
				transform: rotate(-45deg) translate(-0.5rem, 0.6rem);
			}

			.middle {
				opacity: 0;
			}

			.menu_bar:last-of-type {
				transform: rotate(45deg) translate(-0.5rem, -0.6rem);
			}
		}

		@media screen and (max-width: 300px) {
			.nav_links {
				padding-left: 0.3em;

				.custom-select {
					width: 20rem;
				}

				form {
					display: none;
				}

				.actions_menu {
					background-color: #ed4f32;
					position: fixed;
					top: 7vh;
					left: 0;
					width: 100vw;
					height: calc(100vh - 7vh);
					max-height: calc(100vh - 7vh);
					overflow: auto;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					gap: 0;
					//transform: translateX(100%);

					div {
						width: 100%;
						min-height: 4.5rem;
						justify-content: flex-start;
						border-color: transparent;

						&:hover,
						&:active {
							border-color: rgb(255, 255, 255);
						}
					}
				}
			}

			.profile {
				padding-right: 1em;

				.me {
					display: none;
				}

				.menu {
					display: flex;
				}
			}
		}

		@media screen and (min-width: 301px) and (max-width: 768px) {
			.nav_links {
				padding-left: 0.3em;

				.custom-select {
					height: 6vh;

					.active-link {
						span {
							font-size: 1.8rem;
							//font-weight: 600;
						}
					}

					.icon {
						svg {
							height: 3.5rem;
							width: 3.5rem;
						}
					}

					.options {
						option {
							font-size: 1.8rem;
						}
					}
				}
				form {
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					height: 7vh;
					display: none;
				}

				.actions_menu {
					background-color: #ed4f32;
					position: fixed;
					top: 7vh;
					left: 0;
					width: 100vw;
					height: calc(100vh - 7vh);
					max-height: calc(100vh - 7vh);
					overflow: auto;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					gap: 0;
					//transform: translateX(100%);

					div {
						width: 100%;
						min-height: 6rem;
						justify-content: flex-start;
						border-color: transparent;

						i {
							font-size: 3rem;
						}

						span {
							font-size: 1.8rem;
						}

						&:hover,
						&:active {
							border-color: rgb(255, 255, 255);
						}
					}
				}
			}

			.profile {
				padding-right: 0.5em;
				.me {
					display: none;
				}

				.menu {
					display: flex;
				}
			}
		}
	}
</style>
