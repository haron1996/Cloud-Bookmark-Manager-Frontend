<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import Breadcrumb from '$lib/components/breadcrumb.svelte';
	import { getFoldersAndLinksMovedToTrash } from '$lib/utils/getFoldersAndLinksMovedToTrash';
	import { hideContextMenu } from '$lib/utils/hideContextMenu';
	import {
		ancestorsOfCurrentFolder,
		breadcrumbRoot,
		folders,
		foldersFound,
		links,
		linksFound,
		loading,
		query
	} from '../../../../stores/stores';

	afterNavigate(async () => {
		loading.set(false);

		breadcrumbRoot.set('Trash');

		query.set('');

		foldersFound.set([]);

		linksFound.set([]);

		ancestorsOfCurrentFolder.set([]);

		hideContextMenu();

		//$page.url.pathname === '' ? console.log('empty pathname') : console.log($page.url.pathname);

		//await getFoldersAndLinksMovedToTrash();
	});

	$: $page.data.folders ? folders.set($page.data.folders) : folders.set([]);
	$: $page.data.links ? links.set($page.data.links) : links.set([]);
</script>

<svelte:head>
	<title>Trash - Linkspace</title>
</svelte:head>

<div>
	<Breadcrumb />
</div>

<!-- TODO

* PART 1
- restore folders DONE
- restore links DONE
- restore links and folders DONE

* PART 2
- permanently delete folders
- permanently delete links
- permanently delete links and folders -->
