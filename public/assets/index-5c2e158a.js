import{e as B,f as P,U as O,H as C,a as c,n as G,t as f,G as M,p as $,k as S,V as x,S as N,W as R}from"./index-ccedb79d.js";const[k,D]=B("form"),I={colon:Boolean,disabled:Boolean,readonly:Boolean,showError:Boolean,labelWidth:G,labelAlign:String,inputAlign:String,scrollToError:Boolean,validateFirst:Boolean,submitOnEnter:f,showErrorMessage:f,errorMessageAlign:String,validateTrigger:{type:[String,Array],default:"onBlur"}};var W=P({name:k,props:I,emits:["submit","failed"],setup(l,{emit:r,slots:u}){const{children:i,linkChildren:d}=O(M),o=e=>e?i.filter(t=>e.includes(t.name)):i,E=e=>new Promise((t,n)=>{const s=[];o(e).reduce((y,A)=>y.then(()=>{if(!s.length)return A.validate().then(p=>{p&&s.push(p)})}),Promise.resolve()).then(()=>{s.length?n(s):t()})}),F=e=>new Promise((t,n)=>{const s=o(e);Promise.all(s.map(a=>a.validate())).then(a=>{a=a.filter(Boolean),a.length?n(a):t()})}),V=e=>{const t=i.find(n=>n.name===e);return t?new Promise((n,s)=>{t.validate().then(a=>{a?s(a):n()})}):Promise.reject()},m=e=>typeof e=="string"?V(e):l.validateFirst?E(e):F(e),T=e=>{typeof e=="string"&&(e=[e]),o(e).forEach(n=>{n.resetValidation()})},w=()=>i.reduce((e,t)=>(e[t.name]=t.getValidationStatus(),e),{}),g=(e,t)=>{i.some(n=>n.name===e?(n.$el.scrollIntoView(t),!0):!1)},v=()=>i.reduce((e,t)=>(t.name!==void 0&&(e[t.name]=t.formValue.value),e),{}),h=()=>{const e=v();m().then(()=>r("submit",e)).catch(t=>{r("failed",{values:e,errors:t}),l.scrollToError&&t[0].name&&g(t[0].name)})},_=e=>{$(e),h()};return d({props:l}),C({submit:h,validate:m,getValues:v,scrollToField:g,resetValidation:T,getValidationStatus:w}),()=>{var e;return c("form",{class:D(),onSubmit:_},[(e=u.default)==null?void 0:e.call(u)])}}});const U=S(W),[j,b]=B("cell-group"),q={title:String,inset:Boolean,border:f};var H=P({name:j,inheritAttrs:!1,props:q,setup(l,{slots:r,attrs:u}){const i=()=>{var o;return c("div",N({class:[b({inset:l.inset}),{[R]:l.border&&!l.inset}]},u),[(o=r.default)==null?void 0:o.call(r)])},d=()=>c("div",{class:b("title",{inset:l.inset})},[r.title?r.title():l.title]);return()=>l.title||r.title?c(x,null,[d(),i()]):i()}});const Y=S(H);export{Y as C,U as F};