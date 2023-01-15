import{k as se,ai as ne,t as H,x as B,r as b,z as ie,J as me,o as v,c as E,C as R,D as T,F as $,_ as le,l as de,H as oe,A as Re,$ as x,U as w,w as O,V as De,as as ve,Y as ae,ad as fe,a1 as we,a2 as he,aF as A,aG as ue,aH as ge,aI as He,at as je,a0 as Ue,s as _,aJ as We,aK as qe,a as ke,y as D,K as Te,aL as I,p as Z,aq as Ge,ar as Ke,N as re,aM as Ee,aj as Je,aN as Ze,aO as Qe,ay as Ye,M as Xe,O as et,ae as tt,aP as G,d as xe,aD as Se,b as q,aE as nt,aQ as ot,u as at,Z as te,aR as st}from"./index.b727c8df.js";import{_ as Ne}from"./_plugin-vue_export-helper.cdc0426e.js";import{t as ce,E as Oe,_ as lt,f as rt}from"./el-popper.6fa9a078.js";import{T as ut,t as pe}from"./index.f7936c89.js";const Be=Symbol("breadcrumbKey"),ct=se({separator:{type:String,default:"/"},separatorIcon:{type:ne}}),it=H({name:"ElBreadcrumb"}),dt=H({...it,props:ct,setup(e){const n=e,t=B("breadcrumb"),s=b();return ie(Be,n),me(()=>{const o=s.value.querySelectorAll(`.${t.e("item")}`);o.length&&o[o.length-1].setAttribute("aria-current","page")}),(o,p)=>(v(),E("div",{ref_key:"breadcrumb",ref:s,class:T($(t).b()),"aria-label":"Breadcrumb",role:"navigation"},[R(o.$slots,"default")],2))}});var pt=le(dt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/breadcrumb/src/breadcrumb.vue"]]);const mt=se({to:{type:de([String,Object]),default:""},replace:{type:Boolean,default:!1}}),vt=H({name:"ElBreadcrumbItem"}),ft=H({...vt,props:mt,setup(e){const n=e,t=fe(),s=oe(Be,void 0),o=B("breadcrumb"),{separator:p,separatorIcon:i}=Re(s),c=t.appContext.config.globalProperties.$router,a=b(),d=()=>{!n.to||!c||(n.replace?c.replace(n.to):c.push(n.to))};return(m,h)=>(v(),E("span",{class:T($(o).e("item"))},[x("span",{ref_key:"link",ref:a,class:T([$(o).e("inner"),$(o).is("link",!!m.to)]),role:"link",onClick:d},[R(m.$slots,"default")],2),$(i)?(v(),w($(ve),{key:0,class:T($(o).e("separator"))},{default:O(()=>[(v(),w(De($(i))))]),_:1},8,["class"])):(v(),E("span",{key:1,class:T($(o).e("separator")),role:"presentation"},ae($(p)),3))],2))}});var Pe=le(ft,[["__file","/home/runner/work/element-plus/element-plus/packages/components/breadcrumb/src/breadcrumb-item.vue"]]);const ht=we(pt,{BreadcrumbItem:Pe}),_t=he(Pe);class bt{constructor(n,t){this.parent=n,this.domNode=t,this.subIndex=0,this.subIndex=0,this.init()}init(){this.subMenuItems=this.domNode.querySelectorAll("li"),this.addListeners()}gotoSubIndex(n){n===this.subMenuItems.length?n=0:n<0&&(n=this.subMenuItems.length-1),this.subMenuItems[n].focus(),this.subIndex=n}addListeners(){const n=this.parent.domNode;Array.prototype.forEach.call(this.subMenuItems,t=>{t.addEventListener("keydown",s=>{let o=!1;switch(s.code){case A.down:{this.gotoSubIndex(this.subIndex+1),o=!0;break}case A.up:{this.gotoSubIndex(this.subIndex-1),o=!0;break}case A.tab:{ce(n,"mouseleave");break}case A.enter:case A.space:{o=!0,s.currentTarget.click();break}}return o&&(s.preventDefault(),s.stopPropagation()),!1})})}}class Mt{constructor(n,t){this.domNode=n,this.submenu=null,this.submenu=null,this.init(t)}init(n){this.domNode.setAttribute("tabindex","0");const t=this.domNode.querySelector(`.${n}-menu`);t&&(this.submenu=new bt(this,t)),this.addListeners()}addListeners(){this.domNode.addEventListener("keydown",n=>{let t=!1;switch(n.code){case A.down:{ce(n.currentTarget,"mouseenter"),this.submenu&&this.submenu.gotoSubIndex(0),t=!0;break}case A.up:{ce(n.currentTarget,"mouseenter"),this.submenu&&this.submenu.gotoSubIndex(this.submenu.subMenuItems.length-1),t=!0;break}case A.tab:{ce(n.currentTarget,"mouseleave");break}case A.enter:case A.space:{t=!0,n.currentTarget.click();break}}t&&n.preventDefault()})}}class gt{constructor(n,t){this.domNode=n,this.init(t)}init(n){const t=this.domNode.childNodes;Array.from(t).forEach(s=>{s.nodeType===1&&new Mt(s,n)})}}const yt=H({name:"ElMenuCollapseTransition",setup(){const e=B("menu");return{listeners:{onBeforeEnter:t=>t.style.opacity="0.2",onEnter(t,s){ue(t,`${e.namespace.value}-opacity-transition`),t.style.opacity="1",s()},onAfterEnter(t){ge(t,`${e.namespace.value}-opacity-transition`),t.style.opacity=""},onBeforeLeave(t){t.dataset||(t.dataset={}),He(t,e.m("collapse"))?(ge(t,e.m("collapse")),t.dataset.oldOverflow=t.style.overflow,t.dataset.scrollWidth=t.clientWidth.toString(),ue(t,e.m("collapse"))):(ue(t,e.m("collapse")),t.dataset.oldOverflow=t.style.overflow,t.dataset.scrollWidth=t.clientWidth.toString(),ge(t,e.m("collapse"))),t.style.width=`${t.scrollWidth}px`,t.style.overflow="hidden"},onLeave(t){ue(t,"horizontal-collapse-transition"),t.style.width=`${t.dataset.scrollWidth}px`}}}}});function It(e,n,t,s,o,p){return v(),w(Ue,je({mode:"out-in"},e.listeners),{default:O(()=>[R(e.$slots,"default")]),_:3},16)}var Ct=le(yt,[["render",It],["__file","/home/runner/work/element-plus/element-plus/packages/components/menu/src/menu-collapse-transition.vue"]]);function ze(e,n){const t=_(()=>{let o=e.parent;const p=[n.value];for(;o.type.name!=="ElMenu";)o.props.index&&p.unshift(o.props.index),o=o.parent;return p});return{parentMenu:_(()=>{let o=e.parent;for(;o&&!["ElMenu","ElSubMenu"].includes(o.type.name);)o=o.parent;return o}),indexPath:t}}function kt(e){return _(()=>{const t=e.backgroundColor;return t?new ut(t).shade(20).toString():""})}const Ae=(e,n)=>{const t=B("menu");return _(()=>t.cssVarBlock({"text-color":e.textColor||"","hover-text-color":e.textColor||"","bg-color":e.backgroundColor||"","hover-bg-color":kt(e).value||"","active-color":e.activeTextColor||"",level:`${n}`}))},xt=se({index:{type:String,required:!0},showTimeout:{type:Number,default:300},hideTimeout:{type:Number,default:300},popperClass:String,disabled:Boolean,popperAppendToBody:{type:Boolean,default:void 0},popperOffset:{type:Number,default:6},expandCloseIcon:{type:ne},expandOpenIcon:{type:ne},collapseCloseIcon:{type:ne},collapseOpenIcon:{type:ne}}),ye="ElSubMenu";var $e=H({name:ye,props:xt,setup(e,{slots:n,expose:t}){const s=fe(),{indexPath:o,parentMenu:p}=ze(s,_(()=>e.index)),i=B("menu"),c=B("sub-menu"),a=oe("rootMenu");a||pe(ye,"can not inject root menu");const d=oe(`subMenu:${p.value.uid}`);d||pe(ye,"can not inject sub menu");const m=b({}),h=b({});let M;const P=b(!1),Q=b(),K=b(null),V=_(()=>r.value==="horizontal"&&j.value?"bottom-start":"right-start"),S=_(()=>r.value==="horizontal"&&j.value||r.value==="vertical"&&!a.props.collapse?e.expandCloseIcon&&e.expandOpenIcon?z.value?e.expandOpenIcon:e.expandCloseIcon:We:e.collapseCloseIcon&&e.collapseOpenIcon?z.value?e.collapseOpenIcon:e.collapseCloseIcon:qe),j=_(()=>d.level===0),Y=_(()=>e.popperAppendToBody===void 0?j.value:Boolean(e.popperAppendToBody)),_e=_(()=>a.props.collapse?`${i.namespace.value}-zoom-in-left`:`${i.namespace.value}-zoom-in-top`),be=_(()=>r.value==="horizontal"&&j.value?["bottom-start","bottom-end","top-start","top-end","right-start","left-start"]:["right-start","left-start","bottom-start","bottom-end","top-start","top-end"]),z=_(()=>a.openedMenus.includes(e.index)),U=_(()=>{let f=!1;return Object.values(m.value).forEach(g=>{g.active&&(f=!0)}),Object.values(h.value).forEach(g=>{g.active&&(f=!0)}),f}),X=_(()=>a.props.backgroundColor||""),J=_(()=>a.props.activeTextColor||""),l=_(()=>a.props.textColor||""),r=_(()=>a.props.mode),u=ke({index:e.index,indexPath:o,active:U}),C=_(()=>r.value!=="horizontal"?{color:l.value}:{borderBottomColor:U.value?a.props.activeTextColor?J.value:"":"transparent",color:U.value?J.value:l.value}),y=()=>{var f,g,k;return(k=(g=(f=K.value)==null?void 0:f.popperRef)==null?void 0:g.popperInstanceRef)==null?void 0:k.destroy()},L=f=>{f||y()},W=()=>{a.props.menuTrigger==="hover"&&a.props.mode==="horizontal"||a.props.collapse&&a.props.mode==="vertical"||e.disabled||a.handleSubMenuClick({index:e.index,indexPath:o.value,active:U.value})},F=(f,g=e.showTimeout)=>{var k;f.type!=="focus"&&(a.props.menuTrigger==="click"&&a.props.mode==="horizontal"||!a.props.collapse&&a.props.mode==="vertical"||e.disabled||(d.mouseInChild.value=!0,M==null||M(),{stop:M}=Ee(()=>{a.openMenu(e.index,o.value)},g),Y.value&&((k=p.value.vnode.el)==null||k.dispatchEvent(new MouseEvent("mouseenter")))))},N=(f=!1)=>{var g,k;a.props.menuTrigger==="click"&&a.props.mode==="horizontal"||!a.props.collapse&&a.props.mode==="vertical"||(M==null||M(),d.mouseInChild.value=!1,{stop:M}=Ee(()=>!P.value&&a.closeMenu(e.index,o.value),e.hideTimeout),Y.value&&f&&((g=s.parent)==null?void 0:g.type.name)==="ElSubMenu"&&((k=d.handleMouseleave)==null||k.call(d,!0)))};D(()=>a.props.collapse,f=>L(Boolean(f)));{const f=k=>{h.value[k.index]=k},g=k=>{delete h.value[k.index]};ie(`subMenu:${s.uid}`,{addSubMenu:f,removeSubMenu:g,handleMouseleave:N,mouseInChild:P,level:d.level+1})}return t({opened:z}),me(()=>{a.addSubMenu(u),d.addSubMenu(u)}),Te(()=>{d.removeSubMenu(u),a.removeSubMenu(u)}),()=>{var f;const g=[(f=n.title)==null?void 0:f.call(n),I(ve,{class:c.e("icon-arrow"),style:{transform:z.value?e.expandCloseIcon&&e.expandOpenIcon||e.collapseCloseIcon&&e.collapseOpenIcon&&a.props.collapse?"none":"rotateZ(180deg)":"none"}},{default:()=>Z(S.value)?I(s.appContext.components[S.value]):I(S.value)})],k=Ae(a.props,d.level+1),Fe=a.isMenuPopup?I(Oe,{ref:K,visible:z.value,effect:"light",pure:!0,offset:e.popperOffset,showArrow:!1,persistent:!0,popperClass:e.popperClass,placement:V.value,teleported:Y.value,fallbackPlacements:be.value,transition:_e.value,gpuAcceleration:!1},{content:()=>{var ee;return I("div",{class:[i.m(r.value),i.m("popup-container"),e.popperClass],onMouseenter:Me=>F(Me,100),onMouseleave:()=>N(!0),onFocus:Me=>F(Me,100)},[I("ul",{class:[i.b(),i.m("popup"),i.m(`popup-${V.value}`)],style:k.value},[(ee=n.default)==null?void 0:ee.call(n)])])},default:()=>I("div",{class:c.e("title"),style:[C.value,{backgroundColor:X.value}],onClick:W},g)}):I(re,{},[I("div",{class:c.e("title"),style:[C.value,{backgroundColor:X.value}],ref:Q,onClick:W},g),I(lt,{},{default:()=>{var ee;return Ge(I("ul",{role:"menu",class:[i.b(),i.m("inline")],style:k.value},[(ee=n.default)==null?void 0:ee.call(n)]),[[Ke,z.value]])}})]);return I("li",{class:[c.b(),c.is("active",U.value),c.is("opened",z.value),c.is("disabled",e.disabled)],role:"menuitem",ariaHaspopup:!0,ariaExpanded:z.value,onMouseenter:F,onMouseleave:()=>N(!0),onFocus:F},[Fe])}}});const St=se({mode:{type:String,values:["horizontal","vertical"],default:"vertical"},defaultActive:{type:String,default:""},defaultOpeneds:{type:de(Array),default:()=>Je([])},uniqueOpened:Boolean,router:Boolean,menuTrigger:{type:String,values:["hover","click"],default:"hover"},collapse:Boolean,backgroundColor:String,textColor:String,activeTextColor:String,collapseTransition:{type:Boolean,default:!0},ellipsis:{type:Boolean,default:!0},popperEffect:{type:String,values:["dark","light"],default:"dark"}}),Ie=e=>Array.isArray(e)&&e.every(n=>Z(n)),$t={close:(e,n)=>Z(e)&&Ie(n),open:(e,n)=>Z(e)&&Ie(n),select:(e,n,t,s)=>Z(e)&&Ie(n)&&Ye(t)&&(s===void 0||s instanceof Promise)};var Et=H({name:"ElMenu",props:St,emits:$t,setup(e,{emit:n,slots:t,expose:s}){const o=fe(),p=o.appContext.config.globalProperties.$router,i=b(),c=B("menu"),a=B("sub-menu"),d=b(-1),m=b(e.defaultOpeneds&&!e.collapse?e.defaultOpeneds.slice(0):[]),h=b(e.defaultActive),M=b({}),P=b({}),Q=_(()=>e.mode==="horizontal"||e.mode==="vertical"&&e.collapse),K=()=>{const l=h.value&&M.value[h.value];if(!l||e.mode==="horizontal"||e.collapse)return;l.indexPath.forEach(u=>{const C=P.value[u];C&&V(u,C.indexPath)})},V=(l,r)=>{m.value.includes(l)||(e.uniqueOpened&&(m.value=m.value.filter(u=>r.includes(u))),m.value.push(l),n("open",l,r))},S=(l,r)=>{const u=m.value.indexOf(l);u!==-1&&m.value.splice(u,1),n("close",l,r)},j=({index:l,indexPath:r})=>{m.value.includes(l)?S(l,r):V(l,r)},Y=l=>{(e.mode==="horizontal"||e.collapse)&&(m.value=[]);const{index:r,indexPath:u}=l;if(!(r===void 0||u===void 0))if(e.router&&p){const C=l.route||r,y=p.push(C).then(L=>(L||(h.value=r),L));n("select",r,u,{index:r,indexPath:u,route:C},y)}else h.value=r,n("select",r,u,{index:r,indexPath:u})},_e=l=>{const r=M.value,u=r[l]||h.value&&r[h.value]||r[e.defaultActive];u?h.value=u.index:h.value=l},be=()=>{var l,r;if(!i.value)return-1;const u=Array.from((r=(l=i.value)==null?void 0:l.childNodes)!=null?r:[]).filter(f=>f.nodeName!=="#text"||f.nodeValue),C=64,y=Number.parseInt(getComputedStyle(i.value).paddingLeft,10),L=Number.parseInt(getComputedStyle(i.value).paddingRight,10),W=i.value.clientWidth-y-L;let F=0,N=0;return u.forEach((f,g)=>{F+=f.offsetWidth||0,F<=W-C&&(N=g+1)}),N===u.length?-1:N},z=(l,r=33.34)=>{let u;return()=>{u&&clearTimeout(u),u=setTimeout(()=>{l()},r)}};let U=!0;const X=()=>{const l=()=>{d.value=-1,et(()=>{d.value=be()})};U?l():z(l)(),U=!1};D(()=>e.defaultActive,l=>{M.value[l]||(h.value=""),_e(l)}),D(()=>e.collapse,l=>{l&&(m.value=[])}),D(M.value,K);let J;Ze(()=>{e.mode==="horizontal"&&e.ellipsis?J=Xe(i,X).stop:J==null||J()});{const l=y=>{P.value[y.index]=y},r=y=>{delete P.value[y.index]};ie("rootMenu",ke({props:e,openedMenus:m,items:M,subMenus:P,activeIndex:h,isMenuPopup:Q,addMenuItem:y=>{M.value[y.index]=y},removeMenuItem:y=>{delete M.value[y.index]},addSubMenu:l,removeSubMenu:r,openMenu:V,closeMenu:S,handleMenuItemClick:Y,handleSubMenuClick:j})),ie(`subMenu:${o.uid}`,{addSubMenu:l,removeSubMenu:r,mouseInChild:b(!1),level:0})}return me(()=>{e.mode==="horizontal"&&new gt(o.vnode.el,c.namespace.value)}),s({open:r=>{const{indexPath:u}=P.value[r];u.forEach(C=>V(C,u))},close:S,handleResize:X}),()=>{var l,r;let u=(r=(l=t.default)==null?void 0:l.call(t))!=null?r:[];const C=[];if(e.mode==="horizontal"&&i.value){const W=rt(u),F=d.value===-1?W:W.slice(0,d.value),N=d.value===-1?[]:W.slice(d.value);(N==null?void 0:N.length)&&e.ellipsis&&(u=F,C.push(I($e,{index:"sub-menu-more",class:a.e("hide-arrow")},{title:()=>I(ve,{class:a.e("icon-more")},{default:()=>I(Qe)}),default:()=>N})))}const y=Ae(e,0),L=I("ul",{key:String(e.collapse),role:"menubar",ref:i,style:y.value,class:{[c.b()]:!0,[c.m(e.mode)]:!0,[c.m("collapse")]:e.collapse}},[...u,...C]);return e.collapseTransition&&e.mode==="vertical"?I(Ct,()=>L):L}}});const wt=se({index:{type:de([String,null]),default:null},route:{type:de([String,Object])},disabled:Boolean}),Tt={click:e=>Z(e.index)&&Array.isArray(e.indexPath)},Ce="ElMenuItem",Nt=H({name:Ce,components:{ElTooltip:Oe},props:wt,emits:Tt,setup(e,{emit:n}){const t=fe(),s=oe("rootMenu"),o=B("menu"),p=B("menu-item");s||pe(Ce,"can not inject root menu");const{parentMenu:i,indexPath:c}=ze(t,tt(e,"index")),a=oe(`subMenu:${i.value.uid}`);a||pe(Ce,"can not inject sub menu");const d=_(()=>e.index===s.activeIndex),m=ke({index:e.index,indexPath:c,active:d}),h=()=>{e.disabled||(s.handleMenuItemClick({index:e.index,indexPath:c.value,route:e.route}),n("click",m))};return me(()=>{a.addSubMenu(m),s.addMenuItem(m)}),Te(()=>{a.removeSubMenu(m),s.removeMenuItem(m)}),{parentMenu:i,rootMenu:s,active:d,nsMenu:o,nsMenuItem:p,handleClick:h}}});function Ot(e,n,t,s,o,p){const i=G("el-tooltip");return v(),E("li",{class:T([e.nsMenuItem.b(),e.nsMenuItem.is("active",e.active),e.nsMenuItem.is("disabled",e.disabled)]),role:"menuitem",tabindex:"-1",onClick:n[0]||(n[0]=(...c)=>e.handleClick&&e.handleClick(...c))},[e.parentMenu.type.name==="ElMenu"&&e.rootMenu.props.collapse&&e.$slots.title?(v(),w(i,{key:0,effect:e.rootMenu.props.popperEffect,placement:"right","fallback-placements":["left"],persistent:""},{content:O(()=>[R(e.$slots,"title")]),default:O(()=>[x("div",{class:T(e.nsMenu.be("tooltip","trigger"))},[R(e.$slots,"default")],2)]),_:3},8,["effect"])):(v(),E(re,{key:1},[R(e.$slots,"default"),R(e.$slots,"title")],64))],2)}var Ve=le(Nt,[["render",Ot],["__file","/home/runner/work/element-plus/element-plus/packages/components/menu/src/menu-item.vue"]]);const Bt={title:String},Pt="ElMenuItemGroup",zt=H({name:Pt,props:Bt,setup(){return{ns:B("menu-item-group")}}});function At(e,n,t,s,o,p){return v(),E("li",{class:T(e.ns.b())},[x("div",{class:T(e.ns.e("title"))},[e.$slots.title?R(e.$slots,"title",{key:1}):(v(),E(re,{key:0},[xe(ae(e.title),1)],64))],2),x("ul",null,[R(e.$slots,"default")])],2)}var Le=le(zt,[["render",At],["__file","/home/runner/work/element-plus/element-plus/packages/components/menu/src/menu-item-group.vue"]]);const Vt=we(Et,{MenuItem:Ve,MenuItemGroup:Le,SubMenu:$e}),Lt=he(Ve);he(Le);he($e);const Ft={viewBox:"0 0 1024 1024",width:"1.2em",height:"1.2em"},Rt=x("path",{fill:"currentColor",d:"M128 192h768v128H128V192zm0 256h512v128H128V448zm0 256h768v128H128V704zm576-352l192 160l-192 128V352z"},null,-1),Dt=[Rt];function Ht(e,n){return v(),E("svg",Ft,Dt)}const jt={name:"ep-expand",render:Ht},Ut={viewBox:"0 0 1024 1024",width:"1.2em",height:"1.2em"},Wt=x("path",{fill:"currentColor",d:"M896 192H128v128h768V192zm0 256H384v128h512V448zm0 256H128v128h768V704zM320 384L128 512l192 128V384z"},null,-1),qt=[Wt];function Gt(e,n){return v(),E("svg",Ut,qt)}const Kt={name:"ep-fold",render:Gt};const Jt={class:"userInfo"},Zt={__name:"Nav",setup(e){const n=Se(),t=b(n.userInfo.username),s=b("/main");D(()=>n.URL,(c,a)=>{s.value=c});const o=b(!0);D(()=>n.openState,(c,a)=>{o.value=c});const p=()=>{n.reverseOpenState()},i=()=>{nt.deleteCache("userInfo"),location.replace("/#/login")};return(c,a)=>{const d=Kt,m=jt,h=_t,M=ht;return v(),E("div",{class:T(["nav",{open2:o.value}])},[q(M,{separator:"",style:{"font-size":"20px"}},{default:O(()=>[q(h,null,{default:O(()=>[x("a",null,[o.value?(v(),w(d,{key:0,onClick:p})):(v(),w(m,{key:1,onClick:p}))])]),_:1}),q(h,{style:{"padding-top":"10px"}},{default:O(()=>[xe(ae(s.value),1)]),_:1})]),_:1}),x("div",Jt,[x("h3",null,"\u7528\u6237\u540D\uFF1A"+ae(t.value),1),x("a",{href:"JavaScript:0",onClick:i},"\u9000\u51FA\u767B\u5F55")])],2)}}},Qt=Ne(Zt,[["__scopeId","data-v-81869dca"]]);const Yt="/assets/vite.4a748afd.svg";const Xt={class:"menu"},en={class:"title"},tn=x("img",{src:Yt,alt:"\u56FE\u6807\u663E\u793A\u9519\u8BEF"},null,-1),nn={__name:"Menu",setup(e){const n=at(),t=Se();let s=b(!0);D(()=>t.openState,(c,a)=>{s.value=c});const o=t.oneLevelMenu;let p=b("");D(()=>t.actionIndex,(c,a)=>{p.value=c});const i=c=>{p.value=c.index;let a=o[c.index-1].menuURL;t.URL=a,n.replace(a)};return(c,a)=>{const d=G("Histogram"),m=G("User"),h=G("UserFilled"),M=G("Folder"),P=G("FolderOpened"),Q=ve,K=Lt,V=Vt;return v(),E("div",Xt,[q(V,{"default-active":$(p),"active-text-color":"#ffd04b","text-color":"#fff","background-color":"#545c64",class:"el-menu-vertical-demo",collapse:!$(s)},{default:O(()=>[x("div",en,[tn,x("h3",{class:T({h3None:!$(s)})},"node+vue",2)]),(v(!0),E(re,null,ot($(o),(S,j)=>(v(),w(K,{ref_for:!0,ref:"el",index:j+1+"",onClick:i},{title:O(()=>[xe(ae(S.name),1)]),default:O(()=>[q(Q,null,{default:O(()=>[S.iconName==="Histogram"?(v(),w(d,{key:0})):te("",!0),S.iconName==="User"?(v(),w(m,{key:1})):te("",!0),S.iconName==="UserFilled"?(v(),w(h,{key:2})):te("",!0),S.iconName==="Folder"?(v(),w(M,{key:3})):te("",!0),S.iconName==="FolderOpened"?(v(),w(P,{key:4})):te("",!0)]),_:2},1024)]),_:2},1032,["index"]))),256))]),_:1},8,["default-active","collapse"])])}}};const on={class:"main"},an={__name:"main",setup(e){st();const n=Se(),t=b(!0);return D(()=>n.openState,(s,o)=>{t.value=s}),(s,o)=>{const p=G("router-view");return v(),E(re,null,[x("div",on,[q(Qt),q(nn)]),x("div",{class:T(["content",{open:t.value}])},[q(p)],2)],64)}}},cn=Ne(an,[["__scopeId","data-v-74358005"]]);export{cn as default};
