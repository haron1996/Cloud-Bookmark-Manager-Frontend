<script lang="ts">
	import { page } from '$app/stores';
	import Breadcrumb from '$lib/components/breadcrumb.svelte';
	import { currentFolder, loading, query } from './../../../stores/stores';
	import { afterNavigate } from '$app/navigation';
	import { getLinksAndFolders } from '$lib/utils/getLinksAndFolders';
	import { resetAncestorsOfCurrentFolder } from '$lib/utils/resetAncestorsOfCurrentFolder';
	import { hideContextMenu } from '$lib/utils/hideContextMenu';
	import { beforeUpdate, onMount } from 'svelte';
	import { getSession } from '$lib/utils/getSession';

	let s: string;

	// beforeUpdate(() => {
	// 	if (getSession() === null) {
	// 		console.log('no session found');
	// 		return;
	// 	}
	// });

	afterNavigate(async () => {
		query.set('');

		hideContextMenu();

		resetAncestorsOfCurrentFolder();

		await getLinksAndFolders('');

		// $page.url.pathname === '' ? console.log('empty pathname') : console.log($page.url.pathname);
	});
</script>

<svelte:head>
	<title>My links - Nested</title>
</svelte:head>

<Breadcrumb rootFolderName={'My links'} />
