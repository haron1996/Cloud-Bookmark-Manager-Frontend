import { c as create_ssr_component } from "../../../../chunks/index2.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: 'body.svelte-1ew73g2.svelte-1ew73g2{height:100vh;width:100vw;max-height:100vh}body.svelte-1ew73g2 .container.svelte-1ew73g2{height:100%;width:100%;position:fixed;top:0;left:0;display:flex;align-items:center;justify-content:center}body.svelte-1ew73g2 .container .card.svelte-1ew73g2{height:80%;width:60%;display:flex;flex-direction:column;align-items:center;gap:2em}body.svelte-1ew73g2 .container .card .title.svelte-1ew73g2{display:flex;align-items:center;justify-content:center;gap:1em}body.svelte-1ew73g2 .container .card .title .icon.svelte-1ew73g2{height:3rem;width:3rem;display:flex;align-items:center;justify-content:center}body.svelte-1ew73g2 .container .card .title .icon svg path.svelte-1ew73g2{stroke:rgb(27, 36, 48)}body.svelte-1ew73g2 .container .card .title span.svelte-1ew73g2{font-size:1.5rem;font-family:"Arial Rounded MT Bold", sans-serif}body.svelte-1ew73g2 .container .card .button.svelte-1ew73g2{box-shadow:rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;display:flex;align-items:center;justify-content:center;width:max-content}',
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<body class="${"svelte-1ew73g2"}"><div class="${"container svelte-1ew73g2"}"><div class="${"card svelte-1ew73g2"}"><div class="${"title svelte-1ew73g2"}"><div class="${"icon svelte-1ew73g2"}"><svg width="${"24px"}" height="${"24px"}" stroke-width="${"1.5"}" viewBox="${"0 0 24 24"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}" color="${"#000000"}"><path d="${"M3 16V8a5 5 0 015-5h8a5 5 0 015 5v8a5 5 0 01-5 5H8a5 5 0 01-5-5z"}" stroke="${"#000000"}" stroke-width="${"1.5"}" class="${"svelte-1ew73g2"}"></path><path d="${"M16.5 14.5s-1.5 2-4.5 2-4.5-2-4.5-2"}" stroke="${"#000000"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"svelte-1ew73g2"}"></path><path d="${"M8.5 10a.5.5 0 110-1 .5.5 0 010 1zM15.5 10a.5.5 0 110-1 .5.5 0 010 1z"}" fill="${"#000000"}" stroke="${"#000000"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" class="${"svelte-1ew73g2"}"></path></svg></div>
				<span class="${"svelte-1ew73g2"}">Register with Google </span></div>
			<div class="${"button svelte-1ew73g2"}"><div id="${"g_id_onload"}" data-client_id="${"459207285092-4bjlivofrpo73pgv4v2g6cimlu40pk98.apps.googleusercontent.com"}" data-context="${"use"}" data-ux_mode="${"popup"}" data-callback="${"handleCredentialResponse"}" data-auto_prompt="${"false"}"></div>

				<div class="${"g_id_signin"}" data-type="${"standard"}" data-shape="${"rectangular"}" data-theme="${"filled_blue"}" data-text="${"continue_with"}" data-size="${"large"}" data-locale="${"en-US"}" data-logo_alignment="${"left"}" data-width="${"400"}"></div></div></div></div>

	<script src="${"https://accounts.google.com/gsi/client"}" async defer><\/script>
</body>`;
});
export {
  Page as default
};
