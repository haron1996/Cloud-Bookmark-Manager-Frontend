<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import Breadcrumb from '$lib/components/breadcrumb.svelte';
	import { getFoldersAndLinksMovedToTrash } from '$lib/utils/getFoldersAndLinksMovedToTrash';
	import { hideContextMenu } from '$lib/utils/hideContextMenu';
	import { ancestorsOfCurrentFolder } from '../../../../stores/stores';

	afterNavigate(async () => {
		ancestorsOfCurrentFolder.set([]);

		hideContextMenu();

		//$page.url.pathname === '' ? console.log('empty pathname') : console.log($page.url.pathname);

		await getFoldersAndLinksMovedToTrash();
	});
</script>

<svelte:head>
	<title>Recycle bin - 6kplus</title>
</svelte:head>

<div>
	<Breadcrumb rootFolderName={'Recycle bin'} />
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
