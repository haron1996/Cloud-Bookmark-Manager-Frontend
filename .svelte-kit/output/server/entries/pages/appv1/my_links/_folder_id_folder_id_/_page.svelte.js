import { c as create_ssr_component, a as subscribe, d as escape, v as validate_component } from "../../../../../chunks/index2.js";
import { B as Breadcrumb } from "../../../../../chunks/breadcrumb.js";
import { o as openedFolder, d as activePath } from "../../../../../chunks/stores.js";
import { p as page } from "../../../../../chunks/stores2.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $openedFolder, $$unsubscribe_openedFolder;
  let $$unsubscribe_page;
  $$unsubscribe_openedFolder = subscribe(openedFolder, (value) => $openedFolder = value);
  $$unsubscribe_page = subscribe(page, (value) => value);
  {
    if ($openedFolder && $openedFolder.folder_name) {
      activePath.set($openedFolder.folder_name);
    }
  }
  $$unsubscribe_openedFolder();
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-1ov7evl_START -->${$$result.title = `<title>${escape($openedFolder.folder_name === void 0 ? "Loading..." : `${$openedFolder.folder_name} - Nested`)}</title>`, ""}<!-- HEAD_svelte-1ov7evl_END -->`, ""}

<div class="${"folder_detail"}">${validate_component(Breadcrumb, "Breadcrumb").$$render($$result, {}, {}, {})}</div>`;
});
export {
  Page as default
};
