import { derived, writable, readable, type Writable } from 'svelte/store';
import type { Session } from '$lib/types/session';
import type { Folder } from '$lib/types/folder';
import type { Link } from '$lib/types/link';
import type { newUser } from '$lib/types/newUser';

export const apiURL = readable<string>('http://localhost:5000');

export const accessToken = writable<string>('');

export const errors = writable<string[]>([]);

export let session = writable<Partial<Session>>({});

export let createButtonToggled = writable<Boolean>(false);

export const folders = writable<Partial<Folder>[]>([]);

export const foldersFound = writable<Partial<Folder>[]>([]);

export const links = writable<Partial<Link>[]>([]);

export const linksFound = writable<Partial<Link>[]>([]);

export let selectedFolders = writable<Partial<Folder>[]>([]);

export let selectedLinks = writable<Partial<Link>[]>([]);

export let lastCreatedFolder = writable<Partial<Folder>>({});

export let loading = writable<Boolean>(true);

export let createFolderMode = writable<Boolean>(false);

export let addLinkMode = writable<Boolean>(false);

export const folderName = writable<string>('Untitled folder');

export const controlKeyIsPressed = writable<Boolean>(false);

export const newLink = writable<string>('https://example.com');

export let currentFolder = writable<string>('');

export let ancestorsOfCurrentFolder = writable<Partial<Folder>[]>([]);

export let rightClickedElement = writable<HTMLElement>();

export let renameFolderMode = writable<Boolean>(false);

export let renameLinkMode = writable<Boolean>(false);

export let moveItemsMode = writable<Boolean>(false);

export let selectedDestinationFolder = writable<Partial<Folder>>({});

export const accountID = writable<string>('');

export const foldersToRenderInMoveFoldersPopup = writable<Partial<Folder>[]>([]);

export const linksToRenderInMoveItemsPopup = writable<Partial<Link>[]>([]);

export const derivedFoldersFromFoldersStore = derived(folders, ($folders) => $folders);

export const confirmDeleteItemsMode = writable<boolean>(false);

export const foldersCut = writable<Partial<Folder>[]>([]);

export const linksCut = writable<Partial<Link>[]>([]);

export const contextMenuTargetElement = writable<HTMLElement>();

export const openedFolder = writable<Partial<Folder>>({});

export const mouseEvent = writable<MouseEvent>();

export const showOptionsMenu = writable<boolean>(false);

export const activePath = writable<string>('');

export const showSelectSearchCategory = writable<boolean>(false);

export const activeSearchCategory = writable<string>('My links (Root)');

export const showSearchForm = writable<boolean>(false);

export let user = writable<Partial<newUser>>({});

export const userIsLoggedin = writable<boolean>(true);

export const successNotifVisible = writable<boolean>(false);

export const errorNotifVisible = writable<boolean>(false);

export const menuToggled = writable<boolean>(false);

export const profileMenuVisible = writable<boolean>(false);

export const searchInputFocused = writable<boolean>(false);

export const query = writable<string>('');

export const invalid_email = writable<boolean>(false);

export const invalid_password = writable<boolean>(false);

export const email_exists = writable<boolean>(false);

export const createMode = writable<boolean>(false);
