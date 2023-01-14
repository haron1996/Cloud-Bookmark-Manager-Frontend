import { c as create_ssr_component, v as validate_component } from "../../../../chunks/index.js";
import { B as Breadcrumb } from "../../../../chunks/breadcrumb.js";
import "../../../../chunks/stores.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-1auh08t_START -->${$$result.title = `<title>My links - Nested</title>`, ""}<!-- HEAD_svelte-1auh08t_END -->`, ""}

${validate_component(Breadcrumb, "Breadcrumb").$$render($$result, { rootFolderName: "My links" }, {}, {})}`;
});
export {
  Page as default
};
