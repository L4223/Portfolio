import{aC as me,b as te,h as k,k as D,d as ve,w as he,aD as ne,a0 as pe,a1 as P,a2 as R,g as C,aE as M,Y as ae,e as H,Z as ge,a5 as _e,V as Q,aF as O,aG as Y,aH as K,aI as Ee,aJ as we,aK as ye,m as re,aL as se,l as be,aM as Te,az as ke,aN as Se,a7 as Ae,Q as J,aO as Ce,i as Ie,_ as Ne,G as Me,t as Le}from"./BKgJzsMZ.js";import{w as y,g as ie,d as oe}from"./fQsODcHc.js";import{w as xe,e as Ve}from"./FWApDI8p.js";import{a as De,b as Re}from"./CgJmPR_h.js";import"./_JX2loT4.js";import{p as W}from"./D5aAZ41i.js";function it(a,e){return e}function He(a,e,t,n){for(var r=[],o=e.length,s=0;s<o;s++)Ee(e[s].e,r,!0);var l=o>0&&r.length===0&&t!==null;if(l){var f=t.parentNode;we(f),f.append(t),n.clear(),S(a,e[0].prev,e[o-1].next)}ye(r,()=>{for(var m=0;m<o;m++){var c=e[m];l||(n.delete(c.k),S(a,c.prev,c.next)),re(c.e,!l)}})}function ot(a,e,t,n,r,o=null){var s=a,l={flags:e,items:new Map,first:null},f=(e&se)!==0;if(f){var m=a;s=k?D(be(m)):m.appendChild(me())}k&&ve();var c=null,p=!1;te(()=>{var i=t(),h=he(i)?i:i==null?[]:ne(i),v=h.length;if(p&&v===0)return;p=v===0;let b=!1;if(k){var _=s.data===pe;_!==(v===0)&&(s=P(),D(s),R(!1),b=!0)}if(k){for(var E=null,w,g=0;g<v;g++){if(C.nodeType===8&&C.data===Te){s=C,b=!0,R(!1);break}var u=h[g],d=n(u,g);w=ue(C,l,E,null,u,d,g,r,e),l.items.set(d,w),E=w}v>0&&D(P())}if(!k){var L=ke;Oe(h,l,s,r,e,(L.f&M)!==0,n)}o!==null&&(v===0?c?ae(c):c=H(()=>o(s)):c!==null&&ge(c,()=>{c=null})),b&&R(!0),t()}),k&&(s=C)}function Oe(a,e,t,n,r,o,s){var z,F,U,B;var l=(r&Se)!==0,f=(r&(O|K))!==0,m=a.length,c=e.items,p=e.first,i=p,h,v=null,b,_=[],E=[],w,g,u,d;if(l)for(d=0;d<m;d+=1)w=a[d],g=s(w,d),u=c.get(g),u!==void 0&&((z=u.a)==null||z.measure(),(b??(b=new Set)).add(u));for(d=0;d<m;d+=1){if(w=a[d],g=s(w,d),u=c.get(g),u===void 0){var L=i?i.e.nodes_start:t;v=ue(L,e,v,v===null?e.first:v.next,w,g,d,n,r),c.set(g,v),_=[],E=[],i=v.next;continue}if(f&&Ke(u,w,d,r),u.e.f&M&&(ae(u.e),l&&((F=u.a)==null||F.unfix(),(b??(b=new Set)).delete(u))),u!==i){if(h!==void 0&&h.has(u)){if(_.length<E.length){var N=E[0],T;v=N.prev;var q=_[0],x=_[_.length-1];for(T=0;T<_.length;T+=1)X(_[T],N,t);for(T=0;T<E.length;T+=1)h.delete(E[T]);S(e,q.prev,x.next),S(e,v,q),S(e,x,N),i=N,v=x,d-=1,_=[],E=[]}else h.delete(u),X(u,i,t),S(e,u.prev,u.next),S(e,u,v===null?e.first:v.next),S(e,v,u),v=u;continue}for(_=[],E=[];i!==null&&i.k!==g;)(o||!(i.e.f&M))&&(h??(h=new Set)).add(i),E.push(i),i=i.next;if(i===null)continue;u=i}_.push(u),v=u,i=u.next}if(i!==null||h!==void 0){for(var I=h===void 0?[]:ne(h);i!==null;)(o||!(i.e.f&M))&&I.push(i),i=i.next;var V=I.length;if(V>0){var de=r&se&&m===0?t:null;if(l){for(d=0;d<V;d+=1)(U=I[d].a)==null||U.measure();for(d=0;d<V;d+=1)(B=I[d].a)==null||B.fix()}He(e,I,de,c)}}l&&_e(()=>{var G;if(b!==void 0)for(u of b)(G=u.a)==null||G.apply()}),Q.first=e.first&&e.first.e,Q.last=v&&v.e}function Ke(a,e,t,n){n&O&&Y(a.v,e),n&K?Y(a.i,t):a.i=t}function ue(a,e,t,n,r,o,s,l,f){var m=(f&O)!==0,c=(f&Ce)===0,p=m?c?Ae(r):J(r):r,i=f&K?J(s):s,h={i,v:p,k:o,a:null,e:null,prev:t,next:n};try{return h.e=H(()=>l(a,p,i),k),h.e.prev=t&&t.e,h.e.next=n&&n.e,t===null?e.first=h:(t.next=h,t.e.next=h.e),n!==null&&(n.prev=h,n.e.prev=h.e),h}finally{}}function X(a,e,t){for(var n=a.next?a.next.e.nodes_start:t,r=e?e.e.nodes_start:t,o=a.e.nodes_start;o!==n;){var s=Ie(o);r.before(o),o=s}}function S(a,e,t){e===null?a.first=t:(e.next=t,e.e.next=t&&t.e),t!==null&&(t.prev=e,t.e.prev=e&&e.e)}function ut(a,e,...t){var n=a,r=Me,o;te(()=>{r!==(r=e())&&(o&&(re(o),o=null),o=H(()=>r(n,...t)))},Ne),k&&(n=C)}function lt(a){const e={};return Object.keys(a).forEach(t=>{const n=t,r=a[n];e[n]=xe(y(r))}),e}function ft(a,e){const t={};return e.forEach(n=>{t[n]={[`data-${a}-${n}`]:""}}),n=>t[n]}function ct(a){return a?{"aria-disabled":"true","data-disabled":""}:{"aria-disabled":void 0,"data-disabled":void 0}}function dt(a){const e={};for(const t in a){const n=a[t];n!==void 0&&(e[t]=n)}return e}function mt(a){return function(e,t){if(t===void 0)return;const n=a[e];n&&n.set(t)}}var qe=Re("<i></i>");function vt(a,e){let t=W(e,"icon",8),n=W(e,"className",8,"");var r=qe();Le(()=>Ve(r,`flex-shrink-0 ${n()} ${t()}`)),De(a,r)}let Z,$;function le(a){if(typeof document>"u")return;clearTimeout(Z),clearTimeout($);const e=document.createElement("style"),t=document.createTextNode(`* {
     -webkit-transition: none !important;
     -moz-transition: none !important;
     -o-transition: none !important;
     -ms-transition: none !important;
     transition: none !important;
  }`);e.appendChild(t);const n=()=>document.head.appendChild(e),r=()=>document.head.removeChild(e);if(typeof window.getComputedStyle<"u"){n(),a(),window.getComputedStyle(e).opacity,r();return}if(typeof window.requestAnimationFrame<"u"){n(),a(),window.requestAnimationFrame(r);return}n(),Z=window.setTimeout(()=>{a(),$=window.setTimeout(r,120)},120)}function j(a){return a.filter(e=>e.length>0)}const fe={getItem:a=>null,setItem:(a,e)=>{}},A=typeof document<"u",ze=["dark","light","system"],Fe=y("mode-watcher-mode"),Ue=y("mode-watcher-theme"),Be=We(),Ge=Ze(),Pe=y(void 0),Qe=Xe(),ce=y(!0),Ye=y([]),Je=y([]),ht=$e(),pt=je();function We(){const a="system",e=A?localStorage:fe,t=e.getItem(r());let n=ee(t)?t:a;function r(){return ie(Fe)}const{subscribe:o,set:s}=y(n,()=>{if(!A)return;const f=m=>{if(m.key!==r())return;const c=m.newValue;ee(c)?s(n=c):s(n=a)};return addEventListener("storage",f),()=>removeEventListener("storage",f)});function l(f){s(n=f),e.setItem(r(),n)}return{subscribe:o,set:l}}function Xe(){const a=A?localStorage:fe,e=a.getItem(n());let t=e??"";function n(){return ie(Ue)}const{subscribe:r,set:o}=y(t,()=>{if(!A)return;const l=f=>{if(f.key!==n())return;const m=f.newValue;o(m===null?t="":t=m)};return addEventListener("storage",l),()=>removeEventListener("storage",l)});function s(l){o(t=l),a.setItem(n(),t)}return{subscribe:r,set:s}}function Ze(){let e=!0;const{subscribe:t,set:n}=y(void 0,()=>{if(!A)return;const s=f=>{e&&n(f.matches?"light":"dark")},l=window.matchMedia("(prefers-color-scheme: light)");return l.addEventListener("change",s),()=>l.removeEventListener("change",s)});function r(){if(!A)return;const s=window.matchMedia("(prefers-color-scheme: light)");n(s.matches?"light":"dark")}function o(s){e=s}return{subscribe:t,query:r,tracking:o}}function $e(){const{subscribe:a}=oe([Be,Ge,Pe,ce,Ye,Je],([e,t,n,r,o,s])=>{if(!A)return;const l=e==="system"?t:e,f=j(o),m=j(s);function c(){const p=document.documentElement,i=document.querySelector('meta[name="theme-color"]');l==="light"?(f.length&&p.classList.remove(...f),m.length&&p.classList.add(...m),p.style.colorScheme="light",i&&n&&i.setAttribute("content",n.light)):(m.length&&p.classList.remove(...m),f.length&&p.classList.add(...f),p.style.colorScheme="dark",i&&n&&i.setAttribute("content",n.dark))}return r?le(c):c(),l});return{subscribe:a}}function je(){const{subscribe:a}=oe([Qe,ce],([e,t])=>{if(!A)return;function n(){document.documentElement.setAttribute("data-theme",e)}return t?le(n):n(),e});return{subscribe:a}}function ee(a){return typeof a!="string"?!1:ze.includes(a)}export{vt as I,Qe as a,pt as b,ft as c,ht as d,ot as e,Ge as f,mt as g,ee as h,it as i,Ue as j,ce as k,Pe as l,Fe as m,Ye as n,Je as o,ct as p,dt as r,ut as s,lt as t,Be as u};
