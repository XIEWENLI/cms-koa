import{aF as C,r as F,a as c,o as g,c as w,b as t,w as n,d as p,u as R,X as S,aG as B,E as f,e as h,p as D,f as N}from"./index.f968eb52.js";import{E as $,a as U}from"./el-form-item.f25c68e7.js";import{E as k,a as X}from"./el-input.2c9c0d13.js";import{_ as j}from"./_plugin-vue_export-helper.cdc0426e.js";import"./index.9aeab12a.js";const q={class:"form"},G={__name:"form",setup(l){const _=C(),d=R(),m=F(),v=(o,e,s)=>{if(e==="")s(new Error("\u7528\u6237\u540D\u4E0D\u80FD\u4E3A\u7A7A\uFF01\uFF01\uFF01"));else{if(e.length>10||e.length<5){s(new Error("\u7528\u6237\u540D\u957F\u5EA65-10\u4F4D\uFF01\uFF01\uFF01"));return}s()}},E=(o,e,s)=>{if(e==="")s(new Error("\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A\uFF01\uFF01\uFF01"));else{if(e.length>10||e.length<5){s(new Error("\u5BC6\u7801\u957F\u5EA65-10\u4F4D\uFF01\uFF01\uFF01"));return}s()}},a=c({username:"",password:""}),y=c({username:[{validator:v,trigger:"change"}],password:[{validator:E,trigger:"change"}]}),V=o=>{!o||o.validate(e=>{if(e)S.post({url:"/user/login",data:{username:a.username,password:a.password}}).then(s=>{let r=s.data;r.status?(B.setCache("userInfo",JSON.stringify(r)),_.userInfo=r,f({message:"\u767B\u5F55\u6210\u529F\uFF01\uFF01\uFF01",type:"success"}),d.replace("/main")):f.error(r.message)}).catch(s=>{console.log(s)});else return console.log("error submit!"),!1})},x=o=>{!o||o.resetFields()},I=()=>{d.replace("/register")};return(o,e)=>{const s=k,r=$,i=X,b=U;return g(),w("div",q,[t(b,{ref_key:"formDataRef",ref:m,model:a,"status-icon":"",rules:y,"label-width":"100px",class:"demo-formData"},{default:n(()=>[t(r,{label:"\u8D26\xA0\xA0\xA0\xA0\xA0\xA0\xA0\u53F7\uFF1A",prop:"username"},{default:n(()=>[t(s,{modelValue:a.username,"onUpdate:modelValue":e[0]||(e[0]=u=>a.username=u)},null,8,["modelValue"])]),_:1}),t(r,{label:"\u5BC6\xA0\xA0\xA0\xA0\xA0\xA0\xA0\u7801\uFF1A",prop:"password"},{default:n(()=>[t(s,{modelValue:a.password,"onUpdate:modelValue":e[1]||(e[1]=u=>a.password=u),type:"password",autocomplete:"off"},null,8,["modelValue"])]),_:1}),t(r,null,{default:n(()=>[t(i,{type:"primary",onClick:e[2]||(e[2]=u=>V(m.value))},{default:n(()=>[p("\u767B\u5F55")]),_:1}),t(i,{onClick:e[3]||(e[3]=u=>x(m.value))},{default:n(()=>[p("\u91CD\u7F6E")]),_:1}),t(i,{onClick:I},{default:n(()=>[p("\u6CE8\u518C\u9875\u9762")]),_:1})]),_:1})]),_:1},8,["model","rules"])])}}};const J=l=>(D("data-v-6bd55c99"),l=l(),N(),l),L={class:"login"},M={style:{"margin-top":"-5%"}},O=J(()=>h("h1",null,"\u767B\u5F55\u754C\u9762",-1)),P={__name:"login",setup(l){return(_,d)=>(g(),w("div",L,[h("div",M,[O,t(G)])]))}},K=j(P,[["__scopeId","data-v-6bd55c99"]]);export{K as default};