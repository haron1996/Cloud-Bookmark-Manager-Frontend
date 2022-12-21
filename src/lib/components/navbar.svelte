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
		menuToggled
	} from '../../stores/stores';
	import { json } from '@sveltejs/kit';
	import { getSession } from '$lib/utils/getSession';
	import { afterNavigate, goto } from '$app/navigation';
	import type { Session } from '$lib/types/session';
	import { loading } from '../../stores/stores';
	import { toggleShowOptionsMenu } from '$lib/utils/toggleShowOptionsMenu';
	import { hideShowOptionsMenu } from '$lib/types/hideShowOptionsMenu';
	import { hideContextMenu } from '$lib/utils/hideContextMenu';
	import { showSearchFormPopup } from '$lib/utils/toggleSearchForm';
	import { toggleMenu } from '$lib/utils/toggleMenu';

	let s: Partial<Session> = {};
	let el: HTMLOptionElement;
	let optionValue: string | undefined;

	afterNavigate(async () => {
		s = await JSON.parse(getSession());

		session.set(s);
	});

	function handleClickOnOption() {
		el = window.event?.currentTarget as HTMLOptionElement;

		const domain: string = 'http://localhost:5173';

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

	function handleClickOnSearchbutton() {
		showSearchFormPopup();

		hideShowOptionsMenu();
	}
</script>

<svete:head>
	<script src="https://kit.fontawesome.com/d8939cb1a8.js" crossorigin="anonymous"></script>
</svete:head>

<nav>
	<div class="nav_links">
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
									goto(`http://localhost:5173/appv1/my_links/${folder_id}`);
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
		<span on:click|preventDefault|stopPropagation={showAddLinkForm} on:keyup>Add link</span>
		<span on:click|preventDefault|stopPropagation={showCreateFolderForm} on:keyup
			>Create folder</span
		>
		<span on:click|preventDefault|stopPropagation={handleClickOnSearchbutton} on:keyup>Search</span>
	</div>

	<div class="profile">
		<div class="me">
			{#if $session}
				{#if $session.Account}
					{#if $session.Account?.picture !== ''}
						<img src={$session.Account?.picture} alt="profile" />
					{:else}
						<img src={user} alt="profile" />
					{/if}
				{:else}
					<img src={user} alt="profile" />
				{/if}
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

			span {
				font-size: 1.3rem;
				font-family: 'Product Sans Medium', sans-serif;
				text-decoration: underline;
				text-decoration-thickness: 0.2rem;
				text-decoration-skip-ink: none;
				text-underline-offset: 0.3em;
				text-decoration-color: transparent;
				transition: all 200ms ease-in-out;
				color: rgba(255, 255, 255, 0.89);

				&:hover {
					color: rgba(255, 255, 255);
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

				.active-link {
					width: 80%;
					height: 100%;
					display: flex;
					align-items: center;

					span {
						color: white;
						color: $text-color-regular;
						padding-left: 1em;
						font-family: 'Product Sans Medium', sans-serif;
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
			padding-right: 0.5em;
			gap: 2em;
			// background-color: orange;

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
				//display: none;

				img {
					max-inline-size: 100%;
					height: 100%;
					width: 100%;
					object-fit: cover;
					border-radius: 50%;
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
				transition: all 200ms ease-in-out;
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
				transform: translateX(200%);
			}

			.menu_bar:last-of-type {
				transform: rotate(45deg) translate(-0.5rem, -0.6rem);
			}
		}
	}
</style>
