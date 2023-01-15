import { c as create_ssr_component, a as subscribe, d as escape, e as each, f as add_attribute } from "./index2.js";
import { h as ancestorsOfCurrentFolder } from "./stores.js";
/* empty css                                          */const css = {
  code: '.breadcrumb.svelte-17312s7.svelte-17312s7{position:absolute;top:0;left:0;height:7vh;width:100vw;z-index:15;display:flex;align-items:center;justify-content:space-between;background-color:transparent}.breadcrumb.svelte-17312s7 nav.svelte-17312s7{width:100%;height:100%;padding-left:0.5em;display:flex;align-items:center;overflow-x:scroll}.breadcrumb.svelte-17312s7 nav ul.svelte-17312s7{display:flex;align-items:center;height:100%;gap:0.3em;width:min-content;inline-size:max-content;max-width:inherit}.breadcrumb.svelte-17312s7 nav ul .separator.svelte-17312s7{display:flex;align-items:center;justify-content:center;height:75%}.breadcrumb.svelte-17312s7 nav ul .separator span.svelte-17312s7{height:100%;display:flex;align-items:center;justify-content:center;font-size:1.3rem;color:#565959}.breadcrumb.svelte-17312s7 nav ul .separator:first-of-type span.svelte-17312s7{display:none}.breadcrumb.svelte-17312s7 nav ul li.svelte-17312s7{list-style:none;height:100%;inline-size:max-content;display:flex;align-items:center}.breadcrumb.svelte-17312s7 nav ul li span.svelte-17312s7{text-decoration:none;display:flex;align-items:center;justify-content:center;height:55%;backdrop-filter:brightness(100%);inline-size:max-content;padding:0 1em;border-radius:0.3rem;color:#565959;font-family:"Product Sans Medium", sans-serif;font-size:1.1rem;cursor:pointer;box-shadow:rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px}.breadcrumb.svelte-17312s7 nav ul li span.svelte-17312s7:hover{box-shadow:rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px;background-color:rgb(255, 201, 31);color:rgb(15, 17, 17)}.breadcrumb.svelte-17312s7 nav ul li.svelte-17312s7:last-of-type{pointer-events:none}.breadcrumb.svelte-17312s7 nav ul li:last-of-type span.svelte-17312s7{color:rgb(15, 17, 17)}',
  map: null
};
const Breadcrumb = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $ancestorsOfCurrentFolder, $$unsubscribe_ancestorsOfCurrentFolder;
  $$unsubscribe_ancestorsOfCurrentFolder = subscribe(ancestorsOfCurrentFolder, (value) => $ancestorsOfCurrentFolder = value);
  let { rootFolderName = "" } = $$props;
  if ($$props.rootFolderName === void 0 && $$bindings.rootFolderName && rootFolderName !== void 0)
    $$bindings.rootFolderName(rootFolderName);
  $$result.css.add(css);
  $$unsubscribe_ancestorsOfCurrentFolder();
  return `<div class="${"breadcrumb svelte-17312s7"}"><nav class="${"svelte-17312s7"}"><ul class="${"svelte-17312s7"}"><li class="${"svelte-17312s7"}"><span class="${"svelte-17312s7"}">${escape(rootFolderName === "" ? "My links" : rootFolderName)}</span></li>
			<div class="${"separator svelte-17312s7"}"><span class="${"svelte-17312s7"}">→</span></div>
			${$ancestorsOfCurrentFolder.length > 0 ? `${each($ancestorsOfCurrentFolder, ({ folder_name, folder_id }) => {
    return `<div class="${"separator svelte-17312s7"}"><span class="${"svelte-17312s7"}">→</span></div>
					<li${add_attribute("data-id", folder_id, 0)} class="${"svelte-17312s7"}"><span class="${"svelte-17312s7"}">${escape(folder_name)}</span>
					</li>`;
  })}` : ``}</ul></nav>
</div>`;
});
export {
  Breadcrumb as B
};
