import { d as derived, w as writable } from "./index.js";
const errors = writable([]);
let session = writable({});
const folders = writable([]);
const foldersFound = writable([]);
const links = writable([]);
const linksFound = writable([]);
let selectedFolders = writable([]);
let selectedLinks = writable([]);
let loading = writable(true);
let createFolderMode = writable(false);
let addLinkMode = writable(false);
const folderName = writable("Untitled folder");
const controlKeyIsPressed = writable(false);
const newLink = writable("https://example.com");
let currentFolder = writable("");
let ancestorsOfCurrentFolder = writable([]);
let rightClickedElement = writable();
let renameFolderMode = writable(false);
let renameLinkMode = writable(false);
let moveItemsMode = writable(false);
let selectedDestinationFolder = writable({});
const foldersToRenderInMoveFoldersPopup = writable([]);
const linksToRenderInMoveItemsPopup = writable([]);
derived(folders, ($folders) => $folders);
const confirmDeleteItemsMode = writable(false);
const foldersCut = writable([]);
const linksCut = writable([]);
const openedFolder = writable({});
const mouseEvent = writable();
const showOptionsMenu = writable(false);
const activePath = writable("");
let user = writable({});
const successNotifVisible = writable(false);
const errorNotifVisible = writable(false);
const menuToggled = writable(false);
const profileMenuVisible = writable(false);
const searchInputFocused = writable(false);
const query = writable("");
export {
  successNotifVisible as A,
  errorNotifVisible as B,
  searchInputFocused as C,
  foldersFound as D,
  linksFound as E,
  createFolderMode as F,
  addLinkMode as G,
  renameFolderMode as H,
  renameLinkMode as I,
  confirmDeleteItemsMode as J,
  user as K,
  selectedFolders as a,
  selectedDestinationFolder as b,
  folders as c,
  activePath as d,
  errors as e,
  foldersToRenderInMoveFoldersPopup as f,
  showOptionsMenu as g,
  ancestorsOfCurrentFolder as h,
  session as i,
  controlKeyIsPressed as j,
  foldersCut as k,
  linksToRenderInMoveItemsPopup as l,
  menuToggled as m,
  linksCut as n,
  openedFolder as o,
  profileMenuVisible as p,
  query as q,
  folderName as r,
  selectedLinks as s,
  moveItemsMode as t,
  links as u,
  rightClickedElement as v,
  mouseEvent as w,
  currentFolder as x,
  newLink as y,
  loading as z
};
