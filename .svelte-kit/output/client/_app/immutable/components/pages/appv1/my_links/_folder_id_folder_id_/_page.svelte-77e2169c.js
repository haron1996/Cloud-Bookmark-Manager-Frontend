import{S as u,i as p,s as _,a as h,k as g,w as F,P as v,h as i,c as $,l as y,m as w,x as C,n as b,b as c,y as S,f as k,t as A,z as O,F as f}from"../../../../../chunks/index-bb81482e.js";import{B}from"../../../../../chunks/breadcrumb-dadd571d.js";import{r as E,g as I}from"../../../../../chunks/getLinksAndFolders-48263249.js";import{a as L}from"../../../../../chunks/navigation-ded05271.js";import{p as N}from"../../../../../chunks/stores-3a753e22.js";import{g as q}from"../../../../../chunks/breadcrumb.svelte_svelte_type_style_lang-95d43c18.js";import{B as x,z,E as D,t as P,q as j,C as m,A as T}from"../../../../../chunks/stores-1f2c4055.js";import{r as G,a as J,g as M}from"../../../../../chunks/resetSelectedLinks-339e4f4f.js";import{h as V}from"../../../../../chunks/hideContextMenu-62f14fa2.js";async function H(s){let r=`http://localhost:5000/private/folder/getFolderAncestors/${s}`;const n=await fetch(r,{method:"GET",mode:"cors",credentials:"include",headers:{"Content-Type":"application/json",authorization:`Bearer${JSON.parse(q()).access_token}`}});try{const e=await n.json();if(e[0]===void 0)console.log(e.message);else{const a=e[0];E();for(let o=0;o<a.length;o++){const t=a[o];x.update(d=>[...d,t])}}}catch(e){console.log(e)}}function K(s){let r,n,e,a,o;return document.title=r=s[0].folder_name===void 0?"Loading...":`${s[0].folder_name} - Nested`,a=new B({}),{c(){n=h(),e=g("div"),F(a.$$.fragment),this.h()},l(t){v("svelte-1ov7evl",document.head).forEach(i),n=$(t),e=y(t,"DIV",{class:!0});var l=w(e);C(a.$$.fragment,l),l.forEach(i),this.h()},h(){b(e,"class","folder_detail")},m(t,d){c(t,n,d),c(t,e,d),S(a,e,null),o=!0},p(t,[d]){(!o||d&1)&&r!==(r=t[0].folder_name===void 0?"Loading...":`${t[0].folder_name} - Nested`)&&(document.title=r)},i(t){o||(k(a.$$.fragment,t),o=!0)},o(t){A(a.$$.fragment,t),o=!1},d(t){t&&i(n),t&&i(e),O(a)}}}function Q(s,r,n){let e,a;f(s,m,l=>n(0,e=l)),f(s,N,l=>n(2,a=l));let o="";L(async()=>{z.set(""),D.set(!1),P.set([]),j.set([]),G(),J(),await d(),await H(o),await I(a.params.folder_id),V(),await t()});async function t(){const l=await M(a.params.folder_id);m.set(l)}async function d(){a.params.folder_id===""?console.log("no folder id found!"):o=a.params.folder_id}return s.$$.update=()=>{s.$$.dirty&1&&e&&e.folder_name&&T.set(e.folder_name)},[e]}class oe extends u{constructor(r){super(),p(this,r,Q,K,_,{})}}export{oe as default};