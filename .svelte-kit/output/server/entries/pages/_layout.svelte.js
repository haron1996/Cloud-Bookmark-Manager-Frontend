import { c as create_ssr_component, a as subscribe, e as each, d as escape, v as validate_component } from "../../chunks/index.js";
import { e as errors } from "../../chunks/stores.js";
const errors_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: '.errors.svelte-1ghuaj0.svelte-1ghuaj0{position:fixed;top:0;left:0;width:100vw;height:100vh;background-color:transparent;display:flex;flex-direction:column;align-items:flex-end;justify-content:flex-end;z-index:100}.errors.svelte-1ghuaj0 .error.svelte-1ghuaj0{min-height:5rem;min-width:20rem;width:max-content;padding:0.5em 1em;background-color:white;box-shadow:rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgb(214, 28, 78) 0px 0px 0px 1px;margin-right:3em;margin-bottom:3em;display:flex;align-items:center;justify-content:center;gap:1em;animation:svelte-1ghuaj0-zoom 0.5s ease-in-out;transition:all 200ms ease-in-out}.errors.svelte-1ghuaj0 .error svg path.svelte-1ghuaj0{stroke:#ff9494;stroke:rgb(214, 28, 78)}.errors.svelte-1ghuaj0 .error span.svelte-1ghuaj0{font-size:1.3rem;font-weight:500;font-family:"Arial CE", sans-serif;color:#ff9494;color:rgb(214, 28, 78)}.errors.svelte-1ghuaj0 .error svg.cancel.svelte-1ghuaj0{cursor:pointer;transition:all 200ms ease-in-out}.errors.svelte-1ghuaj0 .error svg.cancel:hover path.svelte-1ghuaj0{stroke:#d61c4e}@keyframes svelte-1ghuaj0-zoom{0%{transform:translateX(500%)}100%{transform:translateX(0)}}',
  map: null
};
const Errors = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $errors, $$unsubscribe_errors;
  $$unsubscribe_errors = subscribe(errors, (value) => $errors = value);
  let el;
  function clearErrors() {
    el = document.getElementById("error");
    el.style.transform = "translateX(500%)";
    setTimeout(
      () => {
        errors.set([]);
      },
      1e3
    );
  }
  $$result.css.add(css$1);
  {
    setTimeout(
      () => {
        clearErrors();
      },
      4e3
    );
  }
  $$unsubscribe_errors();
  return `<div class="${"errors svelte-1ghuaj0"}">${$errors.length > 0 ? `${each($errors, (error) => {
    return `<div class="${"error svelte-1ghuaj0"}" id="${"error"}"><svg width="${"20px"}" height="${"20px"}" stroke-width="${"1.5"}" viewBox="${"0 0 24 24"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" color="${"#000000"}"><path d="${"M20.043 21H3.957c-1.538 0-2.5-1.664-1.734-2.997l8.043-13.988c.77-1.337 2.699-1.337 3.468 0l8.043 13.988C22.543 19.336 21.58 21 20.043 21zM12 9v4"}" stroke="${"#000000"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" class="${"svelte-1ghuaj0"}"></path><path d="${"M12 17.01l.01-.011"}" stroke="${"#000000"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"svelte-1ghuaj0"}"></path></svg>
				<span class="${"svelte-1ghuaj0"}">${escape(error)}</span>
				<svg width="${"20px"}" height="${"20px"}" stroke-width="${"1.5"}" viewBox="${"0 0 24 24"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" color="${"#000000"}" class="${"cancel svelte-1ghuaj0"}" id="${"cancel"}"><path d="${"M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"}" stroke="${"#000000"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"svelte-1ghuaj0"}"></path></svg>
			</div>`;
  })}` : ``}
</div>`;
});
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: '@import url("https://fonts.cdnfonts.com/css/google-sans");@import url("https://fonts.cdnfonts.com/css/arial");@import url("https://fonts.cdnfonts.com/css/arial-mt");.app{padding:0;margin:0;box-sizing:border-box;height:100vh;width:100vw;max-height:100vh}.app main{position:fixed;top:7vh;left:0;width:100%;height:100%;max-height:100%}*{margin:0;padding:0;box-sizing:border-box;-webkit-user-select:none;-ms-user-select:none;user-select:none;line-height:1.6;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;font-stretch:expanded}*::selection{background:rgb(32, 125, 255);color:white}html{font-size:62.5%}html xml{font-family:"Product Sans Black", sans-serif !important}html xml svg{font-family:"Product Sans Black", sans-serif !important}html xml svg path{font-family:"Product Sans Black", sans-serif !important}::-webkit-scrollbar{width:0.8rem;height:0.5rem}::-webkit-scrollbar-track{background-color:transparent;background-color:#eeeeee;background-color:transparent}::-webkit-scrollbar-thumb{background-color:#c8c6c6}::-webkit-scrollbar-thumb:hover{background-color:#748da6}::-webkit-scrollbar-track-piece{background-color:yellow;background-color:transparent}',
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $errors, $$unsubscribe_errors;
  $$unsubscribe_errors = subscribe(errors, (value) => $errors = value);
  $$result.css.add(css);
  $$unsubscribe_errors();
  return `${$$result.head += `<!-- HEAD_svelte-wvf0ck_START --><link rel="${"stylesheet"}" href="${"https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"}"><!-- HEAD_svelte-wvf0ck_END -->`, ""}

${$errors.length > 0 ? `${validate_component(Errors, "Errors").$$render($$result, {}, {}, {})}` : ``}

<div class="${"app"}"><main>${slots.default ? slots.default({}) : ``}</main>
</div>`;
});
export {
  Layout as default
};
