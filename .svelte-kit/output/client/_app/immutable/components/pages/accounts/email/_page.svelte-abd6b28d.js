import{S as Ee,i as ye,s as je,k as i,q as U,a as S,l as o,m as u,r as J,h as d,c as I,n as e,U as L,b as le,J as a,X as B,K as F,L as _e,M as me,B as he,D as Se,F as be,N as Ie}from"../../../../chunks/index-1a91d0d7.js";import{g as ge}from"../../../../chunks/navigation-91fc3737.js";import{e as we,Q as ke,D as De,R as G}from"../../../../chunks/stores-d178389a.js";let O={};async function Ne(t){const l=await fetch("http://localhost:5000/public/account/create",{method:"POST",mode:"cors",cache:"no-cache",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"no-referrer",body:JSON.stringify({full_name:t.full_name,email_address:t.email_address,password:t.password})});try{const r=await l.json();if(r.message){we.update(s=>["Email address exists",...s]);return}if(O=r[0],O===null)return;O.access_token&&ke.set(O.access_token),De.set(O),window.localStorage.removeItem("session"),window.localStorage.setItem("session",JSON.stringify(O)),ge("http://localhost:5173/auth/thankyou")}catch(r){console.log(r)}}function Pe(t){let l,r;return{c(){l=i("span"),r=U("Sign up"),this.h()},l(s){l=o(s,"SPAN",{class:!0});var c=u(l);r=J(c,"Sign up"),c.forEach(d),this.h()},h(){e(l,"class","svelte-174jb4v")},m(s,c){le(s,l,c),a(l,r)},d(s){s&&d(l)}}}function Ve(t){let l;return{c(){l=i("div"),this.h()},l(r){l=o(r,"DIV",{class:!0}),u(l).forEach(d),this.h()},h(){e(l,"class","loader svelte-174jb4v")},m(r,s){le(r,l,s)},d(r){r&&d(l)}}}function Te(t){let l,r,s,c,E,k,q,g,C,M,f,p,D,H,W,_,Y,y,N,Z,$,m,x,j,P,ee,se,h,ae,V,v,te,re;function ne(n,b){return n[0]?Ve:Pe}let R=ne(t),w=R(t);return{c(){l=i("div"),r=i("div"),s=i("form"),c=i("div"),E=i("span"),k=U("Sign up with email"),q=S(),g=i("span"),C=U("Sign in instead"),M=S(),f=i("div"),p=i("div"),D=i("label"),H=U("Full name"),W=S(),_=i("input"),Y=S(),y=i("div"),N=i("label"),Z=U("Email address"),$=S(),m=i("input"),x=S(),j=i("div"),P=i("label"),ee=U("Password"),se=S(),h=i("input"),ae=S(),V=i("div"),v=i("button"),w.c(),this.h()},l(n){l=o(n,"DIV",{class:!0});var b=u(l);r=o(b,"DIV",{class:!0});var ie=u(r);s=o(ie,"FORM",{class:!0});var T=u(s);c=o(T,"DIV",{class:!0});var K=u(c);E=o(K,"SPAN",{class:!0});var oe=u(E);k=J(oe,"Sign up with email"),oe.forEach(d),q=I(K),g=o(K,"SPAN",{class:!0});var de=u(g);C=J(de,"Sign in instead"),de.forEach(d),K.forEach(d),M=I(T),f=o(T,"DIV",{class:!0});var A=u(f);p=o(A,"DIV",{class:!0});var Q=u(p);D=o(Q,"LABEL",{for:!0,class:!0});var ue=u(D);H=J(ue,"Full name"),ue.forEach(d),W=I(Q),_=o(Q,"INPUT",{type:!0,name:!0,id:!0,placeholder:!0,class:!0}),Q.forEach(d),Y=I(A),y=o(A,"DIV",{class:!0});var X=u(y);N=o(X,"LABEL",{for:!0,class:!0});var ce=u(N);Z=J(ce,"Email address"),ce.forEach(d),$=I(X),m=o(X,"INPUT",{type:!0,name:!0,id:!0,placeholder:!0,class:!0}),X.forEach(d),x=I(A),j=o(A,"DIV",{class:!0});var z=u(j);P=o(z,"LABEL",{for:!0,class:!0});var pe=u(P);ee=J(pe,"Password"),pe.forEach(d),se=I(z),h=o(z,"INPUT",{type:!0,name:!0,id:!0,placeholder:!0,class:!0}),z.forEach(d),A.forEach(d),ae=I(T),V=o(T,"DIV",{class:!0});var ve=u(V);v=o(ve,"BUTTON",{type:!0,class:!0});var fe=u(v);w.l(fe),fe.forEach(d),ve.forEach(d),T.forEach(d),ie.forEach(d),b.forEach(d),this.h()},h(){e(E,"class","sign_in_heading svelte-174jb4v"),e(g,"class","sign_up_heading svelte-174jb4v"),e(c,"class","heading svelte-174jb4v"),e(D,"for","name"),e(D,"class","svelte-174jb4v"),e(_,"type","text"),e(_,"name","name"),e(_,"id","name"),e(_,"placeholder","Enter your full name"),e(_,"class","svelte-174jb4v"),e(p,"class","name svelte-174jb4v"),e(N,"for","email"),e(N,"class","svelte-174jb4v"),e(m,"type","email"),e(m,"name","email"),e(m,"id","email"),e(m,"placeholder","Enter your email address"),e(m,"class","svelte-174jb4v"),e(y,"class","email svelte-174jb4v"),e(P,"for","password"),e(P,"class","svelte-174jb4v"),e(h,"type","password"),e(h,"name","password"),e(h,"id","password"),e(h,"placeholder","Enter your password"),e(h,"class","svelte-174jb4v"),e(j,"class","password svelte-174jb4v"),e(f,"class","inputs svelte-174jb4v"),e(v,"type","submit"),e(v,"class","svelte-174jb4v"),L(v,"disabled",t[1].email_address===void 0||t[1].full_name===void 0||t[1].password===void 0||t[1].password.length<6),L(v,"loading",t[0]),e(V,"class","button svelte-174jb4v"),e(s,"class","svelte-174jb4v"),L(s,"email_error",t[2].includes("Email address exists")),e(r,"class","container svelte-174jb4v"),e(l,"class","content svelte-174jb4v")},m(n,b){le(n,l,b),a(l,r),a(r,s),a(s,c),a(c,E),a(E,k),a(c,q),a(c,g),a(g,C),a(s,M),a(s,f),a(f,p),a(p,D),a(D,H),a(p,W),a(p,_),B(_,t[1].full_name),a(f,Y),a(f,y),a(y,N),a(N,Z),a(y,$),a(y,m),B(m,t[1].email_address),a(f,x),a(f,j),a(j,P),a(P,ee),a(j,se),a(j,h),B(h,t[1].password),a(s,ae),a(s,V),a(V,v),w.m(v,null),te||(re=[F(g,"click",_e(me(t[3]))),F(g,"keyup",t[5]),F(_,"input",t[6]),F(m,"input",t[7]),F(h,"input",t[8]),F(v,"click",_e(me(t[4])),{once:!0})],te=!0)},p(n,[b]){b&2&&_.value!==n[1].full_name&&B(_,n[1].full_name),b&2&&m.value!==n[1].email_address&&B(m,n[1].email_address),b&2&&h.value!==n[1].password&&B(h,n[1].password),R!==(R=ne(n))&&(w.d(1),w=R(n),w&&(w.c(),w.m(v,null))),b&2&&L(v,"disabled",n[1].email_address===void 0||n[1].full_name===void 0||n[1].password===void 0||n[1].password.length<6),b&1&&L(v,"loading",n[0]),b&4&&L(s,"email_error",n[2].includes("Email address exists"))},i:he,o:he,d(n){n&&d(l),w.d(),te=!1,Se(re)}}}function Ae(t,l,r){let s,c;be(t,G,p=>r(1,s=p)),be(t,we,p=>r(2,c=p));function E(){ge("http://localhost:5173/accounts/sign_in")}let k=!1;async function q(){r(0,k=!0),await Ne(s),r(0,k=!1)}function g(p){Ie.call(this,t,p)}function C(){s.full_name=this.value,G.set(s)}function M(){s.email_address=this.value,G.set(s)}function f(){s.password=this.value,G.set(s)}return[k,s,c,E,q,g,C,M,f]}class Oe extends Ee{constructor(l){super(),ye(this,l,Ae,Te,je,{})}}export{Oe as default};
