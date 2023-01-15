import { c as create_ssr_component } from "../../../../chunks/index2.js";
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: '.nav.svelte-1y9vbpq.svelte-1y9vbpq{position:fixed;top:0;left:0;height:7vh;width:100vw;background-color:rgb(58, 79, 122);z-index:100;display:flex;align-items:center;justify-content:space-between;padding:0 1em;border-bottom:0.1rem solid #c6c8ca}.nav.svelte-1y9vbpq span.svelte-1y9vbpq{font-family:"Arial CE", sans-serif;font-size:1.3rem;color:rgba(0, 0, 0, 0.6);cursor:pointer;color:white;padding:0.3em 1em;background-color:whitesmoke;color:#6d6d6d;border-radius:0.3rem}.nav.svelte-1y9vbpq span.svelte-1y9vbpq:hover{background-color:rgb(255, 255, 255)}.sidebar.svelte-1y9vbpq.svelte-1y9vbpq{position:fixed;top:7vh;left:0;width:20%;height:93vh;max-height:93vh;overflow:auto;background-color:rgb(255, 255, 255);display:flex;align-items:center;justify-content:center}.sidebar.svelte-1y9vbpq .inner_cont.svelte-1y9vbpq{height:95%;width:95%;border-radius:0.6rem;padding:1em;box-shadow:rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px}.sidebar.svelte-1y9vbpq .inner_cont li.svelte-1y9vbpq{list-style:none}.sidebar.svelte-1y9vbpq .inner_cont li a.svelte-1y9vbpq{text-decoration:none}.sidebar.svelte-1y9vbpq .inner_cont li a .my_profile.svelte-1y9vbpq{display:flex;align-items:center;gap:1em}.sidebar.svelte-1y9vbpq .inner_cont li a .my_profile i.svelte-1y9vbpq{font-size:2rem;color:white;color:rgb(15, 17, 17)}.sidebar.svelte-1y9vbpq .inner_cont li a .my_profile span.svelte-1y9vbpq{font-size:1.3rem;font-family:"Arial CE", sans-serif;color:rgba(0, 0, 0, 0.6);text-decoration:underline;text-decoration-color:transparent;color:white;color:rgb(15, 17, 17)}.sidebar.svelte-1y9vbpq .inner_cont li a .my_profile span.svelte-1y9vbpq:hover{color:white;text-decoration-color:white;color:rgb(15, 17, 17);text-decoration-color:rgb(15, 17, 17)}.profile.svelte-1y9vbpq.svelte-1y9vbpq{height:100vh;width:100vw;background-color:white}',
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-j9mw5j_START -->${$$result.title = `<title>Settings - Nested</title>`, ""}<!-- HEAD_svelte-j9mw5j_END -->`, ""}

<div class="${"nav svelte-1y9vbpq"}"><span class="${"svelte-1y9vbpq"}">Back to dashboard</span>
	<span class="${"svelte-1y9vbpq"}">Need help?</span></div>

<ul class="${"sidebar svelte-1y9vbpq"}"><div class="${"inner_cont svelte-1y9vbpq"}"><li class="${"svelte-1y9vbpq"}"><a href="${"http://localhost:5173/appv1/settings/my_profile"}" class="${"svelte-1y9vbpq"}"><div class="${"my_profile svelte-1y9vbpq"}"><i class="${"las la-user-alt svelte-1y9vbpq"}"></i>
					<span class="${"svelte-1y9vbpq"}">My profile</span></div></a></li></div></ul>

<div class="${"profile svelte-1y9vbpq"}"></div>

${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
