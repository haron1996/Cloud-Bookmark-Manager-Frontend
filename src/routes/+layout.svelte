<script lang="ts">
	import { hideShowOptionsMenu } from '$lib/types/hideShowOptionsMenu';
	import { emptyFoldersCut } from '$lib/utils/cutFolders';
	import { emptyLinksCut } from '$lib/utils/cutLinks';
	import { hideContextMenu } from '$lib/utils/hideContextMenu';
	import { hideSelectShowCategoryMenu } from '$lib/utils/hideSelectSearchCategory';
	import { hideSearchFormPopup } from '$lib/utils/toggleSearchForm';
	import { toggleShowOptionsMenu } from '$lib/utils/toggleShowOptionsMenu';
	import { createButtonToggled, errors, selectedFolders, selectedLinks } from '../stores/stores';
	import Errors from '$lib/components/errors.svelte';
	import { onMount } from 'svelte';
	import { hideProfileMenu } from '$lib/utils/toggleProfileMenu';

	function handleBodyClick() {
		hideProfileMenu();

		hideShowOptionsMenu();

		hideSelectShowCategoryMenu();

		hideSearchFormPopup();

		createButtonToggled.set(false);

		selectedFolders.set([]);

		selectedLinks.set([]);

		hideContextMenu();

		emptyFoldersCut();

		emptyLinksCut();
	}

	function handleRightClickOnBody() {
		hideShowOptionsMenu();

		createButtonToggled.set(false);
	}

	// $: console.log($errors);
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"
	/>
</svelte:head>

{#if $errors.length > 0}
	<Errors />
{/if}

<div
	class="app"
	on:click={handleBodyClick}
	on:keydown
	on:contextmenu|preventDefault|stopPropagation={handleRightClickOnBody}
>
	<main>
		<slot />
	</main>
</div>

<style lang="scss" global>
	@import url('https://fonts.cdnfonts.com/css/google-sans');
	@import url('https://fonts.cdnfonts.com/css/arial');
	@import url('https://fonts.cdnfonts.com/css/arial-mt');

	.app {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		height: 100vh;
		width: 100vw;
		max-height: 100vh;

		main {
			position: fixed;
			top: 4.5rem;
			left: 0;
			height: calc(100vh - 7vh);
			max-height: calc(100vh - 7vh);
			width: 100vw;
			//background-color: orange;
		}
	}

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		-webkit-user-select: none; /* Safari */
		-ms-user-select: none; /* IE 10 and IE 11 */
		user-select: none; /* Standard syntax */
		line-height: 1.6;
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
		font-stretch: expanded;

		&::selection {
			background: $main-blue;
			color: white;
		}
	}

	html {
		font-size: 62.5%;

		xml {
			font-family: 'Product Sans Black', sans-serif !important;

			svg {
				font-family: 'Product Sans Black', sans-serif !important;

				path {
					font-family: 'Product Sans Black', sans-serif !important;
				}
			}
		}
	}

	/* width */
	::-webkit-scrollbar {
		width: 0.8rem;
		height: 0.5rem;
		display: none;
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}

	/* Track */
	::-webkit-scrollbar-track {
		background-color: transparent;
		background-color: #eeeeee;
		background-color: transparent;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background-color: #c8c6c6;

		&:hover {
			background-color: #748da6;
		}
	}

	::-webkit-scrollbar-track-piece {
		background-color: yellow;
		background-color: transparent;
	}
</style>
