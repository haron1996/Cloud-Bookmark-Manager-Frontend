import { c as create_ssr_component, a as subscribe, d as escape, o as onDestroy, e as each, f as add_attribute, v as validate_component } from "../../../../chunks/index.js";
import { s as selectedLinks, a as selectedFolders, f as foldersToRenderInMoveFoldersPopup, l as linksToRenderInMoveItemsPopup, b as selectedDestinationFolder, c as folders, q as query, m as menuToggled, d as activePath, g as showOptionsMenu, h as ancestorsOfCurrentFolder, o as openedFolder, i as session, p as profileMenuVisible, j as controlKeyIsPressed, k as foldersCut, n as linksCut, r as folderName, t as moveItemsMode, u as links, v as rightClickedElement, w as mouseEvent, x as currentFolder, y as newLink, z as loading, A as successNotifVisible, B as errorNotifVisible, C as searchInputFocused, D as foldersFound, E as linksFound, F as createFolderMode, G as addLinkMode, H as renameFolderMode, I as renameLinkMode, J as confirmDeleteItemsMode } from "../../../../chunks/stores.js";
import { p as page } from "../../../../chunks/stores2.js";
import "mark.js";
/* empty css                                                           */import "cookie";
function getSession() {
  const s = window.localStorage.getItem("session");
  return s;
}
const actionsMenu_svelte_svelte_type_style_lang = "";
const css$g = {
  code: '.actions_menu.svelte-l15bda.svelte-l15bda{height:7vh;width:100%;background-color:white;position:fixed;top:0;left:0;z-index:200;padding-left:1.5em;display:flex;align-items:center;gap:1em}.actions_menu.svelte-l15bda div.svelte-l15bda{background-color:rgb(238, 238, 238);min-height:3.5rem;min-width:10rem;padding:0 1em 0 0.3em;width:max-content;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 200ms ease-in-out;gap:1em;border-radius:0.3rem}.actions_menu.svelte-l15bda div i.svelte-l15bda{font-size:2rem}.actions_menu.svelte-l15bda div span.svelte-l15bda{font-size:1.3rem;font-weight:500;font-family:"Product Sans Medium", sans-serif;color:#6d6d6d;transition:all 200ms ease-in-out}.actions_menu.svelte-l15bda div.svelte-l15bda:hover{filter:brightness(90%)}.actions_menu.svelte-l15bda div:hover span.svelte-l15bda{color:rgb(15, 17, 17)}.actions_menu.svelte-l15bda .btn_disabled.svelte-l15bda{opacity:0.4;pointer-events:none}',
  map: null
};
const ActionsMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selectedItems;
  let $selectedLinks, $$unsubscribe_selectedLinks;
  let $selectedFolders, $$unsubscribe_selectedFolders;
  let $page, $$unsubscribe_page;
  $$unsubscribe_selectedLinks = subscribe(selectedLinks, (value) => $selectedLinks = value);
  $$unsubscribe_selectedFolders = subscribe(selectedFolders, (value) => $selectedFolders = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$result.css.add(css$g);
  selectedItems = [...$selectedFolders, ...$selectedLinks];
  $$unsubscribe_selectedLinks();
  $$unsubscribe_selectedFolders();
  $$unsubscribe_page();
  return `${$selectedFolders.length > 0 || $selectedLinks.length > 0 ? `<div class="${"actions_menu svelte-l15bda"}">${$page.url.pathname === "/appv1/my_links/recycle_bin" ? `<div class="${"restore svelte-l15bda"}"><i class="${"las la-trash-restore svelte-l15bda"}"></i>
				<span class="${"svelte-l15bda"}">Restore</span></div>
			<div class="${"delete_forever svelte-l15bda"}"><i class="${"las la-trash svelte-l15bda"}"></i>
				<span class="${"svelte-l15bda"}">Delete parmanently</span></div>` : `<div class="${["rename svelte-l15bda", selectedItems.length > 1 ? "btn_disabled" : ""].join(" ").trim()}"><i class="${"las la-edit svelte-l15bda"}"></i>
				<span class="${"svelte-l15bda"}">Rename</span></div>
			<div class="${"move svelte-l15bda"}"><i class="${"las la-expand-arrows-alt svelte-l15bda"}"></i>
				<span class="${"svelte-l15bda"}">Move</span></div>
			<div class="${"delete svelte-l15bda"}"><i class="${"las la-trash svelte-l15bda"}"></i>
				<span class="${"svelte-l15bda"}">Delete</span></div>`}</div>` : ``}`;
});
const deleteItemConfirmationPopup_svelte_svelte_type_style_lang = "";
const css$f = {
  code: '.delete_items_confirmation_popup.svelte-is0ajg.svelte-is0ajg{position:fixed;top:0;left:0;width:100vw;height:100vh;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(2px) brightness(50%);z-index:100}.delete_items_confirmation_popup.svelte-is0ajg .card.svelte-is0ajg{min-height:23%;min-width:30%;background-color:white;display:flex;flex-direction:column;box-shadow:rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;padding:0.5em 1em;transform:scale(1);animation:svelte-is0ajg-zoomin 0.2s ease-in-out}.delete_items_confirmation_popup.svelte-is0ajg .card .top.svelte-is0ajg{flex:1;display:flex;align-items:center}.delete_items_confirmation_popup.svelte-is0ajg .card .top span.svelte-is0ajg{font-family:"Arial CE", sans-serif;color:#1e1919;font-size:1.3rem}.delete_items_confirmation_popup.svelte-is0ajg .card .buttons.svelte-is0ajg{flex:1;display:flex;align-items:center;justify-content:flex-end;gap:0.5em}.delete_items_confirmation_popup.svelte-is0ajg .card .buttons .button.svelte-is0ajg{height:3.5rem;min-width:7rem;border:none;background-color:rgb(238, 238, 238);cursor:pointer;display:flex;align-items:center;justify-content:center}.delete_items_confirmation_popup.svelte-is0ajg .card .buttons .button span.svelte-is0ajg{font-family:"Product Sans Medium", sans-serif;font-size:1.3rem;color:#6d6d6d}.delete_items_confirmation_popup.svelte-is0ajg .card .buttons .button.svelte-is0ajg:hover{filter:brightness(80%)}.delete_items_confirmation_popup.svelte-is0ajg .card .buttons .delete.svelte-is0ajg{background-color:rgb(255, 107, 107);display:flex;align-items:center;grid-area:1em}.delete_items_confirmation_popup.svelte-is0ajg .card .buttons .delete span.svelte-is0ajg{color:white}@keyframes svelte-is0ajg-zoomin{0%{transform:scale(0.3)}100%{transform:scale(1)}}',
  map: null
};
const DeleteItemConfirmationPopup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selectedItems;
  let $selectedLinks, $$unsubscribe_selectedLinks;
  let $selectedFolders, $$unsubscribe_selectedFolders;
  $$unsubscribe_selectedLinks = subscribe(selectedLinks, (value) => $selectedLinks = value);
  $$unsubscribe_selectedFolders = subscribe(selectedFolders, (value) => $selectedFolders = value);
  $$result.css.add(css$f);
  selectedItems = [...$selectedFolders, ...$selectedLinks];
  $$unsubscribe_selectedLinks();
  $$unsubscribe_selectedFolders();
  return `<div class="${"delete_items_confirmation_popup svelte-is0ajg"}"><div class="${"card svelte-is0ajg"}"><div class="${"top svelte-is0ajg"}"><span class="${"svelte-is0ajg"}">Are you sure you want to move ${escape(selectedItems.length > 1 ? `these items` : `this item`)} to trash?
				You can restore ${escape(selectedItems.length > 1 ? `them` : `it`)} later.
			</span></div>
		<div class="${"buttons svelte-is0ajg"}"><div class="${"button delete svelte-is0ajg"}"><span class="${"svelte-is0ajg"}">I&#39;m sure</span></div>
			<div class="${"button svelte-is0ajg"}"><span class="${"svelte-is0ajg"}">Cancel</span></div></div></div>
</div>`;
});
async function getFolderChildren(folder) {
  const accountID = JSON.parse(getSession()).Account.id;
  let url = `http://localhost:5000/private/folder/getFolderChildren/${folder.folder_id}/${accountID}`;
  const res = await fetch(url, {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer${JSON.parse(getSession()).access_token}`
    }
  });
  const result = await res.json();
  const folders2 = result[0];
  foldersToRenderInMoveFoldersPopup.set(folders2);
}
const animate = "";
async function getFolderLinks(folderID) {
  console.log("getting folder links...");
  if (folderID === void 0)
    return;
  const accountID = JSON.parse(getSession()).Account.id;
  let url = `http://localhost:5000/private/link/get_folder_links/${accountID}/${folderID}`;
  const res = await fetch(url, {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer${JSON.parse(getSession()).access_token}`
    }
  });
  const result = await res.json();
  if (result[0] !== null) {
    const links2 = result[0];
    linksToRenderInMoveItemsPopup.set(links2);
  }
}
async function getRootLinksOnly() {
  console.log("getting root links only...");
  const account_id = JSON.parse(getSession()).Account.id;
  const getLinksEndPoint = `http://localhost:5000/private/link/getRootLinks/${account_id}`;
  const res = await fetch(getLinksEndPoint, {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer${JSON.parse(getSession()).access_token}`
    }
  });
  const result = await res.json();
  if (result[0] !== null) {
    const links2 = result[0];
    linksToRenderInMoveItemsPopup.set(links2);
  } else {
    linksToRenderInMoveItemsPopup.set([]);
  }
}
const moveItemsPopup_svelte_svelte_type_style_lang = "";
const css$e = {
  code: '.move_items_container.svelte-jwu78e.svelte-jwu78e{position:fixed;top:0;left:0;width:100vw;height:100vh;backdrop-filter:brightness(60%);z-index:260;display:flex;align-items:center;justify-content:center;box-shadow:rgba(0, 0, 0, 0.35) 0px 5px 15px}.move_items_container.svelte-jwu78e .card.svelte-jwu78e{height:90%;width:80%;background-color:white;display:flex;flex-direction:column;padding:0 0.5em;animation:svelte-jwu78e-zoomIn 200ms ease-in-out}.move_items_container.svelte-jwu78e .card .top_bar.svelte-jwu78e{height:8%;width:100%;display:flex;align-items:center;justify-content:space-between}.move_items_container.svelte-jwu78e .card .top_bar .left.svelte-jwu78e{flex:1;height:100%;display:flex;align-items:center}.move_items_container.svelte-jwu78e .card .top_bar .left .folder_name.svelte-jwu78e{display:flex;align-items:center;gap:0.5em;width:max-content;height:100%;width:100%}.move_items_container.svelte-jwu78e .card .top_bar .left .folder_name .folder_icon.svelte-jwu78e{width:max-content;height:max-content;display:flex;align-items:center;justify-content:center}.move_items_container.svelte-jwu78e .card .top_bar .left .folder_name .folder_icon svg path.svelte-jwu78e{stroke:transparent;fill:#6d6d6d}.move_items_container.svelte-jwu78e .card .top_bar .left .folder_name span.svelte-jwu78e{font-size:1.3rem;font-family:"Product Sans Medium", sans-serif;color:#6d6d6d}.move_items_container.svelte-jwu78e .card .top_bar .right.svelte-jwu78e{flex:1;height:100%;display:flex;align-items:center;justify-content:flex-end}.move_items_container.svelte-jwu78e .card .top_bar .right .back_button.svelte-jwu78e{display:flex;align-items:center;width:7rem;height:3.5rem;background-color:rgb(238, 238, 238);gap:0.5em;cursor:pointer}.move_items_container.svelte-jwu78e .card .top_bar .right .back_button .back_icon.svelte-jwu78e{display:flex;align-items:center;justify-content:center}.move_items_container.svelte-jwu78e .card .top_bar .right .back_button .back_icon svg path.svelte-jwu78e{stroke:#6d6d6d}.move_items_container.svelte-jwu78e .card .top_bar .right .back_button span.svelte-jwu78e{font-size:1.3rem;font-family:"Product Sans Medium", sans-serif;color:#6d6d6d}.move_items_container.svelte-jwu78e .card .top_bar .right .back_button.svelte-jwu78e:hover{filter:brightness(90%)}.move_items_container.svelte-jwu78e .card .top_bar .right .back-button-disabled.svelte-jwu78e{opacity:0.5;pointer-events:none}.move_items_container.svelte-jwu78e .card .folders.svelte-jwu78e{height:84%;width:100%;display:flex;flex-wrap:wrap;align-content:flex-start;overflow-y:auto;gap:0}.move_items_container.svelte-jwu78e .card .folders .folder.svelte-jwu78e{height:17rem;width:17rem;display:flex;flex-direction:column}.move_items_container.svelte-jwu78e .card .folders .folder .top.svelte-jwu78e{flex:2;display:flex;align-items:center;justify-content:center}.move_items_container.svelte-jwu78e .card .folders .folder .top .folder_icon.svelte-jwu78e{width:100%;height:100%;display:flex;align-items:center;justify-content:center}.move_items_container.svelte-jwu78e .card .folders .folder .top .folder_icon svg.svelte-jwu78e{height:12rem;width:12rem}.move_items_container.svelte-jwu78e .card .folders .folder .top .folder_icon svg path.svelte-jwu78e{fill:rgb(255, 201, 31);stroke:transparent}.move_items_container.svelte-jwu78e .card .folders .folder .bottom.svelte-jwu78e{flex:1;display:flex;align-items:center;justify-content:center}.move_items_container.svelte-jwu78e .card .folders .folder .bottom span.svelte-jwu78e{color:#6d6d6d;font-size:1.3rem;font-family:"Product Sans Medium", sans-serif;cursor:pointer;text-decoration-line:underline;text-decoration-style:wavy;text-decoration-skip:spaces;text-decoration-skip-ink:none;text-underline-offset:0.5rem;text-decoration-color:transparent}.move_items_container.svelte-jwu78e .card .folders .folder:hover .bottom span.svelte-jwu78e{text-decoration-color:rgb(15, 17, 17)}.move_items_container.svelte-jwu78e .card .folders .folder_disabled.svelte-jwu78e{opacity:0.5;pointer-events:none}.move_items_container.svelte-jwu78e .card .folders .selected-destination-folder .top .folder_icon svg path.svelte-jwu78e{fill:rgb(255, 201, 31)}.move_items_container.svelte-jwu78e .card .folders .selected-destination-folder .bottom span.svelte-jwu78e{text-decoration-color:rgb(255, 201, 31) !important}.move_items_container.svelte-jwu78e .card .bottom_bar.svelte-jwu78e{height:8%;width:100%;display:flex;align-items:center;justify-content:space-between}.move_items_container.svelte-jwu78e .card .bottom_bar .left.svelte-jwu78e{flex:1;height:100%;display:flex;align-items:center;justify-content:flex-start}.move_items_container.svelte-jwu78e .card .bottom_bar .left .create_folder_icon.svelte-jwu78e{display:flex;align-items:center;justify-content:center}.move_items_container.svelte-jwu78e .card .bottom_bar .left .create_folder_icon svg.svelte-jwu78e{cursor:pointer}.move_items_container.svelte-jwu78e .card .bottom_bar .left .create_folder_icon svg path.svelte-jwu78e{stroke:#6d6d6d;pointer-events:none}.move_items_container.svelte-jwu78e .card .bottom_bar .left .create_folder_icon svg:hover path.svelte-jwu78e{stroke:rgb(15, 17, 17)}.move_items_container.svelte-jwu78e .card .bottom_bar .right.svelte-jwu78e{flex:1;height:100%;display:flex;align-items:center;justify-content:flex-end;gap:0.5em}.move_items_container.svelte-jwu78e .card .bottom_bar .right div.select.svelte-jwu78e,.move_items_container.svelte-jwu78e .card .bottom_bar .right div.cancel.svelte-jwu78e{height:3.5rem;min-width:7rem;border:none;background-color:rgb(238, 238, 238);cursor:pointer;display:flex;align-items:center;justify-content:center;background-image:linear-gradient(to top, rgb(255, 107, 107) 50%, rgb(238, 238, 238) 50%);background-size:100% 200%;background-position:top;transition:background-position 100ms ease-in-out}.move_items_container.svelte-jwu78e .card .bottom_bar .right div.select span.svelte-jwu78e,.move_items_container.svelte-jwu78e .card .bottom_bar .right div.cancel span.svelte-jwu78e{font-family:"Product Sans Medium", sans-serif;font-size:1.3rem;color:rgb(15, 17, 17)}.move_items_container.svelte-jwu78e .card .bottom_bar .right div.select.svelte-jwu78e:hover,.move_items_container.svelte-jwu78e .card .bottom_bar .right div.cancel.svelte-jwu78e:hover{background-position:bottom}.move_items_container.svelte-jwu78e .card .bottom_bar .right div.select:hover span.svelte-jwu78e,.move_items_container.svelte-jwu78e .card .bottom_bar .right div.cancel:hover span.svelte-jwu78e{color:white}.move_items_container.svelte-jwu78e .card .bottom_bar .right div.select.svelte-jwu78e{background-color:rgb(32, 125, 255);background-image:linear-gradient(to top, rgb(0, 189, 86) 50%, rgb(32, 125, 255) 50%)}.move_items_container.svelte-jwu78e .card .bottom_bar .right div.select span.svelte-jwu78e{color:white}.move_items_container.svelte-jwu78e .card .bottom_bar .right div.select.svelte-jwu78e:hover{background-position:bottom}.move_items_container.svelte-jwu78e .card .bottom_bar .right .select-button-disabled.svelte-jwu78e{opacity:0.5;pointer-events:none}@keyframes svelte-jwu78e-zoomIn{0%{transform:scale(0.5)}100%{transform:scale(1)}}',
  map: null
};
const MoveItemsPopup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $selectedLinks, $$unsubscribe_selectedLinks;
  let $selectedFolders, $$unsubscribe_selectedFolders;
  let $selectedDestinationFolder, $$unsubscribe_selectedDestinationFolder;
  let $$unsubscribe_folders;
  let $foldersToRenderInMoveFoldersPopup, $$unsubscribe_foldersToRenderInMoveFoldersPopup;
  let $page, $$unsubscribe_page;
  $$unsubscribe_selectedLinks = subscribe(selectedLinks, (value) => $selectedLinks = value);
  $$unsubscribe_selectedFolders = subscribe(selectedFolders, (value) => $selectedFolders = value);
  $$unsubscribe_selectedDestinationFolder = subscribe(selectedDestinationFolder, (value) => $selectedDestinationFolder = value);
  $$unsubscribe_folders = subscribe(folders, (value) => value);
  $$unsubscribe_foldersToRenderInMoveFoldersPopup = subscribe(foldersToRenderInMoveFoldersPopup, (value) => $foldersToRenderInMoveFoldersPopup = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  onDestroy(() => {
    selectedDestinationFolder.set({});
    foldersToRenderInMoveFoldersPopup.set([]);
    linksToRenderInMoveItemsPopup.set([]);
  });
  async function getDestinationFolderNodes() {
    if ($selectedDestinationFolder.folder_id !== void 0) {
      await getFolderChildren($selectedDestinationFolder);
    }
  }
  async function getDestinationFolderLinks() {
    if ($selectedDestinationFolder.folder_id !== void 0) {
      await getFolderLinks($selectedDestinationFolder.folder_id);
    }
  }
  $$result.css.add(css$e);
  {
    getDestinationFolderNodes(), getDestinationFolderLinks();
  }
  {
    $selectedDestinationFolder.folder_id === void 0 ? getRootLinksOnly() : console.log("selected destination folder is present");
  }
  $$unsubscribe_selectedLinks();
  $$unsubscribe_selectedFolders();
  $$unsubscribe_selectedDestinationFolder();
  $$unsubscribe_folders();
  $$unsubscribe_foldersToRenderInMoveFoldersPopup();
  $$unsubscribe_page();
  return `<div class="${"move_items_container svelte-jwu78e"}"><div class="${"card svelte-jwu78e"}"><div class="${"top_bar svelte-jwu78e"}"><div class="${"left svelte-jwu78e"}"><div class="${"folder_name svelte-jwu78e"}"><div class="${"folder_icon svelte-jwu78e"}"><svg width="${"24px"}" height="${"24px"}" stroke-width="${"1.5"}" viewBox="${"0 0 24 24"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" color="${"#000000"}" class="${"svelte-jwu78e"}"><path d="${"M2 11V4.6a.6.6 0 01.6-.6h6.178a.6.6 0 01.39.144l3.164 2.712a.6.6 0 00.39.144H21.4a.6.6 0 01.6.6V11M2 11v8.4a.6.6 0 00.6.6h18.8a.6.6 0 00.6-.6V11M2 11h20"}" stroke="${"#000000"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"svelte-jwu78e"}"></path></svg></div>
					<span class="${"svelte-jwu78e"}">${escape($selectedDestinationFolder.folder_name === void 0 ? "My folders" : $selectedDestinationFolder.folder_name)}</span></div></div>
			<div class="${"right svelte-jwu78e"}"><div class="${[
    "back_button svelte-jwu78e",
    $selectedDestinationFolder.folder_id === void 0 ? "back-button-disabled" : ""
  ].join(" ").trim()}"><div class="${"back_icon svelte-jwu78e"}"><svg width="${"24px"}" height="${"24px"}" stroke-width="${"1.5"}" viewBox="${"0 0 24 24"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" color="${"#000000"}" class="${"svelte-jwu78e"}"><path d="${"M10.25 4.75l-3.5 3.5 3.5 3.5"}" stroke="${"#000000"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"svelte-jwu78e"}"></path><path d="${"M6.75 8.25h6a4 4 0 014 4v7"}" stroke="${"#000000"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"svelte-jwu78e"}"></path></svg></div>
					<span class="${"svelte-jwu78e"}">Back</span></div></div></div>
		<div class="${"folders svelte-jwu78e"}">${$foldersToRenderInMoveFoldersPopup ? `${each($foldersToRenderInMoveFoldersPopup, ({ folder_id, folder_name, subfolder_of, account_id, label, path }) => {
    return `<div class="${[
      "folder svelte-jwu78e",
      (folder_id === $selectedDestinationFolder.folder_id ? "selected-destination-folder" : "") + " " + ($selectedFolders.map((folder) => folder.folder_id).includes(folder_id) ? "folder_disabled" : "")
    ].join(" ").trim()}"${add_attribute("data-folderid", folder_id, 0)}${add_attribute("data-foldername", folder_name, 0)}${add_attribute("data-subfolderof", subfolder_of == null ? void 0 : subfolder_of.String, 0)}${add_attribute("data-accountid", account_id, 0)}${add_attribute("data-label", label, 0)}${add_attribute("data-path", path, 0)}><div class="${"top svelte-jwu78e"}"><div class="${"folder_icon svelte-jwu78e"}"><svg width="${"24px"}" height="${"24px"}" stroke-width="${"1.5"}" viewBox="${"0 0 24 24"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" color="${"#000000"}" class="${"svelte-jwu78e"}"><path d="${"M2 11V4.6a.6.6 0 01.6-.6h6.178a.6.6 0 01.39.144l3.164 2.712a.6.6 0 00.39.144H21.4a.6.6 0 01.6.6V11M2 11v8.4a.6.6 0 00.6.6h18.8a.6.6 0 00.6-.6V11M2 11h20"}" stroke="${"#000000"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"svelte-jwu78e"}"></path></svg>
							</div></div>
						<div class="${"bottom svelte-jwu78e"}"><span class="${"svelte-jwu78e"}">${escape(folder_name)}</span></div>
					</div>`;
  })}` : ``}</div>
		<div class="${"bottom_bar svelte-jwu78e"}"><div class="${"left svelte-jwu78e"}"><div class="${"create_folder_icon svelte-jwu78e"}"><svg width="${"24px"}" height="${"24px"}" stroke-width="${"1.5"}" viewBox="${"0 0 24 24"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" color="${"#000000"}" class="${"svelte-jwu78e"}"><path d="${"M18 6h2m2 0h-2m0 0V4m0 2v2M21.4 20H2.6a.6.6 0 01-.6-.6V11h19.4a.6.6 0 01.6.6v7.8a.6.6 0 01-.6.6zM2 11V4.6a.6.6 0 01.6-.6h6.178a.6.6 0 01.39.144l3.164 2.712a.6.6 0 00.39.144H14"}" stroke="${"#000000"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"svelte-jwu78e"}"></path></svg></div></div>
			<div class="${"right svelte-jwu78e"}"><div class="${[
    "select svelte-jwu78e",
    $selectedFolders && $selectedFolders.map((f) => f.folder_id).includes($selectedDestinationFolder.folder_id) || $foldersToRenderInMoveFoldersPopup && $selectedFolders.some((f) => {
      return $foldersToRenderInMoveFoldersPopup.map((folder) => folder.folder_id).includes(f.folder_id);
    }) || $page.url.pathname === "/appv1/my_links" && $selectedDestinationFolder.folder_id === void 0 && $selectedLinks.every((link) => {
      var _a;
      return ((_a = link.folder_id) == null ? void 0 : _a.Valid) === false;
    }) || $selectedLinks.length > 0 && $selectedDestinationFolder.folder_id && $selectedLinks.every((link) => {
      var _a;
      return ((_a = link.folder_id) == null ? void 0 : _a.String) === $selectedDestinationFolder.folder_id;
    }) ? "select-button-disabled" : ""
  ].join(" ").trim()}"><span class="${"svelte-jwu78e"}">Select</span></div>
				<div class="${"cancel svelte-jwu78e"}"><span class="${"svelte-jwu78e"}">Cancel</span></div></div></div></div>
</div>`;
});
const renameLinkForm_svelte_svelte_type_style_lang = "";
const css$d = {
  code: '.rename_link.svelte-1sj79xe.svelte-1sj79xe{position:fixed;top:0;left:0;width:100vw;height:100vh;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(1px) brightness(50%);z-index:26}.rename_link.svelte-1sj79xe form.svelte-1sj79xe{min-height:23%;min-width:30%;background-color:white;display:flex;flex-direction:column;box-shadow:rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;padding:0.7em;transform:scale(1);animation:svelte-1sj79xe-zoomin 0.2s ease-in-out}.rename_link.svelte-1sj79xe form .input.svelte-1sj79xe{flex:1;display:flex;align-items:center;width:100%}.rename_link.svelte-1sj79xe form .input input[type=text].svelte-1sj79xe{width:100%;border:none;outline:0.1rem solid #c6c8ca;height:100%;padding:0 0.5em;font-family:"Arial CE", sans-serif;height:3.5rem}.rename_link.svelte-1sj79xe form .input input[type=text].svelte-1sj79xe::placeholder{font-family:"Arial CE", sans-serif}.rename_link.svelte-1sj79xe form .input input[type=text].svelte-1sj79xe:hover{outline-color:rgb(32, 125, 255)}.rename_link.svelte-1sj79xe form .input input[type=text].svelte-1sj79xe:focus{outline-color:rgb(32, 125, 255)}.rename_link.svelte-1sj79xe form .buttons.svelte-1sj79xe{flex:1;width:100%;display:flex;align-items:center;justify-content:flex-end;gap:0.5em}.rename_link.svelte-1sj79xe form .buttons button.svelte-1sj79xe{height:3.5rem;min-width:7rem;border:none;background-color:rgb(238, 238, 238);cursor:pointer;display:flex;align-items:center;justify-content:center;background-image:linear-gradient(to top, rgb(255, 107, 107) 50%, rgb(238, 238, 238) 50%);background-size:100% 200%;background-position:top;transition:background-position 100ms ease-in-out}.rename_link.svelte-1sj79xe form .buttons button span.svelte-1sj79xe{font-family:"Product Sans Medium", sans-serif;font-size:1.3rem;color:rgb(15, 17, 17)}.rename_link.svelte-1sj79xe form .buttons button.svelte-1sj79xe:hover{background-position:bottom}.rename_link.svelte-1sj79xe form .buttons button:hover span.svelte-1sj79xe{color:white}.rename_link.svelte-1sj79xe form .buttons button[type=submit].svelte-1sj79xe{background-color:rgb(32, 125, 255);background-image:linear-gradient(to top, rgb(0, 189, 86) 50%, rgb(32, 125, 255) 50%)}.rename_link.svelte-1sj79xe form .buttons button[type=submit] span.svelte-1sj79xe{color:white}.rename_link.svelte-1sj79xe form .buttons button[type=submit].svelte-1sj79xe:hover{background-position:bottom}.rename_link.svelte-1sj79xe form .buttons .disabled.svelte-1sj79xe{opacity:0.5;pointer-events:none}@keyframes svelte-1sj79xe-zoomin{0%{transform:scale(0)}100%{transform:scale(1)}}',
  map: null
};
const RenameLinkForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let link;
  let $selectedLinks, $$unsubscribe_selectedLinks;
  $$unsubscribe_selectedLinks = subscribe(selectedLinks, (value) => $selectedLinks = value);
  $$result.css.add(css$d);
  link = $selectedLinks[0];
  $$unsubscribe_selectedLinks();
  return `<div class="${"rename_link svelte-1sj79xe"}"><form class="${"svelte-1sj79xe"}"><div class="${"input svelte-1sj79xe"}"><input type="${"text"}" id="${"rename_link_title_input"}" placeholder="${"Enter link title"}" autocomplete="${"off"}" autocorrect="${"off"}" spellcheck="${"false"}" class="${"svelte-1sj79xe"}"${add_attribute("value", link.link_title, 0)}></div>
		<div class="${"buttons svelte-1sj79xe"}"><button type="${"submit"}" class="${["svelte-1sj79xe", link.link_title === "" ? "disabled" : ""].join(" ").trim()}"><span class="${"svelte-1sj79xe"}">Rename</span></button>
			<button class="${"svelte-1sj79xe"}"><span class="${"svelte-1sj79xe"}">Cancel</span></button></div></form>
</div>`;
});
function containsSpecialChars(str) {
  if (str === void 0)
    return;
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
}
const renameFolderForm_svelte_svelte_type_style_lang = "";
const css$c = {
  code: '.rename_folder.svelte-dx4rtp.svelte-dx4rtp{position:fixed;top:0;left:0;width:100vw;height:100vh;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(1px) brightness(50%);z-index:26}.rename_folder.svelte-dx4rtp form.svelte-dx4rtp{min-height:23%;min-width:30%;background-color:white;display:flex;flex-direction:column;box-shadow:rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;padding:0.7em;transform:scale(1);animation:svelte-dx4rtp-zoomin 0.2s ease-in-out}.rename_folder.svelte-dx4rtp form .top.svelte-dx4rtp{flex:1;width:100%;display:flex;align-items:center}.rename_folder.svelte-dx4rtp form .top .input.svelte-dx4rtp{display:flex;align-items:center;width:100%;border:0.2rem solid #c6c8ca;height:3.5rem;border:none;outline:0.1rem solid #c6c8ca}.rename_folder.svelte-dx4rtp form .top .input .icon.svelte-dx4rtp{width:10%;height:100%;display:flex;align-items:center;justify-content:center}.rename_folder.svelte-dx4rtp form .top .input .icon svg path.svelte-dx4rtp{stroke:transparent;fill:rgba(0, 0, 0, 0.5)}.rename_folder.svelte-dx4rtp form .top .input input[type=text].svelte-dx4rtp{width:90%;border:none;outline:none;height:100%;padding:0 0.5em;font-family:"Arial CE", sans-serif}.rename_folder.svelte-dx4rtp form .top .input input[type=text].svelte-dx4rtp::placeholder{font-family:"Arial CE", sans-serif}.rename_folder.svelte-dx4rtp form .top .input.svelte-dx4rtp:hover{outline-color:rgb(32, 125, 255)}.rename_folder.svelte-dx4rtp form .top .input.svelte-dx4rtp:focus-within{outline-color:rgb(32, 125, 255)}.rename_folder.svelte-dx4rtp form .top .input:focus-within .icon svg path.svelte-dx4rtp{fill:rgb(15, 17, 17)}.rename_folder.svelte-dx4rtp form .errors.svelte-dx4rtp{display:flex;flex-direction:column}.rename_folder.svelte-dx4rtp form .errors span.svelte-dx4rtp{font-family:"Arial CE", sans-serif;font-size:1.1rem;color:rgb(164, 38, 44)}.rename_folder.svelte-dx4rtp form .bottom.svelte-dx4rtp{flex:1;width:100%;display:flex;align-items:center;justify-content:flex-end;gap:0.5em}.rename_folder.svelte-dx4rtp form .bottom button.svelte-dx4rtp{height:3.5rem;min-width:7rem;border:none;background-color:rgb(238, 238, 238);cursor:pointer;display:flex;align-items:center;justify-content:center;background-image:linear-gradient(to top, rgb(255, 107, 107) 50%, rgb(238, 238, 238) 50%);background-size:100% 200%;background-position:top;transition:background-position 100ms ease-in-out}.rename_folder.svelte-dx4rtp form .bottom button span.svelte-dx4rtp{font-family:"Product Sans Medium", sans-serif;font-size:1.3rem;color:rgb(15, 17, 17)}.rename_folder.svelte-dx4rtp form .bottom button.svelte-dx4rtp:hover{background-position:bottom}.rename_folder.svelte-dx4rtp form .bottom button:hover span.svelte-dx4rtp{color:white}.rename_folder.svelte-dx4rtp form .bottom button[type=submit].svelte-dx4rtp{background-color:rgb(32, 125, 255);background-image:linear-gradient(to top, rgb(0, 189, 86) 50%, rgb(32, 125, 255) 50%)}.rename_folder.svelte-dx4rtp form .bottom button[type=submit] span.svelte-dx4rtp{color:white}.rename_folder.svelte-dx4rtp form .bottom button[type=submit].svelte-dx4rtp:hover{background-position:bottom}@keyframes svelte-dx4rtp-zoomin{0%{transform:scale(0)}100%{transform:scale(1)}}.rename_folder.svelte-dx4rtp .form_validation_error .top .input.svelte-dx4rtp{outline-color:rgb(164, 38, 44)}.rename_folder.svelte-dx4rtp .form_validation_error .top .input .icon svg path.svelte-dx4rtp{stroke:transparent !important;fill:rgb(164, 38, 44) !important}.rename_folder.svelte-dx4rtp .form_validation_error .top .input.svelte-dx4rtp:hover{outline-color:rgb(164, 38, 44)}.rename_folder.svelte-dx4rtp .form_validation_error .top .input.svelte-dx4rtp:focus-within{outline-color:rgb(164, 38, 44)}.rename_folder.svelte-dx4rtp .form_validation_error .bottom button[type=submit].svelte-dx4rtp{opacity:0.5;pointer-events:none}',
  map: null
};
const RenameFolderForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let folder;
  let $selectedFolders, $$unsubscribe_selectedFolders;
  $$unsubscribe_selectedFolders = subscribe(selectedFolders, (value) => $selectedFolders = value);
  $$result.css.add(css$c);
  folder = $selectedFolders[0];
  $$unsubscribe_selectedFolders();
  return `<div class="${"rename_folder svelte-dx4rtp"}"><form class="${[
    "svelte-dx4rtp",
    folder.folder_name === "" || containsSpecialChars(folder.folder_name) ? "form_validation_error" : ""
  ].join(" ").trim()}"><div class="${"top svelte-dx4rtp"}"><div class="${"input svelte-dx4rtp"}"><div class="${"icon svelte-dx4rtp"}"><svg width="${"24px"}" height="${"24px"}" stroke-width="${"1.5"}" viewBox="${"0 0 24 24"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" color="${"#000000"}"><path d="${"M2 11V4.6a.6.6 0 01.6-.6h6.178a.6.6 0 01.39.144l3.164 2.712a.6.6 0 00.39.144H21.4a.6.6 0 01.6.6V11M2 11v8.4a.6.6 0 00.6.6h18.8a.6.6 0 00.6-.6V11M2 11h20"}" stroke="${"#000000"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"svelte-dx4rtp"}"></path></svg></div>
				<input type="${"text"}" id="${"rename_folder_input"}" placeholder="${"Enter folder name"}" spellcheck="${"false"}" autocomplete="${"off"}" autocorrect="${"off"}" class="${"svelte-dx4rtp"}"${add_attribute("value", folder.folder_name, 0)}></div></div>
		<div class="${"errors svelte-dx4rtp"}">${folder.folder_name === "" ? `<span class="${"svelte-dx4rtp"}">Folder name is required</span>` : ``}
			${containsSpecialChars(folder.folder_name) ? `<span class="${"svelte-dx4rtp"}">Folder name must not contain special characters</span>` : ``}</div>
		<div class="${"bottom svelte-dx4rtp"}"><button type="${"submit"}" class="${"svelte-dx4rtp"}"><span class="${"svelte-dx4rtp"}">Rename</span></button>
			<button class="${"svelte-dx4rtp"}"><span class="${"svelte-dx4rtp"}">Cancel</span></button></div></form>
</div>`;
});
const user = "data:image/png;base64,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";
const navbar_svelte_svelte_type_style_lang = "";
const css$b = {
  code: '.svelte-1hzmjym.svelte-1hzmjym::-webkit-scrollbar{width:0.5rem;height:0.5rem}nav.svelte-1hzmjym.svelte-1hzmjym{position:fixed;top:0;left:0;height:7vh;width:100%;display:flex;align-items:center;box-shadow:rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;z-index:100;background-color:#3a4f7a}nav.svelte-1hzmjym .nav_links.svelte-1hzmjym{flex:10;display:flex;align-items:center;gap:1em;height:100%;display:flex;align-items:center;width:max-content;height:max-content;cursor:pointer;padding-left:0.5em}nav.svelte-1hzmjym .nav_links form.svelte-1hzmjym{background-color:red;width:50%;height:4rem;position:relative;border-radius:0.3rem}nav.svelte-1hzmjym .nav_links form input[type=search].svelte-1hzmjym{border:none;outline:none;height:100%;width:100%;padding:1em;font-size:1.3rem;font-family:"Arial CE", sans-serif;color:rgb(15, 17, 17);background-color:rgb(239, 243, 246);transition:background-color 200ms ease-in-out;border-radius:inherit}nav.svelte-1hzmjym .nav_links form input[type=search].svelte-1hzmjym::-webkit-search-cancel-button{appearance:none}nav.svelte-1hzmjym .nav_links form input[type=search].svelte-1hzmjym::placeholder{font-size:1.3rem;font-family:"Arial CE", sans-serif;color:rgba(0, 0, 0, 0.6)}nav.svelte-1hzmjym .nav_links form input[type=search].svelte-1hzmjym:focus{background-color:white}nav.svelte-1hzmjym .nav_links form input[type=search].svelte-1hzmjym:hover{background-color:white}nav.svelte-1hzmjym .nav_links form i.svelte-1hzmjym{position:absolute;right:0;bottom:0;top:0;height:100%;width:5rem;display:flex;align-items:center;justify-content:center;font-size:1.5rem;color:rgb(15, 17, 17);transition:color 200ms ease-in-out}nav.svelte-1hzmjym .nav_links form i.svelte-1hzmjym:hover{color:#ed4f32}nav.svelte-1hzmjym .nav_links .actions_menu.svelte-1hzmjym{display:flex;align-items:center;gap:1em}nav.svelte-1hzmjym .nav_links .actions_menu div.svelte-1hzmjym{display:flex;align-items:center;justify-content:center;min-width:max-content;border:0.1rem solid whitesmoke;min-height:3rem;gap:1em;transition:all 200ms ease-in-out;padding-right:1em;border-radius:0.3rem}nav.svelte-1hzmjym .nav_links .actions_menu div i.svelte-1hzmjym{font-size:2.3rem;font-weight:700;color:whitesmoke}nav.svelte-1hzmjym .nav_links .actions_menu div span.svelte-1hzmjym{font-family:"Arial CE", sans-serif;font-size:1.3rem;color:whitesmoke;font-weight:600}nav.svelte-1hzmjym .nav_links .actions_menu div.svelte-1hzmjym:hover{border-color:rgb(255, 255, 255);box-shadow:rgba(0, 0, 0, 0.1) 0px 4px 12px}nav.svelte-1hzmjym .nav_links .actions_menu div:hover i.svelte-1hzmjym{color:rgb(255, 255, 255)}nav.svelte-1hzmjym .nav_links .actions_menu div:hover span.svelte-1hzmjym{color:rgb(255, 255, 255)}nav.svelte-1hzmjym .nav_links .custom-select.svelte-1hzmjym{width:25rem;height:4rem;display:flex;align-items:center;background-color:rgb(30, 144, 255);background-color:white;box-shadow:rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;position:relative;border-radius:0.3rem}nav.svelte-1hzmjym .nav_links .custom-select .active-link.svelte-1hzmjym{width:80%;height:100%;display:flex;align-items:center}nav.svelte-1hzmjym .nav_links .custom-select .active-link span.svelte-1hzmjym{color:rgb(15, 17, 17);padding-left:1em;font-size:1.3rem;font-family:"Product Sans Medium", sans-serif;text-decoration:underline;text-decoration-thickness:0.2rem;text-decoration-skip-ink:none;text-underline-offset:0.3em;text-decoration-color:transparent;transition:all 200ms ease-in-out}nav.svelte-1hzmjym .nav_links .custom-select .icon.svelte-1hzmjym{width:20%;height:100%;display:flex;align-items:center;justify-content:center}nav.svelte-1hzmjym .nav_links .custom-select .icon svg path.svelte-1hzmjym{fill:white;fill:rgb(15, 17, 17);stroke:transparent}nav.svelte-1hzmjym .nav_links .custom-select .options.svelte-1hzmjym{position:absolute;top:100%;left:0;right:0;height:auto;background-color:rgb(30, 144, 255);background-color:white;box-shadow:rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;z-index:100;overflow:auto;max-height:70vh;border-radius:0.3rem}nav.svelte-1hzmjym .nav_links .custom-select .options option.svelte-1hzmjym{height:4rem;padding-left:1em;font-size:1.3rem;font-family:"Product Sans Medium", sans-serif;color:white;color:#6d6d6d;display:flex;align-items:center;border-bottom:0.1rem solid rgba(0, 0, 0, 0.1)}nav.svelte-1hzmjym .nav_links .custom-select .options option.svelte-1hzmjym:hover{background-color:rgb(214, 228, 229);color:rgb(15, 17, 17)}nav.svelte-1hzmjym .profile.svelte-1hzmjym{flex:2;height:100%;display:flex;align-items:center;justify-content:flex-end;background-color:inherit;gap:1em;padding-right:2em;gap:2em}nav.svelte-1hzmjym .profile .me.svelte-1hzmjym{height:3.5rem;width:3.5rem;border-radius:50%;cursor:pointer;transition:border-color 200ms linear;outline:none;display:flex;align-items:center;justify-content:center;background-color:rgba(255, 255, 255, 0.89);position:relative}nav.svelte-1hzmjym .profile .me img.svelte-1hzmjym{max-inline-size:100%;height:100%;width:100%;object-fit:cover;border-radius:50%}nav.svelte-1hzmjym .profile .me .profile_hover_popup_menu.svelte-1hzmjym{position:absolute;top:115%;right:0;min-width:20vw;height:max-content;background-color:rgb(58, 79, 122);z-index:500;display:flex;flex-direction:column;box-shadow:rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;cursor:default;border-radius:0.3rem;padding:1em}nav.svelte-1hzmjym .profile .me .profile_hover_popup_menu div.svelte-1hzmjym{height:4rem;display:flex;align-items:center;gap:1.5em;background-color:transparent;padding:1em;border-radius:0.25rem;transition:background-color 200ms ease-in-out}nav.svelte-1hzmjym .profile .me .profile_hover_popup_menu div i.svelte-1hzmjym{color:whitesmoke;font-size:2.3rem;transition:color 200ms ease-in-out}nav.svelte-1hzmjym .profile .me .profile_hover_popup_menu div span.svelte-1hzmjym{color:whitesmoke;font-family:"Arial CE", sans-serif;font-size:1.3rem;transition:color 200ms ease-in-out}nav.svelte-1hzmjym .profile .me .profile_hover_popup_menu div.svelte-1hzmjym:hover{cursor:pointer;background-color:rgba(255, 255, 255, 0.1)}nav.svelte-1hzmjym .profile .me .profile_hover_popup_menu div:hover i.svelte-1hzmjym{color:white}nav.svelte-1hzmjym .profile .me .profile_hover_popup_menu div:hover span.svelte-1hzmjym{color:white}nav.svelte-1hzmjym .menu.svelte-1hzmjym{height:3rem;width:3rem;display:flex;flex-direction:column;justify-content:space-evenly;cursor:pointer;display:none}nav.svelte-1hzmjym .menu .menu_bar.svelte-1hzmjym{width:100%;height:0.2rem;background-color:rgba(255, 255, 255, 0.89);transition:all 0.5s ease-in-out}nav.svelte-1hzmjym .menu:hover .menu_bar.svelte-1hzmjym{background-color:rgb(255, 255, 255)}nav.svelte-1hzmjym .toggle .menu_bar.svelte-1hzmjym:first-of-type{transform:rotate(-45deg) translate(-0.5rem, 0.6rem)}nav.svelte-1hzmjym .toggle .middle.svelte-1hzmjym{opacity:0}nav.svelte-1hzmjym .toggle .menu_bar.svelte-1hzmjym:last-of-type{transform:rotate(45deg) translate(-0.5rem, -0.6rem)}@media screen and (max-width: 300px){nav.svelte-1hzmjym .nav_links.svelte-1hzmjym{padding-left:0.3em}nav.svelte-1hzmjym .nav_links .custom-select.svelte-1hzmjym{width:20rem}nav.svelte-1hzmjym .nav_links form.svelte-1hzmjym{display:none}nav.svelte-1hzmjym .nav_links .actions_menu.svelte-1hzmjym{background-color:#ed4f32;position:fixed;top:7vh;left:0;width:100vw;height:93vh;max-height:93vh;overflow:auto;display:flex;flex-direction:column;align-items:flex-start;gap:0}nav.svelte-1hzmjym .nav_links .actions_menu div.svelte-1hzmjym{width:100%;min-height:4.5rem;justify-content:flex-start;border-color:transparent}nav.svelte-1hzmjym .nav_links .actions_menu div.svelte-1hzmjym:hover,nav.svelte-1hzmjym .nav_links .actions_menu div.svelte-1hzmjym:active{border-color:rgb(255, 255, 255)}nav.svelte-1hzmjym .profile.svelte-1hzmjym{padding-right:1em}nav.svelte-1hzmjym .profile .me.svelte-1hzmjym{display:none}nav.svelte-1hzmjym .profile .menu.svelte-1hzmjym{display:flex}}@media screen and (min-width: 301px) and (max-width: 768px){nav.svelte-1hzmjym .nav_links.svelte-1hzmjym{padding-left:0.3em}nav.svelte-1hzmjym .nav_links .custom-select.svelte-1hzmjym{height:6vh}nav.svelte-1hzmjym .nav_links .custom-select .active-link span.svelte-1hzmjym{font-size:1.8rem}nav.svelte-1hzmjym .nav_links .custom-select .icon svg.svelte-1hzmjym{height:3.5rem;width:3.5rem}nav.svelte-1hzmjym .nav_links .custom-select .options option.svelte-1hzmjym{font-size:1.8rem}nav.svelte-1hzmjym .nav_links form.svelte-1hzmjym{position:fixed;top:0;left:0;width:100%;height:7vh;display:none}nav.svelte-1hzmjym .nav_links .actions_menu.svelte-1hzmjym{background-color:#ed4f32;position:fixed;top:7vh;left:0;width:100vw;height:93vh;max-height:93vh;overflow:auto;display:flex;flex-direction:column;align-items:flex-start;gap:0}nav.svelte-1hzmjym .nav_links .actions_menu div.svelte-1hzmjym{width:100%;min-height:6rem;justify-content:flex-start;border-color:transparent}nav.svelte-1hzmjym .nav_links .actions_menu div i.svelte-1hzmjym{font-size:3rem}nav.svelte-1hzmjym .nav_links .actions_menu div span.svelte-1hzmjym{font-size:1.8rem}nav.svelte-1hzmjym .nav_links .actions_menu div.svelte-1hzmjym:hover,nav.svelte-1hzmjym .nav_links .actions_menu div.svelte-1hzmjym:active{border-color:rgb(255, 255, 255)}nav.svelte-1hzmjym .profile.svelte-1hzmjym{padding-right:0.5em}nav.svelte-1hzmjym .profile .me.svelte-1hzmjym{display:none}nav.svelte-1hzmjym .profile .menu.svelte-1hzmjym{display:flex}}',
  map: null
};
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  var _a, _b;
  let selectedItems;
  let $query, $$unsubscribe_query;
  let $selectedLinks, $$unsubscribe_selectedLinks;
  let $selectedFolders, $$unsubscribe_selectedFolders;
  let $menuToggled, $$unsubscribe_menuToggled;
  let $activePath, $$unsubscribe_activePath;
  let $showOptionsMenu, $$unsubscribe_showOptionsMenu;
  let $page, $$unsubscribe_page;
  let $ancestorsOfCurrentFolder, $$unsubscribe_ancestorsOfCurrentFolder;
  let $openedFolder, $$unsubscribe_openedFolder;
  let $session, $$unsubscribe_session;
  let $profileMenuVisible, $$unsubscribe_profileMenuVisible;
  $$unsubscribe_query = subscribe(query, (value) => $query = value);
  $$unsubscribe_selectedLinks = subscribe(selectedLinks, (value) => $selectedLinks = value);
  $$unsubscribe_selectedFolders = subscribe(selectedFolders, (value) => $selectedFolders = value);
  $$unsubscribe_menuToggled = subscribe(menuToggled, (value) => $menuToggled = value);
  $$unsubscribe_activePath = subscribe(activePath, (value) => $activePath = value);
  $$unsubscribe_showOptionsMenu = subscribe(showOptionsMenu, (value) => $showOptionsMenu = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_ancestorsOfCurrentFolder = subscribe(ancestorsOfCurrentFolder, (value) => $ancestorsOfCurrentFolder = value);
  $$unsubscribe_openedFolder = subscribe(openedFolder, (value) => $openedFolder = value);
  $$unsubscribe_session = subscribe(session, (value) => $session = value);
  $$unsubscribe_profileMenuVisible = subscribe(profileMenuVisible, (value) => $profileMenuVisible = value);
  $$result.css.add(css$b);
  selectedItems = [...$selectedFolders, ...$selectedLinks];
  $$unsubscribe_query();
  $$unsubscribe_selectedLinks();
  $$unsubscribe_selectedFolders();
  $$unsubscribe_menuToggled();
  $$unsubscribe_activePath();
  $$unsubscribe_showOptionsMenu();
  $$unsubscribe_page();
  $$unsubscribe_ancestorsOfCurrentFolder();
  $$unsubscribe_openedFolder();
  $$unsubscribe_session();
  $$unsubscribe_profileMenuVisible();
  return `<svete:head class="${"svelte-1hzmjym"}"><script src="${"https://kit.fontawesome.com/d8939cb1a8.js"}" crossorigin="${"anonymous"}" class="${"svelte-1hzmjym"}"><\/script></svete:head>

<nav class="${"svelte-1hzmjym"}"><div class="${"nav_links svelte-1hzmjym"}">${!$menuToggled ? `<div class="${"custom-select svelte-1hzmjym"}"><div class="${"active-link svelte-1hzmjym"}"><span class="${"svelte-1hzmjym"}">${escape($activePath)}</span></div>
				${$showOptionsMenu ? `<div class="${"icon svelte-1hzmjym"}"><svg width="${"24px"}" height="${"24px"}" stroke-width="${"1.5"}" viewBox="${"0 0 24 24"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" color="${"#000000"}" class="${"svelte-1hzmjym"}"><path d="${"M6 15l6-6 6 6"}" stroke="${"#000000"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"svelte-1hzmjym"}"></path></svg></div>` : `<div class="${"icon svelte-1hzmjym"}"><svg width="${"24px"}" height="${"24px"}" stroke-width="${"1.5"}" viewBox="${"0 0 24 24"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" color="${"#000000"}" class="${"svelte-1hzmjym"}"><path d="${"M6 9l6 6 6-6"}" stroke="${"#000000"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"svelte-1hzmjym"}"></path></svg></div>`}

				${$showOptionsMenu ? `<div class="${"options svelte-1hzmjym"}"><option value="${"/appv1/my_links"}" class="${["svelte-1hzmjym", $page.url.pathname === "/appv1/my_links" ? "active" : ""].join(" ").trim()}">My links</option>
						<option value="${"/appv1/my_links/recycle_bin"}" class="${[
    "svelte-1hzmjym",
    $page.url.pathname === "/appv1/my_links/recycle_bin" ? "active" : ""
  ].join(" ").trim()}">Recycle bin</option>
						${$ancestorsOfCurrentFolder && $ancestorsOfCurrentFolder.length > 0 ? `${each($ancestorsOfCurrentFolder, ({ folder_name, folder_id, subfolder_of }) => {
    return `<option${add_attribute("value", folder_name, 0)} class="${[
      "svelte-1hzmjym",
      $openedFolder && $openedFolder.folder_name && $openedFolder.folder_id === folder_id ? "active" : ""
    ].join(" ").trim()}">${escape(folder_name)}</option>`;
  })}` : ``}</div>` : ``}</div>
			<form class="${"svelte-1hzmjym"}"><input type="${"search"}" name="${"search"}" id="${"search"}" placeholder="${"Search your links and folders..."}" autocomplete="${"off"}" class="${"svelte-1hzmjym"}"${add_attribute("value", $query, 0)}>
				${$query !== "" ? `<i class="${"las la-times svelte-1hzmjym"}"></i>` : ``}</form>
			<div class="${"actions_menu svelte-1hzmjym"}"><div class="${"new_link svelte-1hzmjym"}"><i class="${"las la-plus svelte-1hzmjym"}"></i>
					<span class="${"svelte-1hzmjym"}">New link</span></div>
				<div class="${"new_folder svelte-1hzmjym"}"><i class="${"las la-folder-plus svelte-1hzmjym"}"></i>
					<span class="${"svelte-1hzmjym"}">New folder</span></div>
				<div class="${"report_bug svelte-1hzmjym"}"><i class="${"las la-bug svelte-1hzmjym"}"></i>
					<span class="${"svelte-1hzmjym"}">Report bug</span></div>
				<div class="${"suggest_feature svelte-1hzmjym"}"><i class="${"las la-lightbulb svelte-1hzmjym"}"></i>
					<span class="${"svelte-1hzmjym"}">Suggest feature</span></div>
				<div class="${"help svelte-1hzmjym"}"><i class="${"las la-question svelte-1hzmjym"}"></i>
					<span class="${"svelte-1hzmjym"}">Contact support</span></div></div>` : ``}</div>

	<div class="${"profile svelte-1hzmjym"}"><div class="${"me svelte-1hzmjym"}">${$session ? `${$session.Account ? `${((_a = $session.Account) == null ? void 0 : _a.picture) !== "" ? `<img${add_attribute("src", (_b = $session.Account) == null ? void 0 : _b.picture, 0)} alt="${"profile"}" class="${"svelte-1hzmjym"}">` : `<img${add_attribute("src", user, 0)} alt="${"profile"}" class="${"svelte-1hzmjym"}">`}` : `<img${add_attribute("src", user, 0)} alt="${"profile"}" class="${"svelte-1hzmjym"}">`}` : ``}
			${$profileMenuVisible && selectedItems.length < 1 ? `<div class="${"profile_hover_popup_menu svelte-1hzmjym"}"><div class="${"settings svelte-1hzmjym"}"><i class="${"las la-cog svelte-1hzmjym"}"></i>
						<span class="${"svelte-1hzmjym"}">My profile</span></div>
					<div class="${"suggest_feature svelte-1hzmjym"}"><i class="${"las la-lightbulb svelte-1hzmjym"}"></i>
						<span class="${"svelte-1hzmjym"}">Suggest feature</span></div>
					<div class="${"bug svelte-1hzmjym"}"><i class="${"las la-bug svelte-1hzmjym"}"></i>
						<span class="${"svelte-1hzmjym"}">Report bug</span></div>
					<div class="${"help svelte-1hzmjym"}"><i class="${"las la-question svelte-1hzmjym"}"></i>
						<span class="${"svelte-1hzmjym"}">Contact support</span></div>
					<div class="${"logout svelte-1hzmjym"}"><i class="${"las la-sign-out-alt svelte-1hzmjym"}"></i>
						<span class="${"svelte-1hzmjym"}">Log Out</span></div></div>` : ``}</div>
		<div class="${["menu svelte-1hzmjym", $menuToggled ? "toggle" : ""].join(" ").trim()}"><div class="${"menu_bar svelte-1hzmjym"}"></div>
			<div class="${"menu_bar middle svelte-1hzmjym"}"></div>
			<div class="${"menu_bar svelte-1hzmjym"}"></div></div></div>
</nav>`;
});
const folder_svelte_svelte_type_style_lang = "";
const css$a = {
  code: '.folder.svelte-140h0g1.svelte-140h0g1.svelte-140h0g1{height:30rem;width:30rem;border:0.1rem solid #c6c8ca;border-radius:0.6rem;position:relative;transition:box-shadow 0.3s ease-in-out;backdrop-filter:brightness(95%)}.folder.svelte-140h0g1 .top.svelte-140h0g1.svelte-140h0g1{height:80%;width:100%;display:flex;align-items:center;justify-content:center}.folder.svelte-140h0g1 .top .icon.svelte-140h0g1.svelte-140h0g1{height:100%;width:100%;display:flex;align-items:center;justify-content:center}.folder.svelte-140h0g1 .top .icon svg.svelte-140h0g1.svelte-140h0g1{width:60%;height:60%}.folder.svelte-140h0g1 .top .icon svg path.svelte-140h0g1.svelte-140h0g1{stroke:transparent;fill:rgb(255, 201, 31)}.folder.svelte-140h0g1 .bottom.svelte-140h0g1.svelte-140h0g1{height:20%;width:100%;display:flex;align-items:center;justify-content:center}.folder.svelte-140h0g1 .bottom .folder-name.svelte-140h0g1.svelte-140h0g1{width:90%;height:100%;padding:0.5em 0;display:flex;flex-direction:column;align-items:center;justify-content:center}.folder.svelte-140h0g1 .bottom .folder-name span.svelte-140h0g1.svelte-140h0g1{font-size:1.3rem;font-family:"Arial CE", sans-serif;color:rgb(15, 17, 17);cursor:pointer;transition:color 0.3ms linear;min-width:60%;height:max-content;display:flex;align-items:center;justify-content:center;text-decoration-line:underline;text-decoration-style:solid;text-decoration-color:transparent}.folder.svelte-140h0g1 .bottom .folder-name span.last_update.svelte-140h0g1.svelte-140h0g1{font-family:"Arial CE", sans-serif;color:rgba(0, 0, 0, 0.6);font-size:1.2rem;display:none}.folder.svelte-140h0g1 .check-box.svelte-140h0g1.svelte-140h0g1{height:1.7rem;width:1.7rem;display:flex;align-items:center;justify-content:center;border:0.15rem solid rgb(15, 17, 17);position:absolute;top:1%;right:1%;background-color:white;opacity:0;border-radius:100vh;transform:scale(1);box-shadow:rgba(0, 0, 0, 0.15) 0px 2px 8px;transition:opacity 0.2s linear, transform 0.2s linear}.folder.svelte-140h0g1 .check-box svg.svelte-140h0g1.svelte-140h0g1{visibility:hidden;pointer-events:none}.folder.svelte-140h0g1 .check-box svg path.svelte-140h0g1.svelte-140h0g1{stroke:rgb(27, 36, 48);pointer-events:none}.folder.svelte-140h0g1 .check-box.svelte-140h0g1.svelte-140h0g1:hover{transform:scale(1.1)}.folder.svelte-140h0g1 .check-box:hover svg.svelte-140h0g1.svelte-140h0g1{visibility:visible}.folder.svelte-140h0g1.svelte-140h0g1.svelte-140h0g1:hover{backdrop-filter:brightness(95%);box-shadow:0 0.125rem 0.5rem 0 rgba(0, 0, 0, 0.22)}.folder.svelte-140h0g1:hover .check-box.svelte-140h0g1.svelte-140h0g1{opacity:1}.folder.svelte-140h0g1:hover .bottom .folder-name span.folder_name.svelte-140h0g1.svelte-140h0g1{text-decoration-color:rgb(15, 17, 17)}.folder.svelte-140h0g1:hover .bottom .folder-name span.folder_name.svelte-140h0g1.svelte-140h0g1{text-emphasis-color:rgb(255, 201, 31) !important}.folder_cut.svelte-140h0g1.svelte-140h0g1.svelte-140h0g1{border-style:dashed;opacity:0.5;pointer-events:none}.folder-selected{backdrop-filter:brightness(95%)}.folder-selected .top.svelte-140h0g1 .icon svg.svelte-140h0g1 path.svelte-140h0g1{stroke:transparent;fill:rgb(32, 125, 255)}.folder-selected .bottom.svelte-140h0g1 .folder-name span.folder_name.svelte-140h0g1.svelte-140h0g1{text-decoration-color:rgb(32, 125, 255) !important}.folder-selected .check-box.svelte-140h0g1.svelte-140h0g1.svelte-140h0g1{background-color:rgb(32, 125, 255) !important;opacity:1 !important;border-color:rgb(32, 125, 255)}.folder-selected .check-box.svelte-140h0g1 svg.svelte-140h0g1.svelte-140h0g1{visibility:visible}.folder-selected .check-box.svelte-140h0g1 svg.svelte-140h0g1 path.svelte-140h0g1{stroke:white !important}.folder-selected:hover{box-shadow:none !important}',
  map: null
};
const Folder = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  var _a, _b;
  let $selectedFolders, $$unsubscribe_selectedFolders;
  let $$unsubscribe_controlKeyIsPressed;
  let $foldersCut, $$unsubscribe_foldersCut;
  $$unsubscribe_selectedFolders = subscribe(selectedFolders, (value) => $selectedFolders = value);
  $$unsubscribe_controlKeyIsPressed = subscribe(controlKeyIsPressed, (value) => value);
  $$unsubscribe_foldersCut = subscribe(foldersCut, (value) => $foldersCut = value);
  let { folder } = $$props;
  if ($$props.folder === void 0 && $$bindings.folder && folder !== void 0)
    $$bindings.folder(folder);
  $$result.css.add(css$a);
  $$unsubscribe_selectedFolders();
  $$unsubscribe_controlKeyIsPressed();
  $$unsubscribe_foldersCut();
  return `<div class="${[
    "folder svelte-140h0g1",
    ($foldersCut.map((f) => f.folder_id).includes(folder.folder_id) ? "folder_cut" : "") + " " + ($selectedFolders.map((f) => f.folder_id).includes(folder.folder_id) ? "folder-selected" : "")
  ].join(" ").trim()}"${add_attribute("data-folderid", folder.folder_id, 0)}${add_attribute("data-foldername", folder.folder_name, 0)}${add_attribute("data-accountid", folder.account_id, 0)}${add_attribute("data-folderlabel", folder.label, 0)}${add_attribute("data-folderpath", folder.path, 0)}${add_attribute("data-subfolderof", (_a = folder.subfolder_of) == null ? void 0 : _a.String, 0)}><div class="${"top svelte-140h0g1"}"><div class="${"icon svelte-140h0g1"}"><svg width="${"60px"}" height="${"60px"}" stroke-width="${"1.04"}" viewBox="${"0 0 24 24"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" color="${"#000000"}" class="${"svelte-140h0g1"}"><path d="${"M2 11V4.6a.6.6 0 01.6-.6h6.178a.6.6 0 01.39.144l3.164 2.712a.6.6 0 00.39.144H21.4a.6.6 0 01.6.6V11M2 11v8.4a.6.6 0 00.6.6h18.8a.6.6 0 00.6-.6V11M2 11h20"}" stroke="${"#000000"}" stroke-width="${"1.04"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"svelte-140h0g1"}"></path></svg></div></div>
	<div class="${"bottom svelte-140h0g1"}"><div class="${"folder-name svelte-140h0g1"}"><span class="${"folder_name svelte-140h0g1"}">${escape(folder.folder_name)}</span>
			<span class="${"last_update svelte-140h0g1"}">${escape(folder.folder_updated_at ? folder.folder_updated_at : folder.folder_created_at)}</span></div></div>

	<div class="${"check-box svelte-140h0g1"}"${add_attribute("data-folderid", folder.folder_id, 0)}${add_attribute("data-foldername", folder.folder_name, 0)}${add_attribute("data-accountid", folder.account_id, 0)}${add_attribute("data-folderlabel", folder.label, 0)}${add_attribute("data-folderpath", folder.path, 0)}${add_attribute("data-subfolderof", (_b = folder.subfolder_of) == null ? void 0 : _b.String, 0)}><svg width="${"24px"}" height="${"24px"}" stroke-width="${"1.5"}" viewBox="${"0 0 24 24"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" color="${"#000000"}" class="${"svelte-140h0g1"}"><path d="${"M5 13l4 4L19 7"}" stroke="${"#000000"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"svelte-140h0g1"}"></path></svg></div>
</div>`;
});
const DefaultFavicon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAF7klEQVRoge2a229VRRTGf20DBNDS04o+KBHoJYAaufhiaIEQ4y0+GSFKoq3EG2JUIEHxyWsIDxr9MxQlJqKABisCYrQCxtiW1qokqIVya0u4y/FhrcXM2WefveecnhJJ+JKdOXtmzdrr23tmzZo1B64hGJP0GlVUlFFXPbAYmA/MBBqBTETmBNALdAG7gHagr4w2lIwMsArYB2RLvPYCL5NP+oqgDtgADHkGDQEXvfsPgWbvvgX4yLu/GOk/CKznChGqAJYDA54BW4FHgXV6fxp4wutjcoZW4IzWrQMeA7Z5ckeANso77HNQC3zqPfBbZD4ALAIuAJeARyL9okQAlqjsBWCh1jUDOz35TYzC12kCfscNoVavbQwyebPA6zF944gAvKn1XarD0AYMa9tvQMMIbb+MOcBhVdwRo3i1tnUDY2P6FyIyFjigbasjbY3AT9p2GJhdou2X0YQj8TVwXaR9PDKms8ADBXQUIgLwIG5ejI+0XQ98gyNT8pfJ4IZTJzAhRuYZbf85QU8SEbRvFngqpm0ibtj2AjWpVkdQQe7EtqGzMqLse21bkaArjcgKbd/j1U3Seht6dn1Ckd5sOW5iv4KsvqbsPOIu13ky1SMgUo2b3GuBz4GzXr9eYA1uzWmNV5OPOtw6YW+6CnGr25SI/5ZOaf0HwHPAfcBdwHTk65lcjdbNU5lngfeALR4Rf7H8CnHTVWrDStx8CXLLG7TDDqAypr0WcZE2yct5DQBPAzfEPLcSt86sjzZGx1sGOIh4jGZgdwGyFUgAOAm4Wx88C5gBTFE9tVranBoEjmu/E8AhZN5160vZrTIZCg/FFmQhHgKmqp5Y2Jqwq5CAolHlDqXIQfocMfytcvUpct+p3EtJQhbFPpyibInKfRZgYCiRzSoXDXEKPbvDr/TnQD2ygp4GvkhRNlfLvQEGhmKflnNS5DYjQec8ZHgBuUQWa9mOuL8kNGn5a5iNQTBdTYlSQmKH/jabc4g0a7kt4KF1Wg4EyIbiSER3ErZq2WIVPpGZWv4SoMjcYzmJHI3oToJ9vRlW4ROxoOxggKJaLY8HyIaiGCJ/aNkYbahENjoXyd0bFMI5xHPEhe1RhHqtsWrDOdLjqTGIrf+iH8M6VCOL0dWIamA4LgS5qlHq0BoXIBs6tMapXJrrh5ihZV/kEnASiTRvCVB0TMsQVxkK0xXiQKYgtp5AbM/xWr1a3hqgaDSITNYyxKVP07LHKnwiXVreEaDIiIS4ylDYSzmWKCW4Xctuq/CJWMR7f4Ai8/k3BsiGwnSFEDEbL0fpPpF2LReRn9GIwj7pbQEPDYXp6kmUEtssqbfdKn0ifUgEOgFJ0yTBItW5iVLFwXTtS5SChxAyHSREIasQF/hDirIGlfsrwMBQ9/uPyk1Pkdujci/6lXFb3T+R1bKFwjtFf6s7H7gJCeBmATfjtrgZ3CFP3Fa3E3EyA2pg2lZ3ARLCDyJ7kZNJjNfjktRxK/9kJEHgZ+TLdVkmvpZ8VCIvNgu8k0TAkMFlSFZqXRWwFJlc/hlIFknlbAHeVYL3ION9GoXTQfci6aD3kf3PqYjO88CX5KaDXtC2forIOLbhkm9rkMXSHnIW2W6u9YiMNEE3hKzQryKbpnNevz4kSWgJusdDSYDMgU3kvqVuJAHnGz1aKdMa4Hl9pm/DxmJIGDLI+UQWmZQTY2Qsib0/QU8akf3aXiiJ3antPYzgdLgBd6zQjiTufIzmsUI17lihn/R8Vypmq6Iskv6Jbi8tqXeA0g96VkXamnA5tn7gzhJtz0MDbpgNI87A4B+9vRHTtxCRt3DD1t8DPYlLavdQhi8RRQ1yPmGG7cKlkBbiDkOXRPrFEVmKOwxdoHW2APsTe9T+MVGBnE/YvMki/n4Z8JrenyH3i0WJtJF7PL0MOUIwuX6KdLEjQQaJAAY9AwbJXSw3kv+HgY+9+7g/DLxNCcdr5UAGyYp3eAYVe/2oOkZEoJz/LpiK5GKbkeCxnvwd5FHEadifarYTlhD8X6Ca5BDmGnz8BzCvMYso8eOgAAAAAElFTkSuQmCC";
const link_svelte_svelte_type_style_lang = "";
const css$9 = {
  code: '.link.svelte-159v0d7.svelte-159v0d7.svelte-159v0d7{height:30rem;width:30rem;border-radius:0.3rem;border:0.1rem solid #c6c8ca;background-color:white;transition:box-shadow 0.2s ease-in-out;position:relative;border-radius:0.6rem}.link.svelte-159v0d7 .top.svelte-159v0d7.svelte-159v0d7{height:70%;width:100%}.link.svelte-159v0d7 .top .img-container.svelte-159v0d7.svelte-159v0d7{width:100%;height:100%;background-color:rgb(238, 238, 238)}.link.svelte-159v0d7 .top .img-container img.svelte-159v0d7.svelte-159v0d7{max-inline-size:100%;max-width:100%;height:100%;width:100%;object-fit:fill;filter:brightness(95%);transition:filter 200ms ease-in-out}.link.svelte-159v0d7 .bottom.svelte-159v0d7.svelte-159v0d7{height:30%;min-height:30%;width:100%}.link.svelte-159v0d7 .bottom .text-content.svelte-159v0d7.svelte-159v0d7{width:100%;height:100%;display:flex;flex-direction:column}.link.svelte-159v0d7 .bottom .text-content .title.svelte-159v0d7.svelte-159v0d7{width:100%;transition:height 200ms ease-in-out;display:flex;align-items:center;transition:height 0.4s linear;flex:2;padding:0 0.5em 0 0.5em;overflow:auto}.link.svelte-159v0d7 .bottom .text-content .title span.svelte-159v0d7.svelte-159v0d7{font-family:"Arial CE", sans-serif;font-size:1.3rem;color:rgb(15, 17, 17);text-decoration:none;line-height:1.6;text-decoration:underline;text-decoration-color:transparent;transition:text-decoration-color 0.2s linear;cursor:pointer;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis;text-transform:capitalize}.link.svelte-159v0d7 .bottom .text-content .flavicon_and_menu.svelte-159v0d7.svelte-159v0d7{width:100%;display:flex;align-items:center;justify-content:space-between;flex:1;padding:0 0.5em 0 0.5em;overflow:auto}.link.svelte-159v0d7 .bottom .text-content .flavicon_and_menu .flavicon.svelte-159v0d7.svelte-159v0d7{display:flex;align-items:center;gap:0.5em;width:90%;height:100%}.link.svelte-159v0d7 .bottom .text-content .flavicon_and_menu .flavicon .flavicon-container.svelte-159v0d7.svelte-159v0d7{height:1.8rem;width:1.8rem;border-radius:100vh;display:flex;align-items:center;justify-content:center}.link.svelte-159v0d7 .bottom .text-content .flavicon_and_menu .flavicon .flavicon-container img.svelte-159v0d7.svelte-159v0d7{max-inline-size:100%;height:100%;width:100%;object-fit:cover;border-radius:100vh;border-radius:inherit}.link.svelte-159v0d7 .bottom .text-content .flavicon_and_menu .flavicon .host span.svelte-159v0d7.svelte-159v0d7{font-size:1.2rem;color:rgba(0, 0, 0, 0.6);font-family:"Arial CE", sans-serif;cursor:pointer}.link.svelte-159v0d7 .bottom .text-content .flavicon_and_menu .menu.svelte-159v0d7.svelte-159v0d7{width:10%;height:100%;display:flex;align-items:center;justify-content:flex-end}.link.svelte-159v0d7 .bottom .text-content .flavicon_and_menu .menu .icon.svelte-159v0d7.svelte-159v0d7{width:2.5rem;height:2.5rem;display:flex;align-items:center;justify-content:flex-end}.link.svelte-159v0d7 .bottom .text-content .flavicon_and_menu .menu .icon svg.svelte-159v0d7.svelte-159v0d7{cursor:pointer}.link.svelte-159v0d7 .bottom .text-content .flavicon_and_menu .menu .icon svg path.svelte-159v0d7.svelte-159v0d7{stroke:rgb(27, 36, 48);pointer-events:none}.link.svelte-159v0d7 .check-box.svelte-159v0d7.svelte-159v0d7{height:1.7rem;width:1.7rem;display:flex;align-items:center;justify-content:center;border:0.15rem solid rgb(15, 17, 17);position:absolute;top:1%;right:1%;background-color:white;opacity:0;cursor:pointer;border-radius:100vh;transform:scale(1);box-shadow:rgba(0, 0, 0, 0.15) 0px 2px 8px;transition:opacity 0.2s linear, transform 0.2s linear}.link.svelte-159v0d7 .check-box svg.svelte-159v0d7.svelte-159v0d7{visibility:hidden;pointer-events:none}.link.svelte-159v0d7 .check-box svg path.svelte-159v0d7.svelte-159v0d7{stroke:rgb(27, 36, 48);pointer-events:none}.link.svelte-159v0d7 .check-box.svelte-159v0d7.svelte-159v0d7:hover{transform:scale(1.1)}.link.svelte-159v0d7 .check-box:hover svg.svelte-159v0d7.svelte-159v0d7{visibility:visible}.link.svelte-159v0d7.svelte-159v0d7.svelte-159v0d7:hover{box-shadow:0 0.125rem 0.5rem 0 rgba(0, 0, 0, 0.22)}.link.svelte-159v0d7:hover .top .img-container img.svelte-159v0d7.svelte-159v0d7{filter:brightness(80%)}.link.svelte-159v0d7:hover .bottom .text-content .title span.svelte-159v0d7.svelte-159v0d7{text-decoration-color:rgb(15, 17, 17)}.link.svelte-159v0d7:hover .bottom .text-content .flavicon_and_menu .flavicon .host.svelte-159v0d7.svelte-159v0d7{text-decoration:underline;color:rgb(15, 17, 17);text-decoration-color:rgb(15, 17, 17)}.link.svelte-159v0d7:hover .check-box.svelte-159v0d7.svelte-159v0d7{opacity:1}.link_cut.svelte-159v0d7.svelte-159v0d7.svelte-159v0d7{border-style:dashed;opacity:0.5;pointer-events:none}.link-selected{background-color:rgb(214, 230, 255) !important}.link-selected .top.svelte-159v0d7.svelte-159v0d7.svelte-159v0d7{background-color:rgb(214, 230, 255) !important}.link-selected .top.svelte-159v0d7 .img-container img.svelte-159v0d7.svelte-159v0d7{filter:brightness(80%)}.link-selected .bottom.svelte-159v0d7.svelte-159v0d7.svelte-159v0d7{background-color:rgb(214, 230, 255) !important}.link-selected .bottom.svelte-159v0d7 .text-content .title span.svelte-159v0d7.svelte-159v0d7{color:rgb(32, 125, 255) !important;text-decoration-color:rgb(32, 125, 255) !important}.link-selected .bottom.svelte-159v0d7 .flavicon_and_menu .flavicon .host span.svelte-159v0d7.svelte-159v0d7{color:rgb(32, 125, 255) !important;text-decoration:underline}.link-selected .bottom.svelte-159v0d7 .flavicon_and_menu .menu .icon svg.svelte-159v0d7 path.svelte-159v0d7{stroke:rgb(32, 125, 255) !important}.link-selected .check-box.svelte-159v0d7.svelte-159v0d7.svelte-159v0d7{background-color:rgb(32, 125, 255) !important;opacity:1 !important;border-color:rgb(32, 125, 255)}.link-selected .check-box.svelte-159v0d7 svg.svelte-159v0d7.svelte-159v0d7{visibility:visible}.link-selected .check-box.svelte-159v0d7 svg.svelte-159v0d7 path.svelte-159v0d7{stroke:white !important}.link-selected:hover{box-shadow:none !important}.link-selected:hover .top.svelte-159v0d7 .img-container img.svelte-159v0d7.svelte-159v0d7{filter:brightness(80%)}',
  map: null
};
const Link = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  var _a, _b;
  let $selectedLinks, $$unsubscribe_selectedLinks;
  let $$unsubscribe_controlKeyIsPressed;
  let $linksCut, $$unsubscribe_linksCut;
  $$unsubscribe_selectedLinks = subscribe(selectedLinks, (value) => $selectedLinks = value);
  $$unsubscribe_controlKeyIsPressed = subscribe(controlKeyIsPressed, (value) => value);
  $$unsubscribe_linksCut = subscribe(linksCut, (value) => $linksCut = value);
  let { link } = $$props;
  if ($$props.link === void 0 && $$bindings.link && link !== void 0)
    $$bindings.link(link);
  $$result.css.add(css$9);
  $$unsubscribe_selectedLinks();
  $$unsubscribe_controlKeyIsPressed();
  $$unsubscribe_linksCut();
  return `<div class="${[
    "link svelte-159v0d7",
    ($linksCut.map((li) => li.link_id).includes(link.link_id) ? "link_cut" : "") + " " + ($selectedLinks.map((li) => li.link_id).includes(link.link_id) ? "link-selected" : "")
  ].join(" ").trim()}"${add_attribute("data-linkid", link.link_id, 0)}${add_attribute("data-linktitle", link.link_title, 0)}${add_attribute("data-accountid", link.account_id, 0)}${add_attribute("data-folderid", (_a = link.folder_id) == null ? void 0 : _a.String, 0)}${add_attribute("data-link_url", link.link_url, 0)}><div class="${"top svelte-159v0d7"}"><div class="${"img-container svelte-159v0d7"}"><img${add_attribute("src", link.link_thumbnail, 0)} alt="${"card-hero"}" class="${"svelte-159v0d7"}"></div></div>
	<div class="${"bottom svelte-159v0d7"}"><div class="${"text-content svelte-159v0d7"}"><div class="${"title svelte-159v0d7"}"><span class="${"svelte-159v0d7"}">${escape(link.link_title)}</span></div>
			<div class="${"flavicon_and_menu svelte-159v0d7"}"><div class="${"flavicon svelte-159v0d7"}"><div class="${"flavicon-container svelte-159v0d7"}"><img${add_attribute(
    "src",
    link.link_favicon !== "" ? link.link_favicon : DefaultFavicon,
    0
  )} alt="${"flavicon"}" class="${"svelte-159v0d7"}"></div>
					<div class="${"host svelte-159v0d7"}"><span class="${"svelte-159v0d7"}">${escape(link.link_hostname)}</span></div></div>
				<div class="${"menu svelte-159v0d7"}"><div class="${"icon svelte-159v0d7"}"><svg width="${"24px"}" height="${"24px"}" stroke-width="${"1.5"}" viewBox="${"0 0 24 24"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" color="${"#000000"}" class="${"more_svg svelte-159v0d7"}"><path d="${"M12 12.5a.5.5 0 100-1 .5.5 0 000 1zM12 18.5a.5.5 0 100-1 .5.5 0 000 1zM12 6.5a.5.5 0 100-1 .5.5 0 000 1z"}" fill="${"#000000"}" stroke="${"#000000"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"svelte-159v0d7"}"></path></svg></div></div></div></div></div>
	<div class="${"check-box svelte-159v0d7"}"${add_attribute("data-linkid", link.link_id, 0)}${add_attribute("data-linktitle", link.link_title, 0)}${add_attribute("data-accountid", link.account_id, 0)}${add_attribute("data-folderid", (_b = link.folder_id) == null ? void 0 : _b.String, 0)}><svg width="${"24px"}" height="${"24px"}" stroke-width="${"1.5"}" viewBox="${"0 0 24 24"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" color="${"#000000"}" class="${"svelte-159v0d7"}"><path d="${"M5 13l4 4L19 7"}" stroke="${"#000000"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"svelte-159v0d7"}"></path></svg></div>
</div>`;
});
const spinner_svelte_svelte_type_style_lang = "";
const morphingbar_svelte_svelte_type_style_lang = "";
const addFolderForm_svelte_svelte_type_style_lang = "";
const css$8 = {
  code: '.create-folder.svelte-1ywh1l3.svelte-1ywh1l3{position:fixed;top:0;left:0;width:100vw;height:100vh;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(2px) brightness(50%);z-index:1500}.create-folder.svelte-1ywh1l3 form.svelte-1ywh1l3{min-height:23%;min-width:30%;background-color:white;display:flex;flex-direction:column;box-shadow:rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;padding:0.5em 1em;transform:scale(1);animation:svelte-1ywh1l3-zoomin 0.2s ease-in-out}.create-folder.svelte-1ywh1l3 form .top.svelte-1ywh1l3{flex:1;width:100%;display:flex;align-items:center}.create-folder.svelte-1ywh1l3 form .top .input.svelte-1ywh1l3{display:flex;align-items:center;width:100%;border:0.2rem solid #c6c8ca;height:3.5rem;border:none;outline:0.1rem solid #c6c8ca}.create-folder.svelte-1ywh1l3 form .top .input .folder-icon.svelte-1ywh1l3{width:10%;height:100%;display:flex;align-items:center;justify-content:center}.create-folder.svelte-1ywh1l3 form .top .input .folder-icon svg path.svelte-1ywh1l3{stroke:transparent;fill:rgba(0, 0, 0, 0.5)}.create-folder.svelte-1ywh1l3 form .top .input input[type=text].svelte-1ywh1l3{width:90%;border:none;outline:none;height:100%;padding:0 0.5em;font-family:"Arial CE", sans-serif}.create-folder.svelte-1ywh1l3 form .top .input input[type=text].svelte-1ywh1l3::placeholder{font-family:"Arial CE", sans-serif}.create-folder.svelte-1ywh1l3 form .top .input.svelte-1ywh1l3:hover{outline-color:rgb(32, 125, 255)}.create-folder.svelte-1ywh1l3 form .top .input.svelte-1ywh1l3:focus-within{outline-color:rgb(32, 125, 255)}.create-folder.svelte-1ywh1l3 form .top .input:focus-within .folder-icon svg path.svelte-1ywh1l3{fill:rgb(15, 17, 17)}.create-folder.svelte-1ywh1l3 form .top .outline-red.svelte-1ywh1l3{outline-color:rgb(164, 38, 44)}.create-folder.svelte-1ywh1l3 form .top .outline-red.svelte-1ywh1l3:hover{outline-color:rgb(164, 38, 44)}.create-folder.svelte-1ywh1l3 form .top .outline-red.svelte-1ywh1l3:focus-within{outline-color:rgb(164, 38, 44)}.create-folder.svelte-1ywh1l3 form .errors.svelte-1ywh1l3{display:flex;flex-direction:column}.create-folder.svelte-1ywh1l3 form .errors span.svelte-1ywh1l3{font-family:"Arial CE", sans-serif;font-size:1.1rem;color:rgb(164, 38, 44)}.create-folder.svelte-1ywh1l3 form .bottom.svelte-1ywh1l3{flex:1;width:100%;display:flex;align-items:center;justify-content:flex-end}.create-folder.svelte-1ywh1l3 form .bottom .buttons.svelte-1ywh1l3{display:flex;align-items:center;gap:0.5em}.create-folder.svelte-1ywh1l3 form .bottom .buttons button.svelte-1ywh1l3{height:3.5rem;min-width:7rem;border:none;background-color:rgb(238, 238, 238);cursor:pointer;display:flex;align-items:center;justify-content:center}.create-folder.svelte-1ywh1l3 form .bottom .buttons button span.svelte-1ywh1l3{font-family:"Product Sans Medium", sans-serif;font-size:1.3rem;color:rgb(15, 17, 17)}.create-folder.svelte-1ywh1l3 form .bottom .buttons button.svelte-1ywh1l3:hover{filter:brightness(90%)}.create-folder.svelte-1ywh1l3 form .bottom .buttons button[type=submit].svelte-1ywh1l3{background-color:rgb(255, 201, 31);transition:all 200ms ease-in-out}.create-folder.svelte-1ywh1l3 form .bottom .buttons button[type=submit] span.svelte-1ywh1l3{color:rgb(15, 17, 17);font-family:"Arial CE", sans-serif}.create-folder.svelte-1ywh1l3 form .bottom .buttons button[type=submit].svelte-1ywh1l3:hover{filter:brightness(90%)}.create-folder.svelte-1ywh1l3 form .bottom .buttons .disabled.svelte-1ywh1l3{opacity:0.5;pointer-events:none}@keyframes svelte-1ywh1l3-zoomin{0%{transform:scale(0)}100%{transform:scale(1)}}@media screen and (max-width: 440px){.create-folder.svelte-1ywh1l3 form.svelte-1ywh1l3{min-width:98%;min-height:30%}}@media screen and (min-width: 441px) and (max-width: 1200px){.create-folder.svelte-1ywh1l3 form.svelte-1ywh1l3{min-width:90%;min-height:30%}}',
  map: null
};
const AddFolderForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  let $folderName, $$unsubscribe_folderName;
  let $$unsubscribe_selectedDestinationFolder;
  let $$unsubscribe_moveItemsMode;
  $$unsubscribe_page = subscribe(page, (value) => value);
  $$unsubscribe_folderName = subscribe(folderName, (value) => $folderName = value);
  $$unsubscribe_selectedDestinationFolder = subscribe(selectedDestinationFolder, (value) => value);
  $$unsubscribe_moveItemsMode = subscribe(moveItemsMode, (value) => value);
  $$result.css.add(css$8);
  $$unsubscribe_page();
  $$unsubscribe_folderName();
  $$unsubscribe_selectedDestinationFolder();
  $$unsubscribe_moveItemsMode();
  return `<div class="${"create-folder svelte-1ywh1l3"}"><form class="${"svelte-1ywh1l3"}"><div class="${"top svelte-1ywh1l3"}"><div class="${[
    "input svelte-1ywh1l3",
    $folderName === "" || containsSpecialChars($folderName) ? "outline-red" : ""
  ].join(" ").trim()}"><div class="${"folder-icon svelte-1ywh1l3"}"><svg width="${"24px"}" height="${"24px"}" stroke-width="${"1.5"}" viewBox="${"0 0 24 24"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" color="${"#000000"}"><path d="${"M2 11V4.6a.6.6 0 01.6-.6h6.178a.6.6 0 01.39.144l3.164 2.712a.6.6 0 00.39.144H21.4a.6.6 0 01.6.6V11M2 11v8.4a.6.6 0 00.6.6h18.8a.6.6 0 00.6-.6V11M2 11h20"}" stroke="${"#000000"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"svelte-1ywh1l3"}"></path></svg></div>
				<input id="${"create-folder-input"}" type="${"text"}" placeholder="${"Enter folder name..."}" autocomplete="${"off"}" autocorrect="${"off"}" spellcheck="${"false"}" class="${"svelte-1ywh1l3"}"${add_attribute("value", $folderName, 0)}></div></div>
		<div class="${"errors svelte-1ywh1l3"}">${$folderName === "" ? `<span class="${"svelte-1ywh1l3"}">Folder name is required</span>` : ``}
			${containsSpecialChars($folderName) ? `<span class="${"svelte-1ywh1l3"}">Folder name must not contain special characters</span>` : ``}</div>
		<div class="${"bottom svelte-1ywh1l3"}"><div class="${"buttons svelte-1ywh1l3"}"><button type="${"submit"}" class="${[
    "svelte-1ywh1l3",
    $folderName === "" || containsSpecialChars($folderName) ? "disabled" : ""
  ].join(" ").trim()}"><span class="${"svelte-1ywh1l3"}">Create</span></button>
				<button class="${"svelte-1ywh1l3"}"><span class="${"svelte-1ywh1l3"}">Cancel</span></button></div></div></form>
</div>`;
});
const moveIcon = "/_app/immutable/assets/si_Move-0fba84a1.svg";
const contextmenu_svelte_svelte_type_style_lang = "";
const css$7 = {
  code: '.context_menu.svelte-1iqh7hf.svelte-1iqh7hf{position:fixed;z-index:26;background-color:white;height:max-content;width:20rem;display:flex;flex-direction:column;box-shadow:rgba(0, 0, 0, 0.1) 0px 4px 12px;padding:0.5em;border-radius:0.3rem;display:none}.context_menu.svelte-1iqh7hf .open_all.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .new_folder.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .new_link.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .rename.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .move_to.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .paste.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .select_all.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .cut.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .delete.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .restore.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .delete_forever.svelte-1iqh7hf{display:flex;height:3.5rem;align-items:center;cursor:pointer;gap:1em;padding-left:1em;border-bottom:0.1rem solid rgba(0, 0, 0, 0.1)}.context_menu.svelte-1iqh7hf .open_all .icon.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .new_folder .icon.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .new_link .icon.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .rename .icon.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .move_to .icon.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .paste .icon.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .select_all .icon.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .cut .icon.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .delete .icon.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .restore .icon.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .delete_forever .icon.svelte-1iqh7hf{height:2rem;width:2rem;display:flex;align-items:center;justify-content:center}.context_menu.svelte-1iqh7hf .open_all .icon svg path.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .new_folder .icon svg path.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .new_link .icon svg path.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .rename .icon svg path.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .move_to .icon svg path.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .paste .icon svg path.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .select_all .icon svg path.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .cut .icon svg path.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .delete .icon svg path.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .restore .icon svg path.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .delete_forever .icon svg path.svelte-1iqh7hf{stroke:rgb(15, 17, 17)}.context_menu.svelte-1iqh7hf .open_all .icon img.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .new_folder .icon img.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .new_link .icon img.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .rename .icon img.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .move_to .icon img.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .paste .icon img.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .select_all .icon img.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .cut .icon img.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .delete .icon img.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .restore .icon img.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .delete_forever .icon img.svelte-1iqh7hf{max-inline-size:100%;width:90%;height:90%}.context_menu.svelte-1iqh7hf .open_all span.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .new_folder span.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .new_link span.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .rename span.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .move_to span.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .paste span.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .select_all span.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .cut span.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .delete span.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .restore span.svelte-1iqh7hf,.context_menu.svelte-1iqh7hf .delete_forever span.svelte-1iqh7hf{font-size:1.3rem;font-family:"Arial CE", sans-serif;color:rgb(15, 17, 17)}.context_menu.svelte-1iqh7hf .open_all.svelte-1iqh7hf:hover,.context_menu.svelte-1iqh7hf .new_folder.svelte-1iqh7hf:hover,.context_menu.svelte-1iqh7hf .new_link.svelte-1iqh7hf:hover,.context_menu.svelte-1iqh7hf .rename.svelte-1iqh7hf:hover,.context_menu.svelte-1iqh7hf .move_to.svelte-1iqh7hf:hover,.context_menu.svelte-1iqh7hf .paste.svelte-1iqh7hf:hover,.context_menu.svelte-1iqh7hf .select_all.svelte-1iqh7hf:hover,.context_menu.svelte-1iqh7hf .cut.svelte-1iqh7hf:hover,.context_menu.svelte-1iqh7hf .delete.svelte-1iqh7hf:hover,.context_menu.svelte-1iqh7hf .restore.svelte-1iqh7hf:hover,.context_menu.svelte-1iqh7hf .delete_forever.svelte-1iqh7hf:hover{background-color:rgb(239, 239, 239);border-radius:inherit}.context_menu.svelte-1iqh7hf .button_display_none.svelte-1iqh7hf{display:none}.context_menu.svelte-1iqh7hf .button_disabled.svelte-1iqh7hf{opacity:0.5;pointer-events:none}',
  map: null
};
const Contextmenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selectedItems;
  let $selectedLinks, $$unsubscribe_selectedLinks;
  let $selectedFolders, $$unsubscribe_selectedFolders;
  let $links, $$unsubscribe_links;
  let $folders, $$unsubscribe_folders;
  let $page, $$unsubscribe_page;
  let $linksCut, $$unsubscribe_linksCut;
  let $foldersCut, $$unsubscribe_foldersCut;
  let $rightClickedElement, $$unsubscribe_rightClickedElement;
  let $mouseEvent, $$unsubscribe_mouseEvent;
  $$unsubscribe_selectedLinks = subscribe(selectedLinks, (value) => $selectedLinks = value);
  $$unsubscribe_selectedFolders = subscribe(selectedFolders, (value) => $selectedFolders = value);
  $$unsubscribe_links = subscribe(links, (value) => $links = value);
  $$unsubscribe_folders = subscribe(folders, (value) => $folders = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_linksCut = subscribe(linksCut, (value) => $linksCut = value);
  $$unsubscribe_foldersCut = subscribe(foldersCut, (value) => $foldersCut = value);
  $$unsubscribe_rightClickedElement = subscribe(rightClickedElement, (value) => $rightClickedElement = value);
  $$unsubscribe_mouseEvent = subscribe(mouseEvent, (value) => $mouseEvent = value);
  let totalItems = [];
  $$result.css.add(css$7);
  selectedItems = [...$selectedFolders, ...$selectedLinks];
  {
    if ($folders === null && $links === null) {
      totalItems = [];
    } else if ($folders === null && $links !== null) {
      totalItems = [...$links];
    } else if ($folders !== null && $links === null) {
      totalItems = [...$folders];
    } else if ($folders !== null && $links !== null) {
      totalItems = [...$folders, ...$links];
    }
  }
  $$unsubscribe_selectedLinks();
  $$unsubscribe_selectedFolders();
  $$unsubscribe_links();
  $$unsubscribe_folders();
  $$unsubscribe_page();
  $$unsubscribe_linksCut();
  $$unsubscribe_foldersCut();
  $$unsubscribe_rightClickedElement();
  $$unsubscribe_mouseEvent();
  return `<div class="${"context_menu svelte-1iqh7hf"}" id="${"context_menu"}">${$page.url.pathname === "/appv1/my_links/recycle_bin" ? `${$rightClickedElement && $rightClickedElement.classList.contains("folder") || $rightClickedElement && $rightClickedElement.classList.contains("link") ? `<div class="${"restore svelte-1iqh7hf"}"><div class="${"icon svelte-1iqh7hf"}"><svg width="${"24px"}" height="${"24px"}" stroke-width="${"1.5"}" viewBox="${"0 0 24 24"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" color="${"#000000"}"><path d="${"M4 6v6s0 3 7 3 7-3 7-3V6"}" stroke="${"#000000"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"svelte-1iqh7hf"}"></path><path d="${"M11 3c7 0 7 3 7 3s0 3-7 3-7-3-7-3 0-3 7-3zM11 21c-7 0-7-3-7-3v-6M19 22v-6m0 0l3 3m-3-3l-3 3"}" stroke="${"#000000"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"svelte-1iqh7hf"}"></path></svg></div>
				<span class="${"svelte-1iqh7hf"}">Restore</span></div>
			<div class="${"delete_forever svelte-1iqh7hf"}"><div class="${"icon svelte-1iqh7hf"}"><svg width="${"24px"}" height="${"24px"}" viewBox="${"0 0 24 24"}" stroke-width="${"1.5"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" color="${"#000000"}"><path d="${"M20 9l-1.995 11.346A2 2 0 0116.035 22h-8.07a2 2 0 01-1.97-1.654L4 9M21 6h-5.625M3 6h5.625m0 0V4a2 2 0 012-2h2.75a2 2 0 012 2v2m-6.75 0h6.75"}" stroke="${"#000000"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"svelte-1iqh7hf"}"></path></svg></div>
				<span class="${"svelte-1iqh7hf"}">Delete forever</span></div>` : ``}` : `${$rightClickedElement && $rightClickedElement.classList.contains("folder") ? `<div class="${[
    "open_all svelte-1iqh7hf",
    $selectedFolders.length > 1 ? "button_disabled" : ""
  ].join(" ").trim()}"><div class="${"icon svelte-1iqh7hf"}"><svg width="${"24px"}" height="${"24px"}" stroke-width="${"1.5"}" viewBox="${"0 0 24 24"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" color="${"#000000"}"><path d="${"M8 21h12.4a.6.6 0 00.6-.6V3.6a.6.6 0 00-.6-.6H3.6a.6.6 0 00-.6.6V16M10 6h8M6 6h1M3.5 20.5L12 12m0 0v4m0-4H8"}" stroke="${"#000000"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"svelte-1iqh7hf"}"></path></svg></div>
				<span class="${"svelte-1iqh7hf"}">Open all links</span></div>` : ``}
		${$rightClickedElement && $rightClickedElement.classList.contains("links") ? `
			<div class="${"new_link svelte-1iqh7hf"}"><div class="${"icon icon_new_link svelte-1iqh7hf"}"><svg width="${"26px"}" height="${"26px"}" stroke-width="${"1.5"}" viewBox="${"0 0 24 24"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" color="${"#000000"}"><path d="${"M6 12h6m6 0h-6m0 0V6m0 6v6"}" stroke="${"#000000"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"svelte-1iqh7hf"}"></path></svg></div>
				<span class="${"svelte-1iqh7hf"}">New link</span></div>
			<div class="${"new_folder svelte-1iqh7hf"}"><div class="${"icon svelte-1iqh7hf"}"><svg width="${"18px"}" height="${"18px"}" stroke-width="${"1.5"}" viewBox="${"0 0 24 24"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" color="${"#000000"}"><path d="${"M18 6h2m2 0h-2m0 0V4m0 2v2M21.4 20H2.6a.6.6 0 01-.6-.6V11h19.4a.6.6 0 01.6.6v7.8a.6.6 0 01-.6.6zM2 11V4.6a.6.6 0 01.6-.6h6.178a.6.6 0 01.39.144l3.164 2.712a.6.6 0 00.39.144H14"}" stroke="${"#000000"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"svelte-1iqh7hf"}"></path></svg></div>
				<span class="${"svelte-1iqh7hf"}">New folder</span></div>
			
			<div class="${[
    "select_all svelte-1iqh7hf",
    ($mouseEvent.type === "click" ? "button_display_none" : "") + " " + (totalItems.length < 1 ? "button_disabled" : "")
  ].join(" ").trim()}"><div class="${"icon svelte-1iqh7hf"}"><svg width="${"24px"}" height="${"24px"}" stroke-width="${"1.5"}" viewBox="${"0 0 24 24"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" color="${"#000000"}"><path d="${"M8 12h4m4 0h-4m0 0V8m0 4v4M7 4H4v3M4 11v2M11 4h2M11 20h2M20 11v2M17 4h3v3M7 20H4v-3M17 20h3v-3"}" stroke="${"#000000"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"svelte-1iqh7hf"}"></path></svg></div>
				<span class="${"svelte-1iqh7hf"}">Select all</span></div>` : ``}
		${$rightClickedElement && $rightClickedElement.classList.contains("links") || $rightClickedElement && $rightClickedElement.classList.contains("folder") ? `
			<div class="${[
    "paste svelte-1iqh7hf",
    ($mouseEvent.type === "click" ? "button_display_none" : "") + " " + ($foldersCut.length < 1 && $linksCut.length < 1 || $foldersCut && $folders && $foldersCut.some((folder) => {
      return $folders.map((f) => f.folder_id).includes(folder.folder_id);
    }) && $rightClickedElement.classList.contains("links") || $linksCut && $links && $linksCut.some((link) => {
      return $links.map((li) => li.link_id).includes(link.link_id);
    }) && $rightClickedElement.classList.contains("links") ? "button_disabled" : "")
  ].join(" ").trim()}"><div class="${"icon svelte-1iqh7hf"}"><svg width="${"24px"}" height="${"24px"}" viewBox="${"0 0 24 24"}" stroke-width="${"1.5"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" color="${"#000000"}"><path d="${"M8.5 4H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2.5"}" stroke="${"#000000"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" class="${"svelte-1iqh7hf"}"></path><path d="${"M8 6.4V4.5a.5.5 0 01.5-.5c.276 0 .504-.224.552-.496C9.2 2.652 9.774 1 12 1s2.8 1.652 2.948 2.504c.048.272.276.496.552.496a.5.5 0 01.5.5v1.9a.6.6 0 01-.6.6H8.6a.6.6 0 01-.6-.6z"}" stroke="${"#000000"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" class="${"svelte-1iqh7hf"}"></path></svg></div>
				<span class="${"svelte-1iqh7hf"}">${escape($rightClickedElement.classList.contains("folder") ? "Paste into folder" : "Paste here")}</span></div>
			` : ``}
		${$rightClickedElement && $rightClickedElement.classList.contains("folder") || $rightClickedElement && $rightClickedElement.classList.contains("link") ? `
			<div class="${["rename svelte-1iqh7hf", selectedItems.length > 1 ? "button_disabled" : ""].join(" ").trim()}"><div class="${"icon svelte-1iqh7hf"}"><svg width="${"18px"}" height="${"18px"}" stroke-width="${"1.5"}" viewBox="${"0 0 24 24"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" color="${"#000000"}"><path d="${"M13.02 5.828L15.85 3l4.949 4.95-2.829 2.828m-4.95-4.95l-9.606 9.607a1 1 0 00-.293.707v4.536h4.536a1 1 0 00.707-.293l9.606-9.607m-4.95-4.95l4.95 4.95"}" stroke="${"#000000"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"svelte-1iqh7hf"}"></path></svg></div>
				<span class="${"svelte-1iqh7hf"}">Rename</span></div>
			
			<div class="${"move_to svelte-1iqh7hf"}"><div class="${"icon icon_move svelte-1iqh7hf"}"><img${add_attribute("src", moveIcon, 0)} alt="${"move"}" class="${"svelte-1iqh7hf"}"></div>
				<span class="${"svelte-1iqh7hf"}">Move to</span></div>
			<div class="${"cut svelte-1iqh7hf"}"><div class="${"icon svelte-1iqh7hf"}"><svg width="${"24px"}" height="${"24px"}" stroke-width="${"1.5"}" viewBox="${"0 0 24 24"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" color="${"#000000"}"><path d="${"M6.236 8a3 3 0 10-4.472-4 3 3 0 004.472 4zm0 0L16 16M17 12h1M22 12h1M6.236 16a3 3 0 11-4.472 4 3 3 0 014.472-4zm0 0L16 8"}" stroke="${"#000000"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"svelte-1iqh7hf"}"></path></svg></div>
				<span class="${"svelte-1iqh7hf"}">Cut</span></div>
			<div class="${"delete svelte-1iqh7hf"}"><div class="${"icon svelte-1iqh7hf"}"><svg width="${"18px"}" height="${"18px"}" viewBox="${"0 0 24 24"}" stroke-width="${"1.5"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" color="${"#000000"}"><path d="${"M20 9l-1.995 11.346A2 2 0 0116.035 22h-8.07a2 2 0 01-1.97-1.654L4 9M21 6h-5.625M3 6h5.625m0 0V4a2 2 0 012-2h2.75a2 2 0 012 2v2m-6.75 0h6.75"}" stroke="${"#000000"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"svelte-1iqh7hf"}"></path></svg></div>
				<span class="${"svelte-1iqh7hf"}">Delete</span></div>` : ``}`}
</div>`;
});
const addLinkForm_svelte_svelte_type_style_lang = "";
const css$6 = {
  code: '.add_link_form_wrapper.svelte-1cbh0qk.svelte-1cbh0qk{position:fixed;top:0;left:0;width:100vw;height:100vh;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(1px) brightness(50%);z-index:150}.add_link_form_wrapper.svelte-1cbh0qk form.svelte-1cbh0qk{min-height:20%;min-width:30%;background-color:white;display:flex;flex-direction:column;box-shadow:rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;padding:0.5em 1em;transform:scale(1);animation:svelte-1cbh0qk-zoomin 0.2s ease-in-out}.add_link_form_wrapper.svelte-1cbh0qk form .input_wrapper.svelte-1cbh0qk{flex:1;display:flex;align-items:center}.add_link_form_wrapper.svelte-1cbh0qk form .input_wrapper input[type=url].svelte-1cbh0qk{width:100%;height:3.5rem;border:none;outline:0.2rem solid #c6c8ca;padding:0.5em;font-family:"Arial CE", sans-serif}.add_link_form_wrapper.svelte-1cbh0qk form .input_wrapper input[type=url].svelte-1cbh0qk::placeholder{font-family:"Arial CE", sans-serif}.add_link_form_wrapper.svelte-1cbh0qk form .input_wrapper input[type=url].svelte-1cbh0qk:focus{outline-color:#219ebc}.add_link_form_wrapper.svelte-1cbh0qk form .buttons.svelte-1cbh0qk{flex:1;display:flex;align-items:center;justify-content:flex-end;gap:0.5em}.add_link_form_wrapper.svelte-1cbh0qk form .buttons button.svelte-1cbh0qk{height:3.5rem;min-width:7rem;border:none;background-color:rgb(238, 238, 238);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 200ms ease-in-out}.add_link_form_wrapper.svelte-1cbh0qk form .buttons button span.svelte-1cbh0qk{font-family:"Product Sans Medium", sans-serif;font-size:1.3rem;color:rgb(15, 17, 17)}.add_link_form_wrapper.svelte-1cbh0qk form .buttons button.svelte-1cbh0qk:hover{filter:brightness(90%)}.add_link_form_wrapper.svelte-1cbh0qk form .buttons button[type=submit].svelte-1cbh0qk{background-color:rgb(255, 201, 31)}.add_link_form_wrapper.svelte-1cbh0qk form .buttons button[type=submit] span.svelte-1cbh0qk{color:rgb(15, 17, 17)}.add_link_form_wrapper.svelte-1cbh0qk form .buttons button[type=submit].svelte-1cbh0qk:hover{background-position:bottom}.add_link_form_wrapper.svelte-1cbh0qk form .buttons .disabled.svelte-1cbh0qk{opacity:0.5;pointer-events:none}@keyframes svelte-1cbh0qk-zoomin{0%{transform:scale(0)}100%{transform:scale(1)}}@media screen and (max-width: 440px){.add_link_form_wrapper.svelte-1cbh0qk form.svelte-1cbh0qk{min-width:98%;min-height:30%}}@media screen and (min-width: 441px) and (max-width: 1200px){.add_link_form_wrapper.svelte-1cbh0qk form.svelte-1cbh0qk{min-width:90%;min-height:30%}}',
  map: null
};
const AddLinkForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_currentFolder;
  let $newLink, $$unsubscribe_newLink;
  $$unsubscribe_currentFolder = subscribe(currentFolder, (value) => value);
  $$unsubscribe_newLink = subscribe(newLink, (value) => $newLink = value);
  $$result.css.add(css$6);
  $$unsubscribe_currentFolder();
  $$unsubscribe_newLink();
  return `<div class="${"add_link_form_wrapper svelte-1cbh0qk"}"><form class="${"svelte-1cbh0qk"}"><div class="${"input_wrapper svelte-1cbh0qk"}"><input type="${"url"}" id="${"url_input"}" placeholder="${"https://example.com"}" pattern="${"https://.*"}" autocomplete="${"off"}" autocorrect="${"off"}" spellcheck="${"false"}" class="${"svelte-1cbh0qk"}"${add_attribute("value", $newLink, 0)}></div>
		<div class="${"buttons svelte-1cbh0qk"}"><button type="${"submit"}" class="${[
    "svelte-1cbh0qk",
    $newLink === "" || $newLink === "https://example.com" ? "disabled" : ""
  ].join(" ").trim()}"><span class="${"svelte-1cbh0qk"}">Add</span></button>
			<button class="${"svelte-1cbh0qk"}"><span class="${"svelte-1cbh0qk"}">Cancel</span></button></div></form>
</div>`;
});
const loader_svelte_svelte_type_style_lang = "";
const css$5 = {
  code: ".loader_container.svelte-1f84j2i.svelte-1f84j2i{position:fixed;top:0;left:0;height:100vh;width:100vw;display:flex;align-items:center;justify-content:center;z-index:100}.loader_container.svelte-1f84j2i .loader.svelte-1f84j2i{border:0.2rem solid #f3f3f3;border-top:0.2rem solid #3498db;border-radius:50%;width:3rem;height:3rem;animation:svelte-1f84j2i-spin 0.5s linear infinite}@keyframes svelte-1f84j2i-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}",
  map: null
};
const Loader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $loading, $$unsubscribe_loading;
  $$unsubscribe_loading = subscribe(loading, (value) => $loading = value);
  $$result.css.add(css$5);
  $$unsubscribe_loading();
  return `${$loading ? `<div class="${"loader_container svelte-1f84j2i"}"><div class="${"loader svelte-1f84j2i"}"></div></div>` : ``}`;
});
const signIn_svelte_svelte_type_style_lang = "";
const sucess_notif_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: '.success_notif.svelte-dkn8iw.svelte-dkn8iw{position:fixed;right:3em;top:14vh;width:max-content;min-height:9rem;padding:1em;border:0.2rem solid #6bcb77;background-color:white;background-color:#e1ffb1;min-width:40rem;z-index:1000;display:flex;align-items:center;justify-content:space-between;box-shadow:rgba(0, 0, 0, 0.1) 0px 4px 12px;transition:background-color 200ms ease-in-out;animation:svelte-dkn8iw-animate_notif 200ms ease-in-out}.success_notif.svelte-dkn8iw .check.svelte-dkn8iw{height:2rem;width:2rem;border-radius:100%;background-color:#6bcb77;background-color:green;display:flex;align-items:center;justify-content:center;position:absolute;top:-1em;left:-1em}.success_notif.svelte-dkn8iw .check svg path.svelte-dkn8iw{stroke:white}.success_notif.svelte-dkn8iw span.svelte-dkn8iw{font-size:1.4rem;font-family:"Arial CE", sans-serif;color:#6bcb77;color:green}.success_notif.svelte-dkn8iw svg.cancel.svelte-dkn8iw{height:2rem;width:2rem;cursor:pointer}.success_notif.svelte-dkn8iw svg.cancel path.svelte-dkn8iw{stroke:#6bcb77;stroke:green}.success_notif.svelte-dkn8iw.svelte-dkn8iw:hover{background-color:rgb(238, 238, 238);background-color:#c7f2a4}@keyframes svelte-dkn8iw-animate_notif{0%{transform:translateX(100%)}100%{transform:translateX(0)}}',
  map: null
};
const Sucess_notif = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $successNotifVisible, $$unsubscribe_successNotifVisible;
  $$unsubscribe_successNotifVisible = subscribe(successNotifVisible, (value) => $successNotifVisible = value);
  $$result.css.add(css$4);
  $$unsubscribe_successNotifVisible();
  return `${$successNotifVisible ? `<div class="${"success_notif svelte-dkn8iw"}"><div class="${"check svelte-dkn8iw"}"><svg width="${"24px"}" height="${"24px"}" stroke-width="${"1.5"}" viewBox="${"0 0 24 24"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" color="${"#000000"}"><path d="${"M5 13l4 4L19 7"}" stroke="${"#000000"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"svelte-dkn8iw"}"></path></svg></div>
		<span class="${"svelte-dkn8iw"}">Your link is being added \u{1F4AA}</span>
		<svg class="${"cancel svelte-dkn8iw"}" width="${"24px"}" height="${"24px"}" stroke-width="${"1.5"}" viewBox="${"0 0 24 24"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" color="${"#000000"}"><path d="${"M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"}" stroke="${"#000000"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"svelte-dkn8iw"}"></path></svg></div>` : ``}`;
});
const error_notif_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: '.error_notif.svelte-xmbm9y.svelte-xmbm9y{position:fixed;right:3em;top:14vh;width:max-content;min-height:9rem;padding:1em;border:0.2rem solid rgb(235, 69, 95);background-color:rgb(255, 227, 225);min-width:40rem;z-index:1000;display:flex;align-items:center;justify-content:space-between;box-shadow:rgba(0, 0, 0, 0.1) 0px 4px 12px;transition:background-color 200ms ease-in-out;animation:svelte-xmbm9y-animate_notif 200ms ease-in-out}.error_notif.svelte-xmbm9y .err.svelte-xmbm9y{height:2.5rem;width:2.5rem;border-radius:100%;display:flex;align-items:center;justify-content:center;position:absolute;top:-1em;left:-1em;background-color:white}.error_notif.svelte-xmbm9y .err svg path.svelte-xmbm9y{stroke:rgb(235, 69, 95)}.error_notif.svelte-xmbm9y span.svelte-xmbm9y{font-size:1.4rem;font-family:"Arial CE", sans-serif;color:red}.error_notif.svelte-xmbm9y svg.cancel.svelte-xmbm9y{height:2rem;width:2rem;cursor:pointer}.error_notif.svelte-xmbm9y svg.cancel path.svelte-xmbm9y{stroke:red}.error_notif.svelte-xmbm9y.svelte-xmbm9y:hover{background-color:rgb(255, 209, 209)}@keyframes svelte-xmbm9y-animate_notif{0%{transform:translateX(100%)}100%{transform:translateX(0)}}',
  map: null
};
const Error_notif = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $errorNotifVisible, $$unsubscribe_errorNotifVisible;
  $$unsubscribe_errorNotifVisible = subscribe(errorNotifVisible, (value) => $errorNotifVisible = value);
  $$result.css.add(css$3);
  $$unsubscribe_errorNotifVisible();
  return `${$errorNotifVisible ? `<div class="${"error_notif svelte-xmbm9y"}"><div class="${"err svelte-xmbm9y"}"><svg width="${"24px"}" height="${"24px"}" stroke-width="${"1.5"}" viewBox="${"0 0 24 24"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" color="${"#000000"}"><path d="${"M9 22l3-3m3-3l-3 3m0 0l-3-3m3 3l3 3M20 17.607c1.494-.585 3-1.918 3-4.607 0-4-3.333-5-5-5 0-2 0-6-6-6S6 6 6 8c-1.667 0-5 1-5 5 0 2.689 1.506 4.022 3 4.607"}" stroke="${"#000000"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"svelte-xmbm9y"}"></path></svg></div>
		<span class="${"svelte-xmbm9y"}">Ouch! Something went wrong! \u{1F61E}</span>
		<svg class="${"cancel svelte-xmbm9y"}" width="${"24px"}" height="${"24px"}" stroke-width="${"1.5"}" viewBox="${"0 0 24 24"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" color="${"#000000"}"><path d="${"M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"}" stroke="${"#000000"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"svelte-xmbm9y"}"></path></svg></div>` : ``}`;
});
const menu_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: '.menu.svelte-1pewz0m.svelte-1pewz0m{position:fixed;top:7vh;left:0;height:93vh;max-height:93vh;background-color:rgb(246, 248, 250);width:100vw;overflow:auto;z-index:2000;transform:translateY(100%);transition:transform 0.5s ease-in-out;padding:1em}.menu.svelte-1pewz0m div.svelte-1pewz0m{display:flex;align-items:center;gap:1em;padding:1em;background-color:transparent;cursor:pointer;transition:background-color 200ms ease-in-out}.menu.svelte-1pewz0m div i.svelte-1pewz0m{font-size:2rem;color:rgb(58, 79, 122)}.menu.svelte-1pewz0m div span.svelte-1pewz0m{color:rgb(58, 79, 122);font-size:1.3rem;font-family:"Arial CE", sans-serif}.menu.svelte-1pewz0m div.svelte-1pewz0m:hover{background-color:rgb(214, 228, 229)}.menu_visible.svelte-1pewz0m.svelte-1pewz0m{transform:translateX(0)}',
  map: null
};
const Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $menuToggled, $$unsubscribe_menuToggled;
  $$unsubscribe_menuToggled = subscribe(menuToggled, (value) => $menuToggled = value);
  $$result.css.add(css$2);
  $$unsubscribe_menuToggled();
  return `<div class="${["menu svelte-1pewz0m", $menuToggled ? "menu_visible" : ""].join(" ").trim()}"><div class="${"new_link svelte-1pewz0m"}"><i class="${"las la-plus svelte-1pewz0m"}"></i>
		<span class="${"svelte-1pewz0m"}">New link</span></div>
	<div class="${"new_folder svelte-1pewz0m"}"><i class="${"las la-folder-plus svelte-1pewz0m"}"></i>
		<span class="${"svelte-1pewz0m"}">New folder</span></div>
	<div class="${"search svelte-1pewz0m"}"><i class="${"las la-search svelte-1pewz0m"}"></i>
		<span class="${"svelte-1pewz0m"}">Search</span></div>
	<div class="${"my_profile svelte-1pewz0m"}"><i class="${"las la-user svelte-1pewz0m"}"></i>
		<span class="${"svelte-1pewz0m"}">My profile</span></div>
	<div class="${"help svelte-1pewz0m"}"><i class="${"las la-headset svelte-1pewz0m"}"></i>
		<span class="${"svelte-1pewz0m"}">Help</span></div>
	<div class="${"logout svelte-1pewz0m"}"><i class="${"las la-sign-out-alt svelte-1pewz0m"}"></i>
		<span class="${"svelte-1pewz0m"}">Log Out</span></div>
</div>`;
});
const searchResults_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: '.search_results.svelte-1j9p7gf.svelte-1j9p7gf{position:fixed;left:0;top:7vh;width:100vw;height:93vh;max-height:93vh;overflow-y:auto;background-color:rgb(255, 255, 255);z-index:26;display:flex;flex-wrap:wrap;align-content:flex-start;gap:1.5em;padding:1.5em}.search_results.svelte-1j9p7gf span.svelte-1j9p7gf{font-size:1.3rem;color:rgba(0, 0, 0, 0.6);font-family:"Arial CE", sans-serif}',
  map: null
};
const SearchResults = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $searchInputFocused, $$unsubscribe_searchInputFocused;
  let $query, $$unsubscribe_query;
  let $foldersFound, $$unsubscribe_foldersFound;
  let $linksFound, $$unsubscribe_linksFound;
  $$unsubscribe_searchInputFocused = subscribe(searchInputFocused, (value) => $searchInputFocused = value);
  $$unsubscribe_query = subscribe(query, (value) => $query = value);
  $$unsubscribe_foldersFound = subscribe(foldersFound, (value) => $foldersFound = value);
  $$unsubscribe_linksFound = subscribe(linksFound, (value) => $linksFound = value);
  $$result.css.add(css$1);
  $$unsubscribe_searchInputFocused();
  $$unsubscribe_query();
  $$unsubscribe_foldersFound();
  $$unsubscribe_linksFound();
  return `${$searchInputFocused && $query !== "" ? `<div class="${"search_results svelte-1j9p7gf"}">${$foldersFound.length > 0 && $linksFound.length > 0 ? `${each($foldersFound, (folder) => {
    return `${validate_component(Folder, "Folder").$$render($$result, { folder }, {}, {})}`;
  })}
			${each($linksFound, (link) => {
    return `${validate_component(Link, "Link").$$render($$result, { link }, {}, {})}`;
  })}` : `${$foldersFound.length > 0 && $linksFound.length < 1 ? `${each($foldersFound, (folder) => {
    return `${validate_component(Folder, "Folder").$$render($$result, { folder }, {}, {})}`;
  })}` : `${$foldersFound.length < 1 && $linksFound.length > 0 ? `${each($linksFound, (link) => {
    return `${validate_component(Link, "Link").$$render($$result, { link }, {}, {})}`;
  })}` : `${$foldersFound.length === 0 && $linksFound.length === 0 ? `<span class="${"svelte-1j9p7gf"}">Nothing was found!</span>` : ``}`}`}`}</div>` : ``}`;
});
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: '.container.svelte-1a5x6dk.svelte-1a5x6dk{width:100%;height:100%;position:relative}.container.svelte-1a5x6dk .links.svelte-1a5x6dk{position:absolute;top:7vh;left:0;width:100%;height:100%;max-height:86vh;padding:1.5em;display:flex;gap:1.5em;overflow-y:auto;flex-wrap:wrap;align-content:flex-start}.container.svelte-1a5x6dk .links .no_items_container.svelte-1a5x6dk{height:100%;width:100vw;display:flex;align-items:center;justify-content:center}.container.svelte-1a5x6dk .links .no_items_container span.svelte-1a5x6dk{font-size:1.3rem;font-family:"Product Sans Medium", sans-serif;color:#6d6d6d}.container.svelte-1a5x6dk .links .no_items_container .button.svelte-1a5x6dk{background-color:rgb(255, 201, 31);display:flex;align-items:center;padding:0 1em;height:4rem;gap:0.5em;cursor:pointer;transition:all 200ms ease-in-out;box-shadow:rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px}.container.svelte-1a5x6dk .links .no_items_container .button .plus_icon.svelte-1a5x6dk{background-color:white;height:1.7rem;width:1.7rem;display:flex;align-items:center;justify-content:center;border-radius:100vh}.container.svelte-1a5x6dk .links .no_items_container .button .plus_icon svg path.svelte-1a5x6dk{stroke:rgb(15, 17, 17)}.container.svelte-1a5x6dk .links .no_items_container .button span.svelte-1a5x6dk{color:rgb(15, 17, 17);font-size:1.3rem;font-family:"Arial CE", sans-serif;font-weight:500}.container.svelte-1a5x6dk .links .no_items_container .button.svelte-1a5x6dk:hover{box-shadow:rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px}',
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  let $createFolderMode, $$unsubscribe_createFolderMode;
  let $addLinkMode, $$unsubscribe_addLinkMode;
  let $renameFolderMode, $$unsubscribe_renameFolderMode;
  let $renameLinkMode, $$unsubscribe_renameLinkMode;
  let $moveItemsMode, $$unsubscribe_moveItemsMode;
  let $confirmDeleteItemsMode, $$unsubscribe_confirmDeleteItemsMode;
  let $loading, $$unsubscribe_loading;
  let $folders, $$unsubscribe_folders;
  let $links, $$unsubscribe_links;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_createFolderMode = subscribe(createFolderMode, (value) => $createFolderMode = value);
  $$unsubscribe_addLinkMode = subscribe(addLinkMode, (value) => $addLinkMode = value);
  $$unsubscribe_renameFolderMode = subscribe(renameFolderMode, (value) => $renameFolderMode = value);
  $$unsubscribe_renameLinkMode = subscribe(renameLinkMode, (value) => $renameLinkMode = value);
  $$unsubscribe_moveItemsMode = subscribe(moveItemsMode, (value) => $moveItemsMode = value);
  $$unsubscribe_confirmDeleteItemsMode = subscribe(confirmDeleteItemsMode, (value) => $confirmDeleteItemsMode = value);
  $$unsubscribe_loading = subscribe(loading, (value) => $loading = value);
  $$unsubscribe_folders = subscribe(folders, (value) => $folders = value);
  $$unsubscribe_links = subscribe(links, (value) => $links = value);
  $$result.css.add(css);
  {
    if ($page.url.pathname === "/appv1/my_links") {
      activePath.set("My links");
    } else if ($page.url.pathname === "/appv1/my_links/recycle_bin") {
      activePath.set("Recycle bin");
    }
  }
  $$unsubscribe_page();
  $$unsubscribe_createFolderMode();
  $$unsubscribe_addLinkMode();
  $$unsubscribe_renameFolderMode();
  $$unsubscribe_renameLinkMode();
  $$unsubscribe_moveItemsMode();
  $$unsubscribe_confirmDeleteItemsMode();
  $$unsubscribe_loading();
  $$unsubscribe_folders();
  $$unsubscribe_links();
  return `




${$createFolderMode ? `${validate_component(AddFolderForm, "CreateFolderForm").$$render($$result, {}, {}, {})}` : ``}

${$addLinkMode ? `${validate_component(AddLinkForm, "AddLinkForm").$$render($$result, {}, {}, {})}` : ``}

${$renameFolderMode ? `${validate_component(RenameFolderForm, "RenameFolderForm").$$render($$result, {}, {}, {})}` : ``}

${$renameLinkMode ? `${validate_component(RenameLinkForm, "RenameLinkForm").$$render($$result, {}, {}, {})}` : ``}

${$moveItemsMode ? `${validate_component(MoveItemsPopup, "MoveItemsPopup").$$render($$result, {}, {}, {})}` : ``}

${$confirmDeleteItemsMode ? `${validate_component(DeleteItemConfirmationPopup, "DeleteItemConfirmationPopup").$$render($$result, {}, {}, {})}` : ``}

${validate_component(Sucess_notif, "SucessNotif").$$render($$result, {}, {}, {})}

${validate_component(Error_notif, "ErrorNotif").$$render($$result, {}, {}, {})}

${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}

${validate_component(SearchResults, "SearchResults").$$render($$result, {}, {}, {})}



${validate_component(Contextmenu, "Contextmenu").$$render($$result, {}, {}, {})}

<div class="${"container svelte-1a5x6dk"}"><script lang="${"ts"}">"use strict";
const s = window.localStorage.getItem('session');
if (s === null) {
    location.replace('http://localhost:5173/accounts/sign_in');
}
else {
    checkIfIsAuthenticated();
    async function checkIfIsAuthenticated() {
        const response = await fetch('http://localhost:5000/public/checkIfIsAuthenticated', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
            headers: {
                'Content-Type': 'application/json'
                //authorization: \`Bearer\${JSON.parse(s).access_token}\`
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                token: JSON.parse(s).access_token
            }) // body data type must match "Content-Type" header
        });
        const result = await response.json();
        if (result.message) {
            if (result.message === 'account not found') {
                console.log(result.message);
                alert(result.message);
                location.replace('http://localhost:5173/accounts/sign_in');
            }
            else if (result.message === 'false') {
                console.log(result.message);
                alert(result.message);
                location.replace('http://localhost:5173/accounts/sign_in');
            }
            else if (result.message === 'token is expired') {
                console.log(result.message);
                alert(result.message);
                location.replace('http://localhost:5173/accounts/sign_in');
            }
        }
    }
}
<\/script>

	${validate_component(ActionsMenu, "ActionsMenu").$$render($$result, {}, {}, {})}

	${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})}

	<div class="${"links svelte-1a5x6dk"}" id="${"links"}">${$loading ? `${validate_component(Loader, "Loader").$$render($$result, {}, {}, {})}` : `${!$loading ? `${$folders.length > 0 && $links.length > 0 ? `${each($folders, (folder) => {
    return `${validate_component(Folder, "Folder").$$render($$result, { folder }, {}, {})}`;
  })}
				${each($links, (link) => {
    return `${validate_component(Link, "Link").$$render($$result, { link }, {}, {})}`;
  })}` : `${$folders.length > 0 && $links.length < 1 ? `${each($folders, (folder) => {
    return `${validate_component(Folder, "Folder").$$render($$result, { folder }, {}, {})}`;
  })}` : `${$links.length > 0 && $folders.length < 1 ? `${each($links, (link) => {
    return `${validate_component(Link, "Link").$$render($$result, { link }, {}, {})}`;
  })}` : `${$folders.length === 0 && $links.length === 0 ? `${$page.url.pathname ? `<div class="${"no_items_container svelte-1a5x6dk"}">${$page.url.pathname === "/appv1/my_links/recycle_bin" ? `<span class="${"svelte-1a5x6dk"}">No items in trash</span>` : `<div class="${"button svelte-1a5x6dk"}" id="${"addLinkOrCreateFolderBtn"}"><div class="${"plus_icon svelte-1a5x6dk"}"><svg width="${"24px"}" height="${"24px"}" stroke-width="${"1.5"}" viewBox="${"0 0 24 24"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" color="${"#000000"}"><path d="${"M6 12h6m6 0h-6m0 0V6m0 6v6"}" stroke="${"#000000"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"svelte-1a5x6dk"}"></path></svg></div>
								<span class="${"svelte-1a5x6dk"}">Click to add link or create folder</span></div>`}</div>` : ``}` : ``}`}`}`}` : ``}`}</div>
	${slots.default ? slots.default({}) : ``}
</div>`;
});
export {
  Layout as default
};
