import { derived, writable, readable, type Writable } from 'svelte/store';
import type { Session } from '$lib/types/session';
import type { Folder } from '$lib/types/folder';
import type { Link } from '$lib/types/link';
import type { newUser } from '$lib/types/newUser';

export const apiURL = readable<string>('https://api.bookmarkbucket.com');

//export const apiURL = readable<string>('http://localhost:5000');

export const accessToken = writable<string>('');

export const errors = writable<string[]>([]);

export const session = writable<Partial<Session>>({});

export const createButtonToggled = writable<boolean>(false);

export const folders = writable<Partial<Folder>[]>([]);

export const foldersFound = writable<Partial<Folder>[]>([]);

export const links = writable<Partial<Link>[]>([]);

export const linksFound = writable<Partial<Link>[]>([]);

export const selectedFolders = writable<Partial<Folder>[]>([]);

export const selectedLinks = writable<Partial<Link>[]>([]);

export const lastCreatedFolder = writable<Partial<Folder>>({});

export const loading = writable<boolean>(true);

export const createFolderMode = writable<boolean>(false);

export const addLinkMode = writable<boolean>(false);

export const folderName = writable<string>('Untitled collection');

export const controlKeyIsPressed = writable<boolean>(false);

export const newLink = writable<string>('');

export const currentFolder = writable<string>('');

export const ancestorsOfCurrentFolder = writable<Partial<Folder>[]>([]);

export const rightClickedElement = writable<HTMLElement>();

export const renameFolderMode = writable<boolean>(false);

export const renameLinkMode = writable<boolean>(false);

export const moveItemsMode = writable<boolean>(false);

export const selectedDestinationFolder = writable<Partial<Folder>>({});

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

export const user = writable<Partial<newUser>>({});

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

// drag and drop stores
export const draggedFolder = writable<Partial<Folder>>({});

export const draggedLink = writable<Partial<Link>>({});
// end of drap and drop stores

export const showOtpModal = writable<boolean>(false);

export const showCheckMarkLottie = writable<boolean>(false);

export const showFolderInTrashAlert = writable<boolean>(false);

export const searching = writable<boolean>(false);

export const showThankYouGif = writable<boolean>(false);
