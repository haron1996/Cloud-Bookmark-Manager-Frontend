<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import Breadcrumb from '$lib/components/breadcrumb.svelte';
	import { hideContextMenu } from '$lib/utils/hideContextMenu';
	import { resetAncestorsOfCurrentFolder } from '$lib/utils/resetAncestorsOfCurrentFolder';
	import {
		breadcrumbRoot,
		folders,
		loading,
		query,
		links,
		currentCollectionMember
	} from '../../../../stores/stores';

	let title: string = 'Shared with me - Linkspace';

	afterNavigate(() => {
		currentCollectionMember.set({});

		title = 'Shared with me - Linkspace';

		breadcrumbRoot.set('Shared with me');

		loading.set(false);

		query.set('');

		hideContextMenu();

		resetAncestorsOfCurrentFolder();
	});

	$: $page.data.folders ? folders.set($page.data.folders) : folders.set([]);
	$: $page.data.links ? links.set($page.data.links) : links.set([]);
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<Breadcrumb />
