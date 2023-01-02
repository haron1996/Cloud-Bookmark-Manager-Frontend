<script lang="ts">
	import { stop_propagation } from 'svelte/internal';
	import {
		searchInputFocused,
		foldersFound,
		linksFound,
		query,
		foldersCut,
		selectedFolders,
		selectedLinks
	} from '../../stores/stores';
	import Folder from './folder.svelte';
	import Link from './link.svelte';

	function closeSearchResults() {
		query.set('');

		searchInputFocused.set(false);

		foldersFound.set([]);

		linksFound.set([]);

		foldersCut.set([]);

		selectedFolders.set([]);

		selectedLinks.set([]);
	}
</script>

{#if $searchInputFocused && $query !== ''}
	<div class="search_results" on:click|preventDefault|stopPropagation={closeSearchResults} on:keyup>
		{#if $foldersFound.length > 0 && $linksFound.length > 0}
			{#each $foldersFound as folder}
				<Folder on:click {folder} />
			{/each}
			{#each $linksFound as link}
				<Link {link} />
			{/each}
		{:else if $foldersFound.length > 0 && $linksFound.length < 1}
			{#each $foldersFound as folder}
				<Folder on:click {folder} />
			{/each}
		{:else if $foldersFound.length < 1 && $linksFound.length > 0}
			{#each $linksFound as link}
				<Link {link} />
			{/each}
		{:else if $foldersFound.length === 0 && $linksFound.length === 0}
			<span>Nothing was found!</span>
		{/if}
	</div>
{/if}

<style lang="scss">
	.search_results {
		position: fixed;
		left: 0;
		top: 7vh;
		width: 100vw;
		height: calc(100vh - 7vh);
		max-height: calc(100vh - 7vh);
		overflow-y: auto;
		background-color: rgb(255, 255, 255);
		z-index: 26;
		display: flex;
		flex-wrap: wrap;
		align-content: flex-start;
		gap: 1.5em;
		padding: 1.5em;

		span {
			font-size: 1.3rem;
			color: $text-color-medium;
			font-family: 'Arial CE', sans-serif;
		}
	}
</style>
