import { c as create_ssr_component, v as validate_component } from "../../chunks/index2.js";
import { i as session } from "../../chunks/stores.js";
import { Buffer } from "buffer";
function guard(name) {
  return () => {
    throw new Error(`Cannot call ${name}(...) on the server`);
  };
}
const goto = guard("goto");
let s = {};
async function continueWithGoogle(v) {
  const url = "http://localhost:5000/public/account";
  const res = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: v.name,
      email: v.email,
      picture: v.picture
    })
  });
  const data = await res.json();
  if (data[0] === null)
    return;
  s = data[0];
  session.set(s);
  window.localStorage.setItem("session", JSON.stringify(data[0]));
  goto("http://localhost:5173/auth/thankyou");
}
function decodeJwt(token) {
  var base64Payload = token.split(".")[1];
  var payloadBuffer = Buffer.from(base64Payload, "base64");
  return JSON.parse(payloadBuffer.toString());
}
globalThis.handleToken = async (response) => {
  const v = decodeJwt(response.credential);
  await continueWithGoogle(v);
};
const mainnav_svelte_svelte_type_style_lang = "";
const css = {
  code: 'nav.svelte-4t7qpl.svelte-4t7qpl{display:flex;align-items:center;position:fixed;top:0;left:0;height:10vh;width:100%}nav.svelte-4t7qpl .logo-sec.svelte-4t7qpl{min-width:90%;height:100%;display:flex;align-items:center}nav.svelte-4t7qpl .logo-sec .logo.svelte-4t7qpl{display:flex;align-items:center;width:max-content;gap:1em;font-family:"Product Sans Black", sans-serif;cursor:pointer;margin-left:2em}nav.svelte-4t7qpl .logo-sec .logo strong.svelte-4t7qpl{font-size:1.5rem;color:rgb(15, 17, 17);color:rgb(29, 45, 53);font-weight:600;letter-spacing:-0.025em;line-height:1.485em}nav.svelte-4t7qpl .sign_in.svelte-4t7qpl{min-width:10%;height:100%;display:flex;align-items:center;justify-content:center}nav.svelte-4t7qpl .sign_in a.svelte-4t7qpl{text-decoration:underline;text-decoration-style:solid;text-decoration-color:rgba(0, 0, 0, 0.6);transition:all 200ms ease-in-out}nav.svelte-4t7qpl .sign_in a span.svelte-4t7qpl{font-size:1.5rem;color:rgba(0, 0, 0, 0.6);font-family:"Arial CE", sans-serif;transition:all 200ms ease-in-out}nav.svelte-4t7qpl .sign_in a.svelte-4t7qpl:hover{text-decoration-color:rgb(15, 17, 17)}nav.svelte-4t7qpl .sign_in a:hover span.svelte-4t7qpl{color:rgb(15, 17, 17)}',
  map: null
};
const Mainnav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<nav class="${"svelte-4t7qpl"}"><div class="${"logo-sec svelte-4t7qpl"}"><div class="${"logo svelte-4t7qpl"}"><svg width="${"24px"}" height="${"24px"}" stroke-width="${"1.5"}" viewBox="${"0 0 24 24"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" color="${"#000000"}"><path d="${"M8.5 12h7v10L12 20l-3.5 2V12z"}" stroke="${"#000000"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}"></path><path d="${"M20 17.607c1.494-.585 3-1.918 3-4.607 0-4-3.333-5-5-5 0-2 0-6-6-6S6 6 6 8c-1.667 0-5 1-5 5 0 2.689 1.506 4.022 3 4.607"}" stroke="${"#000000"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}"></path></svg>
			<strong class="${"svelte-4t7qpl"}">BookmarkManager</strong></div></div>
	
	<div class="${"sign_in svelte-4t7qpl"}"><a href="${"http://localhost:5173/accounts/email"}" class="${"svelte-4t7qpl"}"><span class="${"svelte-4t7qpl"}">Sign in</span></a></div>
</nav>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Mainnav, "Mainnav").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
