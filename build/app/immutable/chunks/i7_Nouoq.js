import{e as S,a as h,b as T,r as Y}from"./CgJmPR_h.js";import{i as P}from"./_JX2loT4.js";import{ar as Z,as as K,p as L,J as k,K as x,f as $,c as F,r as G,t as O,a as N,D as p,o as f,L as z,u as E,M as j}from"./BKgJzsMZ.js";import{o as tt,k as et,l as at,m as D,n as J,a as w,b as I,j as H,p as st,c as R}from"./FWApDI8p.js";import{l as m,p as c,i as q,c as B,s as Q,e as nt,a as V,d as U}from"./D5aAZ41i.js";import{o as lt}from"./BUw06Qly.js";import{w as rt}from"./fQsODcHc.js";import{t as ot,c as it,r as dt,g as ct}from"./WPohfcMr.js";const ut={src:"",delayMs:0,onLoadingStatusChange:void 0},ft=s=>{const t={...ut,...s},r=ot(tt(t,"loadingStatus","onLoadingStatusChange")),{src:u,delayMs:n}=r,o=t.loadingStatus??rt("loading"),a=lt(o,t==null?void 0:t.onLoadingStatusChange);et([u,n],([d,_])=>{if(at){const v=new Image;v.src=d,v.onload=()=>{if(n!==void 0){const y=window.setTimeout(()=>{a.set("loaded")},_);return()=>window.clearTimeout(y)}else a.set("loaded")},v.onerror=()=>{a.set("error")}}});const i=D("avatar-image",{stores:[u,a],returned:([d,_])=>{const v=J({display:_==="loaded"?"block":"none"});return{src:d,style:v}}}),g=D("avatar-fallback",{stores:[a],returned:([d])=>({style:d==="loaded"?J({display:"none"}):void 0,hidden:d==="loaded"?!0:void 0})});return{elements:{image:i,fallback:g},states:{loadingStatus:a},options:r}};function W(){return{NAME:"avatar",PARTS:["root","image","fallback"]}}function gt(s){const{NAME:t,PARTS:r}=W(),u=it(t,r),n={...ft(dt(s)),getAttrs:u};return Z(t,n),{...n,updateOption:ct(n.options)}}function vt(s=""){const{NAME:t}=W(),r=K(t);return s?r.options.src.set(s):r.options.src.set(""),r}function mt(){const{NAME:s}=W();return K(s)}var _t=T("<div><!></div>");function bt(s,t){const r=m(t,["children","$$slots","$$events","$$legacy"]),u=m(r,["delayMs","loadingStatus","onLoadingStatusChange","asChild","el"]);L(t,!1);let n=c(t,"delayMs",24,()=>{}),o=c(t,"loadingStatus",28,()=>{}),a=c(t,"onLoadingStatusChange",24,()=>{}),i=c(t,"asChild",8,!1),g=c(t,"el",28,()=>{});const{states:{loadingStatus:d},updateOption:_,getAttrs:v}=gt({src:"",delayMs:n(),onLoadingStatusChange:({next:l})=>{var e;return o(l),(e=a())==null||e(l),l}}),y=v("root");k(()=>p(o()),()=>{o()!==void 0&&d.set(o())}),k(()=>p(n()),()=>{_("delayMs",n())}),x(),P();var C=S(),M=$(C);q(M,i,l=>{var e=S(),b=$(e);w(b,t,"default",{attrs:y}),h(l,e)},l=>{var e=_t();let b;var A=F(e);w(A,t,"default",{attrs:y}),G(e),B(e,X=>g(X),()=>g()),O(()=>b=I(e,b,{...u,...y})),h(l,e)}),h(s,C),N()}var ht=T("<img>");function yt(s,t){const r=m(t,["children","$$slots","$$events","$$legacy"]),u=m(r,["src","alt","asChild","el"]);L(t,!1);const n=Q(),o=()=>V(f(a),"$image",n),a=z(),i=z();let g=c(t,"src",24,()=>{}),d=c(t,"alt",24,()=>{}),_=c(t,"asChild",8,!1),v=c(t,"el",28,()=>{});const y={"data-bits-avatar-image":""};k(()=>p(g()),()=>{nt(E(a,vt(g()).elements.image),"$image",n)}),k(()=>o(),()=>{E(i,o())}),k(()=>f(i),()=>{Object.assign(f(i),y)}),x(),P();var C=S(),M=$(C);q(M,_,l=>{var e=S(),b=$(e);w(b,t,"default",{get builder(){return f(i)}}),h(l,e)},l=>{var e=ht();let b;B(e,A=>v(A),()=>v()),H(e,A=>f(i).action(A)),O(()=>b=I(e,b,{...f(i),alt:d(),...u})),st(e),Y(e),h(l,e)}),h(s,C),N()}var At=T("<span><!></span>");function St(s,t){const r=m(t,["children","$$slots","$$events","$$legacy"]),u=m(r,["asChild","el"]);L(t,!1);const n=Q(),o=()=>V(d,"$fallback",n),a=z();let i=c(t,"asChild",8,!1),g=c(t,"el",28,()=>{});const{elements:{fallback:d},getAttrs:_}=mt(),v=_("fallback");k(()=>o(),()=>{E(a,o())}),k(()=>f(a),()=>{Object.assign(f(a),v)}),x(),P();var y=S(),C=$(y);q(C,i,M=>{var l=S(),e=$(l);w(e,t,"default",{get builder(){return f(a)}}),h(M,l)},M=>{var l=At();let e;var b=F(l);w(b,t,"default",{get builder(){return f(a)}}),G(l),B(l,A=>g(A),()=>g()),H(l,A=>f(a).action(A)),O(()=>e=I(l,e,{...f(a),...u})),h(M,l)}),h(s,y),N()}function pt(s,t){const r=m(t,["children","$$slots","$$events","$$legacy"]),u=m(r,["class","delayMs"]);L(t,!1);let n=c(t,"class",8,void 0),o=c(t,"delayMs",8,void 0);P();var a=j(()=>R("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",n()));bt(s,U({get delayMs(){return o()},get class(){return f(a)}},()=>u,{children:(i,g)=>{var d=S(),_=$(d);w(_,t,"default",{}),h(i,d)},$$slots:{default:!0}})),N()}function zt(s,t){const r=m(t,["children","$$slots","$$events","$$legacy"]),u=m(r,["class","src","alt"]);L(t,!1);let n=c(t,"class",8,void 0),o=c(t,"src",8,void 0),a=c(t,"alt",8,void 0);P();var i=j(()=>R("aspect-square h-full w-full",n()));yt(s,U({get src(){return o()},get alt(){return a()},get class(){return f(i)}},()=>u)),N()}function Et(s,t){const r=m(t,["children","$$slots","$$events","$$legacy"]),u=m(r,["class"]);L(t,!1);let n=c(t,"class",8,void 0);P();var o=j(()=>R("bg-muted flex h-full w-full items-center justify-center rounded-full",n()));St(s,U({get class(){return f(o)}},()=>u,{children:(a,i)=>{var g=S(),d=$(g);w(d,t,"default",{}),h(a,g)},$$slots:{default:!0}})),N()}export{pt as A,Et as a,zt as b};
