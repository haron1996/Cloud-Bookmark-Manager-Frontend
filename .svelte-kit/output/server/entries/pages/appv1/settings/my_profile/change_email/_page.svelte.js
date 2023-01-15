import { c as create_ssr_component, f as add_attribute } from "../../../../../../chunks/index2.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: '.change_email.svelte-sgrb8d.svelte-sgrb8d{position:fixed;top:7vh;left:20%;width:80%;max-width:80%;height:93vh;max-height:93vh}.change_email.svelte-sgrb8d form.email.svelte-sgrb8d{width:100%;height:100%;overflow:auto;padding-top:2em;display:flex;flex-direction:column;gap:1em;padding:2em}.change_email.svelte-sgrb8d form.email .input-box.svelte-sgrb8d{display:flex;flex-direction:column;gap:0.3em;width:100%}.change_email.svelte-sgrb8d form.email .input-box input[type=email].svelte-sgrb8d{padding:0.5em;font-family:"Arial CE", sans-serif;border:0.1rem solid #c6c8ca;outline:transparent;background-color:rgb(239, 243, 246)}.change_email.svelte-sgrb8d form.email .input-box input[type=email].svelte-sgrb8d::placeholder{font-family:"Arial CE", sans-serif;color:rgba(0, 0, 0, 0.6)}.change_email.svelte-sgrb8d form.email .input-box input[type=email].svelte-sgrb8d:hover{box-shadow:rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px}.change_email.svelte-sgrb8d form.email .input-box input[type=email].svelte-sgrb8d:focus{box-shadow:rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px}.change_email.svelte-sgrb8d form.email .input-box span.svelte-sgrb8d{font-family:"Arial CE", sans-serif;color:rgba(0, 0, 0, 0.6);font-size:1.2rem}.change_email.svelte-sgrb8d form.email button.svelte-sgrb8d{width:max-content;padding:0.5em;border:none;background-color:rgb(32, 125, 255);cursor:pointer}.change_email.svelte-sgrb8d form.email button span.svelte-sgrb8d{font-size:1.3rem;font-weight:500;color:white;font-family:"Arial CE", sans-serif}.change_email.svelte-sgrb8d form.email button.svelte-sgrb8d:hover{box-shadow:rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px}',
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let email = "";
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-1nnznju_START -->${$$result.title = `<title>Change email - Nested</title>`, ""}<!-- HEAD_svelte-1nnznju_END -->`, ""}

<div class="${"change_email svelte-sgrb8d"}">
	<form class="${"email svelte-sgrb8d"}">
		<div class="${"input-box svelte-sgrb8d"}"><input type="${"email"}" name="${"email"}" id="${"email"}" placeholder="${"Enter new email address"}" autocomplete="${"off"}" class="${"svelte-sgrb8d"}"${add_attribute("value", email, 0)}>
			<span class="${"svelte-sgrb8d"}">We’ll send a code to your new email address to verify it.</span></div>
		<button class="${"svelte-sgrb8d"}"><span class="${"svelte-sgrb8d"}">Get verification code</span></button></form>
</div>`;
});
export {
  Page as default
};
