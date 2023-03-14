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
		query,
		shareFormVisible
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
	import { SwitchOnCreateMode } from '$lib/utils/switchOnCreateMode';
	import { hideMenuBar, ToggleMenuBar } from '$lib/utils/toggleMenuBar';

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

		const domain: string = $page.url.origin;

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

	function handlePlusIconClick() {
		hideContextMenu();

		hideMenuBar();

		SwitchOnCreateMode();
	}

	function showShareForm() {
		shareFormVisible.set(true);
	}
</script>

<svete:head>
	<script src="https://kit.fontawesome.com/d8939cb1a8.js" crossorigin="anonymous"></script>
</svete:head>

<nav>
	<div class="menu">
		<i
			class="las la-bars"
			on:click|preventDefault|stopPropagation={ToggleMenuBar}
			on:keyup
			on:blur|preventDefault={() => {
				console.log('blured');
			}}
		/>
	</div>
	<div class="search">
		<form on:submit|preventDefault|stopPropagation={handleSearchFormSubmit}>
			<input
				type="search"
				name="search"
				id="search"
				placeholder="Search..."
				autocomplete="off"
				bind:value={$query}
				on:input|stopPropagation={handleSearchInput}
				on:focus={handleSearchFocus}
			/>
			{#if $query !== ''}
				<div class="clear">
					<i class="las la-times" on:click={handleClearSearch} on:keyup />
				</div>
			{/if}
		</form>
	</div>
	<div class="buttons">
		{#if $page.params.folder_id}
			<div class="share" on:click|preventDefault|stopPropagation={showShareForm} on:keyup>
				<i class="las la-lock" />
				<span>Share</span>
			</div>
		{/if}
		<i class="las la-plus" on:click|preventDefault|stopPropagation={handlePlusIconClick} on:keyup />
	</div>
</nav>

<style lang="scss">
	::-webkit-scrollbar {
		width: 0.5rem;
		height: 0.5rem;
	}

	nav {
		position: fixed;
		top: 0;
		left: 0;
		height: 4.5rem;
		width: 100%;
		display: flex;
		align-items: center;
		border-bottom: 0.1rem solid $border-color-regular;

		.menu {
			flex: 1;
			height: 100%;
			display: flex;
			align-items: center;
			padding-left: 1em;

			i {
				font-size: 3rem;
				color: $text-color-regular;
				cursor: pointer;
			}
		}

		.search {
			flex: 2;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			form {
				width: 100%;
				height: 3.5rem;
				border-radius: 0.3rem;
				border: 0.1rem solid $border-color-regular;
				display: flex;
				align-items: center;
				transition: all 200ms ease-in-out;

				input[type='search'] {
					width: 90%;
					height: 100%;
					border: none;
					outline: none;
					padding: 0 1em;
					font-family: 'Arial CE', sans-serif;
					border-radius: inherit;

					&::placeholder {
						font-family: 'Arial CE', sans-serif;
						color: $text-color-light;
					}
				}

				input[type='search']::-webkit-search-cancel-button {
					appearance: none;
				}

				.clear {
					width: 10%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: white;
					padding: 0 1em;

					i {
						font-size: 1.5rem;
					}
				}

				&:focus-within {
					box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
				}
			}
		}

		.buttons {
			flex: 1;
			height: 100%;
			padding-right: 1em;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			gap: 1em;

			.share {
				display: flex;
				align-items: center;
				justify-content: center;
				min-width: max-content;
				border: 0.1rem solid $blue;
				min-width: 8rem;
				background-color: $blue;
				padding: 0.4em;
				border-radius: 0.25rem;
				gap: 1em;
				cursor: pointer;
				transition: all 200ms linear;

				i {
					font-size: 1.8rem;
					color: white;
				}

				span {
					font-size: 1.3rem;
					font-family: 'Arial CE', sans-serif;
					color: white;
				}

				&:hover {
					box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, $blue 0px 0px 0px 2px;
				}
			}

			i.la-plus {
				font-size: 3rem;
				cursor: pointer;

				&:hover {
					color: $blue;
				}
			}
		}
	}
</style>
