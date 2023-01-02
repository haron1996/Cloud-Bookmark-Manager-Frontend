<script lang="ts">
	import Breadcrumb from '$lib/components/breadcrumb.svelte';
	import { getLinksAndFolders } from '$lib/utils/getLinksAndFolders';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { getAncestorsOfCurrentFolder } from '$lib/utils/getAncestorsOfCurrentFolder';
	import { resetSelectedFolders } from '$lib/utils/resetSelectedFolders';
	import { hideContextMenu } from '$lib/utils/hideContextMenu';
	import { resetSelectedLinks } from '$lib/utils/resetSelectedLinks';
	import { getFolder } from '$lib/utils/getFolder';
	import {
		activePath,
		foldersFound,
		linksFound,
		openedFolder,
		query,
		searchInputFocused
	} from '../../../../stores/stores';
	import { loading } from '../../../../stores/stores';

	let folderID: string = '';

	afterNavigate(async () => {
		query.set('');

		searchInputFocused.set(false);

		linksFound.set([]);

		foldersFound.set([]);

		resetSelectedFolders();

		resetSelectedLinks();

		await getCurrentFolderID();

		await getAncestorsOfCurrentFolder(folderID);

		await getLinksAndFolders($page.params.folder_id);

		hideContextMenu();

		await setOpenedFolder();
	});

	async function setOpenedFolder() {
		const folder = await getFolder($page.params.folder_id);

		openedFolder.set(folder);
	}

	async function getCurrentFolderID() {
		$page.params.folder_id === ''
			? console.log('no folder id found!')
			: (folderID = $page.params.folder_id);
	}

	//$: console.log($openedFolder);
	$: if ($openedFolder && $openedFolder.folder_name) {
		activePath.set($openedFolder.folder_name);
	}
</script>

<svelte:head>
	<title
		>{$openedFolder.folder_name === undefined
			? 'Loading...'
			: `${$openedFolder.folder_name} - Nested`}</title
	>
</svelte:head>

<div class="folder_detail">
	<Breadcrumb />
</div>
