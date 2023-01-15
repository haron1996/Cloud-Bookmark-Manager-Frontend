import { c as create_ssr_component, v as validate_component } from "../../../../../chunks/index2.js";
import { B as Breadcrumb } from "../../../../../chunks/breadcrumb.js";
import "../../../../../chunks/stores.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-1hhm70q_START -->${$$result.title = `<title>Recycle bin - Nested</title>`, ""}<!-- HEAD_svelte-1hhm70q_END -->`, ""}

<div>${validate_component(Breadcrumb, "Breadcrumb").$$render($$result, { rootFolderName: "Recycle bin" }, {}, {})}</div>

`;
});
export {
  Page as default
};
