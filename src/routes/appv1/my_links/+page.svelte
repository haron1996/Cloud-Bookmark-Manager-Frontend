<script lang="ts">
	import { page } from '$app/stores';
	import Breadcrumb from '$lib/components/breadcrumb.svelte';
	import {
		breadcrumbRoot,
		currentCollectionMember,
		folders,
		links,
		loading,
		query
	} from './../../../stores/stores';
	import { afterNavigate } from '$app/navigation';
	//import { getLinksAndFolders } from '$lib/utils/getLinksAndFolders';
	import { resetAncestorsOfCurrentFolder } from '$lib/utils/resetAncestorsOfCurrentFolder';
	import { hideContextMenu } from '$lib/utils/hideContextMenu';
	// import { beforeUpdate, onMount } from 'svelte';
	// import { getSession } from '$lib/utils/getSession';
	// import type { Folder } from '$lib/types/folder';
	// import type { Link } from '$lib/types/link';

	$: $page.data.folders ? folders.set($page.data.folders) : folders.set([]);
	$: $page.data.links ? links.set($page.data.links) : links.set([]);

	afterNavigate(async () => {
		currentCollectionMember.set({});

		breadcrumbRoot.set('Home');

		loading.set(false);

		query.set('');

		hideContextMenu();

		resetAncestorsOfCurrentFolder();

		//await getLinksAndFolders('');
	});
</script>

<svelte:head>
	<title>Home - Linkspace</title>
</svelte:head>

<Breadcrumb />
