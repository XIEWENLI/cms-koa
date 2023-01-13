import{a as w,B,o as c,c as N,I as f,Y as C,w as r,Q as I,aS as R,bs as $,d as i,a1 as z,X as _,E as v,r as u,b as q}from"./index.f968eb52.js";import{h as A,i as L,I as P,T as U}from"./Input.3c02c44f.js";import"./el-popper.72ab3a86.js";import{a as X}from"./el-input.2c9c0d13.js";import{_ as k}from"./_plugin-vue_export-helper.cdc0426e.js";import"./index.9aeab12a.js";const F={class:"commonTable"},M={__name:"CommonTable",props:{tableDataCommon:Array},emits:["requestCommon"],setup(D,{emit:S}){const h=D;let d=w([]);B(()=>h.tableDataCommon,(m,l)=>{d=m});const p=async(m,l)=>{let o=Number(m[l])?0:1;const n=await _.get({url:"/common/updateStatus",params:{fieldName:l,status:o}});n.data.status?(v({message:n.data.message,type:"success"}),S("requestCommon")):v.error(n.data.message)};return(m,l)=>{const o=X,n=A,g=L;return c(),N("div",F,[f(d).length>0?(c(),C(g,{key:0,data:f(d),border:"",stripe:"",style:{width:"100%"}},{default:r(()=>[(c(!0),N(I,null,R(f(d)[0],(y,e)=>(c(),C(n,{key:e,prop:e,label:e},$({default:r(({row:a})=>[Number(a[e])?(c(),C(o,{key:1,size:"small",type:"danger",plain:"",onClick:t=>p(a,e)},{default:r(()=>[i("\u7981\u6B62\u767B\u5F55")]),_:2},1032,["onClick"])):(c(),C(o,{key:0,size:"small",type:"primary",plain:"",onClick:t=>p(a,e)},{default:r(()=>[i("\u5141\u8BB8\u767B\u5F55")]),_:2},1032,["onClick"]))]),_:2},[e==="loginStatus_all_admin"?{name:"header",fn:r(()=>[i(" \u7BA1\u7406\u5458\u767B\u5F55\u72B6\u6001 ")]),key:"0"}:void 0,e==="registerStatus_all_admin"?{name:"header",fn:r(()=>[i(" \u7BA1\u7406\u5458\u6CE8\u518C\u72B6\u6001 ")]),key:"1"}:void 0,e==="loginStatus_all_user"?{name:"header",fn:r(()=>[i(" \u666E\u901A\u7528\u6237\u767B\u5F55\u72B6\u6001 ")]),key:"2"}:void 0,e==="registerStatus_all_user"?{name:"header",fn:r(()=>[i(" \u666E\u901A\u7528\u6237\u6CE8\u518C\u72B6\u6001 ")]),key:"3"}:void 0]),1032,["prop","label"]))),128))]),_:1},8,["data"])):z("",!0)])}}},Q=k(M,[["__scopeId","data-v-399a0281"]]);const V={class:"user"},W={__name:"user",setup(D){const S=u("\u8BF7\u8F93\u5165\u7528\u6237\u540D~"),h=u(null),d=e=>{h.value.currentPage=1,y(1,e)};let p=u([]);const m=async()=>{const e=_.get({url:"/common/getStatus",params:{fieldName:"loginStatus_all_admin"}}),a=_.get({url:"/common/getStatus",params:{fieldName:"registerStatus_all_admin"}}),t=_.get({url:"/common/getStatus",params:{fieldName:"loginStatus_all_user"}}),s=_.get({url:"/common/getStatus",params:{fieldName:"registerStatus_all_user"}});Promise.all([e,a,t,s]).then(b=>{if(!b[0].data.status){v.error(b[0].data.message);return}let T={};for(const x of b)for(const E in x.data.message)T[E]=x.data.message[E];p.value=[T]}).catch(b=>{console.log(b)})};m();let l=u();const o=async()=>{const e=await _.get({url:"/common/getSum",params:{tableName:"user"}});if(!e.data.status){v.error(e.data.message);return}l.value=e.data.message.sum-1};o();let n=u([]);const g=async(e=10,a=0,t)=>{t!==void 0?l.value=10:o();const s=await _.get({url:"/user/getUsers",params:{inputVal:t,limit:e,offset:a}});if(!s.data.status){v.error(s.data.message);return}n.value=s.data.message};g();const y=(e,a)=>{a=a===""?void 0:a;let t=u(10),s=u(0);e!==1&&(s.value=s.value+t.value*(e-1)),o(),a===void 0?g(t.value,s.value):g(t.value,s.value,a)};return(e,a)=>(c(),N("div",V,[q(Q,{tableDataCommon:f(p),onRequestCommon:m},null,8,["tableDataCommon"]),q(P,{onSearch:d,placeholderVal:S.value},null,8,["placeholderVal"]),q(U,{ref_key:"tableEl",ref:h,tableData:f(n),onAgainRequest:y,sum:f(l)},null,8,["tableData","sum"])]))}},O=k(W,[["__scopeId","data-v-a98e4c93"]]);export{O as default};