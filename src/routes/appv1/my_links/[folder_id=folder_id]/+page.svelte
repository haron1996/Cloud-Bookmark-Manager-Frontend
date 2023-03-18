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
		searchInputFocused,
		folders,
		links,
		ancestorsOfCurrentFolder,
		breadcrumbRoot,
		apiURL,
		currentCollectionMember
	} from '../../../../stores/stores';
	import { loading } from '../../../../stores/stores';
	import { getSession } from '$lib/utils/getSession';
	import type { Folder } from '$lib/types/folder';
	import { onMount } from 'svelte';
	import { showSuccessNotification } from '$lib/utils/showSuccessNotification';
	import { showLoadingToss } from '$lib/utils/showLoadingToss';

	let folderID: string = '';

	$: $page.data.folders ? folders.set($page.data.folders) : folders.set([]);
	$: $page.data.links ? links.set($page.data.links) : links.set([]);
	$: $page.data.currentFolderAncestors
		? ancestorsOfCurrentFolder.set($page.data.currentFolderAncestors)
		: ancestorsOfCurrentFolder.set([]);

	let baseURL: string = '';

	const getBaseURL = apiURL.subscribe((value) => {
		baseURL = value;
	});

	getBaseURL();

	onMount(() => {
		console.log($currentCollectionMember.collection_access_level);
	});

	afterNavigate(async () => {
		await checkIfCurrentFolderHasBeenSHaredWithUser();

		loading.set(false);

		query.set('');

		searchInputFocused.set(false);

		linksFound.set([]);

		foldersFound.set([]);

		resetSelectedFolders();

		resetSelectedLinks();

		getCurrentFolderID();

		//await getAncestorsOfCurrentFolder(folderID);

		//await getLinksAndFolders($page.params.folder_id);

		hideContextMenu();

		await setOpenedFolder();
	});

	async function checkIfCurrentFolderHasBeenSHaredWithUser() {
		if (getSession() === null) {
			loading.set(false);
			return;
		}

		const accountID = JSON.parse(getSession()).Account.id;

		const url = `${baseURL}/private/checkIfFolderHasBeenSharedWithUser/${accountID}/${$page.params.folder_id}`;

		const res = await fetch(url, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer${JSON.parse(getSession()).access_token}`
			}
		});

		const result = await res.json();

		if (result.message === 'collection be belongs to user') {
			breadcrumbRoot.set('Home');
			return;
		}

		breadcrumbRoot.set('Shared with me');

		console.log(result[0]);

		currentCollectionMember.set(result[0]);
	}

	async function setOpenedFolder() {
		const folder = await getFolder($page.params.folder_id);

		openedFolder.set(folder);
	}

	function getCurrentFolderID() {
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
			: `${$openedFolder.folder_name} - Linkspace`}</title
	>
</svelte:head>

<div class="folder_detail">
	<Breadcrumb />
</div>
