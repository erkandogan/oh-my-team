function ai(r,e){for(var t=0;t<e.length;t++){const i=e[t];if(typeof i!="string"&&!Array.isArray(i)){for(const n in i)if(n!=="default"&&!(n in r)){const o=Object.getOwnPropertyDescriptor(i,n);o&&Object.defineProperty(r,n,o.get?o:{enumerable:!0,get:()=>i[n]})}}}return Object.freeze(Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}))}function Tt(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Be={exports:{}},I={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ht;function si(){if(ht)return I;ht=1;var r=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),i=Symbol.for("react.strict_mode"),n=Symbol.for("react.profiler"),o=Symbol.for("react.consumer"),a=Symbol.for("react.context"),s=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),l=Symbol.for("react.memo"),c=Symbol.for("react.lazy"),v=Symbol.for("react.activity"),m=Symbol.iterator;function g(h){return h===null||typeof h!="object"?null:(h=m&&h[m]||h["@@iterator"],typeof h=="function"?h:null)}var _={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},u=Object.assign,w={};function x(h,b,G){this.props=h,this.context=b,this.refs=w,this.updater=G||_}x.prototype.isReactComponent={},x.prototype.setState=function(h,b){if(typeof h!="object"&&typeof h!="function"&&h!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,h,b,"setState")},x.prototype.forceUpdate=function(h){this.updater.enqueueForceUpdate(this,h,"forceUpdate")};function P(){}P.prototype=x.prototype;function R(h,b,G){this.props=h,this.context=b,this.refs=w,this.updater=G||_}var z=R.prototype=new P;z.constructor=R,u(z,x.prototype),z.isPureReactComponent=!0;var U=Array.isArray;function T(){}var D={H:null,A:null,T:null,S:null},L=Object.prototype.hasOwnProperty;function j(h,b,G){var O=G.ref;return{$$typeof:r,type:h,key:b,ref:O!==void 0?O:null,props:G}}function H(h,b){return j(h.type,b,h.props)}function Z(h){return typeof h=="object"&&h!==null&&h.$$typeof===r}function ne(h){var b={"=":"=0",":":"=2"};return"$"+h.replace(/[=:]/g,function(G){return b[G]})}var Y=/\/+/g;function M(h,b){return typeof h=="object"&&h!==null&&h.key!=null?ne(""+h.key):b.toString(36)}function f(h){switch(h.status){case"fulfilled":return h.value;case"rejected":throw h.reason;default:switch(typeof h.status=="string"?h.then(T,T):(h.status="pending",h.then(function(b){h.status==="pending"&&(h.status="fulfilled",h.value=b)},function(b){h.status==="pending"&&(h.status="rejected",h.reason=b)})),h.status){case"fulfilled":return h.value;case"rejected":throw h.reason}}throw h}function S(h,b,G,O,N){var V=typeof h;(V==="undefined"||V==="boolean")&&(h=null);var W=!1;if(h===null)W=!0;else switch(V){case"bigint":case"string":case"number":W=!0;break;case"object":switch(h.$$typeof){case r:case e:W=!0;break;case c:return W=h._init,S(W(h._payload),b,G,O,N)}}if(W)return N=N(h),W=O===""?"."+M(h,0):O,U(N)?(G="",W!=null&&(G=W.replace(Y,"$&/")+"/"),S(N,b,G,"",function(ri){return ri})):N!=null&&(Z(N)&&(N=H(N,G+(N.key==null||h&&h.key===N.key?"":(""+N.key).replace(Y,"$&/")+"/")+W)),b.push(N)),1;W=0;var ce=O===""?".":O+":";if(U(h))for(var ie=0;ie<h.length;ie++)O=h[ie],V=ce+M(O,ie),W+=S(O,b,G,V,N);else if(ie=g(h),typeof ie=="function")for(h=ie.call(h),ie=0;!(O=h.next()).done;)O=O.value,V=ce+M(O,ie++),W+=S(O,b,G,V,N);else if(V==="object"){if(typeof h.then=="function")return S(f(h),b,G,O,N);throw b=String(h),Error("Objects are not valid as a React child (found: "+(b==="[object Object]"?"object with keys {"+Object.keys(h).join(", ")+"}":b)+"). If you meant to render a collection of children, use an array instead.")}return W}function B(h,b,G){if(h==null)return h;var O=[],N=0;return S(h,O,"","",function(V){return b.call(G,V,N++)}),O}function xe(h){if(h._status===-1){var b=h._result;b=b(),b.then(function(G){(h._status===0||h._status===-1)&&(h._status=1,h._result=G)},function(G){(h._status===0||h._status===-1)&&(h._status=2,h._result=G)}),h._status===-1&&(h._status=0,h._result=b)}if(h._status===1)return h._result.default;throw h._result}var ct=typeof reportError=="function"?reportError:function(h){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var b=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof h=="object"&&h!==null&&typeof h.message=="string"?String(h.message):String(h),error:h});if(!window.dispatchEvent(b))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",h);return}console.error(h)},oi={map:B,forEach:function(h,b,G){B(h,function(){b.apply(this,arguments)},G)},count:function(h){var b=0;return B(h,function(){b++}),b},toArray:function(h){return B(h,function(b){return b})||[]},only:function(h){if(!Z(h))throw Error("React.Children.only expected to receive a single React element child.");return h}};return I.Activity=v,I.Children=oi,I.Component=x,I.Fragment=t,I.Profiler=n,I.PureComponent=R,I.StrictMode=i,I.Suspense=d,I.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=D,I.__COMPILER_RUNTIME={__proto__:null,c:function(h){return D.H.useMemoCache(h)}},I.cache=function(h){return function(){return h.apply(null,arguments)}},I.cacheSignal=function(){return null},I.cloneElement=function(h,b,G){if(h==null)throw Error("The argument must be a React element, but you passed "+h+".");var O=u({},h.props),N=h.key;if(b!=null)for(V in b.key!==void 0&&(N=""+b.key),b)!L.call(b,V)||V==="key"||V==="__self"||V==="__source"||V==="ref"&&b.ref===void 0||(O[V]=b[V]);var V=arguments.length-2;if(V===1)O.children=G;else if(1<V){for(var W=Array(V),ce=0;ce<V;ce++)W[ce]=arguments[ce+2];O.children=W}return j(h.type,N,O)},I.createContext=function(h){return h={$$typeof:a,_currentValue:h,_currentValue2:h,_threadCount:0,Provider:null,Consumer:null},h.Provider=h,h.Consumer={$$typeof:o,_context:h},h},I.createElement=function(h,b,G){var O,N={},V=null;if(b!=null)for(O in b.key!==void 0&&(V=""+b.key),b)L.call(b,O)&&O!=="key"&&O!=="__self"&&O!=="__source"&&(N[O]=b[O]);var W=arguments.length-2;if(W===1)N.children=G;else if(1<W){for(var ce=Array(W),ie=0;ie<W;ie++)ce[ie]=arguments[ie+2];N.children=ce}if(h&&h.defaultProps)for(O in W=h.defaultProps,W)N[O]===void 0&&(N[O]=W[O]);return j(h,V,N)},I.createRef=function(){return{current:null}},I.forwardRef=function(h){return{$$typeof:s,render:h}},I.isValidElement=Z,I.lazy=function(h){return{$$typeof:c,_payload:{_status:-1,_result:h},_init:xe}},I.memo=function(h,b){return{$$typeof:l,type:h,compare:b===void 0?null:b}},I.startTransition=function(h){var b=D.T,G={};D.T=G;try{var O=h(),N=D.S;N!==null&&N(G,O),typeof O=="object"&&O!==null&&typeof O.then=="function"&&O.then(T,ct)}catch(V){ct(V)}finally{b!==null&&G.types!==null&&(b.types=G.types),D.T=b}},I.unstable_useCacheRefresh=function(){return D.H.useCacheRefresh()},I.use=function(h){return D.H.use(h)},I.useActionState=function(h,b,G){return D.H.useActionState(h,b,G)},I.useCallback=function(h,b){return D.H.useCallback(h,b)},I.useContext=function(h){return D.H.useContext(h)},I.useDebugValue=function(){},I.useDeferredValue=function(h,b){return D.H.useDeferredValue(h,b)},I.useEffect=function(h,b){return D.H.useEffect(h,b)},I.useEffectEvent=function(h){return D.H.useEffectEvent(h)},I.useId=function(){return D.H.useId()},I.useImperativeHandle=function(h,b,G){return D.H.useImperativeHandle(h,b,G)},I.useInsertionEffect=function(h,b){return D.H.useInsertionEffect(h,b)},I.useLayoutEffect=function(h,b){return D.H.useLayoutEffect(h,b)},I.useMemo=function(h,b){return D.H.useMemo(h,b)},I.useOptimistic=function(h,b){return D.H.useOptimistic(h,b)},I.useReducer=function(h,b,G){return D.H.useReducer(h,b,G)},I.useRef=function(h){return D.H.useRef(h)},I.useState=function(h){return D.H.useState(h)},I.useSyncExternalStore=function(h,b,G){return D.H.useSyncExternalStore(h,b,G)},I.useTransition=function(){return D.H.useTransition()},I.version="19.2.5",I}var vt;function Rt(){return vt||(vt=1,Be.exports=si()),Be.exports}var Nt=Rt();const k=Tt(Nt),io=ai({__proto__:null,default:k},[Nt]);var Ue={exports:{}},te={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var pt;function di(){if(pt)return te;pt=1;var r=Rt();function e(d){var l="https://react.dev/errors/"+d;if(1<arguments.length){l+="?args[]="+encodeURIComponent(arguments[1]);for(var c=2;c<arguments.length;c++)l+="&args[]="+encodeURIComponent(arguments[c])}return"Minified React error #"+d+"; visit "+l+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function t(){}var i={d:{f:t,r:function(){throw Error(e(522))},D:t,C:t,L:t,m:t,X:t,S:t,M:t},p:0,findDOMNode:null},n=Symbol.for("react.portal");function o(d,l,c){var v=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:n,key:v==null?null:""+v,children:d,containerInfo:l,implementation:c}}var a=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function s(d,l){if(d==="font")return"";if(typeof l=="string")return l==="use-credentials"?l:""}return te.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,te.createPortal=function(d,l){var c=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!l||l.nodeType!==1&&l.nodeType!==9&&l.nodeType!==11)throw Error(e(299));return o(d,l,null,c)},te.flushSync=function(d){var l=a.T,c=i.p;try{if(a.T=null,i.p=2,d)return d()}finally{a.T=l,i.p=c,i.d.f()}},te.preconnect=function(d,l){typeof d=="string"&&(l?(l=l.crossOrigin,l=typeof l=="string"?l==="use-credentials"?l:"":void 0):l=null,i.d.C(d,l))},te.prefetchDNS=function(d){typeof d=="string"&&i.d.D(d)},te.preinit=function(d,l){if(typeof d=="string"&&l&&typeof l.as=="string"){var c=l.as,v=s(c,l.crossOrigin),m=typeof l.integrity=="string"?l.integrity:void 0,g=typeof l.fetchPriority=="string"?l.fetchPriority:void 0;c==="style"?i.d.S(d,typeof l.precedence=="string"?l.precedence:void 0,{crossOrigin:v,integrity:m,fetchPriority:g}):c==="script"&&i.d.X(d,{crossOrigin:v,integrity:m,fetchPriority:g,nonce:typeof l.nonce=="string"?l.nonce:void 0})}},te.preinitModule=function(d,l){if(typeof d=="string")if(typeof l=="object"&&l!==null){if(l.as==null||l.as==="script"){var c=s(l.as,l.crossOrigin);i.d.M(d,{crossOrigin:c,integrity:typeof l.integrity=="string"?l.integrity:void 0,nonce:typeof l.nonce=="string"?l.nonce:void 0})}}else l==null&&i.d.M(d)},te.preload=function(d,l){if(typeof d=="string"&&typeof l=="object"&&l!==null&&typeof l.as=="string"){var c=l.as,v=s(c,l.crossOrigin);i.d.L(d,c,{crossOrigin:v,integrity:typeof l.integrity=="string"?l.integrity:void 0,nonce:typeof l.nonce=="string"?l.nonce:void 0,type:typeof l.type=="string"?l.type:void 0,fetchPriority:typeof l.fetchPriority=="string"?l.fetchPriority:void 0,referrerPolicy:typeof l.referrerPolicy=="string"?l.referrerPolicy:void 0,imageSrcSet:typeof l.imageSrcSet=="string"?l.imageSrcSet:void 0,imageSizes:typeof l.imageSizes=="string"?l.imageSizes:void 0,media:typeof l.media=="string"?l.media:void 0})}},te.preloadModule=function(d,l){if(typeof d=="string")if(l){var c=s(l.as,l.crossOrigin);i.d.m(d,{as:typeof l.as=="string"&&l.as!=="script"?l.as:void 0,crossOrigin:c,integrity:typeof l.integrity=="string"?l.integrity:void 0})}else i.d.m(d)},te.requestFormReset=function(d){i.d.r(d)},te.unstable_batchedUpdates=function(d,l){return d(l)},te.useFormState=function(d,l,c){return a.H.useFormState(d,l,c)},te.useFormStatus=function(){return a.H.useHostTransitionStatus()},te.version="19.2.5",te}var ut;function li(){if(ut)return Ue.exports;ut=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),Ue.exports=di(),Ue.exports}/**
 * dockview-core
 * @version 5.2.0
 * @link https://github.com/mathuo/dockview
 * @license MIT
 */function ci(r,e){e===void 0&&(e={});var t=e.insertAt;if(!(typeof document>"u")){var i=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style");n.type="text/css",t==="top"&&i.firstChild?i.insertBefore(n,i.firstChild):i.appendChild(n),n.styleSheet?n.styleSheet.cssText=r:n.appendChild(document.createTextNode(r))}}var hi=`.dv-scrollable {
  position: relative;
  overflow: hidden;
}
.dv-scrollable .dv-scrollbar {
  position: absolute;
  border-radius: 2px;
  background-color: transparent;
  /* GPU optimizations */
  will-change: background-color, transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  transition-property: background-color;
  transition-timing-function: ease-in-out;
  transition-duration: 1s;
  transition-delay: 0s;
}
.dv-scrollable .dv-scrollbar-horizontal {
  bottom: 0px;
  left: 0px;
  height: 4px;
}
.dv-scrollable .dv-scrollbar-vertical {
  right: 0px;
  top: 0px;
  width: 4px;
}
.dv-scrollable:hover .dv-scrollbar, .dv-scrollable.dv-scrollable-resizing .dv-scrollbar, .dv-scrollable.dv-scrollable-scrolling .dv-scrollbar {
  background-color: var(--dv-scrollbar-background-color, rgba(255, 255, 255, 0.25));
}
.dv-svg {
  display: inline-block;
  fill: currentcolor;
  line-height: 1;
  stroke: currentcolor;
  stroke-width: 0;
}
.dockview-theme-dark {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-group-view-background-color: #1e1e1e;
  --dv-tabs-and-actions-container-background-color: #252526;
  --dv-activegroup-visiblepanel-tab-background-color: #1e1e1e;
  --dv-activegroup-hiddenpanel-tab-background-color: #2d2d2d;
  --dv-inactivegroup-visiblepanel-tab-background-color: #1e1e1e;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #2d2d2d;
  --dv-tab-divider-color: #1e1e1e;
  --dv-activegroup-visiblepanel-tab-color: white;
  --dv-activegroup-hiddenpanel-tab-color: #969696;
  --dv-inactivegroup-visiblepanel-tab-color: #8f8f8f;
  --dv-inactivegroup-hiddenpanel-tab-color: #626262;
  --dv-separator-border: rgb(68, 68, 68);
  --dv-paneview-header-border-color: rgba(204, 204, 204, 0.2);
}
.dockview-theme-dark .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}

.dockview-theme-light {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-group-view-background-color: white;
  --dv-tabs-and-actions-container-background-color: #f3f3f3;
  --dv-activegroup-visiblepanel-tab-background-color: white;
  --dv-activegroup-hiddenpanel-tab-background-color: #ececec;
  --dv-inactivegroup-visiblepanel-tab-background-color: white;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #ececec;
  --dv-tab-divider-color: white;
  --dv-activegroup-visiblepanel-tab-color: rgb(51, 51, 51);
  --dv-activegroup-hiddenpanel-tab-color: rgba(51, 51, 51, 0.7);
  --dv-inactivegroup-visiblepanel-tab-color: rgba(51, 51, 51, 0.7);
  --dv-inactivegroup-hiddenpanel-tab-color: rgba(51, 51, 51, 0.35);
  --dv-separator-border: rgba(128, 128, 128, 0.35);
  --dv-paneview-header-border-color: rgb(51, 51, 51);
  --dv-scrollbar-background-color: rgba(0, 0, 0, 0.25);
}
.dockview-theme-light .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}

.dockview-theme-vs {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-group-view-background-color: #1e1e1e;
  --dv-tabs-and-actions-container-background-color: #252526;
  --dv-activegroup-visiblepanel-tab-background-color: #1e1e1e;
  --dv-activegroup-hiddenpanel-tab-background-color: #2d2d2d;
  --dv-inactivegroup-visiblepanel-tab-background-color: #1e1e1e;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #2d2d2d;
  --dv-tab-divider-color: #1e1e1e;
  --dv-activegroup-visiblepanel-tab-color: white;
  --dv-activegroup-hiddenpanel-tab-color: #969696;
  --dv-inactivegroup-visiblepanel-tab-color: #8f8f8f;
  --dv-inactivegroup-hiddenpanel-tab-color: #626262;
  --dv-separator-border: rgb(68, 68, 68);
  --dv-paneview-header-border-color: rgba(204, 204, 204, 0.2);
  --dv-tabs-and-actions-container-background-color: #2d2d30;
  --dv-tabs-and-actions-container-height: 20px;
  --dv-tabs-and-actions-container-font-size: 11px;
  --dv-activegroup-visiblepanel-tab-background-color: #007acc;
  --dv-inactivegroup-visiblepanel-tab-background-color: #3f3f46;
  --dv-activegroup-visiblepanel-tab-color: white;
  --dv-activegroup-hiddenpanel-tab-color: white;
  --dv-inactivegroup-visiblepanel-tab-color: white;
  --dv-inactivegroup-hiddenpanel-tab-color: white;
}
.dockview-theme-vs .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}
.dockview-theme-vs .dv-groupview.dv-active-group > .dv-tabs-and-actions-container {
  box-sizing: content-box;
  border-bottom: 2px solid var(--dv-activegroup-visiblepanel-tab-background-color);
}
.dockview-theme-vs .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tab.dv-active-tab {
  border-top: 2px solid var(--dv-activegroup-visiblepanel-tab-background-color);
}
.dockview-theme-vs .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tab.dv-inactive-tab {
  border-top: 2px solid var(--dv-activegroup-hiddenpanel-tab-background-color);
}
.dockview-theme-vs .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container {
  box-sizing: content-box;
  border-bottom: 2px solid var(--dv-inactivegroup-visiblepanel-tab-background-color);
}
.dockview-theme-vs .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tab.dv-active-tab {
  border-top: 2px solid var(--dv-inactivegroup-visiblepanel-tab-background-color);
}
.dockview-theme-vs .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tab.dv-inactive-tab {
  border-top: 2px solid var(--dv-inactivegroup-hiddenpanel-tab-background-color);
}

.dockview-theme-abyss {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-color-abyss-dark: #000c18;
  --dv-color-abyss: #10192c;
  --dv-color-abyss-light: #1c1c2a;
  --dv-color-abyss-lighter: #2b2b4a;
  --dv-color-abyss-accent: rgb(91, 30, 207);
  --dv-color-abyss-primary-text: white;
  --dv-color-abyss-secondary-text: rgb(148, 151, 169);
  --dv-group-view-background-color: var(--dv-color-abyss-dark);
  --dv-tabs-and-actions-container-background-color: var(
      --dv-color-abyss-light
  );
  --dv-activegroup-visiblepanel-tab-background-color: var(
      --dv-color-abyss-dark
  );
  --dv-activegroup-hiddenpanel-tab-background-color: var(--dv-color-abyss);
  --dv-inactivegroup-visiblepanel-tab-background-color: var(
      --dv-color-abyss-dark
  );
  --dv-inactivegroup-hiddenpanel-tab-background-color: var(--dv-color-abyss);
  --dv-tab-divider-color: var(--dv-color-abyss-lighter);
  --dv-activegroup-visiblepanel-tab-color: white;
  --dv-activegroup-hiddenpanel-tab-color: rgba(255, 255, 255, 0.5);
  --dv-inactivegroup-visiblepanel-tab-color: rgba(255, 255, 255, 0.5);
  --dv-inactivegroup-hiddenpanel-tab-color: rgba(255, 255, 255, 0.25);
  --dv-separator-border: var(--dv-color-abyss-lighter);
  --dv-paneview-header-border-color: var(--dv-color-abyss-lighter);
  --dv-paneview-active-outline-color: #596f99;
}
.dockview-theme-abyss .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}

.dockview-theme-dracula {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-group-view-background-color: #282a36;
  --dv-tabs-and-actions-container-background-color: #191a21;
  --dv-activegroup-visiblepanel-tab-background-color: #282a36;
  --dv-activegroup-hiddenpanel-tab-background-color: #21222c;
  --dv-inactivegroup-visiblepanel-tab-background-color: #282a36;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #21222c;
  --dv-tab-divider-color: #191a21;
  --dv-activegroup-visiblepanel-tab-color: rgb(248, 248, 242);
  --dv-activegroup-hiddenpanel-tab-color: rgb(98, 114, 164);
  --dv-inactivegroup-visiblepanel-tab-color: rgba(248, 248, 242, 0.5);
  --dv-inactivegroup-hiddenpanel-tab-color: rgba(98, 114, 164, 0.5);
  --dv-separator-border: #bd93f9;
  --dv-paneview-header-border-color: #bd93f9;
  --dv-paneview-active-outline-color: #6272a4;
}
.dockview-theme-dracula .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}
.dockview-theme-dracula .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  position: relative;
}
.dockview-theme-dracula .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab::after {
  position: absolute;
  left: 0px;
  top: 0px;
  content: "";
  width: 100%;
  height: 1px;
  background-color: #94527e;
  z-index: 999;
}
.dockview-theme-dracula .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  position: relative;
}
.dockview-theme-dracula .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab::after {
  position: absolute;
  left: 0px;
  bottom: 0px;
  content: "";
  width: 100%;
  height: 1px;
  background-color: #5e3d5a;
  z-index: 999;
}

.dockview-theme-replit {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  box-sizing: border-box;
  padding: 10px;
  background-color: #ebeced;
  --dv-group-view-background-color: #ebeced;
  --dv-tabs-and-actions-container-background-color: #fcfcfc;
  --dv-activegroup-visiblepanel-tab-background-color: #f0f1f2;
  --dv-activegroup-hiddenpanel-tab-background-color: #fcfcfc;
  --dv-inactivegroup-visiblepanel-tab-background-color: #f0f1f2;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #fcfcfc;
  --dv-tab-divider-color: transparent;
  --dv-activegroup-visiblepanel-tab-color: rgb(51, 51, 51);
  --dv-activegroup-hiddenpanel-tab-color: rgb(51, 51, 51);
  --dv-inactivegroup-visiblepanel-tab-color: rgb(51, 51, 51);
  --dv-inactivegroup-hiddenpanel-tab-color: rgb(51, 51, 51);
  --dv-separator-border: transparent;
  --dv-paneview-header-border-color: rgb(51, 51, 51);
  --dv-sash-color: #cfd1d3;
  --dv-active-sash-color: #babbbb;
}
.dockview-theme-replit .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}
.dockview-theme-replit .dv-resize-container:has(> .dv-groupview) {
  border-radius: 8px;
}
.dockview-theme-replit .dv-resize-container {
  border-radius: 10px !important;
  border: none;
}
.dockview-theme-replit .dv-groupview {
  overflow: hidden;
  border-radius: 10px;
}
.dockview-theme-replit .dv-groupview .dv-tabs-and-actions-container {
  border-bottom: 1px solid rgba(128, 128, 128, 0.35);
}
.dockview-theme-replit .dv-groupview .dv-tabs-and-actions-container .dv-tab {
  margin: 4px;
  border-radius: 8px;
}
.dockview-theme-replit .dv-groupview .dv-tabs-and-actions-container .dv-tab .dv-svg {
  height: 8px;
  width: 8px;
}
.dockview-theme-replit .dv-groupview .dv-tabs-and-actions-container .dv-tab:hover {
  background-color: #e4e5e6 !important;
}
.dockview-theme-replit .dv-groupview .dv-content-container {
  background-color: #fcfcfc;
}
.dockview-theme-replit .dv-groupview.dv-active-group {
  border: 1px solid rgba(128, 128, 128, 0.35);
}
.dockview-theme-replit .dv-groupview.dv-inactive-group {
  border: 1px solid transparent;
}
.dockview-theme-replit .dv-vertical > .dv-sash-container > .dv-sash {
  background-color: transparent;
}
.dockview-theme-replit .dv-vertical > .dv-sash-container > .dv-sash:not(.disabled)::after {
  content: "";
  height: 4px;
  width: 40px;
  border-radius: 2px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--dv-sash-color);
  position: absolute;
}
.dockview-theme-replit .dv-vertical > .dv-sash-container > .dv-sash:not(.disabled):hover, .dockview-theme-replit .dv-vertical > .dv-sash-container > .dv-sash:not(.disabled):active {
  background-color: transparent;
}
.dockview-theme-replit .dv-vertical > .dv-sash-container > .dv-sash:not(.disabled):hover::after, .dockview-theme-replit .dv-vertical > .dv-sash-container > .dv-sash:not(.disabled):active::after {
  background-color: var(--dv-active-sash-color);
}
.dockview-theme-replit .dv-horizontal > .dv-sash-container > .dv-sash {
  background-color: transparent;
}
.dockview-theme-replit .dv-horizontal > .dv-sash-container > .dv-sash:not(.disabled)::after {
  content: "";
  height: 40px;
  width: 4px;
  border-radius: 2px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--dv-sash-color);
  position: absolute;
}
.dockview-theme-replit .dv-horizontal > .dv-sash-container > .dv-sash:not(.disabled):hover, .dockview-theme-replit .dv-horizontal > .dv-sash-container > .dv-sash:not(.disabled):active {
  background-color: transparent;
}
.dockview-theme-replit .dv-horizontal > .dv-sash-container > .dv-sash:not(.disabled):hover::after, .dockview-theme-replit .dv-horizontal > .dv-sash-container > .dv-sash:not(.disabled):active::after {
  background-color: var(--dv-active-sash-color);
}

.dockview-theme-abyss-spaced {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-tab-font-size: 12px;
  --dv-border-radius: 20px;
  --dv-tab-margin: 0.5rem 0.25rem;
  --dv-tabs-and-actions-container-height: 44px;
  --dv-border-radius: 20px;
  box-sizing: border-box;
  --dv-color-abyss-dark: rgb(11, 6, 17);
  --dv-color-abyss: #16121f;
  --dv-color-abyss-light: #201d2b;
  --dv-color-abyss-lighter: #2a2837;
  --dv-color-abyss-accent: rgb(91, 30, 207);
  --dv-color-abyss-primary-text: white;
  --dv-color-abyss-secondary-text: rgb(148, 151, 169);
  --dv-drag-over-border: 2px solid var(--dv-color-abyss-accent);
  --dv-drag-over-background-color: "";
  --dv-group-view-background-color: var(--dv-color-abyss-dark);
  --dv-tabs-and-actions-container-background-color: var(--dv-color-abyss);
  --dv-activegroup-visiblepanel-tab-background-color: var(
      --dv-color-abyss-lighter
  );
  --dv-activegroup-hiddenpanel-tab-background-color: var(
      --dv-color-abyss-light
  );
  --dv-inactivegroup-visiblepanel-tab-background-color: var(
      --dv-color-abyss-lighter
  );
  --dv-inactivegroup-hiddenpanel-tab-background-color: var(
      --dv-color-abyss-light
  );
  --dv-tab-divider-color: transparent;
  --dv-activegroup-visiblepanel-tab-color: var(--dv-color-abyss-primary-text);
  --dv-activegroup-hiddenpanel-tab-color: var(
      --dv-color-abyss-secondary-text
  );
  --dv-inactivegroup-visiblepanel-tab-color: var(
      --dv-color-abyss-primary-text
  );
  --dv-inactivegroup-hiddenpanel-tab-color: var(
      --dv-color-abyss-secondary-text
  );
  --dv-separator-border: transparent;
  --dv-paneview-header-border-color: rgb(51, 51, 51);
  --dv-active-sash-color: var(--dv-color-abyss-accent);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(0, 0, 0, 0.5);
  padding: 10px;
  background-color: var(--dv-color-abyss-dark);
}
.dockview-theme-abyss-spaced .dv-resize-container:has(> .dv-groupview) {
  border-radius: 8px;
}
.dockview-theme-abyss-spaced .dv-sash {
  border-radius: 4px;
}
.dockview-theme-abyss-spaced .dv-drop-target-anchor {
  border-radius: calc(var(--dv-border-radius) / 4);
}
.dockview-theme-abyss-spaced .dv-drop-target-anchor.dv-drop-target-content {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-abyss-spaced .dv-resize-container {
  border-radius: var(--dv-border-radius) !important;
  border: none;
}
.dockview-theme-abyss-spaced .dv-tabs-overflow-container,
.dockview-theme-abyss-spaced .dv-tabs-overflow-dropdown-default {
  border-radius: 8px;
  height: unset !important;
}
.dockview-theme-abyss-spaced .dv-tab {
  border-radius: 8px;
}
.dockview-theme-abyss-spaced .dv-tab .dv-svg {
  height: 8px;
  width: 8px;
}
.dockview-theme-abyss-spaced .dv-groupview {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-abyss-spaced .dv-groupview .dv-tabs-and-actions-container {
  padding: 0px calc(var(--dv-border-radius) / 2);
}
.dockview-theme-abyss-spaced .dv-groupview .dv-content-container {
  background-color: var(--dv-tabs-and-actions-container-background-color);
}
.dockview-theme-abyss-spaced .dv-resize-container .dv-groupview {
  border: 2px solid var(--dv-color-abyss-dark);
}

.dockview-theme-light-spaced {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-tab-font-size: 12px;
  --dv-border-radius: 20px;
  --dv-tab-margin: 0.5rem 0.25rem;
  --dv-tabs-and-actions-container-height: 44px;
  --dv-border-radius: 20px;
  box-sizing: border-box;
  --dv-drag-over-border: 2px solid rgb(91, 30, 207);
  --dv-drag-over-background-color: "";
  --dv-group-view-background-color: #f6f5f9;
  --dv-tabs-and-actions-container-background-color: white;
  --dv-activegroup-visiblepanel-tab-background-color: #ededf0;
  --dv-activegroup-hiddenpanel-tab-background-color: #f9f9fa;
  --dv-inactivegroup-visiblepanel-tab-background-color: #ededf0;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #f9f9fa;
  --dv-tab-divider-color: transparent;
  --dv-activegroup-visiblepanel-tab-color: rgb(104, 107, 130);
  --dv-activegroup-hiddenpanel-tab-color: rgb(148, 151, 169);
  --dv-inactivegroup-visiblepanel-tab-color: rgb(104, 107, 130);
  --dv-inactivegroup-hiddenpanel-tab-color: rgb(148, 151, 169);
  --dv-separator-border: transparent;
  --dv-paneview-header-border-color: rgb(51, 51, 51);
  --dv-active-sash-color: rgb(91, 30, 207);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(0, 0, 0, 0.1);
  padding: 10px;
  background-color: #f6f5f9;
  --dv-scrollbar-background-color: rgba(0, 0, 0, 0.25);
}
.dockview-theme-light-spaced .dv-resize-container:has(> .dv-groupview) {
  border-radius: 8px;
}
.dockview-theme-light-spaced .dv-sash {
  border-radius: 4px;
}
.dockview-theme-light-spaced .dv-drop-target-anchor {
  border-radius: calc(var(--dv-border-radius) / 4);
}
.dockview-theme-light-spaced .dv-drop-target-anchor.dv-drop-target-content {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-light-spaced .dv-resize-container {
  border-radius: var(--dv-border-radius) !important;
  border: none;
}
.dockview-theme-light-spaced .dv-tabs-overflow-container,
.dockview-theme-light-spaced .dv-tabs-overflow-dropdown-default {
  border-radius: 8px;
  height: unset !important;
}
.dockview-theme-light-spaced .dv-tab {
  border-radius: 8px;
}
.dockview-theme-light-spaced .dv-tab .dv-svg {
  height: 8px;
  width: 8px;
}
.dockview-theme-light-spaced .dv-groupview {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-light-spaced .dv-groupview .dv-tabs-and-actions-container {
  padding: 0px calc(var(--dv-border-radius) / 2);
}
.dockview-theme-light-spaced .dv-groupview .dv-content-container {
  background-color: var(--dv-tabs-and-actions-container-background-color);
}
.dockview-theme-light-spaced .dv-resize-container .dv-groupview {
  border: 2px solid rgba(255, 255, 255, 0.1);
}
.dv-drop-target-container {
  position: absolute;
  z-index: 9999;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  pointer-events: none;
  overflow: hidden;
  --dv-transition-duration: 300ms;
}
.dv-drop-target-container .dv-drop-target-anchor {
  position: relative;
  border: var(--dv-drag-over-border);
  background-color: var(--dv-drag-over-background-color);
  opacity: 1;
  /* GPU optimizations */
  will-change: transform, opacity;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  contain: layout paint;
  transition: opacity var(--dv-transition-duration) ease-in, top var(--dv-transition-duration) ease-out, left var(--dv-transition-duration) ease-out, width var(--dv-transition-duration) ease-out, height var(--dv-transition-duration) ease-out;
}
.dv-drop-target {
  position: relative;
  --dv-transition-duration: 70ms;
}
.dv-drop-target > .dv-drop-target-dropzone {
  position: absolute;
  left: 0px;
  top: 0px;
  height: 100%;
  width: 100%;
  z-index: 1000;
  pointer-events: none;
}
.dv-drop-target > .dv-drop-target-dropzone > .dv-drop-target-selection {
  position: relative;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  border: var(--dv-drag-over-border);
  background-color: var(--dv-drag-over-background-color);
  transition: top var(--dv-transition-duration) ease-out, left var(--dv-transition-duration) ease-out, width var(--dv-transition-duration) ease-out, height var(--dv-transition-duration) ease-out, opacity var(--dv-transition-duration) ease-out;
  will-change: transform;
  pointer-events: none;
}
.dv-drop-target > .dv-drop-target-dropzone > .dv-drop-target-selection.dv-drop-target-top.dv-drop-target-small-vertical {
  border-top: 1px solid var(--dv-drag-over-border-color);
}
.dv-drop-target > .dv-drop-target-dropzone > .dv-drop-target-selection.dv-drop-target-bottom.dv-drop-target-small-vertical {
  border-bottom: 1px solid var(--dv-drag-over-border-color);
}
.dv-drop-target > .dv-drop-target-dropzone > .dv-drop-target-selection.dv-drop-target-left.dv-drop-target-small-horizontal {
  border-left: 1px solid var(--dv-drag-over-border-color);
}
.dv-drop-target > .dv-drop-target-dropzone > .dv-drop-target-selection.dv-drop-target-right.dv-drop-target-small-horizontal {
  border-right: 1px solid var(--dv-drag-over-border-color);
}
.dv-dockview {
  position: relative;
  background-color: var(--dv-group-view-background-color);
  contain: layout;
}
.dv-dockview .dv-watermark-container {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  z-index: 1;
}
.dv-dockview .dv-overlay-render-container {
  position: relative;
}

.dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  background-color: var(--dv-activegroup-visiblepanel-tab-background-color);
  color: var(--dv-activegroup-visiblepanel-tab-color);
}
.dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-inactive-tab {
  background-color: var(--dv-activegroup-hiddenpanel-tab-background-color);
  color: var(--dv-activegroup-hiddenpanel-tab-color);
}
.dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  background-color: var(--dv-inactivegroup-visiblepanel-tab-background-color);
  color: var(--dv-inactivegroup-visiblepanel-tab-color);
}
.dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-inactive-tab {
  background-color: var(--dv-inactivegroup-hiddenpanel-tab-background-color);
  color: var(--dv-inactivegroup-hiddenpanel-tab-color);
}

/**
 * when a tab is dragged we lose the above stylings because they are conditional on parent elements
 * therefore we also set some stylings for the dragging event
 **/
.dv-tab.dv-tab-dragging {
  background-color: var(--dv-activegroup-visiblepanel-tab-background-color);
  color: var(--dv-activegroup-visiblepanel-tab-color);
}
.dv-groupview {
  display: flex;
  height: 100%;
  background-color: var(--dv-group-view-background-color);
  overflow: hidden;
  flex-direction: column;
}
.dv-groupview:focus {
  outline: none;
}
.dv-groupview > .dv-content-container {
  flex-grow: 1;
  min-height: 0;
  outline: none;
}
.dv-groupview.dv-groupview-header-bottom {
  flex-direction: column-reverse;
}
.dv-groupview.dv-groupview-header-left {
  flex-direction: row;
}
.dv-groupview.dv-groupview-header-right {
  flex-direction: row-reverse;
}
.dv-root-wrapper {
  height: 100%;
  width: 100%;
}
.dv-grid-view,
.dv-branch-node {
  height: 100%;
  width: 100%;
}
.dv-debug .dv-resize-container .dv-resize-handle-top {
  background-color: red;
}
.dv-debug .dv-resize-container .dv-resize-handle-bottom {
  background-color: green;
}
.dv-debug .dv-resize-container .dv-resize-handle-left {
  background-color: yellow;
}
.dv-debug .dv-resize-container .dv-resize-handle-right {
  background-color: blue;
}
.dv-debug .dv-resize-container .dv-resize-handle-topleft,
.dv-debug .dv-resize-container .dv-resize-handle-topright,
.dv-debug .dv-resize-container .dv-resize-handle-bottomleft,
.dv-debug .dv-resize-container .dv-resize-handle-bottomright {
  background-color: cyan;
}

.dv-resize-container {
  --dv-overlay-z-index: var(--dv-overlay-z-index, 999);
  position: absolute;
  z-index: calc(var(--dv-overlay-z-index) - 2);
  border: 1px solid var(--dv-tab-divider-color);
  box-shadow: var(--dv-floating-box-shadow);
  /* GPU optimizations for floating group movement */
  will-change: transform, opacity;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}
.dv-resize-container.dv-hidden {
  display: none;
}
.dv-resize-container.dv-resize-container-dragging {
  opacity: 0.5;
  /* Enhanced GPU acceleration during drag */
  will-change: transform, opacity;
}
.dv-resize-container .dv-resize-handle-top {
  height: 4px;
  width: calc(100% - 8px);
  left: 4px;
  top: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: ns-resize;
}
.dv-resize-container .dv-resize-handle-bottom {
  height: 4px;
  width: calc(100% - 8px);
  left: 4px;
  bottom: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: ns-resize;
}
.dv-resize-container .dv-resize-handle-left {
  height: calc(100% - 8px);
  width: 4px;
  left: -2px;
  top: 4px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: ew-resize;
}
.dv-resize-container .dv-resize-handle-right {
  height: calc(100% - 8px);
  width: 4px;
  right: -2px;
  top: 4px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: ew-resize;
}
.dv-resize-container .dv-resize-handle-topleft {
  height: 4px;
  width: 4px;
  top: -2px;
  left: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: nw-resize;
}
.dv-resize-container .dv-resize-handle-topright {
  height: 4px;
  width: 4px;
  right: -2px;
  top: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: ne-resize;
}
.dv-resize-container .dv-resize-handle-bottomleft {
  height: 4px;
  width: 4px;
  left: -2px;
  bottom: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: sw-resize;
}
.dv-resize-container .dv-resize-handle-bottomright {
  height: 4px;
  width: 4px;
  right: -2px;
  bottom: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: se-resize;
}
.dv-render-overlay {
  --dv-overlay-z-index: var(--dv-overlay-z-index, 999);
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  contain: layout paint;
  isolation: isolate;
  /* GPU optimizations */
  will-change: transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}
.dv-render-overlay.dv-render-overlay-float {
  z-index: calc(var(--dv-overlay-z-index) - 1);
}

.dv-debug .dv-render-overlay {
  outline: 1px solid red;
  outline-offset: -1;
}
.dv-pane-container {
  height: 100%;
  width: 100%;
}
.dv-pane-container.dv-animated .dv-view {
  /* GPU optimizations for smooth pane animations */
  will-change: transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  transition: transform 0.15s ease-out;
}
.dv-pane-container .dv-view {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 0px !important;
}
.dv-pane-container .dv-view:not(:first-child)::before {
  background-color: transparent !important;
}
.dv-pane-container .dv-view:not(:first-child) .dv-pane > .dv-pane-header {
  border-top: 1px solid var(--dv-paneview-header-border-color);
}
.dv-pane-container .dv-view .dv-default-header {
  background-color: var(--dv-group-view-background-color);
  color: var(--dv-activegroup-visiblepanel-tab-color);
  display: flex;
  padding: 0px 8px;
  cursor: pointer;
}
.dv-pane-container .dv-view .dv-default-header .dv-pane-header-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}
.dv-pane-container .dv-view .dv-default-header > span {
  padding-left: 8px;
  flex-grow: 1;
}
.dv-pane-container:first-of-type > .dv-pane > .dv-pane-header {
  border-top: none !important;
}
.dv-pane-container .dv-pane {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
}
.dv-pane-container .dv-pane .dv-pane-header {
  box-sizing: border-box;
  user-select: none;
  position: relative;
  outline: none;
}
.dv-pane-container .dv-pane .dv-pane-header.dv-pane-draggable {
  cursor: pointer;
}
.dv-pane-container .dv-pane .dv-pane-header:focus:before, .dv-pane-container .dv-pane .dv-pane-header:focus-within:before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  content: "";
  pointer-events: none;
  outline: 1px solid;
  outline-width: -1px;
  outline-style: solid;
  outline-offset: -1px;
  outline-color: var(--dv-paneview-active-outline-color);
}
.dv-pane-container .dv-pane .dv-pane-body {
  overflow-y: auto;
  overflow-x: hidden;
  flex-grow: 1;
  position: relative;
  outline: none;
}
.dv-pane-container .dv-pane .dv-pane-body:focus:before, .dv-pane-container .dv-pane .dv-pane-body:focus-within:before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  content: "";
  pointer-events: none;
  outline: 1px solid;
  outline-width: -1px;
  outline-style: solid;
  outline-offset: -1px;
  outline-color: var(--dv-paneview-active-outline-color);
}
.dv-debug .dv-split-view-container .dv-sash-container .dv-sash.dv-enabled {
  background-color: black;
}
.dv-debug .dv-split-view-container .dv-sash-container .dv-sash.dv-disabled {
  background-color: orange;
}
.dv-debug .dv-split-view-container .dv-sash-container .dv-sash.dv-maximum {
  background-color: green;
}
.dv-debug .dv-split-view-container .dv-sash-container .dv-sash.dv-minimum {
  background-color: red;
}

.dv-split-view-container {
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
}
.dv-split-view-container.dv-splitview-disabled > .dv-sash-container > .dv-sash {
  pointer-events: none;
}
.dv-split-view-container.dv-animation .dv-view,
.dv-split-view-container.dv-animation .dv-sash {
  /* GPU optimizations for smooth animations */
  will-change: transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  transition: transform 0.15s ease-out;
}
.dv-split-view-container.dv-horizontal {
  height: 100%;
}
.dv-split-view-container.dv-horizontal > .dv-sash-container > .dv-sash {
  height: 100%;
  width: 4px;
}
.dv-split-view-container.dv-horizontal > .dv-sash-container > .dv-sash.dv-enabled {
  cursor: ew-resize;
}
.dv-split-view-container.dv-horizontal > .dv-sash-container > .dv-sash.dv-disabled {
  cursor: default;
}
.dv-split-view-container.dv-horizontal > .dv-sash-container > .dv-sash.dv-maximum {
  cursor: w-resize;
}
.dv-split-view-container.dv-horizontal > .dv-sash-container > .dv-sash.dv-minimum {
  cursor: e-resize;
}
.dv-split-view-container.dv-horizontal > .dv-view-container > .dv-view:not(:first-child)::before {
  height: 100%;
  width: 1px;
}
.dv-split-view-container.dv-vertical {
  width: 100%;
}
.dv-split-view-container.dv-vertical > .dv-sash-container > .dv-sash {
  width: 100%;
  height: 4px;
}
.dv-split-view-container.dv-vertical > .dv-sash-container > .dv-sash.dv-enabled {
  cursor: ns-resize;
}
.dv-split-view-container.dv-vertical > .dv-sash-container > .dv-sash.dv-disabled {
  cursor: default;
}
.dv-split-view-container.dv-vertical > .dv-sash-container > .dv-sash.dv-maximum {
  cursor: n-resize;
}
.dv-split-view-container.dv-vertical > .dv-sash-container > .dv-sash.dv-minimum {
  cursor: s-resize;
}
.dv-split-view-container.dv-vertical > .dv-view-container > .dv-view {
  width: 100%;
}
.dv-split-view-container.dv-vertical > .dv-view-container > .dv-view:not(:first-child)::before {
  height: 1px;
  width: 100%;
}
.dv-split-view-container .dv-sash-container {
  height: 100%;
  width: 100%;
  position: absolute;
}
.dv-split-view-container .dv-sash-container .dv-sash {
  position: absolute;
  z-index: 99;
  outline: none;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  touch-action: none;
  background-color: var(--dv-sash-color, transparent);
}
.dv-split-view-container .dv-sash-container .dv-sash:not(.disabled):active, .dv-split-view-container .dv-sash-container .dv-sash:not(.disabled):hover {
  background-color: var(--dv-active-sash-color, transparent);
  transition-property: background-color;
  transition-timing-function: ease-in-out;
  transition-duration: var(--dv-active-sash-transition-duration, 0.1s);
  transition-delay: var(--dv-active-sash-transition-delay, 0.5s);
}
.dv-split-view-container .dv-view-container {
  position: relative;
  height: 100%;
  width: 100%;
}
.dv-split-view-container .dv-view-container .dv-view {
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  position: absolute;
}
.dv-split-view-container.dv-separator-border .dv-view:not(:first-child)::before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  pointer-events: none;
  background-color: var(--dv-separator-border);
}
.dv-dragged {
  transform: translate3d(0px, 0px, 0px); /* forces tab to be drawn on a separate layer (see https://github.com/microsoft/vscode/issues/18733) */
}

.dv-tab {
  flex-shrink: 0;
}
.dv-tab:focus-within, .dv-tab:focus {
  position: relative;
}
.dv-tab:focus-within::after, .dv-tab:focus::after {
  position: absolute;
  content: "";
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  pointer-events: none;
  outline: 1px solid var(--dv-tab-divider-color) !important;
  outline-offset: -1px;
  z-index: 5;
}
.dv-tab.dv-tab-dragging .dv-default-tab-action {
  background-color: var(--dv-activegroup-visiblepanel-tab-color);
}
.dv-tab.dv-active-tab .dv-default-tab .dv-default-tab-action {
  visibility: visible;
}
.dv-tab.dv-inactive-tab .dv-default-tab .dv-default-tab-action {
  visibility: hidden;
}
.dv-tab.dv-inactive-tab .dv-default-tab:hover .dv-default-tab-action {
  visibility: visible;
}
.dv-tab .dv-default-tab {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.dv-tab .dv-default-tab .dv-default-tab-content {
  flex-grow: 1;
  margin-right: 4px;
}
.dv-tab .dv-default-tab .dv-default-tab-action {
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}
.dv-tab .dv-default-tab .dv-default-tab-action:hover {
  border-radius: 2px;
  background-color: var(--dv-icon-hover-background-color);
}
.dv-tabs-overflow-dropdown-default {
  height: 100%;
  color: var(--dv-activegroup-hiddenpanel-tab-color);
  margin: var(--dv-tab-margin);
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
}
.dv-tabs-overflow-dropdown-default > span {
  padding-left: 0.25rem;
}
.dv-tabs-overflow-dropdown-default > svg {
  transform: rotate(90deg);
}
.dv-tabs-overflow-dropdown-default:hover {
  border-radius: 2px;
  background-color: var(--dv-icon-hover-background-color);
}
.dv-tabs-container {
  display: flex;
  height: 100%;
  overflow: auto;
  scrollbar-width: thin;
  /* GPU optimizations for smooth scrolling */
  will-change: scroll-position;
  transform: translate3d(0, 0, 0);
  /* Track */
  /* Handle */
}
.dv-tabs-container.dv-tabs-container-vertical {
  width: 100%;
  height: fit-content;
  max-height: 100%;
  writing-mode: vertical-rl;
}
.dv-tabs-container.dv-horizontal .dv-tab:not(:first-child)::before, .dv-tabs-container.dv-vertical .dv-tab:not(:first-child)::before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  pointer-events: none;
  background-color: var(--dv-tab-divider-color);
}
.dv-tabs-container.dv-horizontal .dv-tab:not(:first-child)::before {
  width: 1px;
  height: 100%;
}
.dv-tabs-container.dv-vertical .dv-tab:not(:first-child)::before {
  width: 100%;
  height: 1px;
}
.dv-tabs-container::-webkit-scrollbar {
  height: 3px;
}
.dv-tabs-container::-webkit-scrollbar-track {
  background: transparent;
}
.dv-tabs-container::-webkit-scrollbar-thumb {
  background: var(--dv-tabs-container-scrollbar-color);
}

.dv-scrollable > .dv-tabs-container {
  overflow: hidden;
}

.dv-tab {
  -webkit-user-drag: element;
  outline: none;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  font-size: var(--dv-tab-font-size);
  margin: var(--dv-tab-margin);
}
.dv-tab.dv-tab--shifting {
  will-change: margin-left;
  transition: transform var(--dv-transition-duration, 200ms) ease-out, margin-left var(--dv-transition-duration, 200ms) ease-out;
}
.dv-tab.dv-tab--dragging {
  width: 0 !important;
  min-width: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
  transition: width var(--dv-transition-duration, 200ms) ease-out, padding var(--dv-transition-duration, 200ms) ease-out, margin var(--dv-transition-duration, 200ms) ease-out, opacity var(--dv-transition-duration, 200ms) ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .dv-tab {
    transition: none !important;
  }
}
.dv-tabs-container-vertical .dv-tab {
  padding: 0.5rem 0.25rem;
}

.dv-tabs-overflow-container {
  flex-direction: column;
  height: unset;
  font-size: var(--dv-tabs-and-actions-container-font-size);
  max-height: min(50vh, 400px);
  overflow-y: auto;
  border: 1px solid var(--dv-tab-divider-color);
  background-color: var(--dv-group-view-background-color);
  /* Scrollbar styling for webkit browsers */
  /* Firefox scrollbar */
  scrollbar-width: thin;
}
.dv-tabs-overflow-container::-webkit-scrollbar {
  width: 6px;
}
.dv-tabs-overflow-container::-webkit-scrollbar-track {
  background: transparent;
}
.dv-tabs-overflow-container::-webkit-scrollbar-thumb {
  background: var(--dv-tabs-container-scrollbar-color);
  border-radius: 3px;
}
.dv-tabs-overflow-container .dv-tab:not(:last-child) {
  border-bottom: 1px solid var(--dv-tab-divider-color);
}
.dv-tabs-overflow-container .dv-active-tab {
  background-color: var(--dv-activegroup-visiblepanel-tab-background-color);
  color: var(--dv-activegroup-visiblepanel-tab-color);
}
.dv-tabs-overflow-container .dv-inactive-tab {
  background-color: var(--dv-activegroup-hiddenpanel-tab-background-color);
  color: var(--dv-activegroup-hiddenpanel-tab-color);
}
.dv-tabs-and-actions-container {
  display: flex;
  background-color: var(--dv-tabs-and-actions-container-background-color);
  flex-shrink: 0;
  box-sizing: border-box;
  height: var(--dv-tabs-and-actions-container-height);
  font-size: var(--dv-tabs-and-actions-container-font-size);
}
.dv-tabs-and-actions-container.dv-single-tab.dv-full-width-single-tab .dv-scrollable {
  flex-grow: 1;
}
.dv-tabs-and-actions-container.dv-single-tab.dv-full-width-single-tab .dv-tabs-container {
  flex-grow: 1;
}
.dv-tabs-and-actions-container.dv-single-tab.dv-full-width-single-tab .dv-tabs-container .dv-tab {
  flex-grow: 1;
  padding: 0px;
}
.dv-tabs-and-actions-container.dv-single-tab.dv-full-width-single-tab .dv-void-container {
  flex-grow: 0;
}
.dv-tabs-and-actions-container .dv-void-container {
  display: flex;
  flex-grow: 1;
}
.dv-tabs-and-actions-container .dv-void-container.dv-draggable {
  cursor: grab;
}
.dv-tabs-and-actions-container .dv-right-actions-container {
  display: flex;
}
.dv-tabs-and-actions-container .dv-right-actions-container.dv-right-actions-container-vertical {
  flex-direction: column;
}
.dv-tabs-and-actions-container.dv-groupview-header-vertical {
  flex-direction: column;
  height: auto;
  width: var(--dv-tabs-and-actions-container-height);
}
.dv-watermark {
  display: flex;
  height: 100%;
}`;ci(hi);class Vt{}class be extends Vt{constructor(e,t,i){super(),this.viewId=e,this.groupId=t,this.panelId=i}}class ke extends Vt{constructor(e,t){super(),this.viewId=e,this.paneId=t}}class ue{constructor(){}static getInstance(){return ue.INSTANCE}hasData(e){return e&&e===this.proto}clearData(e){this.hasData(e)&&(this.proto=void 0,this.data=void 0)}getData(e){if(this.hasData(e))return this.data}setData(e,t){t&&(this.data=e,this.proto=t)}}ue.INSTANCE=new ue;function ee(){const r=ue.getInstance();if(r.hasData(be.prototype))return r.getData(be.prototype)[0]}function ze(){const r=ue.getInstance();if(r.hasData(ke.prototype))return r.getData(ke.prototype)[0]}var we;(function(r){r.any=(...e)=>t=>{const i=e.map(n=>n(t));return{dispose:()=>{i.forEach(n=>{n.dispose()})}}}})(we||(we={}));class it{constructor(){this._defaultPrevented=!1}get defaultPrevented(){return this._defaultPrevented}preventDefault(){this._defaultPrevented=!0}}class Lt{constructor(){this._isAccepted=!1}get isAccepted(){return this._isAccepted}accept(){this._isAccepted=!0}}class vi{constructor(){this.events=new Map}get size(){return this.events.size}add(e,t){this.events.set(e,t)}delete(e){this.events.delete(e)}clear(){this.events.clear()}}class Te{static create(){var e;return new Te((e=new Error().stack)!==null&&e!==void 0?e:"")}constructor(e){this.value=e}print(){console.warn("dockview: stacktrace",this.value)}}class pi{constructor(e,t){this.callback=e,this.stacktrace=t}}class p{static setLeakageMonitorEnabled(e){e!==p.ENABLE_TRACKING&&p.MEMORY_LEAK_WATCHER.clear(),p.ENABLE_TRACKING=e}get value(){return this._last}constructor(e){this.options=e,this._listeners=[],this._disposed=!1}get event(){return this._event||(this._event=e=>{var t;!((t=this.options)===null||t===void 0)&&t.replay&&this._last!==void 0&&e(this._last);const i=new pi(e,p.ENABLE_TRACKING?Te.create():void 0);return this._listeners.push(i),{dispose:()=>{const n=this._listeners.indexOf(i);n>-1&&this._listeners.splice(n,1)}}},p.ENABLE_TRACKING&&p.MEMORY_LEAK_WATCHER.add(this._event,Te.create())),this._event}fire(e){var t;!((t=this.options)===null||t===void 0)&&t.replay&&(this._last=e);for(const i of this._listeners)i.callback(e)}dispose(){this._disposed||(this._disposed=!0,this._listeners.length>0&&(p.ENABLE_TRACKING&&queueMicrotask(()=>{var e;for(const t of this._listeners)console.warn("dockview: stacktrace",(e=t.stacktrace)===null||e===void 0?void 0:e.print())}),this._listeners=[]),p.ENABLE_TRACKING&&this._event&&p.MEMORY_LEAK_WATCHER.delete(this._event))}}p.ENABLE_TRACKING=!1;p.MEMORY_LEAK_WATCHER=new vi;function E(r,e,t,i){return r.addEventListener(e,t,i),{dispose:()=>{r.removeEventListener(e,t,i)}}}class gt{constructor(){this._onFired=new p,this._currentFireCount=0,this._queued=!1,this.onEvent=e=>{const t=this._currentFireCount;return this._onFired.event(()=>{this._currentFireCount>t&&e()})}}fire(){this._currentFireCount++,!this._queued&&(this._queued=!0,queueMicrotask(()=>{this._queued=!1,this._onFired.fire()}))}dispose(){this._onFired.dispose()}}var X;(function(r){r.NONE={dispose:()=>{}};function e(t){return{dispose:()=>{t()}}}r.from=e})(X||(X={}));class A{get isDisposed(){return this._isDisposed}constructor(...e){this._isDisposed=!1,this._disposables=new Set(e)}addDisposables(...e){e.forEach(t=>this._disposables.add(t))}removeDisposable(e){this._disposables.delete(e)}dispose(){this._isDisposed||(this._isDisposed=!0,this._disposables.forEach(e=>e.dispose()),this._disposables.clear())}}class K{constructor(){this._disposable=X.NONE}set value(e){this._disposable&&this._disposable.dispose(),this._disposable=e}dispose(){this._disposable&&(this._disposable.dispose(),this._disposable=X.NONE)}}class ui extends A{constructor(e){super(),this._onDidChange=new p,this.onDidChange=this._onDidChange.event,this._value=null,this.addDisposables(this._onDidChange,Le(e,t=>{const i=t.target.scrollWidth>t.target.clientWidth,n=t.target.scrollHeight>t.target.clientHeight;this._value={hasScrollX:i,hasScrollY:n},this._onDidChange.fire(this._value)}))}}function Le(r,e){const t=new ResizeObserver(i=>{requestAnimationFrame(()=>{const n=i[0];e(n)})});return t.observe(r),{dispose:()=>{t.unobserve(r),t.disconnect()}}}const de=(r,...e)=>{for(const t of e)r.classList.contains(t)&&r.classList.remove(t)},le=(r,...e)=>{for(const t of e)r.classList.contains(t)||r.classList.add(t)},y=(r,e,t)=>{const i=r.classList.contains(e);t&&!i&&r.classList.add(e),!t&&i&&r.classList.remove(e)};function Ye(r,e){for(;r;){if(r===e)return!0;r=r.parentNode}return!1}function Mt(r){return new gi(r)}class gi extends A{constructor(e){super(),this._onDidFocus=new p,this.onDidFocus=this._onDidFocus.event,this._onDidBlur=new p,this.onDidBlur=this._onDidBlur.event,this.addDisposables(this._onDidFocus,this._onDidBlur);let t=Ye(document.activeElement,e),i=!1;const n=()=>{i=!1,t||(t=!0,this._onDidFocus.fire())},o=()=>{t&&(i=!0,window.setTimeout(()=>{i&&(i=!1,t=!1,this._onDidBlur.fire())},0))};this._refreshStateHandler=()=>{Ye(document.activeElement,e)!==t&&(t?o():n())},this.addDisposables(E(e,"focus",n,!0)),this.addDisposables(E(e,"blur",o,!0))}refreshState(){this._refreshStateHandler()}}const Ht="dv-quasiPreventDefault";function mi(r){r[Ht]=!0}function mt(r){return r[Ht]}function bi(r,e){const t=Array.from(e);for(const i of t){if(i.href){const o=r.createElement("link");o.href=i.href,o.type=i.type,o.rel="stylesheet",r.head.appendChild(o)}let n=[];try{i.cssRules&&(n=Array.from(i.cssRules).map(o=>o.cssText))}catch{}for(const o of n){const a=r.createElement("style");a.appendChild(r.createTextNode(o)),r.head.appendChild(a)}}}function Je(r){const{left:e,top:t,width:i,height:n}=r.getBoundingClientRect();return{left:e+window.scrollX,top:t+window.scrollY,width:i,height:n}}function fi(r){let e=r;for(;e!=null&&e.parentNode;){if(e.parentNode===document)return!0;e.parentNode instanceof DocumentFragment?e=e.parentNode.host:e=e.parentNode}return!1}function wi(r,e){r.setAttribute("data-testid",e)}function _i(r){const e=[];function t(i){if(i.nodeType===Node.ELEMENT_NODE){r.includes(i.tagName)&&e.push(i),i.shadowRoot&&t(i.shadowRoot);for(const n of i.children)t(n)}}return t(document.documentElement),e}function Re(r=document){const e=_i(["IFRAME","WEBVIEW"]),t=new WeakMap;for(const i of e)t.set(i,i.style.pointerEvents),i.style.pointerEvents="none";return{release:()=>{var i;for(const n of e)n.style.pointerEvents=(i=t.get(n))!==null&&i!==void 0?i:"auto";e.splice(0,e.length)}}}function xi(r){function e(n){const o=[];for(let a=0;a<n.classList.length;a++)o.push(n.classList.item(a));return o}let t,i=r;for(;i!==null&&(t=e(i).find(n=>n.startsWith("dockview-theme-")),typeof t!="string");)i=i.parentElement;return t}class Me{constructor(e){this.element=e,this._classNames=[]}setClassNames(e){for(const t of this._classNames)y(this.element,t,!1);this._classNames=e.split(" ").filter(t=>t.trim().length>0);for(const t of this._classNames)y(this.element,t,!0)}}const Wt=100;function yi(r,e){const t=Je(r),i=Je(e);return!(t.left<i.left||t.left+t.width>i.left+i.width||t.top<i.top||t.top+t.height>i.top+i.height)}function Di(r){const e=new p;let t=r.screenX,i=r.screenY,n;const o=()=>{if(r.closed)return;const a=r.screenX,s=r.screenY;(a!==t||s!==i)&&(clearTimeout(n),n=setTimeout(()=>{e.fire()},Wt),t=a,i=s),requestAnimationFrame(o)};return o(),e}function zi(r,e){let t;return new A(E(r,"resize",()=>{clearTimeout(t),t=setTimeout(()=>{e()},Wt)}))}function ki(r,e,t={buffer:10}){const i=t.buffer,n=r.getBoundingClientRect(),o=e.getBoundingClientRect();let a=0,s=0;const d=n.left-o.left,l=n.top-o.top,c=n.bottom-o.bottom,v=n.right-o.right;d<i?a=i-d:v>i&&(a=-i-v),l<i?s=i-l:c>i&&(s=-c-i),(a!==0||s!==0)&&(r.style.transform=`translate(${a}px, ${s}px)`)}function Ci(r){let e=r;for(;e&&(e.style.zIndex==="auto"||e.style.zIndex==="");)e=e.parentElement;return e}function ge(r){if(r.length===0)throw new Error("Invalid tail call");return[r.slice(0,r.length-1),r[r.length-1]]}function Ft(r,e){if(r.length!==e.length)return!1;for(let t=0;t<r.length;t++)if(r[t]!==e[t])return!1;return!0}function $e(r,e){const t=r.indexOf(e);t>-1&&(r.splice(t,1),r.unshift(e))}function Ae(r,e){const t=r.indexOf(e);t>-1&&(r.splice(t,1),r.push(e))}function Si(r,e){for(let t=0;t<r.length;t++){const i=r[t];if(e(i))return t}return-1}function je(r,e){const t=r.findIndex(i=>i===e);return t>-1?(r.splice(t,1),!0):!1}const F=(r,e,t)=>e>t?e:Math.min(t,Math.max(r,e)),nt=()=>{let r=1;return{next:()=>(r++).toString()}},ae=(r,e)=>{const t=[];if(typeof e!="number"&&(e=r,r=0),r<=e)for(let i=r;i<e;i++)t.push(i);else for(let i=r;i>e;i--)t.push(i);return t};class Ai{set size(e){this._size=e}get size(){return this._size}get cachedVisibleSize(){return this._cachedVisibleSize}get visible(){return typeof this._cachedVisibleSize>"u"}get minimumSize(){return this.visible?this.view.minimumSize:0}get viewMinimumSize(){return this.view.minimumSize}get maximumSize(){return this.visible?this.view.maximumSize:0}get viewMaximumSize(){return this.view.maximumSize}get priority(){return this.view.priority}get snap(){return!!this.view.snap}set enabled(e){this.container.style.pointerEvents=e?"":"none"}constructor(e,t,i,n){this.container=e,this.view=t,this.disposable=n,this._cachedVisibleSize=void 0,typeof i=="number"?(this._size=i,this._cachedVisibleSize=void 0,e.classList.add("visible")):(this._size=0,this._cachedVisibleSize=i.cachedVisibleSize)}setVisible(e,t){var i;e!==this.visible&&(e?(this.size=F((i=this._cachedVisibleSize)!==null&&i!==void 0?i:0,this.viewMinimumSize,this.viewMaximumSize),this._cachedVisibleSize=void 0):(this._cachedVisibleSize=typeof t=="number"?t:this.size,this.size=0),this.container.classList.toggle("visible",e),this.view.setVisible&&this.view.setVisible(e))}dispose(){return this.disposable.dispose(),this.view}}var C;(function(r){r.HORIZONTAL="HORIZONTAL",r.VERTICAL="VERTICAL"})(C||(C={}));var oe;(function(r){r[r.MAXIMUM=0]="MAXIMUM",r[r.MINIMUM=1]="MINIMUM",r[r.DISABLED=2]="DISABLED",r[r.ENABLED=3]="ENABLED"})(oe||(oe={}));var q;(function(r){r.Low="low",r.High="high",r.Normal="normal"})(q||(q={}));var re;(function(r){r.Distribute={type:"distribute"};function e(i){return{type:"split",index:i}}r.Split=e;function t(i){return{type:"invisible",cachedVisibleSize:i}}r.Invisible=t})(re||(re={}));class Ce{get contentSize(){return this._contentSize}get size(){return this._size}set size(e){this._size=e}get orthogonalSize(){return this._orthogonalSize}set orthogonalSize(e){this._orthogonalSize=e}get length(){return this.viewItems.length}get proportions(){return this._proportions?[...this._proportions]:void 0}get orientation(){return this._orientation}set orientation(e){this._orientation=e;const t=this.size;this.size=this.orthogonalSize,this.orthogonalSize=t,de(this.element,"dv-horizontal","dv-vertical"),this.element.classList.add(this.orientation==C.HORIZONTAL?"dv-horizontal":"dv-vertical")}get minimumSize(){return this.viewItems.reduce((e,t)=>e+t.minimumSize,0)}get maximumSize(){return this.length===0?Number.POSITIVE_INFINITY:this.viewItems.reduce((e,t)=>e+t.maximumSize,0)}get startSnappingEnabled(){return this._startSnappingEnabled}set startSnappingEnabled(e){this._startSnappingEnabled!==e&&(this._startSnappingEnabled=e,this.updateSashEnablement())}get endSnappingEnabled(){return this._endSnappingEnabled}set endSnappingEnabled(e){this._endSnappingEnabled!==e&&(this._endSnappingEnabled=e,this.updateSashEnablement())}get disabled(){return this._disabled}set disabled(e){this._disabled=e,y(this.element,"dv-splitview-disabled",e)}get margin(){return this._margin}set margin(e){this._margin=e,y(this.element,"dv-splitview-has-margin",e!==0)}constructor(e,t){var i,n;this.container=e,this.viewItems=[],this.sashes=[],this._size=0,this._orthogonalSize=0,this._contentSize=0,this._proportions=void 0,this._startSnappingEnabled=!0,this._endSnappingEnabled=!0,this._disabled=!1,this._margin=0,this._onDidSashEnd=new p,this.onDidSashEnd=this._onDidSashEnd.event,this._onDidAddView=new p,this.onDidAddView=this._onDidAddView.event,this._onDidRemoveView=new p,this.onDidRemoveView=this._onDidRemoveView.event,this.resize=(o,a,s=this.viewItems.map(_=>_.size),d,l,c=Number.NEGATIVE_INFINITY,v=Number.POSITIVE_INFINITY,m,g)=>{if(o<0||o>this.viewItems.length)return 0;const _=ae(o,-1),u=ae(o+1,this.viewItems.length);if(l)for(const f of l)$e(_,f),$e(u,f);if(d)for(const f of d)Ae(_,f),Ae(u,f);const w=_.map(f=>this.viewItems[f]),x=_.map(f=>s[f]),P=u.map(f=>this.viewItems[f]),R=u.map(f=>s[f]),z=_.reduce((f,S)=>f+this.viewItems[S].minimumSize-s[S],0),U=_.reduce((f,S)=>f+this.viewItems[S].maximumSize-s[S],0),T=u.length===0?Number.POSITIVE_INFINITY:u.reduce((f,S)=>f+s[S]-this.viewItems[S].minimumSize,0),D=u.length===0?Number.NEGATIVE_INFINITY:u.reduce((f,S)=>f+s[S]-this.viewItems[S].maximumSize,0),L=Math.max(z,D),j=Math.min(T,U);let H=!1;if(m){const f=this.viewItems[m.index],S=a>=m.limitDelta;H=S!==f.visible,f.setVisible(S,m.size)}if(!H&&g){const f=this.viewItems[g.index],S=a<g.limitDelta;H=S!==f.visible,f.setVisible(S,g.size)}if(H)return this.resize(o,a,s,d,l,c,v);const Z=F(a,L,j);let ne=0,Y=Z;for(let f=0;f<w.length;f++){const S=w[f],B=F(x[f]+Y,S.minimumSize,S.maximumSize),xe=B-x[f];ne+=xe,Y-=xe,S.size=B}let M=ne;for(let f=0;f<P.length;f++){const S=P[f],B=F(R[f]-M,S.minimumSize,S.maximumSize),xe=B-R[f];M+=xe,S.size=B}return a},this._orientation=(i=t.orientation)!==null&&i!==void 0?i:C.VERTICAL,this.element=this.createContainer(),this.margin=(n=t.margin)!==null&&n!==void 0?n:0,this.proportionalLayout=t.proportionalLayout===void 0?!0:!!t.proportionalLayout,this.viewContainer=this.createViewContainer(),this.sashContainer=this.createSashContainer(),this.element.appendChild(this.sashContainer),this.element.appendChild(this.viewContainer),this.container.appendChild(this.element),this.style(t.styles),t.descriptor&&(this._size=t.descriptor.size,t.descriptor.views.forEach((o,a)=>{const s=o.visible===void 0||o.visible?o.size:{type:"invisible",cachedVisibleSize:o.size},d=o.view;this.addView(d,s,a,!0)}),this._contentSize=this.viewItems.reduce((o,a)=>o+a.size,0),this.saveProportions())}style(e){(e==null?void 0:e.separatorBorder)==="transparent"?(de(this.element,"dv-separator-border"),this.element.style.removeProperty("--dv-separator-border")):(le(this.element,"dv-separator-border"),e!=null&&e.separatorBorder&&this.element.style.setProperty("--dv-separator-border",e.separatorBorder))}isViewVisible(e){if(e<0||e>=this.viewItems.length)throw new Error("Index out of bounds");return this.viewItems[e].visible}setViewVisible(e,t){if(e<0||e>=this.viewItems.length)throw new Error("Index out of bounds");const i=this.viewItems[e];i.setVisible(t,i.size),this.distributeEmptySpace(e),this.layoutViews(),this.saveProportions()}getViewSize(e){return e<0||e>=this.viewItems.length?-1:this.viewItems[e].size}resizeView(e,t){if(e<0||e>=this.viewItems.length)return;const i=ae(this.viewItems.length).filter(s=>s!==e),n=[...i.filter(s=>this.viewItems[s].priority===q.Low),e],o=i.filter(s=>this.viewItems[s].priority===q.High),a=this.viewItems[e];t=Math.round(t),t=F(t,a.minimumSize,Math.min(a.maximumSize,this._size)),a.size=t,this.relayout(n,o)}getViews(){return this.viewItems.map(e=>e.view)}onDidChange(e,t){const i=this.viewItems.indexOf(e);if(i<0||i>=this.viewItems.length)return;t=typeof t=="number"?t:e.size,t=F(t,e.minimumSize,e.maximumSize),e.size=t;const n=ae(this.viewItems.length).filter(s=>s!==i),o=[...n.filter(s=>this.viewItems[s].priority===q.Low),i],a=n.filter(s=>this.viewItems[s].priority===q.High);this.relayout([...o,i],a)}addView(e,t={type:"distribute"},i=this.viewItems.length,n){const o=document.createElement("div");o.className="dv-view",o.appendChild(e.element);let a;typeof t=="number"?a=t:t.type==="split"?a=this.getViewSize(t.index)/2:t.type==="invisible"?a={cachedVisibleSize:t.cachedVisibleSize}:a=e.minimumSize;const s=e.onDidChange(l=>this.onDidChange(d,l.size)),d=new Ai(o,e,a,{dispose:()=>{s.dispose(),this.viewContainer.removeChild(o)}});if(i===this.viewItems.length?this.viewContainer.appendChild(o):this.viewContainer.insertBefore(o,this.viewContainer.children.item(i)),this.viewItems.splice(i,0,d),this.viewItems.length>1){const l=document.createElement("div");l.className="dv-sash";const c=m=>{for(const f of this.viewItems)f.enabled=!1;const g=Re(),_=this._orientation===C.HORIZONTAL?m.clientX:m.clientY,u=Si(this.sashes,f=>f.container===l),w=this.viewItems.map(f=>f.size);let x,P;const R=ae(u,-1),z=ae(u+1,this.viewItems.length),U=R.reduce((f,S)=>f+(this.viewItems[S].minimumSize-w[S]),0),T=R.reduce((f,S)=>f+(this.viewItems[S].viewMaximumSize-w[S]),0),D=z.length===0?Number.POSITIVE_INFINITY:z.reduce((f,S)=>f+(w[S]-this.viewItems[S].minimumSize),0),L=z.length===0?Number.NEGATIVE_INFINITY:z.reduce((f,S)=>f+(w[S]-this.viewItems[S].viewMaximumSize),0),j=Math.max(U,L),H=Math.min(D,T),Z=this.findFirstSnapIndex(R),ne=this.findFirstSnapIndex(z);if(typeof Z=="number"){const f=this.viewItems[Z],S=Math.floor(f.viewMinimumSize/2);x={index:Z,limitDelta:f.visible?j-S:j+S,size:f.size}}if(typeof ne=="number"){const f=this.viewItems[ne],S=Math.floor(f.viewMinimumSize/2);P={index:ne,limitDelta:f.visible?H+S:H-S,size:f.size}}const Y=f=>{const B=(this._orientation===C.HORIZONTAL?f.clientX:f.clientY)-_;this.resize(u,B,w,void 0,void 0,j,H,x,P),this.distributeEmptySpace(),this.layoutViews()},M=()=>{for(const f of this.viewItems)f.enabled=!0;g.release(),this.saveProportions(),document.removeEventListener("pointermove",Y),document.removeEventListener("pointerup",M),document.removeEventListener("pointercancel",M),document.removeEventListener("contextmenu",M),this._onDidSashEnd.fire(void 0)};document.addEventListener("pointermove",Y),document.addEventListener("pointerup",M),document.addEventListener("pointercancel",M),document.addEventListener("contextmenu",M)};l.addEventListener("pointerdown",c);const v={container:l,disposable:()=>{l.removeEventListener("pointerdown",c),this.sashContainer.removeChild(l)}};this.sashContainer.appendChild(l),this.sashes.push(v)}n||this.relayout([i]),!n&&typeof t!="number"&&t.type==="distribute"&&this.distributeViewSizes(),this._onDidAddView.fire(e)}distributeViewSizes(){const e=[];let t=0;for(const s of this.viewItems)s.maximumSize-s.minimumSize>0&&(e.push(s),t+=s.size);const i=Math.floor(t/e.length);for(const s of e)s.size=F(i,s.minimumSize,s.maximumSize);const n=ae(this.viewItems.length),o=n.filter(s=>this.viewItems[s].priority===q.Low),a=n.filter(s=>this.viewItems[s].priority===q.High);this.relayout(o,a)}removeView(e,t,i=!1){const n=this.viewItems.splice(e,1)[0];if(n.dispose(),this.viewItems.length>=1){const o=Math.max(e-1,0);this.sashes.splice(o,1)[0].disposable()}return i||this.relayout(),t&&t.type==="distribute"&&this.distributeViewSizes(),this._onDidRemoveView.fire(n.view),n.view}getViewCachedVisibleSize(e){if(e<0||e>=this.viewItems.length)throw new Error("Index out of bounds");return this.viewItems[e].cachedVisibleSize}moveView(e,t){const i=this.getViewCachedVisibleSize(e),n=typeof i>"u"?this.getViewSize(e):re.Invisible(i),o=this.removeView(e,void 0,!0);this.addView(o,n,t)}layout(e,t){const i=Math.max(this.size,this._contentSize);if(this.size=e,this.orthogonalSize=t,this.proportions){let n=0;for(let o=0;o<this.viewItems.length;o++){const a=this.viewItems[o],s=this.proportions[o];typeof s=="number"?n+=s:e-=a.size}for(let o=0;o<this.viewItems.length;o++){const a=this.viewItems[o],s=this.proportions[o];typeof s=="number"&&n>0&&(a.size=F(Math.round(s*e/n),a.minimumSize,a.maximumSize))}}else{const n=ae(this.viewItems.length),o=n.filter(s=>this.viewItems[s].priority===q.Low),a=n.filter(s=>this.viewItems[s].priority===q.High);this.resize(this.viewItems.length-1,e-i,void 0,o,a)}this.distributeEmptySpace(),this.layoutViews()}relayout(e,t){const i=this.viewItems.reduce((n,o)=>n+o.size,0);this.resize(this.viewItems.length-1,this._size-i,void 0,e,t),this.distributeEmptySpace(),this.layoutViews(),this.saveProportions()}distributeEmptySpace(e){const t=this.viewItems.reduce((s,d)=>s+d.size,0);let i=this.size-t;const n=ae(this.viewItems.length-1,-1),o=n.filter(s=>this.viewItems[s].priority===q.Low),a=n.filter(s=>this.viewItems[s].priority===q.High);for(const s of a)$e(n,s);for(const s of o)Ae(n,s);typeof e=="number"&&Ae(n,e);for(let s=0;i!==0&&s<n.length;s++){const d=this.viewItems[n[s]],l=F(d.size+i,d.minimumSize,d.maximumSize),c=l-d.size;i-=c,d.size=l}}saveProportions(){this.proportionalLayout&&this._contentSize>0&&(this._proportions=this.viewItems.map(e=>e.visible?e.size/this._contentSize:void 0))}layoutViews(){if(this._contentSize=this.viewItems.reduce((d,l)=>d+l.size,0),this.updateSashEnablement(),this.viewItems.length===0)return;const e=this.viewItems.filter(d=>d.visible),t=Math.max(0,e.length-1),i=this.margin*t/Math.max(1,e.length);let n=0;const o=[],a=4,s=this.viewItems.reduce((d,l,c)=>{const v=l.visible?1:0;return c===0?d.push(v):d.push(d[c-1]+v),d},[]);this.viewItems.forEach((d,l)=>{n+=this.viewItems[l].size,o.push(n);const c=d.visible?d.size-i:0,v=Math.max(0,s[l]-1),m=l===0||v===0?0:o[l-1]+v/t*i;if(l<this.viewItems.length-1){const g=d.visible?m+c-a/2+this.margin/2:m;this._orientation===C.HORIZONTAL&&(this.sashes[l].container.style.left=`${g}px`,this.sashes[l].container.style.top="0px"),this._orientation===C.VERTICAL&&(this.sashes[l].container.style.left="0px",this.sashes[l].container.style.top=`${g}px`)}this._orientation===C.HORIZONTAL&&(d.container.style.width=`${c}px`,d.container.style.left=`${m}px`,d.container.style.top="",d.container.style.height=""),this._orientation===C.VERTICAL&&(d.container.style.height=`${c}px`,d.container.style.top=`${m}px`,d.container.style.width="",d.container.style.left=""),d.view.layout(d.size-i,this._orthogonalSize)})}findFirstSnapIndex(e){for(const t of e){const i=this.viewItems[t];if(i.visible&&i.snap)return t}for(const t of e){const i=this.viewItems[t];if(i.visible&&i.maximumSize-i.minimumSize>0)return;if(!i.visible&&i.snap)return t}}updateSashEnablement(){let e=!1;const t=this.viewItems.map(d=>e=d.size-d.minimumSize>0||e);e=!1;const i=this.viewItems.map(d=>e=d.maximumSize-d.size>0||e),n=[...this.viewItems].reverse();e=!1;const o=n.map(d=>e=d.size-d.minimumSize>0||e).reverse();e=!1;const a=n.map(d=>e=d.maximumSize-d.size>0||e).reverse();let s=0;for(let d=0;d<this.sashes.length;d++){const l=this.sashes[d],c=this.viewItems[d];s+=c.size;const v=!(t[d]&&a[d+1]),m=!(i[d]&&o[d+1]);if(v&&m){const g=ae(d,-1),_=ae(d+1,this.viewItems.length),u=this.findFirstSnapIndex(g),w=this.findFirstSnapIndex(_),x=typeof u=="number"&&!this.viewItems[u].visible,P=typeof w=="number"&&!this.viewItems[w].visible;x&&o[d]&&(s>0||this.startSnappingEnabled)?this.updateSash(l,oe.MINIMUM):P&&t[d]&&(s<this._contentSize||this.endSnappingEnabled)?this.updateSash(l,oe.MAXIMUM):this.updateSash(l,oe.DISABLED)}else v&&!m?this.updateSash(l,oe.MINIMUM):!v&&m?this.updateSash(l,oe.MAXIMUM):this.updateSash(l,oe.ENABLED)}}updateSash(e,t){y(e.container,"dv-disabled",t===oe.DISABLED),y(e.container,"dv-enabled",t===oe.ENABLED),y(e.container,"dv-maximum",t===oe.MAXIMUM),y(e.container,"dv-minimum",t===oe.MINIMUM)}createViewContainer(){const e=document.createElement("div");return e.className="dv-view-container",e}createSashContainer(){const e=document.createElement("div");return e.className="dv-sash-container",e}createContainer(){const e=document.createElement("div"),t=this._orientation===C.HORIZONTAL?"dv-horizontal":"dv-vertical";return e.className=`dv-split-view-container ${t}`,e}dispose(){this._onDidSashEnd.dispose(),this._onDidAddView.dispose(),this._onDidRemoveView.dispose();for(let e=0;e<this.element.children.length;e++)if(this.element.children.item(e)===this.element){this.element.removeChild(this.element);break}for(const e of this.viewItems)e.dispose();this.element.remove()}}const Ze=Object.keys({orientation:void 0,descriptor:void 0,proportionalLayout:void 0,styles:void 0,margin:void 0,disableAutoResizing:void 0,className:void 0});class bt extends A{get onDidAddView(){return this.splitview.onDidAddView}get onDidRemoveView(){return this.splitview.onDidRemoveView}get minimumSize(){return this.splitview.minimumSize}get maximumSize(){return this.splitview.maximumSize}get orientation(){return this.splitview.orientation}get size(){return this.splitview.size}get orthogonalSize(){return this.splitview.orthogonalSize}constructor(e,t){var i;super(),this.paneItems=[],this.skipAnimation=!1,this._onDidChange=new p,this.onDidChange=this._onDidChange.event,this._orientation=(i=t.orientation)!==null&&i!==void 0?i:C.VERTICAL,this.element=document.createElement("div"),this.element.className="dv-pane-container",e.appendChild(this.element),this.splitview=new Ce(this.element,{orientation:this._orientation,proportionalLayout:!1,descriptor:t.descriptor}),this.getPanes().forEach(n=>{const o=new A(n.onDidChangeExpansionState(()=>{this.setupAnimation(),this._onDidChange.fire(void 0)})),a={pane:n,disposable:{dispose:()=>{o.dispose()}}};this.paneItems.push(a),n.orthogonalSize=this.splitview.orthogonalSize}),this.addDisposables(this._onDidChange,this.splitview.onDidSashEnd(()=>{this._onDidChange.fire(void 0)}),this.splitview.onDidAddView(()=>{this._onDidChange.fire()}),this.splitview.onDidRemoveView(()=>{this._onDidChange.fire()}))}setViewVisible(e,t){this.splitview.setViewVisible(e,t)}addPane(e,t,i=this.splitview.length,n=!1){const o=e.onDidChangeExpansionState(()=>{this.setupAnimation(),this._onDidChange.fire(void 0)}),a={pane:e,disposable:{dispose:()=>{o.dispose()}}};this.paneItems.splice(i,0,a),e.orthogonalSize=this.splitview.orthogonalSize,this.splitview.addView(e,t,i,n)}getViewSize(e){return this.splitview.getViewSize(e)}getPanes(){return this.splitview.getViews()}removePane(e,t={skipDispose:!1}){const i=this.paneItems.splice(e,1)[0];return this.splitview.removeView(e),t.skipDispose||(i.disposable.dispose(),i.pane.dispose()),i}moveView(e,t){if(e===t)return;const i=this.removePane(e,{skipDispose:!0});this.skipAnimation=!0;try{this.addPane(i.pane,i.pane.size,t,!1)}finally{this.skipAnimation=!1}}layout(e,t){this.splitview.layout(e,t)}setupAnimation(){this.skipAnimation||(this.animationTimer&&(clearTimeout(this.animationTimer),this.animationTimer=void 0),le(this.element,"dv-animated"),this.animationTimer=setTimeout(()=>{this.animationTimer=void 0,de(this.element,"dv-animated")},200))}dispose(){super.dispose(),this.animationTimer&&(clearTimeout(this.animationTimer),this.animationTimer=void 0),this.paneItems.forEach(e=>{e.disposable.dispose(),e.pane.dispose()}),this.paneItems=[],this.splitview.dispose(),this.element.remove()}}class Q{get minimumWidth(){return this.view.minimumWidth}get maximumWidth(){return this.view.maximumWidth}get minimumHeight(){return this.view.minimumHeight}get maximumHeight(){return this.view.maximumHeight}get priority(){return this.view.priority}get snap(){return this.view.snap}get minimumSize(){return this.orientation===C.HORIZONTAL?this.minimumHeight:this.minimumWidth}get maximumSize(){return this.orientation===C.HORIZONTAL?this.maximumHeight:this.maximumWidth}get minimumOrthogonalSize(){return this.orientation===C.HORIZONTAL?this.minimumWidth:this.minimumHeight}get maximumOrthogonalSize(){return this.orientation===C.HORIZONTAL?this.maximumWidth:this.maximumHeight}get orthogonalSize(){return this._orthogonalSize}get size(){return this._size}get element(){return this.view.element}get width(){return this.orientation===C.HORIZONTAL?this.orthogonalSize:this.size}get height(){return this.orientation===C.HORIZONTAL?this.size:this.orthogonalSize}constructor(e,t,i,n=0){this.view=e,this.orientation=t,this._onDidChange=new p,this.onDidChange=this._onDidChange.event,this._orthogonalSize=i,this._size=n,this._disposable=this.view.onDidChange(o=>{o?this._onDidChange.fire({size:this.orientation===C.VERTICAL?o.width:o.height,orthogonalSize:this.orientation===C.VERTICAL?o.height:o.width}):this._onDidChange.fire({})})}setVisible(e){this.view.setVisible&&this.view.setVisible(e)}layout(e,t){this._size=e,this._orthogonalSize=t,this.view.layout(this.width,this.height)}dispose(){this._onDidChange.dispose(),this._disposable.dispose()}}class J extends A{get width(){return this.orientation===C.HORIZONTAL?this.size:this.orthogonalSize}get height(){return this.orientation===C.HORIZONTAL?this.orthogonalSize:this.size}get minimumSize(){return this.children.length===0?0:Math.max(...this.children.map((e,t)=>this.splitview.isViewVisible(t)?e.minimumOrthogonalSize:0))}get maximumSize(){return Math.min(...this.children.map((e,t)=>this.splitview.isViewVisible(t)?e.maximumOrthogonalSize:Number.POSITIVE_INFINITY))}get minimumOrthogonalSize(){return this.splitview.minimumSize}get maximumOrthogonalSize(){return this.splitview.maximumSize}get orthogonalSize(){return this._orthogonalSize}get size(){return this._size}get minimumWidth(){return this.orientation===C.HORIZONTAL?this.minimumOrthogonalSize:this.minimumSize}get minimumHeight(){return this.orientation===C.HORIZONTAL?this.minimumSize:this.minimumOrthogonalSize}get maximumWidth(){return this.orientation===C.HORIZONTAL?this.maximumOrthogonalSize:this.maximumSize}get maximumHeight(){return this.orientation===C.HORIZONTAL?this.maximumSize:this.maximumOrthogonalSize}get priority(){if(this.children.length===0)return q.Normal;const e=this.children.map(t=>typeof t.priority>"u"?q.Normal:t.priority);return e.some(t=>t===q.High)?q.High:e.some(t=>t===q.Low)?q.Low:q.Normal}get disabled(){return this.splitview.disabled}set disabled(e){this.splitview.disabled=e}get margin(){return this.splitview.margin}set margin(e){this.splitview.margin=e,this.children.forEach(t=>{t instanceof J&&(t.margin=e)})}constructor(e,t,i,n,o,a,s,d){if(super(),this.orientation=e,this.proportionalLayout=t,this.styles=i,this._childrenDisposable=X.NONE,this.children=[],this._onDidChange=new p,this.onDidChange=this._onDidChange.event,this._onDidVisibilityChange=new p,this.onDidVisibilityChange=this._onDidVisibilityChange.event,this._orthogonalSize=o,this._size=n,this.element=document.createElement("div"),this.element.className="dv-branch-node",!d)this.splitview=new Ce(this.element,{orientation:this.orientation,proportionalLayout:t,styles:i,margin:s}),this.splitview.layout(this.size,this.orthogonalSize);else{const l={views:d.map(c=>({view:c.node,size:c.node.size,visible:c.node instanceof Q&&c.visible!==void 0?c.visible:!0})),size:this.orthogonalSize};this.children=d.map(c=>c.node),this.splitview=new Ce(this.element,{orientation:this.orientation,descriptor:l,proportionalLayout:t,styles:i,margin:s})}this.disabled=a,this.addDisposables(this._onDidChange,this._onDidVisibilityChange,this.splitview.onDidSashEnd(()=>{this._onDidChange.fire({})})),this.setupChildrenEvents()}setVisible(e){}isChildVisible(e){if(e<0||e>=this.children.length)throw new Error("Invalid index");return this.splitview.isViewVisible(e)}setChildVisible(e,t){if(e<0||e>=this.children.length)throw new Error("Invalid index");if(this.splitview.isViewVisible(e)===t)return;const i=this.splitview.contentSize===0;this.splitview.setViewVisible(e,t);const n=this.splitview.contentSize===0;(t&&i||!t&&n)&&this._onDidVisibilityChange.fire({visible:t})}moveChild(e,t){if(e===t)return;if(e<0||e>=this.children.length)throw new Error("Invalid from index");e<t&&t--,this.splitview.moveView(e,t);const i=this._removeChild(e);this._addChild(i,t)}getChildSize(e){if(e<0||e>=this.children.length)throw new Error("Invalid index");return this.splitview.getViewSize(e)}resizeChild(e,t){if(e<0||e>=this.children.length)throw new Error("Invalid index");this.splitview.resizeView(e,t)}layout(e,t){this._size=t,this._orthogonalSize=e,this.splitview.layout(t,e)}addChild(e,t,i,n){if(i<0||i>this.children.length)throw new Error("Invalid index");this.splitview.addView(e,t,i,n),this._addChild(e,i)}getChildCachedVisibleSize(e){if(e<0||e>=this.children.length)throw new Error("Invalid index");return this.splitview.getViewCachedVisibleSize(e)}removeChild(e,t){if(e<0||e>=this.children.length)throw new Error("Invalid index");return this.splitview.removeView(e,t),this._removeChild(e)}_addChild(e,t){this.children.splice(t,0,e),this.setupChildrenEvents()}_removeChild(e){const[t]=this.children.splice(e,1);return this.setupChildrenEvents(),t}setupChildrenEvents(){this._childrenDisposable.dispose(),this._childrenDisposable=new A(we.any(...this.children.map(e=>e.onDidChange))(e=>{this._onDidChange.fire({size:e.orthogonalSize})}),...this.children.map((e,t)=>e instanceof J?e.onDidVisibilityChange(({visible:i})=>{this.setChildVisible(t,i)}):X.NONE))}dispose(){this._childrenDisposable.dispose(),this.splitview.dispose(),this.children.forEach(e=>e.dispose()),super.dispose()}}function Xe(r,e){if(r instanceof Q)return r;if(r instanceof J)return Xe(r.children[e?r.children.length-1:0],e);throw new Error("invalid node")}function Bt(r,e,t){if(r instanceof J){const i=new J(r.orientation,r.proportionalLayout,r.styles,e,t,r.disabled,r.margin);for(let n=r.children.length-1;n>=0;n--){const o=r.children[n];i.addChild(Bt(o,o.size,o.orthogonalSize),o.size,0,!0)}return i}else return new Q(r.view,r.orientation,t)}function qe(r,e,t){if(r instanceof J){const i=new J(pe(r.orientation),r.proportionalLayout,r.styles,e,t,r.disabled,r.margin);let n=0;for(let o=r.children.length-1;o>=0;o--){const a=r.children[o],s=a instanceof J?a.orthogonalSize:a.size;let d=r.size===0?0:Math.round(e*s/r.size);n+=d,o===0&&(d+=e-n),i.addChild(qe(a,t,d),d,0,!0)}return i}else return new Q(r.view,pe(r.orientation),t)}function Pi(r){const e=r.parentElement;if(!e)throw new Error("Invalid grid element");let t=e.firstElementChild,i=0;for(;t!==r&&t!==e.lastElementChild&&t;)t=t.nextElementSibling,i++;return i}function $(r){const e=r.parentElement;if(!e)throw new Error("Invalid grid element");if(/\bdv-grid-view\b/.test(e.className))return[];const t=Pi(e),i=e.parentElement.parentElement.parentElement;return[...$(i),t]}function he(r,e,t){const i=Ii(r,e),n=Ei(t);if(i===n){const[o,a]=ge(e);let s=a;return(t==="right"||t==="bottom")&&(s+=1),[...o,s]}else{const o=t==="right"||t==="bottom"?1:0;return[...e,o]}}function Ei(r){return r==="top"||r==="bottom"?C.VERTICAL:C.HORIZONTAL}function Ii(r,e){return e.length%2===0?pe(r):r}const pe=r=>r===C.HORIZONTAL?C.VERTICAL:C.HORIZONTAL;function Oi(r){return!!r.children}const Ke=(r,e)=>{const t=e===C.VERTICAL?r.box.width:r.box.height;return Oi(r)?{type:"branch",data:r.children.map(i=>Ke(i,pe(e))),size:t}:typeof r.cachedVisibleSize=="number"?{type:"leaf",data:r.view.toJSON(),size:r.cachedVisibleSize,visible:!1}:{type:"leaf",data:r.view.toJSON(),size:t}};class Gi{get length(){return this._root?this._root.children.length:0}get orientation(){return this.root.orientation}set orientation(e){if(this.root.orientation===e)return;const{size:t,orthogonalSize:i}=this.root;this.root=qe(this.root,i,t),this.root.layout(t,i)}get width(){return this.root.width}get height(){return this.root.height}get minimumWidth(){return this.root.minimumWidth}get minimumHeight(){return this.root.minimumHeight}get maximumWidth(){return this.root.maximumHeight}get maximumHeight(){return this.root.maximumHeight}get locked(){return this._locked}set locked(e){this._locked=e;const t=[this.root];for(;t.length>0;){const i=t.pop();i instanceof J&&(i.disabled=e,t.push(...i.children))}}get margin(){return this._margin}set margin(e){this._margin=e,this.root.margin=e}maximizedView(){var e;return(e=this._maximizedNode)===null||e===void 0?void 0:e.leaf.view}hasMaximizedView(){return this._maximizedNode!==void 0}maximizeView(e){var t;const i=$(e.element),[n,o]=this.getNode(i);if(!(o instanceof Q)||((t=this._maximizedNode)===null||t===void 0?void 0:t.leaf)===o)return;this.hasMaximizedView()&&this.exitMaximizedView(),Ke(this.getView(),this.orientation);const a=[];function s(d,l){for(let c=0;c<d.children.length;c++){const v=d.children[c];v instanceof Q?v!==l&&(d.isChildVisible(c)?d.setChildVisible(c,!1):a.push(v)):s(v,l)}}s(this.root,o),this._maximizedNode={leaf:o,hiddenOnMaximize:a},this._onDidMaximizedNodeChange.fire({view:o.view,isMaximized:!0})}exitMaximizedView(){if(!this._maximizedNode)return;const e=this._maximizedNode.hiddenOnMaximize;function t(n){for(let o=n.children.length-1;o>=0;o--){const a=n.children[o];a instanceof Q?e.includes(a)||n.setChildVisible(o,!0):t(a)}}t(this.root);const i=this._maximizedNode.leaf;this._maximizedNode=void 0,this._onDidMaximizedNodeChange.fire({view:i.view,isMaximized:!1})}serialize(){const e=this.maximizedView();let t;e&&(t=$(e.element)),this.hasMaximizedView()&&this.exitMaximizedView();const n={root:Ke(this.getView(),this.orientation),width:this.width,height:this.height,orientation:this.orientation};return t&&(n.maximizedNode={location:t}),e&&this.maximizeView(e),n}dispose(){this.disposable.dispose(),this._onDidChange.dispose(),this._onDidMaximizedNodeChange.dispose(),this._onDidViewVisibilityChange.dispose(),this.root.dispose(),this._maximizedNode=void 0,this.element.remove()}clear(){const e=this.root.orientation;this.root=new J(e,this.proportionalLayout,this.styles,this.root.size,this.root.orthogonalSize,this.locked,this.margin)}deserialize(e,t){const i=e.orientation,n=i===C.VERTICAL?e.height:e.width;if(this._deserialize(e.root,i,t,n),this.layout(e.width,e.height),e.maximizedNode){const o=e.maximizedNode.location,[a,s]=this.getNode(o);if(!(s instanceof Q))return;this.maximizeView(s.view)}}_deserialize(e,t,i,n){this.root=this._deserializeNode(e,t,i,n)}_deserializeNode(e,t,i,n){var o;let a;if(e.type==="branch"){const d=e.data.map(l=>({node:this._deserializeNode(l,pe(t),i,e.size),visible:l.visible}));a=new J(t,this.proportionalLayout,this.styles,e.size,n,this.locked,this.margin,d)}else{const s=i.fromJSON(e);typeof e.visible=="boolean"&&((o=s.setVisible)===null||o===void 0||o.call(s,e.visible)),a=new Q(s,t,n,e.size)}return a}get root(){return this._root}set root(e){const t=this._root;t&&(t.dispose(),this._maximizedNode=void 0,this.element.removeChild(t.element)),this._root=e,this.element.appendChild(this._root.element),this.disposable.value=this._root.onDidChange(i=>{this._onDidChange.fire(i)})}normalize(){if(!this._root||this._root.children.length!==1)return;const e=this.root,t=e.children[0];if(t instanceof Q)return;e.element.remove();const i=e.removeChild(0);e.dispose(),i.dispose(),this._root=Bt(t,t.size,t.orthogonalSize),this.element.appendChild(this._root.element),this.disposable.value=this._root.onDidChange(n=>{this._onDidChange.fire(n)})}insertOrthogonalSplitviewAtRoot(){if(!this._root)return;const e=this.root;if(e.element.remove(),this._root=new J(pe(e.orientation),this.proportionalLayout,this.styles,this.root.orthogonalSize,this.root.size,this.locked,this.margin),e.children.length!==0)if(e.children.length===1){const t=e.children[0];e.removeChild(0).dispose(),e.dispose(),this._root.addChild(qe(t,t.orthogonalSize,t.size),re.Distribute,0)}else this._root.addChild(e,re.Distribute,0);this.element.appendChild(this._root.element),this.disposable.value=this._root.onDidChange(t=>{this._onDidChange.fire(t)})}next(e){return this.progmaticSelect(e)}previous(e){return this.progmaticSelect(e,!0)}getView(e){const t=e?this.getNode(e)[1]:this.root;return this._getViews(t,this.orientation)}_getViews(e,t,i){const n={height:e.height,width:e.width};if(e instanceof Q)return{box:n,view:e.view,cachedVisibleSize:i};const o=[];for(let a=0;a<e.children.length;a++){const s=e.children[a],d=e.getChildCachedVisibleSize(a);o.push(this._getViews(s,pe(t),d))}return{box:n,children:o}}progmaticSelect(e,t=!1){const[i,n]=this.getNode(e);if(!(n instanceof Q))throw new Error("invalid location");for(let o=i.length-1;o>-1;o--){const a=i[o],s=e[o]||0;if(t?s-1>-1:s+1<a.children.length)return Xe(a.children[t?s-1:s+1],t)}return Xe(this.root,t)}constructor(e,t,i,n,o){this.proportionalLayout=e,this.styles=t,this._locked=!1,this._margin=0,this._maximizedNode=void 0,this.disposable=new K,this._onDidChange=new p,this.onDidChange=this._onDidChange.event,this._onDidViewVisibilityChange=new p,this.onDidViewVisibilityChange=this._onDidViewVisibilityChange.event,this._onDidMaximizedNodeChange=new p,this.onDidMaximizedNodeChange=this._onDidMaximizedNodeChange.event,this.element=document.createElement("div"),this.element.className="dv-grid-view",this._locked=n??!1,this._margin=o??0,this.root=new J(i,e,t,0,0,this.locked,this.margin)}isViewVisible(e){const[t,i]=ge(e),[,n]=this.getNode(t);if(!(n instanceof J))throw new Error("Invalid from location");return n.isChildVisible(i)}setViewVisible(e,t){this.hasMaximizedView()&&this.exitMaximizedView();const[i,n]=ge(e),[,o]=this.getNode(i);if(!(o instanceof J))throw new Error("Invalid from location");this._onDidViewVisibilityChange.fire(),o.setChildVisible(n,t)}moveView(e,t,i){this.hasMaximizedView()&&this.exitMaximizedView();const[,n]=this.getNode(e);if(!(n instanceof J))throw new Error("Invalid location");n.moveChild(t,i)}addView(e,t,i){this.hasMaximizedView()&&this.exitMaximizedView();const[n,o]=ge(i),[a,s]=this.getNode(n);if(s instanceof J){const d=new Q(e,pe(s.orientation),s.orthogonalSize);s.addChild(d,t,o)}else{const[d,...l]=[...a].reverse(),[c,...v]=[...n].reverse();let m=0;const g=d.getChildCachedVisibleSize(c);typeof g=="number"&&(m=re.Invisible(g)),d.removeChild(c).dispose();const u=new J(s.orientation,this.proportionalLayout,this.styles,s.size,s.orthogonalSize,this.locked,this.margin);d.addChild(u,s.size,c);const w=new Q(s.view,d.orientation,s.size);u.addChild(w,m,0),typeof t!="number"&&t.type==="split"&&(t={type:"split",index:0});const x=new Q(e,d.orientation,s.size);u.addChild(x,t,o)}}remove(e,t){const i=$(e.element);return this.removeView(i,t)}removeView(e,t){this.hasMaximizedView()&&this.exitMaximizedView();const[i,n]=ge(e),[o,a]=this.getNode(i);if(!(a instanceof J))throw new Error("Invalid location");const s=a.children[n];if(!(s instanceof Q))throw new Error("Invalid location");if(a.removeChild(n,t),s.dispose(),a.children.length!==1)return s.view;const d=a.children[0];if(o.length===0)return d instanceof Q||(a.removeChild(0,t),this.root=d),s.view;const[l,...c]=[...o].reverse(),[v,...m]=[...i].reverse(),g=a.isChildVisible(0);a.removeChild(0,t);const _=l.children.map((u,w)=>l.getChildSize(w));if(l.removeChild(v,t).dispose(),d instanceof J){_.splice(v,1,...d.children.map(u=>u.size));for(let u=0;u<d.children.length;u++){const w=d.children[u];l.addChild(w,w.size,v+u)}for(;d.children.length>0;)d.removeChild(0)}else{const u=new Q(d.view,pe(d.orientation),d.size),w=g?d.orthogonalSize:re.Invisible(d.orthogonalSize);l.addChild(u,w,v)}d.dispose();for(let u=0;u<_.length;u++)l.resizeChild(u,_[u]);return s.view}layout(e,t){const[i,n]=this.root.orientation===C.HORIZONTAL?[t,e]:[e,t];this.root.layout(i,n)}getNode(e,t=this.root,i=[]){if(e.length===0)return[i,t];if(!(t instanceof J))throw new Error("Invalid location");const[n,...o]=e;if(n<0||n>=t.children.length)throw new Error("Invalid location");const a=t.children[n];return i.push(t),this.getNode(o,a,i)}}const Qe=Object.keys({disableAutoResizing:void 0,proportionalLayout:void 0,orientation:void 0,hideBorders:void 0,className:void 0});class ot extends A{get element(){return this._element}get disableResizing(){return this._disableResizing}set disableResizing(e){this._disableResizing=e}constructor(e,t=!1){super(),this._disableResizing=t,this._element=e,this.addDisposables(Le(this._element,i=>{if(this.isDisposed||this.disableResizing||!this._element.offsetParent||!fi(this._element))return;const{width:n,height:o}=i.contentRect;this.layout(n,o)}))}}const Ti=nt();function Ne(r){switch(r){case"left":return"left";case"right":return"right";case"above":return"top";case"below":return"bottom";case"within":default:return"center"}}class Ut extends ot{get id(){return this._id}get size(){return this._groups.size}get groups(){return Array.from(this._groups.values()).map(e=>e.value)}get width(){return this.gridview.width}get height(){return this.gridview.height}get minimumHeight(){return this.gridview.minimumHeight}get maximumHeight(){return this.gridview.maximumHeight}get minimumWidth(){return this.gridview.minimumWidth}get maximumWidth(){return this.gridview.maximumWidth}get activeGroup(){return this._activeGroup}get locked(){return this.gridview.locked}set locked(e){this.gridview.locked=e}constructor(e,t){var i;super(document.createElement("div"),t.disableAutoResizing),this._id=Ti.next(),this._groups=new Map,this._onDidRemove=new p,this.onDidRemove=this._onDidRemove.event,this._onDidAdd=new p,this.onDidAdd=this._onDidAdd.event,this._onDidMaximizedChange=new p,this.onDidMaximizedChange=this._onDidMaximizedChange.event,this._onDidActiveChange=new p,this.onDidActiveChange=this._onDidActiveChange.event,this._bufferOnDidLayoutChange=new gt,this.onDidLayoutChange=this._bufferOnDidLayoutChange.onEvent,this._onDidViewVisibilityChangeMicroTaskQueue=new gt,this.onDidViewVisibilityChangeMicroTaskQueue=this._onDidViewVisibilityChangeMicroTaskQueue.onEvent,this.element.style.height="100%",this.element.style.width="100%",this._classNames=new Me(this.element),this._classNames.setClassNames((i=t.className)!==null&&i!==void 0?i:""),e.appendChild(this.element),this.gridview=new Gi(!!t.proportionalLayout,t.styles,t.orientation,t.locked,t.margin),this.gridview.locked=!!t.locked,this.element.appendChild(this.gridview.element),this.layout(0,0,!0),this.addDisposables(this.gridview.onDidMaximizedNodeChange(n=>{this._onDidMaximizedChange.fire({panel:n.view,isMaximized:n.isMaximized})}),this.gridview.onDidViewVisibilityChange(()=>this._onDidViewVisibilityChangeMicroTaskQueue.fire()),this.onDidViewVisibilityChangeMicroTaskQueue(()=>{this.layout(this.width,this.height,!0)}),X.from(()=>{var n;(n=this.element.parentElement)===null||n===void 0||n.removeChild(this.element)}),this.gridview.onDidChange(()=>{this._bufferOnDidLayoutChange.fire()}),we.any(this.onDidAdd,this.onDidRemove,this.onDidActiveChange)(()=>{this._bufferOnDidLayoutChange.fire()}),this._onDidMaximizedChange,this._onDidViewVisibilityChangeMicroTaskQueue,this._bufferOnDidLayoutChange)}setVisible(e,t){this.gridview.setViewVisible($(e.element),t),this._bufferOnDidLayoutChange.fire()}isVisible(e){return this.gridview.isViewVisible($(e.element))}updateOptions(e){var t,i,n,o;e.proportionalLayout,e.orientation&&(this.gridview.orientation=e.orientation),"disableResizing"in e&&(this.disableResizing=(t=e.disableAutoResizing)!==null&&t!==void 0?t:!1),"locked"in e&&(this.locked=(i=e.locked)!==null&&i!==void 0?i:!1),"margin"in e&&(this.gridview.margin=(n=e.margin)!==null&&n!==void 0?n:0),"className"in e&&this._classNames.setClassNames((o=e.className)!==null&&o!==void 0?o:"")}maximizeGroup(e){this.gridview.maximizeView(e),this.doSetGroupActive(e)}isMaximizedGroup(e){return this.gridview.maximizedView()===e}exitMaximizedGroup(){this.gridview.exitMaximizedView()}hasMaximizedGroup(){return this.gridview.hasMaximizedView()}doAddGroup(e,t=[0],i){this.gridview.addView(e,i??re.Distribute,t),this._onDidAdd.fire(e)}doRemoveGroup(e,t){if(!this._groups.has(e.id))throw new Error("invalid operation");const i=this._groups.get(e.id),n=this.gridview.remove(e,re.Distribute);if(i&&!(t!=null&&t.skipDispose)&&(i.disposable.dispose(),i.value.dispose(),this._groups.delete(e.id),this._onDidRemove.fire(e)),!(t!=null&&t.skipActive)&&this._activeGroup===e){const o=Array.from(this._groups.values());this.doSetGroupActive(o.length>0?o[0].value:void 0)}return n}getPanel(e){var t;return(t=this._groups.get(e))===null||t===void 0?void 0:t.value}doSetGroupActive(e){this._activeGroup!==e&&(this._activeGroup&&this._activeGroup.setActive(!1),e&&e.setActive(!0),this._activeGroup=e,this._onDidActiveChange.fire(e))}removeGroup(e){this.doRemoveGroup(e)}moveToNext(e){var t;if(e||(e={}),!e.group){if(!this.activeGroup)return;e.group=this.activeGroup}const i=$(e.group.element),n=(t=this.gridview.next(i))===null||t===void 0?void 0:t.view;this.doSetGroupActive(n)}moveToPrevious(e){var t;if(e||(e={}),!e.group){if(!this.activeGroup)return;e.group=this.activeGroup}const i=$(e.group.element),n=(t=this.gridview.previous(i))===null||t===void 0?void 0:t.view;this.doSetGroupActive(n)}layout(e,t,i){(i||e!==this.width||t!==this.height)&&(this.gridview.element.style.height=`${t}px`,this.gridview.element.style.width=`${e}px`,this.gridview.layout(e,t))}dispose(){this._onDidActiveChange.dispose(),this._onDidAdd.dispose(),this._onDidRemove.dispose();for(const e of this.groups)e.dispose();this.gridview.dispose(),super.dispose()}}class $t{get minimumSize(){return this.component.minimumSize}get maximumSize(){return this.component.maximumSize}get width(){return this.component.width}get height(){return this.component.height}get length(){return this.component.length}get orientation(){return this.component.orientation}get panels(){return this.component.panels}get onDidLayoutFromJSON(){return this.component.onDidLayoutFromJSON}get onDidLayoutChange(){return this.component.onDidLayoutChange}get onDidAddView(){return this.component.onDidAddView}get onDidRemoveView(){return this.component.onDidRemoveView}constructor(e){this.component=e}removePanel(e,t){this.component.removePanel(e,t)}focus(){this.component.focus()}getPanel(e){return this.component.getPanel(e)}layout(e,t){return this.component.layout(e,t)}addPanel(e){return this.component.addPanel(e)}movePanel(e,t){this.component.movePanel(e,t)}fromJSON(e){this.component.fromJSON(e)}toJSON(){return this.component.toJSON()}clear(){this.component.clear()}updateOptions(e){this.component.updateOptions(e)}dispose(){this.component.dispose()}}class Se{get minimumSize(){return this.component.minimumSize}get maximumSize(){return this.component.maximumSize}get width(){return this.component.width}get height(){return this.component.height}get panels(){return this.component.panels}get onDidLayoutChange(){return this.component.onDidLayoutChange}get onDidLayoutFromJSON(){return this.component.onDidLayoutFromJSON}get onDidAddView(){return this.component.onDidAddView}get onDidRemoveView(){return this.component.onDidRemoveView}get onDidDrop(){return this.component.onDidDrop}get onUnhandledDragOverEvent(){return this.component.onUnhandledDragOverEvent}constructor(e){this.component=e}removePanel(e){this.component.removePanel(e)}getPanel(e){return this.component.getPanel(e)}movePanel(e,t){this.component.movePanel(e,t)}focus(){this.component.focus()}layout(e,t){this.component.layout(e,t)}addPanel(e){return this.component.addPanel(e)}fromJSON(e){this.component.fromJSON(e)}toJSON(){return this.component.toJSON()}clear(){this.component.clear()}updateOptions(e){this.component.updateOptions(e)}dispose(){this.component.dispose()}}class jt{get width(){return this.component.width}get height(){return this.component.height}get minimumHeight(){return this.component.minimumHeight}get maximumHeight(){return this.component.maximumHeight}get minimumWidth(){return this.component.minimumWidth}get maximumWidth(){return this.component.maximumWidth}get onDidLayoutChange(){return this.component.onDidLayoutChange}get onDidAddPanel(){return this.component.onDidAddGroup}get onDidRemovePanel(){return this.component.onDidRemoveGroup}get onDidActivePanelChange(){return this.component.onDidActiveGroupChange}get onDidLayoutFromJSON(){return this.component.onDidLayoutFromJSON}get panels(){return this.component.groups}get orientation(){return this.component.orientation}set orientation(e){this.component.updateOptions({orientation:e})}constructor(e){this.component=e}focus(){this.component.focus()}layout(e,t,i=!1){this.component.layout(e,t,i)}addPanel(e){return this.component.addPanel(e)}removePanel(e,t){this.component.removePanel(e,t)}movePanel(e,t){this.component.movePanel(e,t)}getPanel(e){return this.component.getPanel(e)}fromJSON(e){return this.component.fromJSON(e)}toJSON(){return this.component.toJSON()}clear(){this.component.clear()}updateOptions(e){this.component.updateOptions(e)}dispose(){this.component.dispose()}}class Ve{get id(){return this.component.id}get width(){return this.component.width}get height(){return this.component.height}get minimumHeight(){return this.component.minimumHeight}get maximumHeight(){return this.component.maximumHeight}get minimumWidth(){return this.component.minimumWidth}get maximumWidth(){return this.component.maximumWidth}get size(){return this.component.size}get totalPanels(){return this.component.totalPanels}get onDidActiveGroupChange(){return this.component.onDidActiveGroupChange}get onDidAddGroup(){return this.component.onDidAddGroup}get onDidRemoveGroup(){return this.component.onDidRemoveGroup}get onDidActivePanelChange(){return this.component.onDidActivePanelChange}get onDidAddPanel(){return this.component.onDidAddPanel}get onDidRemovePanel(){return this.component.onDidRemovePanel}get onDidMovePanel(){return this.component.onDidMovePanel}get onDidLayoutFromJSON(){return this.component.onDidLayoutFromJSON}get onDidLayoutChange(){return this.component.onDidLayoutChange}get onDidDrop(){return this.component.onDidDrop}get onWillDrop(){return this.component.onWillDrop}get onWillShowOverlay(){return this.component.onWillShowOverlay}get onWillDragGroup(){return this.component.onWillDragGroup}get onWillDragPanel(){return this.component.onWillDragPanel}get onUnhandledDragOverEvent(){return this.component.onUnhandledDragOverEvent}get onDidPopoutGroupSizeChange(){return this.component.onDidPopoutGroupSizeChange}get onDidPopoutGroupPositionChange(){return this.component.onDidPopoutGroupPositionChange}get onDidOpenPopoutWindowFail(){return this.component.onDidOpenPopoutWindowFail}get panels(){return this.component.panels}get groups(){return this.component.groups}get activePanel(){return this.component.activePanel}get activeGroup(){return this.component.activeGroup}constructor(e){this.component=e}focus(){this.component.focus()}getPanel(e){return this.component.getGroupPanel(e)}layout(e,t,i=!1){this.component.layout(e,t,i)}addPanel(e){return this.component.addPanel(e)}removePanel(e){this.component.removePanel(e)}addGroup(e){return this.component.addGroup(e)}closeAllGroups(){return this.component.closeAllGroups()}removeGroup(e){this.component.removeGroup(e)}getGroup(e){return this.component.getPanel(e)}addFloatingGroup(e,t){return this.component.addFloatingGroup(e,t)}fromJSON(e,t){this.component.fromJSON(e,t)}toJSON(){return this.component.toJSON()}clear(){this.component.clear()}moveToNext(e){this.component.moveToNext(e)}moveToPrevious(e){this.component.moveToPrevious(e)}maximizeGroup(e){this.component.maximizeGroup(e.group)}hasMaximizedGroup(){return this.component.hasMaximizedGroup()}exitMaximizedGroup(){this.component.exitMaximizedGroup()}get onDidMaximizedGroupChange(){return this.component.onDidMaximizedGroupChange}addPopoutGroup(e,t){return this.component.addPopoutGroup(e,t)}updateOptions(e){this.component.updateOptions(e)}dispose(){this.component.dispose()}}class rt extends A{constructor(e,t){super(),this.el=e,this.disabled=t,this.dataDisposable=new K,this.pointerEventsDisposable=new K,this._onDragStart=new p,this.onDragStart=this._onDragStart.event,this.addDisposables(this._onDragStart,this.dataDisposable,this.pointerEventsDisposable),this.configure()}setDisabled(e){this.disabled=e}isCancelled(e){return!1}configure(){this.addDisposables(this._onDragStart,E(this.el,"dragstart",e=>{if(e.defaultPrevented||this.isCancelled(e)||this.disabled){e.preventDefault();return}const t=Re();this.pointerEventsDisposable.value={dispose:()=>{t.release()}},this.el.classList.add("dv-dragged"),setTimeout(()=>this.el.classList.remove("dv-dragged"),0),this.dataDisposable.value=this.getData(e),this._onDragStart.fire(e),e.dataTransfer&&(e.dataTransfer.effectAllowed="move",e.dataTransfer.items.length>0||e.dataTransfer.setData("text/plain",""))}),E(this.el,"dragend",()=>{this.pointerEventsDisposable.dispose(),setTimeout(()=>{this.dataDisposable.dispose()},0)}))}}class Yt extends A{constructor(e,t){super(),this.element=e,this.callbacks=t,this.target=null,this.registerListeners()}onDragEnter(e){this.target=e.target,this.callbacks.onDragEnter(e)}onDragOver(e){e.preventDefault(),this.callbacks.onDragOver&&this.callbacks.onDragOver(e)}onDragLeave(e){this.target===e.target&&(this.target=null,this.callbacks.onDragLeave(e))}onDragEnd(e){this.target=null,this.callbacks.onDragEnd(e)}onDrop(e){this.callbacks.onDrop(e)}registerListeners(){this.addDisposables(E(this.element,"dragenter",e=>{this.onDragEnter(e)},!0)),this.addDisposables(E(this.element,"dragover",e=>{this.onDragOver(e)},!0)),this.addDisposables(E(this.element,"dragleave",e=>{this.onDragLeave(e)})),this.addDisposables(E(this.element,"dragend",e=>{this.onDragEnd(e)})),this.addDisposables(E(this.element,"drop",e=>{this.onDrop(e)}))}}function Ri(r,e){const{top:t,left:i,width:n,height:o}=e,a=`${Math.round(t)}px`,s=`${Math.round(i)}px`,d=`${Math.round(n)}px`,l=`${Math.round(o)}px`;r.style.top=a,r.style.left=s,r.style.width=d,r.style.height=l,r.style.visibility="visible",(!r.style.transform||r.style.transform==="")&&(r.style.transform="translate3d(0, 0, 0)")}function Ni(r,e){const{top:t,left:i,width:n,height:o}=e;r.style.top=t,r.style.left=i,r.style.width=n,r.style.height=o,r.style.visibility="visible",(!r.style.transform||r.style.transform==="")&&(r.style.transform="translate3d(0, 0, 0)")}function Vi(r,e){const{top:t,left:i,width:n,height:o}=e,a=`${Math.round(t)}px`,s=`${Math.round(i)}px`,d=`${Math.round(n)}px`,l=`${Math.round(o)}px`;return r.style.top!==a||r.style.left!==s||r.style.width!==d||r.style.height!==l}class Li extends it{get nativeEvent(){return this.options.nativeEvent}get position(){return this.options.position}constructor(e){super(),this.options=e}}function ft(r){switch(r){case"above":return"top";case"below":return"bottom";case"left":return"left";case"right":return"right";case"within":return"center";default:throw new Error(`invalid direction '${r}'`)}}function Mi(r){switch(r){case"top":return"above";case"bottom":return"below";case"left":return"left";case"right":return"right";case"center":return"within";default:throw new Error(`invalid position '${r}'`)}}const Hi={value:20,type:"percentage"},Wi={value:50,type:"percentage"},Fi=100,Bi=100;class se extends A{get disabled(){return this._disabled}set disabled(e){this._disabled=e}get state(){return this._state}constructor(e,t){super(),this.element=e,this.options=t,this._onDrop=new p,this.onDrop=this._onDrop.event,this._onWillShowOverlay=new p,this.onWillShowOverlay=this._onWillShowOverlay.event,this._disabled=!1,this._acceptedTargetZonesSet=new Set(this.options.acceptedTargetZones),this.dnd=new Yt(this.element,{onDragEnter:()=>{var i,n,o;(o=(n=(i=this.options).getOverrideTarget)===null||n===void 0?void 0:n.call(i))===null||o===void 0||o.getElements()},onDragOver:i=>{var n,o,a,s,d,l,c;se.ACTUAL_TARGET=this;const v=(o=(n=this.options).getOverrideTarget)===null||o===void 0?void 0:o.call(n);if(this._acceptedTargetZonesSet.size===0){if(v)return;this.removeDropTarget();return}const m=(d=(s=(a=this.options).getOverlayOutline)===null||s===void 0?void 0:s.call(a))!==null&&d!==void 0?d:this.element,g=m.offsetWidth,_=m.offsetHeight;if(g===0||_===0)return;const u=i.currentTarget.getBoundingClientRect(),w=((l=i.clientX)!==null&&l!==void 0?l:0)-u.left,x=((c=i.clientY)!==null&&c!==void 0?c:0)-u.top,P=this.calculateQuadrant(this._acceptedTargetZonesSet,w,x,g,_);if(this.isAlreadyUsed(i)||P===null){this.removeDropTarget();return}if(!this.options.canDisplayOverlay(i,P)){if(v)return;this.removeDropTarget();return}const R=new Li({nativeEvent:i,position:P});if(this._onWillShowOverlay.fire(R),R.defaultPrevented){this.removeDropTarget();return}this.markAsUsed(i),v||this.targetElement||(this.targetElement=document.createElement("div"),this.targetElement.className="dv-drop-target-dropzone",this.overlayElement=document.createElement("div"),this.overlayElement.className="dv-drop-target-selection",this._state="center",this.targetElement.appendChild(this.overlayElement),m.classList.add("dv-drop-target"),m.append(this.targetElement)),this.toggleClasses(P,g,_),this._state=P},onDragLeave:()=>{var i,n;!((n=(i=this.options).getOverrideTarget)===null||n===void 0)&&n.call(i)||this.removeDropTarget()},onDragEnd:i=>{var n,o;const a=(o=(n=this.options).getOverrideTarget)===null||o===void 0?void 0:o.call(n);a&&se.ACTUAL_TARGET===this&&this._state&&(i.stopPropagation(),this._onDrop.fire({position:this._state,nativeEvent:i})),this.removeDropTarget(),a==null||a.clear()},onDrop:i=>{var n,o,a;i.preventDefault();const s=this._state;this.removeDropTarget(),(a=(o=(n=this.options).getOverrideTarget)===null||o===void 0?void 0:o.call(n))===null||a===void 0||a.clear(),s&&(i.stopPropagation(),this._onDrop.fire({position:s,nativeEvent:i}))}}),this.addDisposables(this._onDrop,this._onWillShowOverlay,this.dnd)}setTargetZones(e){this._acceptedTargetZonesSet=new Set(e)}setOverlayModel(e){this.options.overlayModel=e}dispose(){this.removeDropTarget(),super.dispose()}markAsUsed(e){e[se.USED_EVENT_ID]=!0}isAlreadyUsed(e){const t=e[se.USED_EVENT_ID];return typeof t=="boolean"&&t}toggleClasses(e,t,i){var n,o,a,s,d,l,c;const v=(o=(n=this.options).getOverrideTarget)===null||o===void 0?void 0:o.call(n);if(!v&&!this.overlayElement)return;const m=t<Fi,g=i<Bi,_=e==="left",u=e==="right",w=e==="top",x=e==="bottom",P=!m&&u,R=!m&&_,z=!g&&w,U=!g&&x;let T=1;const D=(s=(a=this.options.overlayModel)===null||a===void 0?void 0:a.size)!==null&&s!==void 0?s:Wi;if(D.type==="percentage"?T=F(D.value,0,100)/100:((P||R)&&(T=F(0,D.value,t)/t),(z||U)&&(T=F(0,D.value,i)/i)),v){const j=(c=(l=(d=this.options).getOverlayOutline)===null||l===void 0?void 0:l.call(d))!==null&&c!==void 0?c:this.element,H=j.getBoundingClientRect(),Z=v.getElements(void 0,j),ne=Z.root,Y=Z.overlay,M=ne.getBoundingClientRect(),f=H.top-M.top,S=H.left-M.left,B={top:f,left:S,width:t,height:i};if(P?(B.left=S+t*(1-T),B.width=t*T):R?B.width=t*T:z?B.height=i*T:U&&(B.top=f+i*(1-T),B.height=i*T),m&&_&&(B.width=4),m&&u&&(B.left=S+t-4,B.width=4),!Vi(Y,B))return;Ri(Y,B),Y.className=`dv-drop-target-anchor${this.options.className?` ${this.options.className}`:""}`,y(Y,"dv-drop-target-left",_),y(Y,"dv-drop-target-right",u),y(Y,"dv-drop-target-top",w),y(Y,"dv-drop-target-bottom",x),y(Y,"dv-drop-target-center",e==="center"),Z.changed&&(y(Y,"dv-drop-target-anchor-container-changed",!0),setTimeout(()=>{y(Y,"dv-drop-target-anchor-container-changed",!1)},10));return}if(!this.overlayElement)return;const L={top:"0px",left:"0px",width:"100%",height:"100%"};P?(L.left=`${100*(1-T)}%`,L.width=`${100*T}%`):R?L.width=`${100*T}%`:z?L.height=`${100*T}%`:U&&(L.top=`${100*(1-T)}%`,L.height=`${100*T}%`),Ni(this.overlayElement,L),y(this.overlayElement,"dv-drop-target-small-vertical",g),y(this.overlayElement,"dv-drop-target-small-horizontal",m),y(this.overlayElement,"dv-drop-target-left",_),y(this.overlayElement,"dv-drop-target-right",u),y(this.overlayElement,"dv-drop-target-top",w),y(this.overlayElement,"dv-drop-target-bottom",x),y(this.overlayElement,"dv-drop-target-center",e==="center")}calculateQuadrant(e,t,i,n,o){var a,s;const d=(s=(a=this.options.overlayModel)===null||a===void 0?void 0:a.activationSize)!==null&&s!==void 0?s:Hi;return d.type==="percentage"?Ui(e,t,i,n,o,d.value):$i(e,t,i,n,o,d.value)}removeDropTarget(){var e;this.targetElement&&(this._state=void 0,(e=this.targetElement.parentElement)===null||e===void 0||e.classList.remove("dv-drop-target"),this.targetElement.remove(),this.targetElement=void 0,this.overlayElement=void 0)}}se.USED_EVENT_ID="__dockview_droptarget_event_is_used__";function Ui(r,e,t,i,n,o){const a=100*e/i,s=100*t/n;return r.has("left")&&a<o?"left":r.has("right")&&a>100-o?"right":r.has("top")&&s<o?"top":r.has("bottom")&&s>100-o?"bottom":r.has("center")?"center":null}function $i(r,e,t,i,n,o){return r.has("left")&&e<o?"left":r.has("right")&&e>i-o?"right":r.has("top")&&t<o?"top":r.has("bottom")&&t>n-o?"bottom":r.has("center")?"center":null}const et=Object.keys({disableAutoResizing:void 0,disableDnd:void 0,className:void 0});class ji extends Lt{constructor(e,t,i,n){super(),this.nativeEvent=e,this.position=t,this.getData=i,this.panel=n}}class Jt extends it{constructor(){super()}}class Zt extends A{get isFocused(){return this._isFocused}get isActive(){return this._isActive}get isVisible(){return this._isVisible}get width(){return this._width}get height(){return this._height}constructor(e,t){super(),this.id=e,this.component=t,this._isFocused=!1,this._isActive=!1,this._isVisible=!0,this._width=0,this._height=0,this._parameters={},this.panelUpdatesDisposable=new K,this._onDidDimensionChange=new p,this.onDidDimensionsChange=this._onDidDimensionChange.event,this._onDidChangeFocus=new p,this.onDidFocusChange=this._onDidChangeFocus.event,this._onWillFocus=new p,this.onWillFocus=this._onWillFocus.event,this._onDidVisibilityChange=new p,this.onDidVisibilityChange=this._onDidVisibilityChange.event,this._onWillVisibilityChange=new p,this.onWillVisibilityChange=this._onWillVisibilityChange.event,this._onDidActiveChange=new p,this.onDidActiveChange=this._onDidActiveChange.event,this._onActiveChange=new p,this.onActiveChange=this._onActiveChange.event,this._onDidParametersChange=new p,this.onDidParametersChange=this._onDidParametersChange.event,this.addDisposables(this.onDidFocusChange(i=>{this._isFocused=i.isFocused}),this.onDidActiveChange(i=>{this._isActive=i.isActive}),this.onDidVisibilityChange(i=>{this._isVisible=i.isVisible}),this.onDidDimensionsChange(i=>{this._width=i.width,this._height=i.height}),this.panelUpdatesDisposable,this._onDidDimensionChange,this._onDidChangeFocus,this._onDidVisibilityChange,this._onDidActiveChange,this._onWillFocus,this._onActiveChange,this._onWillFocus,this._onWillVisibilityChange,this._onDidParametersChange)}getParameters(){return this._parameters}initialize(e){this.panelUpdatesDisposable.value=this._onDidParametersChange.event(t=>{this._parameters=t,e.update({params:t})})}setVisible(e){this._onWillVisibilityChange.fire({isVisible:e})}setActive(){this._onActiveChange.fire()}updateParameters(e){this._onDidParametersChange.fire(e)}}class Xt extends Zt{constructor(e,t){super(e,t),this._onDidConstraintsChangeInternal=new p,this.onDidConstraintsChangeInternal=this._onDidConstraintsChangeInternal.event,this._onDidConstraintsChange=new p({replay:!0}),this.onDidConstraintsChange=this._onDidConstraintsChange.event,this._onDidSizeChange=new p,this.onDidSizeChange=this._onDidSizeChange.event,this.addDisposables(this._onDidConstraintsChangeInternal,this._onDidConstraintsChange,this._onDidSizeChange)}setConstraints(e){this._onDidConstraintsChangeInternal.fire(e)}setSize(e){this._onDidSizeChange.fire(e)}}class Yi extends Xt{set pane(e){this._pane=e}constructor(e,t){super(e,t),this._onDidExpansionChange=new p({replay:!0}),this.onDidExpansionChange=this._onDidExpansionChange.event,this._onMouseEnter=new p({}),this.onMouseEnter=this._onMouseEnter.event,this._onMouseLeave=new p({}),this.onMouseLeave=this._onMouseLeave.event,this.addDisposables(this._onDidExpansionChange,this._onMouseEnter,this._onMouseLeave)}setExpanded(e){var t;(t=this._pane)===null||t===void 0||t.setExpanded(e)}get isExpanded(){var e;return!!(!((e=this._pane)===null||e===void 0)&&e.isExpanded())}}class at extends A{get element(){return this._element}get width(){return this._width}get height(){return this._height}get params(){var e;return(e=this._params)===null||e===void 0?void 0:e.params}constructor(e,t,i){super(),this.id=e,this.component=t,this.api=i,this._height=0,this._width=0,this._element=document.createElement("div"),this._element.tabIndex=-1,this._element.style.outline="none",this._element.style.height="100%",this._element.style.width="100%",this._element.style.overflow="hidden";const n=Mt(this._element);this.addDisposables(this.api,n.onDidFocus(()=>{this.api._onDidChangeFocus.fire({isFocused:!0})}),n.onDidBlur(()=>{this.api._onDidChangeFocus.fire({isFocused:!1})}),n)}focus(){const e=new Jt;this.api._onWillFocus.fire(e),!e.defaultPrevented&&this._element.focus()}layout(e,t){this._width=e,this._height=t,this.api._onDidDimensionChange.fire({width:e,height:t}),this.part&&this._params&&this.part.update(this._params.params)}init(e){this._params=e,this.part=this.getComponent()}update(e){var t,i;this._params=Object.assign(Object.assign({},this._params),{params:Object.assign(Object.assign({},(t=this._params)===null||t===void 0?void 0:t.params),e.params)});for(const n of Object.keys(e.params))e.params[n]===void 0&&delete this._params.params[n];(i=this.part)===null||i===void 0||i.update({params:this._params.params})}toJSON(){var e,t;const i=(t=(e=this._params)===null||e===void 0?void 0:e.params)!==null&&t!==void 0?t:{};return{id:this.id,component:this.component,params:Object.keys(i).length>0?i:void 0}}dispose(){var e;this.api.dispose(),(e=this.part)===null||e===void 0||e.dispose(),super.dispose()}}class Ji extends at{set orientation(e){this._orientation=e}get orientation(){return this._orientation}get minimumSize(){const e=this.headerSize,i=this.isExpanded()?this._minimumBodySize:0;return e+i}get maximumSize(){const e=this.headerSize,i=this.isExpanded()?this._maximumBodySize:0;return e+i}get size(){return this._size}get orthogonalSize(){return this._orthogonalSize}set orthogonalSize(e){this._orthogonalSize=e}get minimumBodySize(){return this._minimumBodySize}set minimumBodySize(e){this._minimumBodySize=typeof e=="number"?e:0}get maximumBodySize(){return this._maximumBodySize}set maximumBodySize(e){this._maximumBodySize=typeof e=="number"?e:Number.POSITIVE_INFINITY}get headerVisible(){return this._headerVisible}set headerVisible(e){this._headerVisible=e,this.header.style.display=e?"":"none"}constructor(e){super(e.id,e.component,new Yi(e.id,e.component)),this._onDidChangeExpansionState=new p({replay:!0}),this.onDidChangeExpansionState=this._onDidChangeExpansionState.event,this._onDidChange=new p,this.onDidChange=this._onDidChange.event,this._orthogonalSize=0,this._size=0,this._isExpanded=!1,this.api.pane=this,this.api.initialize(this),this.headerSize=e.headerSize,this.headerComponent=e.headerComponent,this._minimumBodySize=e.minimumBodySize,this._maximumBodySize=e.maximumBodySize,this._isExpanded=e.isExpanded,this._headerVisible=e.isHeaderVisible,this._onDidChangeExpansionState.fire(this.isExpanded()),this._orientation=e.orientation,this.element.classList.add("dv-pane"),this.addDisposables(this.api.onWillVisibilityChange(t=>{const{isVisible:i}=t,{accessor:n}=this._params;n.setVisible(this,i)}),this.api.onDidSizeChange(t=>{this._onDidChange.fire({size:t.size})}),E(this.element,"mouseenter",t=>{this.api._onMouseEnter.fire(t)}),E(this.element,"mouseleave",t=>{this.api._onMouseLeave.fire(t)})),this.addDisposables(this._onDidChangeExpansionState,this.onDidChangeExpansionState(t=>{this.api._onDidExpansionChange.fire({isExpanded:t})}),this.api.onDidFocusChange(t=>{this.header&&(t.isFocused?le(this.header,"focused"):de(this.header,"focused"))})),this.renderOnce()}setVisible(e){this.api._onDidVisibilityChange.fire({isVisible:e})}setActive(e){this.api._onDidActiveChange.fire({isActive:e})}isExpanded(){return this._isExpanded}setExpanded(e){this._isExpanded!==e&&(this._isExpanded=e,e?(this.animationTimer&&clearTimeout(this.animationTimer),this.body&&this.element.appendChild(this.body)):this.animationTimer=setTimeout(()=>{var t;(t=this.body)===null||t===void 0||t.remove()},200),this._onDidChange.fire(e?{size:this.width}:{}),this._onDidChangeExpansionState.fire(e))}layout(e,t){this._size=e,this._orthogonalSize=t;const[i,n]=this.orientation===C.HORIZONTAL?[e,t]:[t,e];super.layout(i,n)}init(e){var t,i;super.init(e),typeof e.minimumBodySize=="number"&&(this.minimumBodySize=e.minimumBodySize),typeof e.maximumBodySize=="number"&&(this.maximumBodySize=e.maximumBodySize),this.bodyPart=this.getBodyComponent(),this.headerPart=this.getHeaderComponent(),this.bodyPart.init(Object.assign(Object.assign({},e),{api:this.api})),this.headerPart.init(Object.assign(Object.assign({},e),{api:this.api})),(t=this.body)===null||t===void 0||t.append(this.bodyPart.element),(i=this.header)===null||i===void 0||i.append(this.headerPart.element),typeof e.isExpanded=="boolean"&&this.setExpanded(e.isExpanded)}toJSON(){const e=this._params;return Object.assign(Object.assign({},super.toJSON()),{headerComponent:this.headerComponent,title:e.title})}renderOnce(){this.header=document.createElement("div"),this.header.tabIndex=0,this.header.className="dv-pane-header",this.header.style.height=`${this.headerSize}px`,this.header.style.lineHeight=`${this.headerSize}px`,this.header.style.minHeight=`${this.headerSize}px`,this.header.style.maxHeight=`${this.headerSize}px`,this.element.appendChild(this.header),this.body=document.createElement("div"),this.body.className="dv-pane-body",this.element.appendChild(this.body)}getComponent(){return{update:e=>{var t,i;(t=this.bodyPart)===null||t===void 0||t.update({params:e}),(i=this.headerPart)===null||i===void 0||i.update({params:e})},dispose:()=>{var e,t;(e=this.bodyPart)===null||e===void 0||e.dispose(),(t=this.headerPart)===null||t===void 0||t.dispose()}}}}class Zi extends Ji{constructor(e){super({id:e.id,component:e.component,headerComponent:e.headerComponent,orientation:e.orientation,isExpanded:e.isExpanded,isHeaderVisible:!0,headerSize:e.headerSize,minimumBodySize:e.minimumBodySize,maximumBodySize:e.maximumBodySize}),this._onDidDrop=new p,this.onDidDrop=this._onDidDrop.event,this._onUnhandledDragOverEvent=new p,this.onUnhandledDragOverEvent=this._onUnhandledDragOverEvent.event,this.accessor=e.accessor,this.addDisposables(this._onDidDrop,this._onUnhandledDragOverEvent),e.disableDnd||this.initDragFeatures()}initDragFeatures(){if(!this.header)return;const e=this.id,t=this.accessor.id;this.header.draggable=!0,this.handler=new class extends rt{getData(){return ue.getInstance().setData([new ke(t,e)],ke.prototype),{dispose:()=>{ue.getInstance().clearData(ke.prototype)}}}}(this.header),this.target=new se(this.element,{acceptedTargetZones:["top","bottom"],overlayModel:{activationSize:{type:"percentage",value:50}},canDisplayOverlay:(i,n)=>{const o=ze();if(o&&o.paneId!==this.id&&o.viewId===this.accessor.id)return!0;const a=new ji(i,n,ze,this);return this._onUnhandledDragOverEvent.fire(a),a.isAccepted}}),this.addDisposables(this._onDidDrop,this.handler,this.target,this.target.onDrop(i=>{this.onDrop(i)}))}onDrop(e){const t=ze();if(!t||t.viewId!==this.accessor.id){this._onDidDrop.fire(Object.assign(Object.assign({},e),{panel:this,api:new Se(this.accessor),getData:ze}));return}const i=this._params.containerApi,n=t.paneId,o=i.getPanel(n);if(!o){this._onDidDrop.fire(Object.assign(Object.assign({},e),{panel:this,getData:ze,api:new Se(this.accessor)}));return}const a=i.panels,s=a.indexOf(o);let d=i.panels.indexOf(this);(e.position==="left"||e.position==="top")&&(d=Math.max(0,d-1)),(e.position==="right"||e.position==="bottom")&&(s>d&&d++,d=Math.min(a.length-1,d)),i.movePanel(s,d)}}class Xi extends A{get element(){return this._element}constructor(e,t){super(),this.accessor=e,this.group=t,this.disposable=new K,this._onDidFocus=new p,this.onDidFocus=this._onDidFocus.event,this._onDidBlur=new p,this.onDidBlur=this._onDidBlur.event,this._element=document.createElement("div"),this._element.className="dv-content-container",this._element.tabIndex=-1,this.addDisposables(this._onDidFocus,this._onDidBlur);const i=t.dropTargetContainer;this.dropTarget=new se(this.element,{getOverlayOutline:()=>{var n;return((n=e.options.theme)===null||n===void 0?void 0:n.dndPanelOverlay)==="group"?this.element.parentElement:null},className:"dv-drop-target-content",acceptedTargetZones:["top","bottom","left","right","center"],canDisplayOverlay:(n,o)=>{if(this.group.locked==="no-drop-target"||this.group.locked&&o==="center")return!1;const a=ee();return!a&&n.shiftKey&&this.group.location.type!=="floating"?!1:a&&a.viewId===this.accessor.id?!0:this.group.canDisplayOverlay(n,o,"content")},getOverrideTarget:i?()=>i.model:void 0}),this.addDisposables(this.dropTarget)}show(){this.element.style.display=""}hide(){this.element.style.display="none"}renderPanel(e,t={asActive:!0}){const i=t.asActive||this.panel&&this.group.isPanelActive(this.panel);this.panel&&this.panel.view.content.element.parentElement===this._element&&this._element.removeChild(this.panel.view.content.element),this.panel=e;let n;switch(e.api.renderer){case"onlyWhenVisible":this.group.renderContainer.detatch(e),this.panel&&i&&this._element.appendChild(this.panel.view.content.element),n=this._element;break;case"always":e.view.content.element.parentElement===this._element&&this._element.removeChild(e.view.content.element),n=this.group.renderContainer.attach({panel:e,referenceContainer:this});break;default:throw new Error(`dockview: invalid renderer type '${e.api.renderer}'`)}if(i){const o=Mt(n);this.focusTracker=o;const a=new A;a.addDisposables(o,o.onDidFocus(()=>this._onDidFocus.fire()),o.onDidBlur(()=>this._onDidBlur.fire())),this.disposable.value=a}}openPanel(e){this.panel!==e&&this.renderPanel(e)}layout(e,t){}closePanel(){var e;this.panel&&this.panel.api.renderer==="onlyWhenVisible"&&((e=this.panel.view.content.element.parentElement)===null||e===void 0||e.removeChild(this.panel.view.content.element)),this.panel=void 0}dispose(){this.disposable.dispose(),super.dispose()}refreshFocusState(){var e;!((e=this.focusTracker)===null||e===void 0)&&e.refreshState&&this.focusTracker.refreshState()}}function qt(r,e,t){var i,n;le(e,"dv-dragged"),e.style.top="-9999px",document.body.appendChild(e),r.setDragImage(e,(i=t==null?void 0:t.x)!==null&&i!==void 0?i:0,(n=t==null?void 0:t.y)!==null&&n!==void 0?n:0),setTimeout(()=>{de(e,"dv-dragged"),e.remove()},0)}class qi extends rt{constructor(e,t,i,n,o){super(e,o),this.accessor=t,this.group=i,this.panel=n,this.panelTransfer=ue.getInstance()}getData(e){return this.panelTransfer.setData([new be(this.accessor.id,this.group.id,this.panel.id)],be.prototype),{dispose:()=>{this.panelTransfer.clearData(be.prototype)}}}}class Ki extends A{get element(){return this._element}constructor(e,t,i){super(),this.panel=e,this.accessor=t,this.group=i,this.content=void 0,this._onPointDown=new p,this.onPointerDown=this._onPointDown.event,this._onDropped=new p,this.onDrop=this._onDropped.event,this._onDragStart=new p,this.onDragStart=this._onDragStart.event,this._onDragEnd=new p,this.onDragEnd=this._onDragEnd.event,this._element=document.createElement("div"),this._element.className="dv-tab",this._element.tabIndex=0,this._element.draggable=!this.accessor.options.disableDnd,y(this.element,"dv-inactive-tab",!0),this.dragHandler=new qi(this._element,this.accessor,this.group,this.panel,!!this.accessor.options.disableDnd),this.dropTarget=new se(this._element,{acceptedTargetZones:["left","right"],overlayModel:{activationSize:{value:50,type:"percentage"}},canDisplayOverlay:(n,o)=>{if(this.group.locked)return!1;const a=ee();return a&&this.accessor.id===a.viewId?!(this.accessor.options.tabAnimation==="smooth"&&a.groupId===this.group.id):this.group.model.canDisplayOverlay(n,o,"tab")},getOverrideTarget:()=>{var n;return(n=i.model.dropTargetContainer)===null||n===void 0?void 0:n.model}}),this.onWillShowOverlay=this.dropTarget.onWillShowOverlay,this.addDisposables(this._onPointDown,this._onDropped,this._onDragStart,this._onDragEnd,this.dragHandler.onDragStart(n=>{if(n.dataTransfer){const o=getComputedStyle(this.element),a=this.element.cloneNode(!0);Array.from(o).forEach(s=>a.style.setProperty(s,o.getPropertyValue(s),o.getPropertyPriority(s))),a.style.position="absolute",qt(n.dataTransfer,a,{y:-10,x:30})}this._onDragStart.fire(n),this.accessor.options.tabAnimation==="smooth"&&requestAnimationFrame(()=>{y(this.element,"dv-tab--dragging",!0)})}),E(this._element,"dragend",n=>{y(this.element,"dv-tab--dragging",!1),this._onDragEnd.fire(n)}),this.dragHandler,E(this._element,"pointerdown",n=>{this._onPointDown.fire(n)}),this.dropTarget.onDrop(n=>{this._onDropped.fire(n)}),this.dropTarget)}setActive(e){y(this.element,"dv-active-tab",e),y(this.element,"dv-inactive-tab",!e)}setContent(e){this.content&&this._element.removeChild(this.content.element),this.content=e,this._element.appendChild(this.content.element)}updateDragAndDropState(){this._element.draggable=!this.accessor.options.disableDnd,this.dragHandler.setDisabled(!!this.accessor.options.disableDnd)}dispose(){super.dispose()}}class He{get kind(){return this.options.kind}get nativeEvent(){return this.event.nativeEvent}get position(){return this.event.position}get defaultPrevented(){return this.event.defaultPrevented}get panel(){return this.options.panel}get api(){return this.options.api}get group(){return this.options.group}preventDefault(){this.event.preventDefault()}getData(){return this.options.getData()}constructor(e,t){this.event=e,this.options=t}}class Qi extends rt{constructor(e,t,i,n){super(e,n),this.accessor=t,this.group=i,this.panelTransfer=ue.getInstance(),this.addDisposables(E(e,"pointerdown",o=>{o.shiftKey&&mi(o)},!0))}isCancelled(e){return this.group.api.location.type==="floating"&&!e.shiftKey}getData(e){const t=e.dataTransfer;this.panelTransfer.setData([new be(this.accessor.id,this.group.id,null)],be.prototype);const i=window.getComputedStyle(this.el),n=i.getPropertyValue("--dv-activegroup-visiblepanel-tab-background-color"),o=i.getPropertyValue("--dv-activegroup-visiblepanel-tab-color");if(t){const a=document.createElement("div");a.style.backgroundColor=n,a.style.color=o,a.style.padding="2px 8px",a.style.height="24px",a.style.fontSize="11px",a.style.lineHeight="20px",a.style.borderRadius="12px",a.style.position="absolute",a.style.pointerEvents="none",a.style.top="-9999px",a.textContent=`Multiple Panels (${this.group.size})`,qt(t,a,{y:-10,x:30})}return{dispose:()=>{this.panelTransfer.clearData(be.prototype)}}}}class en extends A{get element(){return this._element}constructor(e,t){super(),this.accessor=e,this.group=t,this._onDrop=new p,this.onDrop=this._onDrop.event,this._onDragStart=new p,this.onDragStart=this._onDragStart.event,this._element=document.createElement("div"),this._element.className="dv-void-container",this._element.draggable=!this.accessor.options.disableDnd,y(this._element,"dv-draggable",!this.accessor.options.disableDnd),this.addDisposables(this._onDrop,this._onDragStart,E(this._element,"pointerdown",()=>{this.accessor.doSetGroupActive(this.group)})),this.handler=new Qi(this._element,e,t,!!this.accessor.options.disableDnd),this.dropTarget=new se(this._element,{acceptedTargetZones:["center"],canDisplayOverlay:(i,n)=>{const o=ee();return o&&this.accessor.id===o.viewId?!0:t.model.canDisplayOverlay(i,n,"header_space")},getOverrideTarget:()=>{var i;return(i=t.model.dropTargetContainer)===null||i===void 0?void 0:i.model}}),this.onWillShowOverlay=this.dropTarget.onWillShowOverlay,this.addDisposables(this.handler,this.handler.onDragStart(i=>{this._onDragStart.fire(i)}),this.dropTarget.onDrop(i=>{this._onDrop.fire(i)}),this.dropTarget)}updateDragAndDropState(){this._element.draggable=!this.accessor.options.disableDnd,y(this._element,"dv-draggable",!this.accessor.options.disableDnd),this.handler.setDisabled(!!this.accessor.options.disableDnd)}}class We extends A{get element(){return this._element}get orientation(){return this._orientation}set orientation(e){this._orientation!==e&&(this._scrollOffset=0,this._orientation=e,de(this._scrollbar,"dv-scrollbar-vertical","dv-scrollbar-horizontal"),e==="vertical"?le(this._scrollbar,"dv-scrollbar-vertical"):le(this._scrollbar,"dv-scrollbar-horizontal"))}constructor(e){super(),this.scrollableElement=e,this._scrollOffset=0,this._orientation="horizontal",this._element=document.createElement("div"),this._element.className="dv-scrollable",this._scrollbar=document.createElement("div"),this._scrollbar.className="dv-scrollbar dv-scrollbar-horizontal",this.element.appendChild(e),this.element.appendChild(this._scrollbar),this.addDisposables(E(this.element,"wheel",t=>{this._scrollOffset+=t.deltaY*We.MouseWheelSpeed,this.calculateScrollbarStyles()}),E(this._scrollbar,"pointerdown",t=>{t.preventDefault(),y(this.element,"dv-scrollable-scrolling",!0);const i=this._orientation==="horizontal"?t.clientX:t.clientY,n=this._scrollOffset,o=s=>{const d=this._orientation==="horizontal"?s.clientX-i:s.clientY-i,l=this._orientation==="horizontal"?this.element.clientWidth:this.element.clientHeight,c=this._orientation==="horizontal"?this.scrollableElement.scrollWidth:this.scrollableElement.scrollHeight,v=l/c;this._scrollOffset=n+d/v,this.calculateScrollbarStyles()},a=()=>{y(this.element,"dv-scrollable-scrolling",!1),document.removeEventListener("pointermove",o),document.removeEventListener("pointerup",a),document.removeEventListener("pointercancel",a)};document.addEventListener("pointermove",o),document.addEventListener("pointerup",a),document.addEventListener("pointercancel",a)}),E(this.element,"scroll",()=>{this.calculateScrollbarStyles()}),E(this.scrollableElement,"scroll",()=>{this._scrollOffset=this._orientation==="horizontal"?this.scrollableElement.scrollLeft:this.scrollableElement.scrollTop,this.calculateScrollbarStyles()}),Le(this.element,()=>{y(this.element,"dv-scrollable-resizing",!0),this._animationTimer&&clearTimeout(this._animationTimer),this._animationTimer=setTimeout(()=>{clearTimeout(this._animationTimer),y(this.element,"dv-scrollable-resizing",!1)},500),this.calculateScrollbarStyles()}))}calculateScrollbarStyles(){const e=this._orientation==="horizontal"?this.element.clientWidth:this.element.clientHeight,t=this._orientation==="horizontal"?this.scrollableElement.scrollWidth:this.scrollableElement.scrollHeight;if(t>e){const n=e*(e/t);this._orientation==="horizontal"?(this._scrollbar.style.width=`${n}px`,this._scrollbar.style.height=""):(this._scrollbar.style.height=`${n}px`,this._scrollbar.style.width=""),this._scrollOffset=F(this._scrollOffset,0,t-e),this._orientation==="horizontal"?this.scrollableElement.scrollLeft=this._scrollOffset:this.scrollableElement.scrollTop=this._scrollOffset;const o=this._scrollOffset/(t-e);this._orientation==="horizontal"?(this._scrollbar.style.left=`${(e-n)*o}px`,this._scrollbar.style.top=""):(this._scrollbar.style.top=`${(e-n)*o}px`,this._scrollbar.style.left="")}else this._orientation==="horizontal"?(this._scrollbar.style.width="0px",this._scrollbar.style.left="0px"):(this._scrollbar.style.height="0px",this._scrollbar.style.top="0px"),this._scrollOffset=0}}We.MouseWheelSpeed=1;class tn extends A{get showTabsOverflowControl(){return this._showTabsOverflowControl}set showTabsOverflowControl(e){if(this._showTabsOverflowControl!=e&&(this._showTabsOverflowControl=e,e)){const t=new ui(this._tabsList);this._observerDisposable.value=new A(t,t.onDidChange(i=>{const n=i.hasScrollX||i.hasScrollY;this.toggleDropdown({reset:!n})}),E(this._tabsList,"scroll",()=>{this.toggleDropdown({reset:!1})}))}}get element(){return this._element}get panels(){return this._tabs.map(e=>e.value.panel.id)}get size(){return this._tabs.length}get tabs(){return this._tabs.map(e=>e.value)}get direction(){return this._direction}set direction(e){this._direction!==e&&(this._direction=e,this._scrollbar&&(this._scrollbar.orientation=e),de(this._tabsList,"dv-horizontal","dv-vertical"),e==="vertical"?le(this._tabsList,"dv-tabs-container-vertical","dv-vertical"):(de(this._tabsList,"dv-tabs-container-vertical"),le(this._tabsList,"dv-horizontal")))}constructor(e,t,i){super(),this.group=e,this.accessor=t,this._observerDisposable=new K,this._scrollbar=null,this._tabs=[],this.selectedIndex=-1,this._showTabsOverflowControl=!1,this._direction="horizontal",this._animState=null,this._onTabDragStart=new p,this.onTabDragStart=this._onTabDragStart.event,this._onDrop=new p,this.onDrop=this._onDrop.event,this._onWillShowOverlay=new p,this.onWillShowOverlay=this._onWillShowOverlay.event,this._onOverflowTabsChange=new p,this.onOverflowTabsChange=this._onOverflowTabsChange.event,this._tabsList=document.createElement("div"),this._tabsList.className="dv-tabs-container",this.showTabsOverflowControl=i.showTabsOverflowControl,t.options.scrollbars==="native"?this._element=this._tabsList:(this._scrollbar=new We(this._tabsList),this._scrollbar.orientation=this.direction,this._element=this._scrollbar.element,this.addDisposables(this._scrollbar)),this.addDisposables(this._onOverflowTabsChange,this._observerDisposable,this._onWillShowOverlay,this._onDrop,this._onTabDragStart,E(this.element,"pointerdown",n=>{if(n.defaultPrevented)return;n.button===0&&this.accessor.doSetGroupActive(this.group)}),E(this._tabsList,"dragover",n=>{if(!this._animState){if(this.accessor.options.tabAnimation!=="smooth"||this.accessor.options.disableDnd)return;const o=ee();if(o&&o.panelId&&o.groupId!==this.group.id)this._animState={sourceTabId:o.panelId,sourceIndex:-1,tabPositions:this.snapshotTabPositions(),currentInsertionIndex:null};else return}this.handleDragOver(n)},!0),E(this._tabsList,"dragleave",n=>{this._animState&&(n.relatedTarget&&this._tabsList.contains(n.relatedTarget)||(this.resetTabTransforms(),this._animState&&(this._animState.sourceIndex===-1?this._animState=null:this._animState.currentInsertionIndex=null)))},!0),E(this._tabsList,"dragend",()=>{this.resetDragAnimation()}),E(this._tabsList,"drop",n=>{if(this.accessor.options.tabAnimation!=="smooth"||!this._animState||this._animState.currentInsertionIndex===null)return;n.stopPropagation(),n.preventDefault();const o=this._animState;this._animState=null;const a=o.currentInsertionIndex,s=o.sourceIndex,d=a-(s!==-1&&s<a?1:0);if(d===s){this.resetTabTransforms();return}const l=this.snapshotTabPositions();this.resetTabTransforms(),this._onDrop.fire({event:n,index:d}),this.runFlipAnimation(l,o.sourceTabId,o.sourceIndex===-1,{from:Math.min(s,d),to:Math.max(s,d)})},!0),X.from(()=>{this.resetDragAnimation();for(const{value:n,disposable:o}of this._tabs)o.dispose(),n.dispose();this._tabs=[]}))}indexOf(e){return this._tabs.findIndex(t=>t.value.panel.id===e)}isActive(e){return this.selectedIndex>-1&&this._tabs[this.selectedIndex].value===e}setActivePanel(e){let t=0;for(const i of this._tabs){const n=e.id===i.value.panel.id;if(i.value.setActive(n),n){const o=i.value.element,a=o.parentElement;(t<a.scrollLeft||t+o.clientWidth>a.scrollLeft+a.clientWidth)&&(a.scrollLeft=t)}t+=i.value.element.clientWidth}}openPanel(e,t=this._tabs.length){if(this._tabs.find(a=>a.value.panel.id===e.id))return;const i=new Ki(e,this.accessor,this.group);i.setContent(e.view.tab);const n=new A(i.onDragStart(a=>{this._onTabDragStart.fire({nativeEvent:a,panel:e}),this.accessor.options.tabAnimation==="smooth"&&(this._animState={sourceTabId:e.id,sourceIndex:this._tabs.findIndex(s=>s.value===i),tabPositions:this.snapshotTabPositions(),currentInsertionIndex:null})}),i.onPointerDown(a=>{if(a.defaultPrevented)return;const s=!this.accessor.options.disableFloatingGroups,d=this.group.api.location.type==="floating"&&this.size===1;if(s&&!d&&a.shiftKey){a.preventDefault();const l=this.accessor.getGroupPanel(i.panel.id),{top:c,left:v}=i.element.getBoundingClientRect(),{top:m,left:g}=this.accessor.element.getBoundingClientRect();this.accessor.addFloatingGroup(l,{x:v-g,y:c-m,inDragMode:!0});return}switch(a.button){case 0:this.group.activePanel!==e&&this.group.model.openPanel(e);break}}),i.onDrop(a=>{const s=this._animState;this._animState=null;const d=this._tabs.findIndex(l=>l.value===i);if(s){const l=this.snapshotTabPositions();this.resetTabTransforms(),this._onDrop.fire({event:a.nativeEvent,index:d}),this.runFlipAnimation(l,s.sourceTabId,s.sourceIndex===-1,s.sourceIndex!==-1?{from:Math.min(s.sourceIndex,d),to:Math.max(s.sourceIndex,d)}:void 0)}else this._onDrop.fire({event:a.nativeEvent,index:d})}),i.onWillShowOverlay(a=>{this._onWillShowOverlay.fire(new He(a,{kind:"tab",panel:this.group.activePanel,api:this.accessor.api,group:this.group,getData:ee}))})),o={value:i,disposable:n};this.addTab(o,t),this._animState&&(this._animState.tabPositions=this.snapshotTabPositions(),this.applyDragOverTransforms())}delete(e){var t;((t=this._animState)===null||t===void 0?void 0:t.sourceTabId)===e&&(this.resetTabTransforms(),this._animState=null);const i=this.indexOf(e),n=this._tabs.splice(i,1)[0],{value:o,disposable:a}=n;a.dispose(),o.dispose(),o.element.remove(),this._animState&&(this._animState.tabPositions=this.snapshotTabPositions(),this.applyDragOverTransforms())}addTab(e,t=this._tabs.length){if(t<0||t>this._tabs.length)throw new Error("invalid location");this._tabsList.insertBefore(e.value.element,this._tabsList.children[t]),this._tabs=[...this._tabs.slice(0,t),e,...this._tabs.slice(t)],this.selectedIndex<0&&(this.selectedIndex=t)}toggleDropdown(e){const t=e.reset?[]:this._tabs.filter(i=>!yi(i.value.element,this._tabsList)).map(i=>i.value.panel.id);this._onOverflowTabsChange.fire({tabs:t,reset:e.reset})}updateDragAndDropState(){for(const e of this._tabs)e.value.updateDragAndDropState()}snapshotTabPositions(){const e=new Map;for(const t of this._tabs)e.set(t.value.panel.id,t.value.element.getBoundingClientRect());return e}getAverageTabWidth(){if(this._tabs.length===0)return 0;let e=0;for(const t of this._tabs)e+=t.value.element.getBoundingClientRect().width;return e/this._tabs.length}handleDragOver(e){if(!this._animState)return;const t=e.clientX;let i=null;for(let n=0;n<this._tabs.length;n++){const o=this._tabs[n].value;if(o.panel.id===this._animState.sourceTabId)continue;const a=o.element.getBoundingClientRect(),s=a.left+a.width/2;if(t<s){i=n;break}i=n+1}i!==this._animState.currentInsertionIndex&&(this._animState.currentInsertionIndex=i,this.applyDragOverTransforms())}applyDragOverTransforms(){if(!this._animState||this._animState.currentInsertionIndex===null){this.resetTabTransforms();return}const e=this._animState.currentInsertionIndex,t=this._animState.tabPositions.get(this._animState.sourceTabId),i=t?t.width:this.getAverageTabWidth();let n=!1;for(let o=0;o<this._tabs.length;o++){const a=this._tabs[o].value;if(a.panel.id!==this._animState.sourceTabId)if(!n&&o>=e)a.element.style.marginLeft=`${i}px`,y(a.element,"dv-tab--shifting",!0),n=!0;else if(a.element.style.marginLeft){a.element.style.marginLeft="0px",y(a.element,"dv-tab--shifting",!0);const s=()=>{a.element.style.removeProperty("margin-left"),y(a.element,"dv-tab--shifting",!1),a.element.removeEventListener("transitionend",s)};a.element.addEventListener("transitionend",s)}else y(a.element,"dv-tab--shifting",!1)}}resetTabTransforms(){for(const e of this._tabs)e.value.element.style.removeProperty("margin-left"),e.value.element.style.removeProperty("transform"),y(e.value.element,"dv-tab--shifting",!1)}resetDragAnimation(){this.resetTabTransforms(),this._animState=null;for(const e of this._tabs)y(e.value.element,"dv-tab--dragging",!1)}runFlipAnimation(e,t,i=!1,n){let o=!1;for(let a=0;a<this._tabs.length;a++){const s=this._tabs[a],d=s.value.panel.id;if(d===t){if(i){const m=s.value.element.getBoundingClientRect();s.value.element.style.transform=`translateX(${m.width}px)`,y(s.value.element,"dv-tab--shifting",!0),o=!0}continue}if(n!==void 0&&(a<n.from||a>n.to))continue;const l=e.get(d);if(!l)continue;const c=s.value.element.getBoundingClientRect(),v=l.left-c.left;Math.abs(v)<1||(s.value.element.style.transform=`translateX(${v}px)`,y(s.value.element,"dv-tab--shifting",!0),o=!0)}o&&requestAnimationFrame(()=>{for(const s of this._tabs)s.value.element.style.transform&&(s.value.element.style.transform="");const a=s=>{if(s.propertyName==="transform"){this._tabsList.removeEventListener("transitionend",a);for(const d of this._tabs)y(d.value.element,"dv-tab--shifting",!1)}};this._tabsList.addEventListener("transitionend",a)})}}const st=r=>{const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttributeNS(null,"height",r.height),e.setAttributeNS(null,"width",r.width),e.setAttributeNS(null,"viewBox",r.viewbox),e.setAttributeNS(null,"aria-hidden","false"),e.setAttributeNS(null,"focusable","false"),e.classList.add("dv-svg");const t=document.createElementNS("http://www.w3.org/2000/svg","path");return t.setAttributeNS(null,"d",r.path),e.appendChild(t),e},nn=()=>st({width:"11",height:"11",viewbox:"0 0 28 28",path:"M2.1 27.3L0 25.2L11.55 13.65L0 2.1L2.1 0L13.65 11.55L25.2 0L27.3 2.1L15.75 13.65L27.3 25.2L25.2 27.3L13.65 15.75L2.1 27.3Z"}),on=()=>st({width:"11",height:"11",viewbox:"0 0 24 15",path:"M12 14.15L0 2.15L2.15 0L12 9.9L21.85 0.0499992L24 2.2L12 14.15Z"}),Kt=()=>st({width:"11",height:"11",viewbox:"0 0 15 25",path:"M2.15 24.1L0 21.95L9.9 12.05L0 2.15L2.15 0L14.2 12.05L2.15 24.1Z"});function rn(){const r=document.createElement("div");r.className="dv-tabs-overflow-dropdown-default";const e=document.createElement("span");e.textContent="";const t=Kt();return r.appendChild(t),r.appendChild(e),{element:r,update:i=>{e.textContent=`${i.tabs}`}}}class an extends A{get onTabDragStart(){return this.tabs.onTabDragStart}get panels(){return this.tabs.panels}get size(){return this.tabs.size}get hidden(){return this._hidden}set hidden(e){this._hidden=e,this.element.style.display=e?"none":""}get direction(){return this._direction}set direction(e){this._direction=e,e==="vertical"?(le(this._element,"dv-groupview-header-vertical"),le(this.rightActionsContainer,"dv-right-actions-container-vertical"),this.tabs.direction=e):(de(this._element,"dv-groupview-header-vertical"),de(this.rightActionsContainer,"dv-right-actions-container-vertical"),this.tabs.direction=e)}get element(){return this._element}constructor(e,t){super(),this.accessor=e,this.group=t,this._hidden=!1,this._direction="horizontal",this.dropdownPart=null,this._overflowTabs=[],this._dropdownDisposable=new K,this._onDrop=new p,this.onDrop=this._onDrop.event,this._onGroupDragStart=new p,this.onGroupDragStart=this._onGroupDragStart.event,this._onWillShowOverlay=new p,this.onWillShowOverlay=this._onWillShowOverlay.event,this._element=document.createElement("div"),this._element.className="dv-tabs-and-actions-container",y(this._element,"dv-full-width-single-tab",this.accessor.options.singleTabMode==="fullwidth"),this.rightActionsContainer=document.createElement("div"),this.rightActionsContainer.className="dv-right-actions-container",this.leftActionsContainer=document.createElement("div"),this.leftActionsContainer.className="dv-left-actions-container",this.preActionsContainer=document.createElement("div"),this.preActionsContainer.className="dv-pre-actions-container",this.tabs=new tn(t,e,{showTabsOverflowControl:!e.options.disableTabsOverflowList}),this.voidContainer=new en(this.accessor,this.group),this._element.appendChild(this.preActionsContainer),this._element.appendChild(this.tabs.element),this._element.appendChild(this.leftActionsContainer),this._element.appendChild(this.voidContainer.element),this._element.appendChild(this.rightActionsContainer),this.addDisposables(this.tabs.onDrop(i=>this._onDrop.fire(i)),this.tabs.onWillShowOverlay(i=>this._onWillShowOverlay.fire(i)),e.onDidOptionsChange(()=>{this.tabs.showTabsOverflowControl=!e.options.disableTabsOverflowList}),this.tabs.onOverflowTabsChange(i=>{this.toggleDropdown(i)}),this.tabs,this._onWillShowOverlay,this._onDrop,this._onGroupDragStart,this.voidContainer,this.voidContainer.onDragStart(i=>{this._onGroupDragStart.fire({nativeEvent:i,group:this.group})}),this.voidContainer.onDrop(i=>{this._onDrop.fire({event:i.nativeEvent,index:this.tabs.size})}),this.voidContainer.onWillShowOverlay(i=>{this._onWillShowOverlay.fire(new He(i,{kind:"header_space",panel:this.group.activePanel,api:this.accessor.api,group:this.group,getData:ee}))}),E(this.voidContainer.element,"pointerdown",i=>{if(i.defaultPrevented)return;if(!this.accessor.options.disableFloatingGroups&&i.shiftKey&&this.group.api.location.type!=="floating"){i.preventDefault();const{top:o,left:a}=this.element.getBoundingClientRect(),{top:s,left:d}=this.accessor.element.getBoundingClientRect();this.accessor.addFloatingGroup(this.group,{x:a-d+20,y:o-s+20,inDragMode:!0})}}))}show(){this.hidden||(this.element.style.display="")}hide(){this._element.style.display="none"}setRightActionsElement(e){this.rightActions!==e&&(this.rightActions&&(this.rightActions.remove(),this.rightActions=void 0),e&&(this.rightActionsContainer.appendChild(e),this.rightActions=e))}setLeftActionsElement(e){this.leftActions!==e&&(this.leftActions&&(this.leftActions.remove(),this.leftActions=void 0),e&&(this.leftActionsContainer.appendChild(e),this.leftActions=e))}setPrefixActionsElement(e){this.preActions!==e&&(this.preActions&&(this.preActions.remove(),this.preActions=void 0),e&&(this.preActionsContainer.appendChild(e),this.preActions=e))}isActive(e){return this.tabs.isActive(e)}indexOf(e){return this.tabs.indexOf(e)}setActive(e){}delete(e){this.tabs.delete(e),this.updateClassnames()}setActivePanel(e){this.tabs.setActivePanel(e)}openPanel(e,t=this.tabs.size){this.tabs.openPanel(e,t),this.updateClassnames()}closePanel(e){this.delete(e.id)}updateClassnames(){y(this._element,"dv-single-tab",this.size===1)}toggleDropdown(e){const t=e.reset?[]:e.tabs;if(this._overflowTabs=t,this._overflowTabs.length>0&&this.dropdownPart){this.dropdownPart.update({tabs:t.length});return}if(this._overflowTabs.length===0){this._dropdownDisposable.dispose();return}const i=document.createElement("div");i.className="dv-tabs-overflow-dropdown-root";const n=rn();n.update({tabs:t.length}),this.dropdownPart=n,i.appendChild(n.element),this.rightActionsContainer.prepend(i),this._dropdownDisposable.value=new A(X.from(()=>{var o,a;i.remove(),(a=(o=this.dropdownPart)===null||o===void 0?void 0:o.dispose)===null||a===void 0||a.call(o),this.dropdownPart=null}),E(i,"pointerdown",o=>{o.preventDefault()},{capture:!0}),E(i,"click",o=>{const a=document.createElement("div");a.style.overflow="auto",a.className="dv-tabs-overflow-container";for(const d of this.tabs.tabs.filter(l=>this._overflowTabs.includes(l.panel.id))){const l=this.group.panels.find(g=>g===d.panel),v=l.view.createTabRenderer("headerOverflow").element,m=document.createElement("div");y(m,"dv-tab",!0),y(m,"dv-active-tab",l.api.isActive),y(m,"dv-inactive-tab",!l.api.isActive),m.addEventListener("click",g=>{this.accessor.popupService.close(),!g.defaultPrevented&&(d.element.scrollIntoView(),d.panel.api.setActive())}),m.appendChild(v),a.appendChild(m)}const s=Ci(i);this.accessor.popupService.openPopover(a,{x:o.clientX,y:o.clientY,zIndex:s!=null&&s.style.zIndex?`calc(${s.style.zIndex} * 2)`:void 0})}))}updateDragAndDropState(){this.tabs.updateDragAndDropState(),this.voidContainer.updateDragAndDropState()}}class Qt extends Lt{constructor(e,t,i,n,o){super(),this.nativeEvent=e,this.target=t,this.position=i,this.getData=n,this.group=o}}const tt=Object.keys({disableAutoResizing:void 0,hideBorders:void 0,singleTabMode:void 0,disableFloatingGroups:void 0,floatingGroupBounds:void 0,popoutUrl:void 0,defaultRenderer:void 0,defaultHeaderPosition:void 0,debug:void 0,rootOverlayModel:void 0,locked:void 0,disableDnd:void 0,className:void 0,noPanelsOverlay:void 0,dndEdges:void 0,theme:void 0,disableTabsOverflowList:void 0,scrollbars:void 0,tabAnimation:void 0});function sn(r){return!!r.referencePanel}function dn(r){return!!r.referenceGroup}function ln(r){return!!r.referencePanel}function cn(r){return!!r.referenceGroup}class dt extends it{get nativeEvent(){return this.options.nativeEvent}get position(){return this.options.position}get panel(){return this.options.panel}get group(){return this.options.group}get api(){return this.options.api}constructor(e){super(),this.options=e}getData(){return this.options.getData()}}class ei extends dt{get kind(){return this._kind}constructor(e){super(e),this._kind=e.kind}}class hn extends A{get element(){throw new Error("dockview: not supported")}get activePanel(){return this._activePanel}get locked(){return this._locked}set locked(e){this._locked=e,y(this.container,"dv-locked-groupview",e==="no-drop-target"||e)}get isActive(){return this._isGroupActive}get panels(){return this._panels}get size(){return this._panels.length}get isEmpty(){return this._panels.length===0}get hasWatermark(){return!!(this.watermark&&this.container.contains(this.watermark.element))}get header(){return this.tabsContainer}get isContentFocused(){return document.activeElement?Ye(document.activeElement,this.contentContainer.element):!1}get headerPosition(){var e;return(e=this._headerPosition)!==null&&e!==void 0?e:"top"}set headerPosition(e){var t;this._headerPosition=e,de(this.container,"dv-groupview-header-top","dv-groupview-header-bottom","dv-groupview-header-left","dv-groupview-header-right"),le(this.container,`dv-groupview-header-${e}`);const i=e==="top"||e==="bottom"?"horizontal":"vertical";this.tabsContainer.direction=i,this.header.direction=i,!((t=this._activePanel)===null||t===void 0)&&t.layout&&this._activePanel.layout(this._width,this._height),(this._leftHeaderActions||this._rightHeaderActions||this._prefixHeaderActions)&&this.updateHeaderActions()}get location(){return this._location}set location(e){switch(this._location=e,y(this.container,"dv-groupview-floating",!1),y(this.container,"dv-groupview-popout",!1),e.type){case"grid":this.contentContainer.dropTarget.setTargetZones(["top","bottom","left","right","center"]);break;case"floating":this.contentContainer.dropTarget.setTargetZones(["center"]),this.contentContainer.dropTarget.setTargetZones(e?["center"]:["top","bottom","left","right","center"]),y(this.container,"dv-groupview-floating",!0);break;case"popout":this.contentContainer.dropTarget.setTargetZones(["center"]),y(this.container,"dv-groupview-popout",!0);break}this.groupPanel.api._onDidLocationChange.fire({location:this.location})}constructor(e,t,i,n,o){var a,s;super(),this.container=e,this.accessor=t,this.id=i,this.options=n,this.groupPanel=o,this._isGroupActive=!1,this._locked=!1,this._rightHeaderActionsDisposable=new K,this._leftHeaderActionsDisposable=new K,this._prefixHeaderActionsDisposable=new K,this._location={type:"grid"},this.mostRecentlyUsed=[],this._overwriteRenderContainer=null,this._overwriteDropTargetContainer=null,this._onDidChange=new p,this.onDidChange=this._onDidChange.event,this._width=0,this._height=0,this._panels=[],this._panelDisposables=new Map,this._onMove=new p,this.onMove=this._onMove.event,this._onDidDrop=new p,this.onDidDrop=this._onDidDrop.event,this._onWillDrop=new p,this.onWillDrop=this._onWillDrop.event,this._onWillShowOverlay=new p,this.onWillShowOverlay=this._onWillShowOverlay.event,this._onTabDragStart=new p,this.onTabDragStart=this._onTabDragStart.event,this._onGroupDragStart=new p,this.onGroupDragStart=this._onGroupDragStart.event,this._onDidAddPanel=new p,this.onDidAddPanel=this._onDidAddPanel.event,this._onDidPanelTitleChange=new p,this.onDidPanelTitleChange=this._onDidPanelTitleChange.event,this._onDidPanelParametersChange=new p,this.onDidPanelParametersChange=this._onDidPanelParametersChange.event,this._onDidRemovePanel=new p,this.onDidRemovePanel=this._onDidRemovePanel.event,this._onDidActivePanelChange=new p,this.onDidActivePanelChange=this._onDidActivePanelChange.event,this._onUnhandledDragOverEvent=new p,this.onUnhandledDragOverEvent=this._onUnhandledDragOverEvent.event,y(this.container,"dv-groupview",!0),this._api=new Ve(this.accessor),this.tabsContainer=new an(this.accessor,this.groupPanel),this.contentContainer=new Xi(this.accessor,this),e.append(this.tabsContainer.element,this.contentContainer.element),this.header.hidden=!!n.hideHeader,this.locked=(a=n.locked)!==null&&a!==void 0?a:!1,this.headerPosition=(s=n.headerPosition)!==null&&s!==void 0?s:t.defaultHeaderPosition,this.addDisposables(this._onTabDragStart,this._onGroupDragStart,this._onWillShowOverlay,this._rightHeaderActionsDisposable,this._leftHeaderActionsDisposable,this._prefixHeaderActionsDisposable,this.tabsContainer.onTabDragStart(d=>{this._onTabDragStart.fire(d)}),this.tabsContainer.onGroupDragStart(d=>{this._onGroupDragStart.fire(d)}),this.tabsContainer.onDrop(d=>{this.handleDropEvent("header",d.event,"center",d.index)}),this.contentContainer.onDidFocus(()=>{this.accessor.doSetGroupActive(this.groupPanel)}),this.contentContainer.onDidBlur(()=>{}),this.contentContainer.dropTarget.onDrop(d=>{this.handleDropEvent("content",d.nativeEvent,d.position)}),this.tabsContainer.onWillShowOverlay(d=>{this._onWillShowOverlay.fire(d)}),this.contentContainer.dropTarget.onWillShowOverlay(d=>{this._onWillShowOverlay.fire(new He(d,{kind:"content",panel:this.activePanel,api:this._api,group:this.groupPanel,getData:ee}))}),this._onMove,this._onDidChange,this._onDidDrop,this._onWillDrop,this._onDidAddPanel,this._onDidRemovePanel,this._onDidActivePanelChange,this._onUnhandledDragOverEvent,this._onDidPanelTitleChange,this._onDidPanelParametersChange)}focusContent(){this.contentContainer.element.focus()}set renderContainer(e){this.panels.forEach(t=>{this.renderContainer.detatch(t)}),this._overwriteRenderContainer=e,this.panels.forEach(t=>{this.rerender(t)})}get renderContainer(){var e;return(e=this._overwriteRenderContainer)!==null&&e!==void 0?e:this.accessor.overlayRenderContainer}set dropTargetContainer(e){this._overwriteDropTargetContainer=e}get dropTargetContainer(){var e;return(e=this._overwriteDropTargetContainer)!==null&&e!==void 0?e:this.accessor.rootDropTargetContainer}initialize(){this.options.panels&&this.options.panels.forEach(e=>{this.doAddPanel(e)}),this.options.activePanel&&this.openPanel(this.options.activePanel),this.setActive(this.isActive,!0),this.updateContainer(),this.updateHeaderActions()}updateHeaderActions(){this.accessor.options.createRightHeaderActionComponent?(this._rightHeaderActions=this.accessor.options.createRightHeaderActionComponent(this.groupPanel),this._rightHeaderActionsDisposable.value=this._rightHeaderActions,this._rightHeaderActions.init({containerApi:this._api,api:this.groupPanel.api,group:this.groupPanel}),this.tabsContainer.setRightActionsElement(this._rightHeaderActions.element)):(this._rightHeaderActions=void 0,this._rightHeaderActionsDisposable.dispose(),this.tabsContainer.setRightActionsElement(void 0)),this.accessor.options.createLeftHeaderActionComponent?(this._leftHeaderActions=this.accessor.options.createLeftHeaderActionComponent(this.groupPanel),this._leftHeaderActionsDisposable.value=this._leftHeaderActions,this._leftHeaderActions.init({containerApi:this._api,api:this.groupPanel.api,group:this.groupPanel}),this.tabsContainer.setLeftActionsElement(this._leftHeaderActions.element)):(this._leftHeaderActions=void 0,this._leftHeaderActionsDisposable.dispose(),this.tabsContainer.setLeftActionsElement(void 0)),this.accessor.options.createPrefixHeaderActionComponent?(this._prefixHeaderActions=this.accessor.options.createPrefixHeaderActionComponent(this.groupPanel),this._prefixHeaderActionsDisposable.value=this._prefixHeaderActions,this._prefixHeaderActions.init({containerApi:this._api,api:this.groupPanel.api,group:this.groupPanel}),this.tabsContainer.setPrefixActionsElement(this._prefixHeaderActions.element)):(this._prefixHeaderActions=void 0,this._prefixHeaderActionsDisposable.dispose(),this.tabsContainer.setPrefixActionsElement(void 0))}rerender(e){this.contentContainer.renderPanel(e,{asActive:!1})}indexOf(e){return this.tabsContainer.indexOf(e.id)}toJSON(){var e;const t={views:this.tabsContainer.panels,activeView:(e=this._activePanel)===null||e===void 0?void 0:e.id,id:this.id};return this.locked!==!1&&(t.locked=this.locked),this.header.hidden&&(t.hideHeader=!0),this.headerPosition!=="top"&&(t.headerPosition=this.headerPosition),t}moveToNext(e){e||(e={}),e.panel||(e.panel=this.activePanel);const t=e.panel?this.panels.indexOf(e.panel):-1;let i;if(t<this.panels.length-1)i=t+1;else if(!e.suppressRoll)i=0;else return;this.openPanel(this.panels[i])}moveToPrevious(e){if(e||(e={}),e.panel||(e.panel=this.activePanel),!e.panel)return;const t=this.panels.indexOf(e.panel);let i;if(t>0)i=t-1;else if(!e.suppressRoll)i=this.panels.length-1;else return;this.openPanel(this.panels[i])}containsPanel(e){return this.panels.includes(e)}init(e){}update(e){}focus(){var e;(e=this._activePanel)===null||e===void 0||e.focus()}openPanel(e,t={}){(typeof t.index!="number"||t.index>this.panels.length)&&(t.index=this.panels.length);const i=!!t.skipSetActive;if(e.updateParentGroup(this.groupPanel,{skipSetActive:t.skipSetActive}),this.doAddPanel(e,t.index,{skipSetActive:i}),this._activePanel===e){this.contentContainer.renderPanel(e,{asActive:!0});return}i||this.doSetActivePanel(e),t.skipSetGroupActive||this.accessor.doSetGroupActive(this.groupPanel),t.skipSetActive||this.updateContainer()}removePanel(e,t={skipSetActive:!1}){const i=typeof e=="string"?e:e.id,n=this._panels.find(o=>o.id===i);if(!n)throw new Error("invalid operation");return this._removePanel(n,t)}closeAllPanels(){if(this.panels.length>0){const e=[...this.panels];for(const t of e)this.doClose(t)}else this.accessor.removeGroup(this.groupPanel)}closePanel(e){this.doClose(e)}doClose(e){const t=this.panels.length===1&&this.accessor.groups.length===1;this.accessor.removePanel(e,t&&this.accessor.options.noPanelsOverlay==="emptyGroup"?{removeEmptyGroup:!1}:void 0)}isPanelActive(e){return this._activePanel===e}updateActions(e){this.tabsContainer.setRightActionsElement(e)}setActive(e,t=!1){!t&&this.isActive===e||(this._isGroupActive=e,y(this.container,"dv-active-group",e),y(this.container,"dv-inactive-group",!e),this.tabsContainer.setActive(this.isActive),!this._activePanel&&this.panels.length>0&&this.doSetActivePanel(this.panels[0]),this.updateContainer())}layout(e,t){var i;this._width=e,this._height=t,this.contentContainer.layout(this._width,this._height),!((i=this._activePanel)===null||i===void 0)&&i.layout&&this._activePanel.layout(this._width,this._height)}_removePanel(e,t){const i=this._activePanel===e;if(this.doRemovePanel(e),i&&this.panels.length>0){const n=this.mostRecentlyUsed[0];this.openPanel(n,{skipSetActive:t.skipSetActive,skipSetGroupActive:t.skipSetActiveGroup})}return this._activePanel&&this.panels.length===0&&this.doSetActivePanel(void 0),t.skipSetActive||this.updateContainer(),e}doRemovePanel(e){const t=this.panels.indexOf(e);if(this._activePanel===e&&this.contentContainer.closePanel(),this.tabsContainer.delete(e.id),this._panels.splice(t,1),this.mostRecentlyUsed.includes(e)){const n=this.mostRecentlyUsed.indexOf(e);this.mostRecentlyUsed.splice(n,1)}const i=this._panelDisposables.get(e.id);i&&(i.dispose(),this._panelDisposables.delete(e.id)),this._onDidRemovePanel.fire({panel:e})}doAddPanel(e,t=this.panels.length,i={skipSetActive:!1}){const o=this._panels.indexOf(e)>-1;this.tabsContainer.show(),this.contentContainer.show(),this.tabsContainer.openPanel(e,t),i.skipSetActive?e.api.renderer==="always"&&this.contentContainer.renderPanel(e,{asActive:!1}):this.contentContainer.openPanel(e),!o&&(this.updateMru(e),this.panels.splice(t,0,e),this._panelDisposables.set(e.id,new A(e.api.onDidTitleChange(a=>this._onDidPanelTitleChange.fire(a)),e.api.onDidParametersChange(a=>this._onDidPanelParametersChange.fire(a)))),this._onDidAddPanel.fire({panel:e}))}doSetActivePanel(e){this._activePanel!==e&&(this._activePanel=e,e&&(this.tabsContainer.setActivePanel(e),this.contentContainer.openPanel(e),e.layout(this._width,this._height),this.updateMru(e),this.contentContainer.refreshFocusState(),this._onDidActivePanelChange.fire({panel:e})))}updateMru(e){this.mostRecentlyUsed.includes(e)&&this.mostRecentlyUsed.splice(this.mostRecentlyUsed.indexOf(e),1),this.mostRecentlyUsed=[e,...this.mostRecentlyUsed]}updateContainer(){var e,t;if(this.panels.forEach(i=>i.runEvents()),this.isEmpty&&!this.watermark){const i=this.accessor.createWatermarkComponent();i.init({containerApi:this._api,group:this.groupPanel}),this.watermark=i,E(this.watermark.element,"pointerdown",()=>{this.isActive||this.accessor.doSetGroupActive(this.groupPanel)}),this.contentContainer.element.appendChild(this.watermark.element)}!this.isEmpty&&this.watermark&&(this.watermark.element.remove(),(t=(e=this.watermark).dispose)===null||t===void 0||t.call(e),this.watermark=void 0)}canDisplayOverlay(e,t,i){const n=new Qt(e,i,t,ee,this.accessor.getPanel(this.id));return this._onUnhandledDragOverEvent.fire(n),n.isAccepted}handleDropEvent(e,t,i,n){if(this.locked==="no-drop-target")return;function o(){switch(e){case"header":return typeof n=="number"?"tab":"header_space";case"content":return"content"}}const a=typeof n=="number"?this.panels[n]:void 0,s=new ei({nativeEvent:t,position:i,panel:a,getData:()=>ee(),kind:o(),group:this.groupPanel,api:this._api});if(this._onWillDrop.fire(s),s.defaultPrevented)return;const d=ee();if(d&&d.viewId===this.accessor.id){if(e==="content"&&d.groupId===this.id&&(i==="center"||d.panelId===null)||e==="header"&&d.groupId===this.id&&d.panelId===null)return;if(d.panelId===null){const{groupId:g}=d;this._onMove.fire({target:i,groupId:g,index:n});return}if(this.tabsContainer.indexOf(d.panelId)!==-1&&this.tabsContainer.size===1)return;const{groupId:c,panelId:v}=d;if(this.id===c&&!i&&this.tabsContainer.indexOf(v)===n)return;this._onMove.fire({target:i,groupId:d.groupId,itemId:d.panelId,index:n})}else this._onDidDrop.fire(new dt({nativeEvent:t,position:i,panel:a,getData:()=>ee(),group:this.groupPanel,api:this._api}))}updateDragAndDropState(){this.tabsContainer.updateDragAndDropState()}dispose(){var e,t,i;super.dispose(),(e=this.watermark)===null||e===void 0||e.element.remove(),(i=(t=this.watermark)===null||t===void 0?void 0:t.dispose)===null||i===void 0||i.call(t),this.watermark=void 0;for(const n of this.panels)n.dispose();this.tabsContainer.dispose(),this.contentContainer.dispose()}}class lt extends Zt{constructor(e,t,i){super(e,t),this._onDidConstraintsChangeInternal=new p,this.onDidConstraintsChangeInternal=this._onDidConstraintsChangeInternal.event,this._onDidConstraintsChange=new p,this.onDidConstraintsChange=this._onDidConstraintsChange.event,this._onDidSizeChange=new p,this.onDidSizeChange=this._onDidSizeChange.event,this.addDisposables(this._onDidConstraintsChangeInternal,this._onDidConstraintsChange,this._onDidSizeChange),i&&this.initialize(i)}setConstraints(e){this._onDidConstraintsChangeInternal.fire(e)}setSize(e){this._onDidSizeChange.fire(e)}}class ti extends at{get priority(){return this._priority}get snap(){return this._snap}get minimumWidth(){return this.__minimumWidth()}get minimumHeight(){return this.__minimumHeight()}get maximumHeight(){return this.__maximumHeight()}get maximumWidth(){return this.__maximumWidth()}__minimumWidth(){const e=typeof this._minimumWidth=="function"?this._minimumWidth():this._minimumWidth;return e!==this._evaluatedMinimumWidth&&(this._evaluatedMinimumWidth=e,this.updateConstraints()),e}__maximumWidth(){const e=typeof this._maximumWidth=="function"?this._maximumWidth():this._maximumWidth;return e!==this._evaluatedMaximumWidth&&(this._evaluatedMaximumWidth=e,this.updateConstraints()),e}__minimumHeight(){const e=typeof this._minimumHeight=="function"?this._minimumHeight():this._minimumHeight;return e!==this._evaluatedMinimumHeight&&(this._evaluatedMinimumHeight=e,this.updateConstraints()),e}__maximumHeight(){const e=typeof this._maximumHeight=="function"?this._maximumHeight():this._maximumHeight;return e!==this._evaluatedMaximumHeight&&(this._evaluatedMaximumHeight=e,this.updateConstraints()),e}get isActive(){return this.api.isActive}get isVisible(){return this.api.isVisible}constructor(e,t,i,n){super(e,t,n??new lt(e,t)),this._evaluatedMinimumWidth=0,this._evaluatedMaximumWidth=Number.MAX_SAFE_INTEGER,this._evaluatedMinimumHeight=0,this._evaluatedMaximumHeight=Number.MAX_SAFE_INTEGER,this._minimumWidth=0,this._minimumHeight=0,this._maximumWidth=Number.MAX_SAFE_INTEGER,this._maximumHeight=Number.MAX_SAFE_INTEGER,this._snap=!1,this._onDidChange=new p,this.onDidChange=this._onDidChange.event,typeof(i==null?void 0:i.minimumWidth)=="number"&&(this._minimumWidth=i.minimumWidth),typeof(i==null?void 0:i.maximumWidth)=="number"&&(this._maximumWidth=i.maximumWidth),typeof(i==null?void 0:i.minimumHeight)=="number"&&(this._minimumHeight=i.minimumHeight),typeof(i==null?void 0:i.maximumHeight)=="number"&&(this._maximumHeight=i.maximumHeight),this.api.initialize(this),this.addDisposables(this.api.onWillVisibilityChange(o=>{const{isVisible:a}=o,{accessor:s}=this._params;s.setVisible(this,a)}),this.api.onActiveChange(()=>{const{accessor:o}=this._params;o.doSetGroupActive(this)}),this.api.onDidConstraintsChangeInternal(o=>{(typeof o.minimumWidth=="number"||typeof o.minimumWidth=="function")&&(this._minimumWidth=o.minimumWidth),(typeof o.minimumHeight=="number"||typeof o.minimumHeight=="function")&&(this._minimumHeight=o.minimumHeight),(typeof o.maximumWidth=="number"||typeof o.maximumWidth=="function")&&(this._maximumWidth=o.maximumWidth),(typeof o.maximumHeight=="number"||typeof o.maximumHeight=="function")&&(this._maximumHeight=o.maximumHeight)}),this.api.onDidSizeChange(o=>{this._onDidChange.fire({height:o.height,width:o.width})}),this._onDidChange)}setVisible(e){this.api._onDidVisibilityChange.fire({isVisible:e})}setActive(e){this.api._onDidActiveChange.fire({isActive:e})}init(e){e.maximumHeight&&(this._maximumHeight=e.maximumHeight),e.minimumHeight&&(this._minimumHeight=e.minimumHeight),e.maximumWidth&&(this._maximumWidth=e.maximumWidth),e.minimumWidth&&(this._minimumWidth=e.minimumWidth),this._priority=e.priority,this._snap=!!e.snap,super.init(e),typeof e.isVisible=="boolean"&&this.setVisible(e.isVisible)}updateConstraints(){this.api._onDidConstraintsChange.fire({minimumWidth:this._evaluatedMinimumWidth,maximumWidth:this._evaluatedMaximumWidth,minimumHeight:this._evaluatedMinimumHeight,maximumHeight:this._evaluatedMaximumHeight})}toJSON(){const e=super.toJSON(),t=n=>n===Number.MAX_SAFE_INTEGER?void 0:n,i=n=>n<=0?void 0:n;return Object.assign(Object.assign({},e),{minimumHeight:i(this.minimumHeight),maximumHeight:t(this.maximumHeight),minimumWidth:i(this.minimumWidth),maximumWidth:t(this.maximumWidth),snap:this.snap,priority:this.priority})}}const fe="dockview: DockviewGroupPanelApiImpl not initialized";class vn extends lt{get location(){if(!this._group)throw new Error(fe);return this._group.model.location}constructor(e,t){super(e,"__dockviewgroup__"),this.accessor=t,this._onDidLocationChange=new p,this.onDidLocationChange=this._onDidLocationChange.event,this._onDidActivePanelChange=new p,this.onDidActivePanelChange=this._onDidActivePanelChange.event,this.addDisposables(this._onDidLocationChange,this._onDidActivePanelChange,this._onDidVisibilityChange.event(i=>{i.isVisible&&this._pendingSize&&(super.setSize(this._pendingSize),this._pendingSize=void 0)}))}setSize(e){this._pendingSize=Object.assign({},e),super.setSize(e)}close(){if(this._group)return this.accessor.removeGroup(this._group)}getWindow(){return this.location.type==="popout"?this.location.getWindow():window}setHeaderPosition(e){if(!this._group)throw new Error(fe);this._group.model.headerPosition=e}getHeaderPosition(){if(!this._group)throw new Error(fe);return this._group.model.headerPosition}moveTo(e){var t,i,n,o;if(!this._group)throw new Error(fe);const a=(t=e.group)!==null&&t!==void 0?t:this.accessor.addGroup({direction:Mi((i=e.position)!==null&&i!==void 0?i:"right"),skipSetActive:(n=e.skipSetActive)!==null&&n!==void 0?n:!1});this.accessor.moveGroupOrPanel({from:{groupId:this._group.id},to:{group:a,position:e.group&&(o=e.position)!==null&&o!==void 0?o:"center",index:e.index},skipSetActive:e.skipSetActive})}maximize(){if(!this._group)throw new Error(fe);this.location.type==="grid"&&this.accessor.maximizeGroup(this._group)}isMaximized(){if(!this._group)throw new Error(fe);return this.accessor.isMaximizedGroup(this._group)}exitMaximized(){if(!this._group)throw new Error(fe);this.isMaximized()&&this.accessor.exitMaximizedGroup()}initialize(e){this._group=e}}const pn=100,un=100;class wt extends ti{get minimumWidth(){var e;if(typeof this._explicitConstraints.minimumWidth=="number")return this._explicitConstraints.minimumWidth;const t=(e=this.activePanel)===null||e===void 0?void 0:e.minimumWidth;return typeof t=="number"?t:super.__minimumWidth()}get minimumHeight(){var e;if(typeof this._explicitConstraints.minimumHeight=="number")return this._explicitConstraints.minimumHeight;const t=(e=this.activePanel)===null||e===void 0?void 0:e.minimumHeight;return typeof t=="number"?t:super.__minimumHeight()}get maximumWidth(){var e;if(typeof this._explicitConstraints.maximumWidth=="number")return this._explicitConstraints.maximumWidth;const t=(e=this.activePanel)===null||e===void 0?void 0:e.maximumWidth;return typeof t=="number"?t:super.__maximumWidth()}get maximumHeight(){var e;if(typeof this._explicitConstraints.maximumHeight=="number")return this._explicitConstraints.maximumHeight;const t=(e=this.activePanel)===null||e===void 0?void 0:e.maximumHeight;return typeof t=="number"?t:super.__maximumHeight()}get panels(){return this._model.panels}get activePanel(){return this._model.activePanel}get size(){return this._model.size}get model(){return this._model}get locked(){return this._model.locked}set locked(e){this._model.locked=e}get header(){return this._model.header}constructor(e,t,i){var n,o,a,s,d,l;super(t,"groupview_default",{minimumHeight:(o=(n=i.constraints)===null||n===void 0?void 0:n.minimumHeight)!==null&&o!==void 0?o:un,minimumWidth:(s=(a=i.constraints)===null||a===void 0?void 0:a.minimumWidth)!==null&&s!==void 0?s:pn,maximumHeight:(d=i.constraints)===null||d===void 0?void 0:d.maximumHeight,maximumWidth:(l=i.constraints)===null||l===void 0?void 0:l.maximumWidth},new vn(t,e)),this._explicitConstraints={},this.api.initialize(this),this._model=new hn(this.element,e,t,i,this),this.addDisposables(this.model.onDidActivePanelChange(c=>{this.api._onDidActivePanelChange.fire(c)}),this.api.onDidConstraintsChangeInternal(c=>{c.minimumWidth!==void 0&&(this._explicitConstraints.minimumWidth=typeof c.minimumWidth=="function"?c.minimumWidth():c.minimumWidth),c.minimumHeight!==void 0&&(this._explicitConstraints.minimumHeight=typeof c.minimumHeight=="function"?c.minimumHeight():c.minimumHeight),c.maximumWidth!==void 0&&(this._explicitConstraints.maximumWidth=typeof c.maximumWidth=="function"?c.maximumWidth():c.maximumWidth),c.maximumHeight!==void 0&&(this._explicitConstraints.maximumHeight=typeof c.maximumHeight=="function"?c.maximumHeight():c.maximumHeight)}))}focus(){this.api.isActive||this.api.setActive(),super.focus()}initialize(){this._model.initialize()}setActive(e){super.setActive(e),this.model.setActive(e)}layout(e,t){super.layout(e,t),this.model.layout(e,t)}getComponent(){return this._model}toJSON(){return this.model.toJSON()}}const gn={className:"dockview-theme-abyss"};class mn extends lt{get location(){return this.group.api.location}get title(){return this.panel.title}get isGroupActive(){return this.group.isActive}get renderer(){return this.panel.renderer}set group(e){const t=this._group;this._group!==e&&(this._group=e,this._onDidGroupChange.fire({}),this.setupGroupEventListeners(t),this._onDidLocationChange.fire({location:this.group.api.location}))}get group(){return this._group}get tabComponent(){return this._tabComponent}constructor(e,t,i,n,o){super(e.id,n),this.panel=e,this.accessor=i,this._onDidTitleChange=new p,this.onDidTitleChange=this._onDidTitleChange.event,this._onDidActiveGroupChange=new p,this.onDidActiveGroupChange=this._onDidActiveGroupChange.event,this._onDidGroupChange=new p,this.onDidGroupChange=this._onDidGroupChange.event,this._onDidRendererChange=new p,this.onDidRendererChange=this._onDidRendererChange.event,this._onDidLocationChange=new p,this.onDidLocationChange=this._onDidLocationChange.event,this.groupEventsDisposable=new K,this._tabComponent=o,this.initialize(e),this._group=t,this.setupGroupEventListeners(),this.addDisposables(this.groupEventsDisposable,this._onDidRendererChange,this._onDidTitleChange,this._onDidGroupChange,this._onDidActiveGroupChange,this._onDidLocationChange)}getWindow(){return this.group.api.getWindow()}moveTo(e){var t,i;this.accessor.moveGroupOrPanel({from:{groupId:this._group.id,panelId:this.panel.id},to:{group:(t=e.group)!==null&&t!==void 0?t:this._group,position:e.group&&(i=e.position)!==null&&i!==void 0?i:"center",index:e.index},skipSetActive:e.skipSetActive})}setTitle(e){this.panel.setTitle(e)}setRenderer(e){this.panel.setRenderer(e)}close(){this.group.model.closePanel(this.panel)}maximize(){this.group.api.maximize()}isMaximized(){return this.group.api.isMaximized()}exitMaximized(){this.group.api.exitMaximized()}setupGroupEventListeners(e){var t;let i=(t=e==null?void 0:e.isActive)!==null&&t!==void 0?t:!1;this.groupEventsDisposable.value=new A(this.group.api.onDidVisibilityChange(n=>{const o=!n.isVisible&&this.isVisible,a=n.isVisible&&!this.isVisible,s=this.group.model.isPanelActive(this.panel);(o||a&&s)&&this._onDidVisibilityChange.fire(n)}),this.group.api.onDidLocationChange(n=>{this.group===this.panel.group&&this._onDidLocationChange.fire(n)}),this.group.api.onDidActiveChange(()=>{this.group===this.panel.group&&i!==this.isGroupActive&&(i=this.isGroupActive,this._onDidActiveGroupChange.fire({isActive:this.isGroupActive}))}))}}class De extends A{get params(){return this._params}get title(){return this._title}get group(){return this._group}get renderer(){var e;return(e=this._renderer)!==null&&e!==void 0?e:this.accessor.renderer}get minimumWidth(){return this._minimumWidth}get minimumHeight(){return this._minimumHeight}get maximumWidth(){return this._maximumWidth}get maximumHeight(){return this._maximumHeight}constructor(e,t,i,n,o,a,s,d){super(),this.id=e,this.accessor=n,this.containerApi=o,this.view=s,this._renderer=d.renderer,this._group=a,this._minimumWidth=d.minimumWidth,this._minimumHeight=d.minimumHeight,this._maximumWidth=d.maximumWidth,this._maximumHeight=d.maximumHeight,this.api=new mn(this,this._group,n,t,i),this.addDisposables(this.api.onActiveChange(()=>{n.setActivePanel(this)}),this.api.onDidSizeChange(l=>{this.group.api.setSize(l)}),this.api.onDidRendererChange(()=>{this.group.model.rerender(this)}))}init(e){this._params=e.params,this.view.init(Object.assign(Object.assign({},e),{api:this.api,containerApi:this.containerApi})),this.setTitle(e.title)}focus(){const e=new Jt;this.api._onWillFocus.fire(e),!e.defaultPrevented&&(this.api.isActive||this.api.setActive())}toJSON(){return{id:this.id,contentComponent:this.view.contentComponent,tabComponent:this.view.tabComponent,params:Object.keys(this._params||{}).length>0?this._params:void 0,title:this.title,renderer:this._renderer,minimumHeight:this._minimumHeight,maximumHeight:this._maximumHeight,minimumWidth:this._minimumWidth,maximumWidth:this._maximumWidth}}setTitle(e){e!==this.title&&(this._title=e,this.api._onDidTitleChange.fire({title:e}))}setRenderer(e){e!==this.renderer&&(this._renderer=e,this.api._onDidRendererChange.fire({renderer:e}))}update(e){var t;this._params=Object.assign(Object.assign({},(t=this._params)!==null&&t!==void 0?t:{}),e.params);for(const i of Object.keys(e.params))e.params[i]===void 0&&delete this._params[i];this.view.update({params:this._params})}updateFromStateModel(e){var t,i,n;this._maximumHeight=e.maximumHeight,this._minimumHeight=e.minimumHeight,this._maximumWidth=e.maximumWidth,this._minimumWidth=e.minimumWidth,this.update({params:(t=e.params)!==null&&t!==void 0?t:{}}),this.setTitle((i=e.title)!==null&&i!==void 0?i:this.id),this.setRenderer((n=e.renderer)!==null&&n!==void 0?n:this.accessor.renderer)}updateParentGroup(e,t){this._group=e,this.api.group=this._group;const i=this._group.model.isPanelActive(this),n=this.group.api.isActive&&i;t!=null&&t.skipSetActive||this.api.isActive!==n&&this.api._onDidActiveChange.fire({isActive:this.group.api.isActive&&i}),this.api.isVisible!==i&&this.api._onDidVisibilityChange.fire({isVisible:i})}runEvents(){const e=this._group.model.isPanelActive(this),t=this.group.api.isActive&&e;this.api.isActive!==t&&this.api._onDidActiveChange.fire({isActive:this.group.api.isActive&&e}),this.api.isVisible!==e&&this.api._onDidVisibilityChange.fire({isVisible:e})}layout(e,t){this.api._onDidDimensionChange.fire({width:e,height:t}),this.view.layout(e,t)}dispose(){this.api.dispose(),this.view.dispose()}}class _t extends A{get element(){return this._element}constructor(){super(),this._element=document.createElement("div"),this._element.className="dv-default-tab",this._content=document.createElement("div"),this._content.className="dv-default-tab-content",this.action=document.createElement("div"),this.action.className="dv-default-tab-action",this.action.appendChild(nn()),this._element.appendChild(this._content),this._element.appendChild(this.action),this.render()}init(e){this._title=e.title,this.addDisposables(e.api.onDidTitleChange(t=>{this._title=t.title,this.render()}),E(this.action,"pointerdown",t=>{t.preventDefault()}),E(this.action,"click",t=>{t.defaultPrevented||(t.preventDefault(),e.api.close())})),this.render()}render(){var e;this._content.textContent!==this._title&&(this._content.textContent=(e=this._title)!==null&&e!==void 0?e:"")}}class ii{get content(){return this._content}get tab(){return this._tab}constructor(e,t,i,n){this.accessor=e,this.id=t,this.contentComponent=i,this.tabComponent=n,this._content=this.createContentComponent(this.id,i),this._tab=this.createTabComponent(this.id,n)}createTabRenderer(e){var t;const i=this.createTabComponent(this.id,this.tabComponent);return this._params&&i.init(Object.assign(Object.assign({},this._params),{tabLocation:e})),this._updateEvent&&((t=i.update)===null||t===void 0||t.call(i,this._updateEvent)),i}init(e){this._params=e,this.content.init(e),this.tab.init(Object.assign(Object.assign({},e),{tabLocation:"header"}))}layout(e,t){var i,n;(n=(i=this.content).layout)===null||n===void 0||n.call(i,e,t)}update(e){var t,i,n,o;this._updateEvent=e,(i=(t=this.content).update)===null||i===void 0||i.call(t,e),(o=(n=this.tab).update)===null||o===void 0||o.call(n,e)}dispose(){var e,t,i,n;(t=(e=this.content).dispose)===null||t===void 0||t.call(e),(n=(i=this.tab).dispose)===null||n===void 0||n.call(i)}createContentComponent(e,t){return this.accessor.options.createComponent({id:e,name:t})}createTabComponent(e,t){const i=t??this.accessor.options.defaultTabComponent;if(i){if(this.accessor.options.createTabComponent){const n=this.accessor.options.createTabComponent({id:e,name:i});return n||new _t}console.warn(`dockview: tabComponent '${t}' was not found. falling back to the default tab.`)}return new _t}}class bn{constructor(e){this.accessor=e}fromJSON(e,t){var i,n;const o=e.id,a=e.params,s=e.title,d=e.view,l=d?d.content.id:(i=e.contentComponent)!==null&&i!==void 0?i:"unknown",c=d?(n=d.tab)===null||n===void 0?void 0:n.id:e.tabComponent,v=new ii(this.accessor,o,l,c),m=new De(o,l,c,this.accessor,new Ve(this.accessor),t,v,{renderer:e.renderer,minimumWidth:e.minimumWidth,minimumHeight:e.minimumHeight,maximumWidth:e.maximumWidth,maximumHeight:e.maximumHeight});return m.init({title:s??o,params:a??{}}),m}}class fn extends A{get element(){return this._element}constructor(){super(),this._element=document.createElement("div"),this._element.className="dv-watermark"}init(e){}}class wn{constructor(){this._orderedList=[]}push(e){this._orderedList=[...this._orderedList.filter(t=>t!==e),e],this.update()}destroy(e){this._orderedList=this._orderedList.filter(t=>t!==e),this.update()}update(){for(let e=0;e<this._orderedList.length;e++)this._orderedList[e].setAttribute("aria-level",`${e}`),this._orderedList[e].style.zIndex=`calc(var(--dv-overlay-z-index, 999) + ${e*2})`}}const Pe=new wn;class ve extends A{set minimumInViewportWidth(e){this.options.minimumInViewportWidth=e}set minimumInViewportHeight(e){this.options.minimumInViewportHeight=e}get element(){return this._element}get isVisible(){return this._isVisible}constructor(e){super(),this.options=e,this._element=document.createElement("div"),this._onDidChange=new p,this.onDidChange=this._onDidChange.event,this._onDidChangeEnd=new p,this.onDidChangeEnd=this._onDidChangeEnd.event,this.addDisposables(this._onDidChange,this._onDidChangeEnd),this._element.className="dv-resize-container",this._isVisible=!0,this.setupResize("top"),this.setupResize("bottom"),this.setupResize("left"),this.setupResize("right"),this.setupResize("topleft"),this.setupResize("topright"),this.setupResize("bottomleft"),this.setupResize("bottomright"),this._element.appendChild(this.options.content),this.options.container.appendChild(this._element),this.setBounds(Object.assign(Object.assign(Object.assign(Object.assign({height:this.options.height,width:this.options.width},"top"in this.options&&{top:this.options.top}),"bottom"in this.options&&{bottom:this.options.bottom}),"left"in this.options&&{left:this.options.left}),"right"in this.options&&{right:this.options.right})),Pe.push(this._element)}setVisible(e){e!==this.isVisible&&(this._isVisible=e,y(this.element,"dv-hidden",!this.isVisible))}bringToFront(){Pe.push(this._element)}setBounds(e={}){typeof e.height=="number"&&(this._element.style.height=`${e.height}px`),typeof e.width=="number"&&(this._element.style.width=`${e.width}px`),"top"in e&&typeof e.top=="number"&&(this._element.style.top=`${e.top}px`,this._element.style.bottom="auto",this.verticalAlignment="top"),"bottom"in e&&typeof e.bottom=="number"&&(this._element.style.bottom=`${e.bottom}px`,this._element.style.top="auto",this.verticalAlignment="bottom"),"left"in e&&typeof e.left=="number"&&(this._element.style.left=`${e.left}px`,this._element.style.right="auto",this.horiziontalAlignment="left"),"right"in e&&typeof e.right=="number"&&(this._element.style.right=`${e.right}px`,this._element.style.left="auto",this.horiziontalAlignment="right");const t=this.options.container.getBoundingClientRect(),i=this._element.getBoundingClientRect(),n=Math.max(0,this.getMinimumWidth(i.width)),o=Math.max(0,this.getMinimumHeight(i.height));if(this.verticalAlignment==="top"){const a=F(i.top-t.top,-o,Math.max(0,t.height-i.height+o));this._element.style.top=`${a}px`,this._element.style.bottom="auto"}if(this.verticalAlignment==="bottom"){const a=F(t.bottom-i.bottom,-o,Math.max(0,t.height-i.height+o));this._element.style.bottom=`${a}px`,this._element.style.top="auto"}if(this.horiziontalAlignment==="left"){const a=F(i.left-t.left,-n,Math.max(0,t.width-i.width+n));this._element.style.left=`${a}px`,this._element.style.right="auto"}if(this.horiziontalAlignment==="right"){const a=F(t.right-i.right,-n,Math.max(0,t.width-i.width+n));this._element.style.right=`${a}px`,this._element.style.left="auto"}this._onDidChange.fire()}toJSON(){const e=this.options.container.getBoundingClientRect(),t=this._element.getBoundingClientRect(),i={};return this.verticalAlignment==="top"?i.top=parseFloat(this._element.style.top):this.verticalAlignment==="bottom"?i.bottom=parseFloat(this._element.style.bottom):i.top=t.top-e.top,this.horiziontalAlignment==="left"?i.left=parseFloat(this._element.style.left):this.horiziontalAlignment==="right"?i.right=parseFloat(this._element.style.right):i.left=t.left-e.left,i.width=t.width,i.height=t.height,i}setupDrag(e,t={inDragMode:!1}){const i=new K,n=()=>{let o=null;const a=Re();i.value=new A({dispose:()=>{a.release()}},E(window,"pointermove",s=>{const d=this.options.container.getBoundingClientRect(),l=s.clientX-d.left,c=s.clientY-d.top;y(this._element,"dv-resize-container-dragging",!0);const v=this._element.getBoundingClientRect();o===null&&(o={x:s.clientX-v.left,y:s.clientY-v.top});const m=Math.max(0,this.getMinimumWidth(v.width)),g=Math.max(0,this.getMinimumHeight(v.height)),_=F(c-o.y,-g,Math.max(0,d.height-v.height+g)),u=F(o.y-c+d.height-v.height,-g,Math.max(0,d.height-v.height+g)),w=F(l-o.x,-m,Math.max(0,d.width-v.width+m)),x=F(o.x-l+d.width-v.width,-m,Math.max(0,d.width-v.width+m)),P={};_<=u?P.top=_:P.bottom=u,w<=x?P.left=w:P.right=x,this.setBounds(P)}),E(window,"pointerup",()=>{y(this._element,"dv-resize-container-dragging",!1),i.dispose(),this._onDidChangeEnd.fire()}))};this.addDisposables(i,E(e,"pointerdown",o=>{if(o.defaultPrevented){o.preventDefault();return}mt(o)||n()}),E(this.options.content,"pointerdown",o=>{o.defaultPrevented||mt(o)||o.shiftKey&&n()}),E(this.options.content,"pointerdown",()=>{Pe.push(this._element)},!0)),t.inDragMode&&n()}setupResize(e){const t=document.createElement("div");t.className=`dv-resize-handle-${e}`,this._element.appendChild(t);const i=new K;this.addDisposables(i,E(t,"pointerdown",n=>{n.preventDefault();let o=null;const a=Re();i.value=new A(E(window,"pointermove",s=>{const d=this.options.container.getBoundingClientRect(),l=this._element.getBoundingClientRect(),c=s.clientY-d.top,v=s.clientX-d.left;o===null&&(o={originalY:c,originalHeight:l.height,originalX:v,originalWidth:l.width});let m,g,_,u,w,x;const P=()=>{const D=o.originalY+o.originalHeight>d.height?Math.max(0,d.height-ve.MINIMUM_HEIGHT):Math.max(0,o.originalY+o.originalHeight-ve.MINIMUM_HEIGHT);m=F(c,0,D),_=o.originalY+o.originalHeight-m,g=d.height-m-_},R=()=>{m=o.originalY-o.originalHeight;const D=m<0&&typeof this.options.minimumInViewportHeight=="number"?-m+this.options.minimumInViewportHeight:ve.MINIMUM_HEIGHT,L=d.height-Math.max(0,m);_=F(c-m,D,L),g=d.height-m-_},z=()=>{const D=o.originalX+o.originalWidth>d.width?Math.max(0,d.width-ve.MINIMUM_WIDTH):Math.max(0,o.originalX+o.originalWidth-ve.MINIMUM_WIDTH);u=F(v,0,D),x=o.originalX+o.originalWidth-u,w=d.width-u-x},U=()=>{u=o.originalX-o.originalWidth;const D=u<0&&typeof this.options.minimumInViewportWidth=="number"?-u+this.options.minimumInViewportWidth:ve.MINIMUM_WIDTH,L=d.width-Math.max(0,u);x=F(v-u,D,L),w=d.width-u-x};switch(e){case"top":P();break;case"bottom":R();break;case"left":z();break;case"right":U();break;case"topleft":P(),z();break;case"topright":P(),U();break;case"bottomleft":R(),z();break;case"bottomright":R(),U();break}const T={};m<=g?T.top=m:T.bottom=g,u<=w?T.left=u:T.right=w,T.height=_,T.width=x,this.setBounds(T)}),{dispose:()=>{a.release()}},E(window,"pointerup",()=>{i.dispose(),this._onDidChangeEnd.fire()}))}))}getMinimumWidth(e){return typeof this.options.minimumInViewportWidth=="number"?e-this.options.minimumInViewportWidth:0}getMinimumHeight(e){return typeof this.options.minimumInViewportHeight=="number"?e-this.options.minimumInViewportHeight:0}dispose(){Pe.destroy(this._element),this._element.remove(),super.dispose()}}ve.MINIMUM_HEIGHT=20;ve.MINIMUM_WIDTH=20;class _n extends A{constructor(e,t){super(),this.group=e,this.overlay=t,this.addDisposables(t)}position(e){this.overlay.setBounds(e)}}const Ee=100,me={left:100,top:100,width:300,height:300},xn=100;class yn{constructor(){this.cache=new Map,this.currentFrameId=0,this.rafId=null}getPosition(e){const t=this.cache.get(e);if(t&&t.frameId===this.currentFrameId)return t.rect;this.scheduleFrameUpdate();const i=Je(e);return this.cache.set(e,{rect:i,frameId:this.currentFrameId}),i}invalidate(){this.currentFrameId++}scheduleFrameUpdate(){this.rafId||(this.rafId=requestAnimationFrame(()=>{this.currentFrameId++,this.rafId=null}))}}function Dn(){const r=document.createElement("div");return r.tabIndex=-1,r}class xt extends A{constructor(e,t){super(),this.element=e,this.accessor=t,this.map={},this._disposed=!1,this.positionCache=new yn,this.pendingUpdates=new Set,this.addDisposables(X.from(()=>{for(const i of Object.values(this.map))i.disposable.dispose(),i.destroy.dispose();this._disposed=!0}))}updateAllPositions(){if(!this._disposed){this.positionCache.invalidate();for(const e of Object.values(this.map))e.panel.api.isVisible&&e.resize&&e.resize()}}detatch(e){if(this.map[e.api.id]){const{disposable:t,destroy:i}=this.map[e.api.id];return t.dispose(),i.dispose(),delete this.map[e.api.id],!0}return!1}attach(e){const{panel:t,referenceContainer:i}=e;if(!this.map[t.api.id]){const c=Dn();c.className="dv-render-overlay",c.style.visibility="hidden",this.map[t.api.id]={panel:t,disposable:X.NONE,destroy:X.NONE,element:c}}const n=this.map[t.api.id].element;t.view.content.element.parentElement!==n&&n.appendChild(t.view.content.element),n.parentElement!==this.element&&this.element.appendChild(n);const o=()=>{const c=t.api.id;this.pendingUpdates.has(c)||(this.pendingUpdates.add(c),requestAnimationFrame(()=>{if(this.pendingUpdates.delete(c),this.isDisposed||!this.map[c])return;const v=this.positionCache.getPosition(i.element),m=this.positionCache.getPosition(this.element),g=v.left-m.left,_=v.top-m.top,u=v.width,w=v.height;n.style.left=`${g}px`,n.style.top=`${_}px`,n.style.width=`${u}px`,n.style.height=`${w}px`,n.style.visibility==="hidden"&&(n.style.visibility=""),y(n,"dv-render-overlay-float",t.group.api.location.type==="floating")}))},a=()=>{t.api.isVisible&&(this.positionCache.invalidate(),o()),n.style.display=t.api.isVisible?"":"none"},s=new K,d=()=>{t.api.location.type==="floating"?queueMicrotask(()=>{const c=this.accessor.floatingGroups.find(_=>_.group===t.api.group);if(!c)return;const v=c.overlay.element,m=()=>{const _=Number(v.getAttribute("aria-level"));n.style.zIndex=`calc(var(--dv-overlay-z-index, 999) + ${_*2+1})`},g=new MutationObserver(()=>{m()});s.value=X.from(()=>g.disconnect()),g.observe(v,{attributeFilter:["aria-level"],attributes:!0}),m()}):n.style.zIndex=""},l=new A(s,new Yt(n,{onDragEnd:c=>{i.dropTarget.dnd.onDragEnd(c)},onDragEnter:c=>{i.dropTarget.dnd.onDragEnter(c)},onDragLeave:c=>{i.dropTarget.dnd.onDragLeave(c)},onDrop:c=>{i.dropTarget.dnd.onDrop(c)},onDragOver:c=>{i.dropTarget.dnd.onDragOver(c)}}),t.api.onDidVisibilityChange(()=>{a()}),t.api.onDidDimensionsChange(()=>{t.api.isVisible&&o()}),t.api.onDidLocationChange(()=>{d()}));return this.map[t.api.id].destroy=X.from(()=>{var c;t.view.content.element.parentElement===n&&n.removeChild(t.view.content.element),(c=n.parentElement)===null||c===void 0||c.removeChild(n)}),d(),queueMicrotask(()=>{this.isDisposed||a()}),this.map[t.api.id].disposable.dispose(),this.map[t.api.id].disposable=l,this.map[t.api.id].resize=o,n}}function zn(r,e,t,i){function n(o){return o instanceof t?o:new t(function(a){a(o)})}return new(t||(t=Promise))(function(o,a){function s(c){try{l(i.next(c))}catch(v){a(v)}}function d(c){try{l(i.throw(c))}catch(v){a(v)}}function l(c){c.done?o(c.value):n(c.value).then(s,d)}l((i=i.apply(r,[])).next())})}class kn extends A{get window(){var e,t;return(t=(e=this._window)===null||e===void 0?void 0:e.value)!==null&&t!==void 0?t:null}constructor(e,t,i){super(),this.target=e,this.className=t,this.options=i,this._onWillClose=new p,this.onWillClose=this._onWillClose.event,this._onDidClose=new p,this.onDidClose=this._onDidClose.event,this._window=null,this.addDisposables(this._onWillClose,this._onDidClose,{dispose:()=>{this.close()}})}dimensions(){if(!this._window)return null;const e=this._window.value.screenX,t=this._window.value.screenY,i=this._window.value.innerWidth,n=this._window.value.innerHeight;return{top:t,left:e,width:i,height:n}}close(){var e,t;this._window&&(this._onWillClose.fire(),(t=(e=this.options).onWillClose)===null||t===void 0||t.call(e,{id:this.target,window:this._window.value}),this._window.disposable.dispose(),this._window=null,this._onDidClose.fire())}open(){var e,t;return zn(this,void 0,void 0,function*(){if(this._window)throw new Error("instance of popout window is already open");const i=`${this.options.url}`,n=Object.entries({top:this.options.top,left:this.options.left,width:this.options.width,height:this.options.height}).map(([d,l])=>`${d}=${l}`).join(","),o=window.open(i,this.target,n);if(!o)return null;const a=new A;this._window={value:o,disposable:a},a.addDisposables(X.from(()=>{o.close()}),E(window,"beforeunload",()=>{this.close()}));const s=this.createPopoutWindowContainer();return this.className&&s.classList.add(this.className),(t=(e=this.options).onDidOpen)===null||t===void 0||t.call(e,{id:this.target,window:o}),new Promise((d,l)=>{o.addEventListener("unload",c=>{}),o.addEventListener("load",()=>{try{const c=o.document;c.title=document.title,c.body.appendChild(s),bi(c,window.document.styleSheets),E(o,"beforeunload",()=>{this.close()}),d(s)}catch(c){l(c)}})})})}createPopoutWindowContainer(){const e=document.createElement("div");return e.classList.add("dv-popout-window"),e.id="dv-popout-window",e.style.position="absolute",e.style.width="100%",e.style.height="100%",e.style.top="0px",e.style.left="0px",e}}class Cn extends A{constructor(e){super(),this.accessor=e,this.init()}init(){const e=new Set,t=new Set;this.addDisposables(this.accessor.onDidAddPanel(i=>{if(e.has(i.api.id))throw new Error(`dockview: Invalid event sequence. [onDidAddPanel] called for panel ${i.api.id} but panel already exists`);e.add(i.api.id)}),this.accessor.onDidRemovePanel(i=>{if(e.has(i.api.id))e.delete(i.api.id);else throw new Error(`dockview: Invalid event sequence. [onDidRemovePanel] called for panel ${i.api.id} but panel does not exists`)}),this.accessor.onDidAddGroup(i=>{if(t.has(i.api.id))throw new Error(`dockview: Invalid event sequence. [onDidAddGroup] called for group ${i.api.id} but group already exists`);t.add(i.api.id)}),this.accessor.onDidRemoveGroup(i=>{if(t.has(i.api.id))t.delete(i.api.id);else throw new Error(`dockview: Invalid event sequence. [onDidRemoveGroup] called for group ${i.api.id} but group does not exists`)}))}}class Sn extends A{constructor(e){super(),this.root=e,this._active=null,this._activeDisposable=new K,this._element=document.createElement("div"),this._element.className="dv-popover-anchor",this._element.style.position="relative",this.root.prepend(this._element),this.addDisposables(X.from(()=>{this.close()}),this._activeDisposable)}openPopover(e,t){var i;this.close();const n=document.createElement("div");n.style.position="absolute",n.style.zIndex=(i=t.zIndex)!==null&&i!==void 0?i:"var(--dv-overlay-z-index)",n.appendChild(e);const o=this._element.getBoundingClientRect(),a=o.left,s=o.top;n.style.top=`${t.y-s}px`,n.style.left=`${t.x-a}px`,this._element.appendChild(n),this._active=n,this._activeDisposable.value=new A(E(window,"pointerdown",d=>{var l;const c=d.target;if(!(c instanceof HTMLElement))return;let v=c;for(;v&&v!==n;)v=(l=v==null?void 0:v.parentElement)!==null&&l!==void 0?l:null;v||this.close()}),E(window,"resize",()=>{this.close()})),requestAnimationFrame(()=>{ki(n,this.root)})}close(){this._active&&(this._active.remove(),this._activeDisposable.dispose(),this._active=null)}}class yt extends A{get disabled(){return this._disabled}set disabled(e){var t;this.disabled!==e&&(this._disabled=e,e&&((t=this.model)===null||t===void 0||t.clear()))}get model(){if(!this.disabled)return{clear:()=>{var e;this._model&&((e=this._model.root.parentElement)===null||e===void 0||e.removeChild(this._model.root)),this._model=void 0},exists:()=>!!this._model,getElements:(e,t)=>{const i=this._outline!==t;if(this._outline=t,this._model)return this._model.changed=i,this._model;const n=this.createContainer(),o=this.createAnchor();if(this._model={root:n,overlay:o,changed:i},n.appendChild(o),this.element.appendChild(n),(e==null?void 0:e.target)instanceof HTMLElement){const a=e.target.getBoundingClientRect(),s=this.element.getBoundingClientRect();o.style.left=`${a.left-s.left}px`,o.style.top=`${a.top-s.top}px`}return this._model}}}constructor(e,t){super(),this.element=e,this._disabled=!1,this._disabled=t.disabled,this.addDisposables(X.from(()=>{var i;(i=this.model)===null||i===void 0||i.clear()}))}createContainer(){const e=document.createElement("div");return e.className="dv-drop-target-container",e}createAnchor(){const e=document.createElement("div");return e.className="dv-drop-target-anchor",e.style.visibility="hidden",e}}const Dt={activationSize:{type:"pixels",value:10},size:{type:"pixels",value:20}};function Ie(r){const e=r.from.activePanel;[...r.from.panels].map(i=>{const n=r.from.model.removePanel(i);return r.from.model.renderContainer.detatch(i),n}).forEach(i=>{r.to.model.openPanel(i,{skipSetActive:e!==i,skipSetGroupActive:!0})})}class An extends Ut{get orientation(){return this.gridview.orientation}get totalPanels(){return this.panels.length}get panels(){return this.groups.flatMap(e=>e.panels)}get options(){return this._options}get activePanel(){const e=this.activeGroup;if(e)return e.activePanel}get renderer(){var e;return(e=this.options.defaultRenderer)!==null&&e!==void 0?e:"onlyWhenVisible"}get defaultHeaderPosition(){var e;return(e=this.options.defaultHeaderPosition)!==null&&e!==void 0?e:"top"}get api(){return this._api}get floatingGroups(){return this._floatingGroups}get popoutRestorationPromise(){return this._popoutRestorationPromise}constructor(e,t){var i,n,o;super(e,{proportionalLayout:!0,orientation:C.HORIZONTAL,styles:t.hideBorders?{separatorBorder:"transparent"}:void 0,disableAutoResizing:t.disableAutoResizing,locked:t.locked,margin:(n=(i=t.theme)===null||i===void 0?void 0:i.gap)!==null&&n!==void 0?n:0,className:t.className}),this.nextGroupId=nt(),this._deserializer=new bn(this),this._watermark=null,this._onWillDragPanel=new p,this.onWillDragPanel=this._onWillDragPanel.event,this._onWillDragGroup=new p,this.onWillDragGroup=this._onWillDragGroup.event,this._onDidDrop=new p,this.onDidDrop=this._onDidDrop.event,this._onWillDrop=new p,this.onWillDrop=this._onWillDrop.event,this._onWillShowOverlay=new p,this.onWillShowOverlay=this._onWillShowOverlay.event,this._onUnhandledDragOverEvent=new p,this.onUnhandledDragOverEvent=this._onUnhandledDragOverEvent.event,this._onDidRemovePanel=new p,this.onDidRemovePanel=this._onDidRemovePanel.event,this._onDidAddPanel=new p,this.onDidAddPanel=this._onDidAddPanel.event,this._onDidPopoutGroupSizeChange=new p,this.onDidPopoutGroupSizeChange=this._onDidPopoutGroupSizeChange.event,this._onDidPopoutGroupPositionChange=new p,this.onDidPopoutGroupPositionChange=this._onDidPopoutGroupPositionChange.event,this._onDidOpenPopoutWindowFail=new p,this.onDidOpenPopoutWindowFail=this._onDidOpenPopoutWindowFail.event,this._onDidLayoutFromJSON=new p,this.onDidLayoutFromJSON=this._onDidLayoutFromJSON.event,this._onDidActivePanelChange=new p({replay:!0}),this.onDidActivePanelChange=this._onDidActivePanelChange.event,this._onDidMovePanel=new p,this.onDidMovePanel=this._onDidMovePanel.event,this._onDidMaximizedGroupChange=new p,this.onDidMaximizedGroupChange=this._onDidMaximizedGroupChange.event,this._floatingGroups=[],this._popoutGroups=[],this._popoutRestorationPromise=Promise.resolve(),this._onDidRemoveGroup=new p,this.onDidRemoveGroup=this._onDidRemoveGroup.event,this._onDidAddGroup=new p,this.onDidAddGroup=this._onDidAddGroup.event,this._onDidOptionsChange=new p,this.onDidOptionsChange=this._onDidOptionsChange.event,this._onDidActiveGroupChange=new p,this.onDidActiveGroupChange=this._onDidActiveGroupChange.event,this._moving=!1,this._options=t,this.popupService=new Sn(this.element),this._themeClassnames=new Me(this.element),this._api=new Ve(this),this.rootDropTargetContainer=new yt(this.element,{disabled:!0}),this.overlayRenderContainer=new xt(this.gridview.element,this),this._rootDropTarget=new se(this.element,{className:"dv-drop-target-edge",canDisplayOverlay:(a,s)=>{const d=ee();if(d)return d.viewId!==this.id?!1:s==="center"?this.gridview.length===0:!0;if(s==="center"&&this.gridview.length!==0)return!1;const l=new Qt(a,"edge",s,ee);return this._onUnhandledDragOverEvent.fire(l),l.isAccepted},acceptedTargetZones:["top","bottom","left","right","center"],overlayModel:(o=t.rootOverlayModel)!==null&&o!==void 0?o:Dt,getOverrideTarget:()=>{var a;return(a=this.rootDropTargetContainer)===null||a===void 0?void 0:a.model}}),this.updateDropTargetModel(t),y(this.gridview.element,"dv-dockview",!0),y(this.element,"dv-debug",!!t.debug),this.updateTheme(),this.updateWatermark(),t.debug&&this.addDisposables(new Cn(this)),this.addDisposables(this.rootDropTargetContainer,this.overlayRenderContainer,this._onWillDragPanel,this._onWillDragGroup,this._onWillShowOverlay,this._onDidActivePanelChange,this._onDidAddPanel,this._onDidRemovePanel,this._onDidLayoutFromJSON,this._onDidDrop,this._onWillDrop,this._onDidMovePanel,this._onDidMovePanel.event(()=>{this.debouncedUpdateAllPositions()}),this._onDidAddGroup,this._onDidRemoveGroup,this._onDidActiveGroupChange,this._onUnhandledDragOverEvent,this._onDidMaximizedGroupChange,this._onDidOptionsChange,this._onDidPopoutGroupSizeChange,this._onDidPopoutGroupPositionChange,this._onDidOpenPopoutWindowFail,this.onDidViewVisibilityChangeMicroTaskQueue(()=>{this.updateWatermark()}),this.onDidAdd(a=>{this._moving||this._onDidAddGroup.fire(a)}),this.onDidRemove(a=>{this._moving||this._onDidRemoveGroup.fire(a)}),this.onDidActiveChange(a=>{this._moving||this._onDidActiveGroupChange.fire(a)}),this.onDidMaximizedChange(a=>{this._onDidMaximizedGroupChange.fire({group:a.panel,isMaximized:a.isMaximized})}),we.any(this.onDidAdd,this.onDidRemove)(()=>{this.updateWatermark()}),we.any(this.onDidAddPanel,this.onDidRemovePanel,this.onDidAddGroup,this.onDidRemove,this.onDidMovePanel,this.onDidActivePanelChange,this.onDidPopoutGroupPositionChange,this.onDidPopoutGroupSizeChange)(()=>{this._bufferOnDidLayoutChange.fire()}),X.from(()=>{for(const a of[...this._floatingGroups])a.dispose();for(const a of[...this._popoutGroups])a.disposable.dispose()}),this._rootDropTarget,this._rootDropTarget.onWillShowOverlay(a=>{this.gridview.length>0&&a.position==="center"||this._onWillShowOverlay.fire(new He(a,{kind:"edge",panel:void 0,api:this._api,group:void 0,getData:ee}))}),this._rootDropTarget.onDrop(a=>{var s;const d=new ei({nativeEvent:a.nativeEvent,position:a.position,panel:void 0,api:this._api,group:void 0,getData:ee,kind:"edge"});if(this._onWillDrop.fire(d),d.defaultPrevented)return;const l=ee();l?this.moveGroupOrPanel({from:{groupId:l.groupId,panelId:(s=l.panelId)!==null&&s!==void 0?s:void 0},to:{group:this.orthogonalize(a.position),position:"center"}}):this._onDidDrop.fire(new dt({nativeEvent:a.nativeEvent,position:a.position,panel:void 0,api:this._api,group:void 0,getData:ee}))}),this._rootDropTarget)}setVisible(e,t){switch(e.api.location.type){case"grid":super.setVisible(e,t);break;case"floating":{const i=this.floatingGroups.find(n=>n.group===e);i&&(i.overlay.setVisible(t),e.api._onDidVisibilityChange.fire({isVisible:t}));break}case"popout":console.warn("dockview: You cannot hide a group that is in a popout window");break}}addPopoutGroup(e,t){var i,n,o,a,s;if(e instanceof De&&e.group.size===1)return this.addPopoutGroup(e.group,t);const d=xi(this.gridview.element),l=this.element;function c(){return t!=null&&t.position?t.position:e instanceof wt?e.element.getBoundingClientRect():e.group?e.group.element.getBoundingClientRect():l.getBoundingClientRect()}const v=c(),m=(n=(i=t==null?void 0:t.overridePopoutGroup)===null||i===void 0?void 0:i.id)!==null&&n!==void 0?n:this.getNextGroupId(),g=new kn(`${this.id}-${m}`,d??"",{url:(s=(o=t==null?void 0:t.popoutUrl)!==null&&o!==void 0?o:(a=this.options)===null||a===void 0?void 0:a.popoutUrl)!==null&&s!==void 0?s:"/popout.html",left:window.screenX+v.left,top:window.screenY+v.top,width:v.width,height:v.height,onDidOpen:t==null?void 0:t.onDidOpen,onWillClose:t==null?void 0:t.onWillClose}),_=new A(g,g.onDidClose(()=>{_.dispose()}));return g.open().then(u=>{var w;if(g.isDisposed)return!1;const x=t!=null&&t.referenceGroup?t.referenceGroup:e instanceof De?e.group:e,P=e.api.location.type,R=x.element.parentElement!==null;let z;if(R?t!=null&&t.overridePopoutGroup?z=t.overridePopoutGroup:(z=this.createGroup({id:m}),u&&this._onDidAddGroup.fire(z)):z=x,u===null)return console.error("dockview: failed to create popout. perhaps you need to allow pop-ups for this website"),_.dispose(),this._onDidOpenPopoutWindowFail.fire(),this.movingLock(()=>Ie({from:z,to:x})),x.api.isVisible||x.api.setVisible(!0),!1;const U=document.createElement("div");U.className="dv-overlay-render-container";const T=new xt(U,this);z.model.renderContainer=T,z.layout(g.window.innerWidth,g.window.innerHeight);let D;if(!(t!=null&&t.overridePopoutGroup)&&R)if(e instanceof De)this.movingLock(()=>{const M=x.model.removePanel(e);z.model.openPanel(M)});else switch(this.movingLock(()=>Ie({from:x,to:z})),P){case"grid":x.api.setVisible(!1);break;case"floating":case"popout":D=(w=this._floatingGroups.find(M=>M.group.api.id===e.api.id))===null||w===void 0?void 0:w.overlay.toJSON(),this.removeGroup(x);break}u.classList.add("dv-dockview"),u.style.overflow="hidden",u.appendChild(U),u.appendChild(z.element);const L=document.createElement("div"),j=new yt(L,{disabled:this.rootDropTargetContainer.disabled});u.appendChild(L),z.model.dropTargetContainer=j,z.model.location={type:"popout",getWindow:()=>g.window,popoutUrl:t==null?void 0:t.popoutUrl},R&&e.api.location.type==="grid"&&e.api.setVisible(!1),this.doSetGroupAndPanelActive(z),_.addDisposables(z.api.onDidActiveChange(M=>{var f;M.isActive&&((f=g.window)===null||f===void 0||f.focus())}),z.api.onWillFocus(()=>{var M;(M=g.window)===null||M===void 0||M.focus()}));let H;const Z=R&&x&&this.getPanel(x.id),ne={window:g,popoutGroup:z,referenceGroup:Z?x.id:void 0,disposable:{dispose:()=>(_.dispose(),H)}},Y=Di(g.window);return _.addDisposables(Y,zi(g.window,()=>{this._onDidPopoutGroupSizeChange.fire({width:g.window.innerWidth,height:g.window.innerHeight,group:z})}),Y.event(()=>{this._onDidPopoutGroupPositionChange.fire({screenX:g.window.screenX,screenY:g.window.screenX,group:z})}),E(g.window,"resize",()=>{z.layout(g.window.innerWidth,g.window.innerHeight)}),T,X.from(()=>{if(!this.isDisposed){if(R&&this.getPanel(x.id))this.movingLock(()=>Ie({from:z,to:x})),x.api.isVisible||x.api.setVisible(!0),this.getPanel(z.id)&&this.doRemoveGroup(z,{skipPopoutAssociated:!0});else if(this.getPanel(z.id)){if(z.model.renderContainer=this.overlayRenderContainer,z.model.dropTargetContainer=this.rootDropTargetContainer,H=z,!this._popoutGroups.find(f=>f.popoutGroup===z))return;D?this.addFloatingGroup(z,{height:D.height,width:D.width,position:D}):(this.doRemoveGroup(z,{skipDispose:!0,skipActive:!0,skipPopoutReturn:!0}),z.model.location={type:"grid"},this.movingLock(()=>{this.doAddGroup(z,[0])})),this.doSetGroupAndPanelActive(z)}}})),this._popoutGroups.push(ne),this.updateWatermark(),!0}).catch(u=>(console.error("dockview: failed to create popout.",u),!1))}addFloatingGroup(e,t){var i,n,o,a,s;let d;if(e instanceof De)d=this.createGroup(),this._onDidAddGroup.fire(d),this.movingLock(()=>this.removePanel(e,{removeEmptyGroup:!0,skipDispose:!0,skipSetActiveGroup:!0})),this.movingLock(()=>d.model.openPanel(e,{skipSetGroupActive:!0}));else{d=e;const u=(i=this._popoutGroups.find(P=>P.popoutGroup===d))===null||i===void 0?void 0:i.referenceGroup,w=u?this.getPanel(u):void 0;typeof(t==null?void 0:t.skipRemoveGroup)=="boolean"&&t.skipRemoveGroup||(w?(this.movingLock(()=>Ie({from:e,to:w})),this.doRemoveGroup(e,{skipPopoutReturn:!0,skipPopoutAssociated:!0}),this.doRemoveGroup(w,{skipDispose:!0}),d=w):this.doRemoveGroup(e,{skipDispose:!0,skipPopoutReturn:!0,skipPopoutAssociated:!1}))}function l(){if(t!=null&&t.position){const u={};return"left"in t.position?u.left=Math.max(t.position.left,0):"right"in t.position?u.right=Math.max(t.position.right,0):u.left=me.left,"top"in t.position?u.top=Math.max(t.position.top,0):"bottom"in t.position?u.bottom=Math.max(t.position.bottom,0):u.top=me.top,typeof t.width=="number"?u.width=Math.max(t.width,0):u.width=me.width,typeof t.height=="number"?u.height=Math.max(t.height,0):u.height=me.height,u}return{left:typeof(t==null?void 0:t.x)=="number"?Math.max(t.x,0):me.left,top:typeof(t==null?void 0:t.y)=="number"?Math.max(t.y,0):me.top,width:typeof(t==null?void 0:t.width)=="number"?Math.max(t.width,0):me.width,height:typeof(t==null?void 0:t.height)=="number"?Math.max(t.height,0):me.height}}const c=l(),v=new ve(Object.assign(Object.assign({container:this.gridview.element,content:d.element},c),{minimumInViewportWidth:this.options.floatingGroupBounds==="boundedWithinViewport"?void 0:(o=(n=this.options.floatingGroupBounds)===null||n===void 0?void 0:n.minimumWidthWithinViewport)!==null&&o!==void 0?o:Ee,minimumInViewportHeight:this.options.floatingGroupBounds==="boundedWithinViewport"?void 0:(s=(a=this.options.floatingGroupBounds)===null||a===void 0?void 0:a.minimumHeightWithinViewport)!==null&&s!==void 0?s:Ee})),m=d.element.querySelector(".dv-void-container");if(!m)throw new Error("dockview: failed to find drag handle");v.setupDrag(m,{inDragMode:typeof(t==null?void 0:t.inDragMode)=="boolean"?t.inDragMode:!1});const g=new _n(d,v),_=new A(d.api.onDidActiveChange(u=>{u.isActive&&v.bringToFront()}),Le(d.element,u=>{const{width:w,height:x}=u.contentRect;d.layout(w,x)}));g.addDisposables(v.onDidChange(()=>{d.layout(d.width,d.height)}),v.onDidChangeEnd(()=>{this._bufferOnDidLayoutChange.fire()}),d.onDidChange(u=>{v.setBounds({height:u==null?void 0:u.height,width:u==null?void 0:u.width})}),{dispose:()=>{_.dispose(),je(this._floatingGroups,g),d.model.location={type:"grid"},this.updateWatermark()}}),this._floatingGroups.push(g),d.model.location={type:"floating"},t!=null&&t.skipActiveGroup||this.doSetGroupAndPanelActive(d),this.updateWatermark()}orthogonalize(e,t){switch(this.gridview.normalize(),e){case"top":case"bottom":this.gridview.orientation===C.HORIZONTAL&&this.gridview.insertOrthogonalSplitviewAtRoot();break;case"left":case"right":this.gridview.orientation===C.VERTICAL&&this.gridview.insertOrthogonalSplitviewAtRoot();break}switch(e){case"top":case"left":case"center":return this.createGroupAtLocation([0],void 0,t);case"bottom":case"right":return this.createGroupAtLocation([this.gridview.length],void 0,t);default:throw new Error(`dockview: unsupported position ${e}`)}}updateOptions(e){var t,i;if(super.updateOptions(e),"floatingGroupBounds"in e)for(const a of this._floatingGroups){switch(e.floatingGroupBounds){case"boundedWithinViewport":a.overlay.minimumInViewportHeight=void 0,a.overlay.minimumInViewportWidth=void 0;break;case void 0:a.overlay.minimumInViewportHeight=Ee,a.overlay.minimumInViewportWidth=Ee;break;default:a.overlay.minimumInViewportHeight=(t=e.floatingGroupBounds)===null||t===void 0?void 0:t.minimumHeightWithinViewport,a.overlay.minimumInViewportWidth=(i=e.floatingGroupBounds)===null||i===void 0?void 0:i.minimumWidthWithinViewport}a.overlay.setBounds()}this.updateDropTargetModel(e);const n=this.options.disableDnd;this._options=Object.assign(Object.assign({},this.options),e);const o=this.options.disableDnd;if(n!==o&&this.updateDragAndDropState(),"theme"in e&&this.updateTheme(),"createRightHeaderActionComponent"in e||"createLeftHeaderActionComponent"in e||"createPrefixHeaderActionComponent"in e)for(const a of this.groups)a.model.updateHeaderActions();this.layout(this.gridview.width,this.gridview.height,!0)}layout(e,t,i){if(super.layout(e,t,i),this._floatingGroups)for(const n of this._floatingGroups)n.overlay.setBounds()}updateDragAndDropState(){for(const e of this.groups)e.model.updateDragAndDropState()}focus(){var e;(e=this.activeGroup)===null||e===void 0||e.focus()}getGroupPanel(e){return this.panels.find(t=>t.id===e)}setActivePanel(e){e.group.model.openPanel(e),this.doSetGroupAndPanelActive(e.group)}moveToNext(e={}){var t;if(!e.group){if(!this.activeGroup)return;e.group=this.activeGroup}if(e.includePanel&&e.group&&e.group.activePanel!==e.group.panels[e.group.panels.length-1]){e.group.model.moveToNext({suppressRoll:!0});return}const i=$(e.group.element),n=(t=this.gridview.next(i))===null||t===void 0?void 0:t.view;this.doSetGroupAndPanelActive(n)}moveToPrevious(e={}){var t;if(!e.group){if(!this.activeGroup)return;e.group=this.activeGroup}if(e.includePanel&&e.group&&e.group.activePanel!==e.group.panels[0]){e.group.model.moveToPrevious({suppressRoll:!0});return}const i=$(e.group.element),n=(t=this.gridview.previous(i))===null||t===void 0?void 0:t.view;n&&this.doSetGroupAndPanelActive(n)}toJSON(){var e;const t=this.gridview.serialize(),i=this.panels.reduce((s,d)=>(s[d.id]=d.toJSON(),s),{}),n=this._floatingGroups.map(s=>({data:s.group.toJSON(),position:s.overlay.toJSON()})),o=this._popoutGroups.map(s=>({data:s.popoutGroup.toJSON(),gridReferenceGroup:s.referenceGroup,position:s.window.dimensions(),url:s.popoutGroup.api.location.type==="popout"?s.popoutGroup.api.location.popoutUrl:void 0})),a={grid:t,panels:i,activeGroup:(e=this.activeGroup)===null||e===void 0?void 0:e.id};return n.length>0&&(a.floatingGroups=n),o.length>0&&(a.popoutGroups=o),a}fromJSON(e,t){var i,n;const o=new Map;let a;if(t!=null&&t.reuseExistingPanels){a=this.createGroup(),this._groups.delete(a.api.id);const c=Object.keys(e.panels);for(const v of this.panels)c.includes(v.api.id)&&o.set(v.api.id,v);this.movingLock(()=>{Array.from(o.values()).forEach(v=>{this.moveGroupOrPanel({from:{groupId:v.api.group.api.id,panelId:v.api.id},to:{group:a,position:"center"},keepEmptyGroups:!0})})})}if(this.clear(),typeof e!="object"||e===null)throw new Error("dockview: serialized layout must be a non-null object");const{grid:s,panels:d,activeGroup:l}=e;if(s.root.type!=="branch"||!Array.isArray(s.root.data))throw new Error("dockview: root must be of type branch");try{const c=this.width,v=this.height,m=w=>{const{id:x,locked:P,hideHeader:R,headerPosition:z,views:U,activeView:T}=w;if(typeof x!="string")throw new Error("dockview: group id must be of type string");const D=this.createGroup({id:x,locked:!!P,hideHeader:!!R,headerPosition:z});this._onDidAddGroup.fire(D);const L=[];for(const j of U){const H=o.get(j);if(a&&H)this.movingLock(()=>{a.model.removePanel(H)}),L.push(H),H.updateFromStateModel(d[j]);else{const Z=this._deserializer.fromJSON(d[j],D);L.push(Z)}}for(let j=0;j<U.length;j++){const H=L[j],Z=typeof T=="string"&&T===H.id;o.has(H.api.id)?this.movingLock(()=>{D.model.openPanel(H,{skipSetActive:!Z,skipSetGroupActive:!0})}):D.model.openPanel(H,{skipSetActive:!Z,skipSetGroupActive:!0})}return!D.activePanel&&D.panels.length>0&&D.model.openPanel(D.panels[D.panels.length-1],{skipSetGroupActive:!0}),D};this.gridview.deserialize(s,{fromJSON:w=>m(w.data)}),this.layout(c,v,!0);const g=(i=e.floatingGroups)!==null&&i!==void 0?i:[];for(const w of g){const{data:x,position:P}=w,R=m(x);this.addFloatingGroup(R,{position:P,width:P.width,height:P.height,skipRemoveGroup:!0,inDragMode:!1})}const _=(n=e.popoutGroups)!==null&&n!==void 0?n:[],u=[];_.forEach((w,x)=>{const{data:P,position:R,gridReferenceGroup:z,url:U}=w,T=m(P),D=new Promise(L=>{setTimeout(()=>{this.addPopoutGroup(T,{position:R??void 0,overridePopoutGroup:z?T:void 0,referenceGroup:z?this.getPanel(z):void 0,popoutUrl:U}),L()},x*xn)});u.push(D)}),this._popoutRestorationPromise=Promise.all(u).then(()=>{});for(const w of this._floatingGroups)w.overlay.setBounds();if(typeof l=="string"){const w=this.getPanel(l);w&&this.doSetGroupAndPanelActive(w)}}catch(c){console.error("dockview: failed to deserialize layout. Reverting changes",c);for(const v of this.groups)for(const m of v.panels)this.removePanel(m,{removeEmptyGroup:!1,skipDispose:!1});for(const v of this.groups)v.dispose(),this._groups.delete(v.id),this._onDidRemoveGroup.fire(v);for(const v of[...this._floatingGroups])v.dispose();throw this.clear(),c}this.updateWatermark(),this.debouncedUpdateAllPositions(),this._onDidLayoutFromJSON.fire()}clear(){const e=Array.from(this._groups.values()).map(i=>i.value),t=!!this.activeGroup;for(const i of e)this.removeGroup(i,{skipActive:!0});t&&this.doSetGroupAndPanelActive(void 0),this.gridview.clear()}closeAllGroups(){for(const e of this._groups.entries()){const[t,i]=e;i.value.model.closeAllPanels()}}addPanel(e){var t,i;if(this.panels.find(d=>d.id===e.id))throw new Error(`dockview: panel with id ${e.id} already exists`);let n;if(e.position&&e.floating)throw new Error("dockview: you can only provide one of: position, floating as arguments to .addPanel(...)");const o={width:e.initialWidth,height:e.initialHeight};let a;if(e.position)if(sn(e.position)){const d=typeof e.position.referencePanel=="string"?this.getGroupPanel(e.position.referencePanel):e.position.referencePanel;if(a=e.position.index,!d)throw new Error(`dockview: referencePanel '${e.position.referencePanel}' does not exist`);n=this.findGroup(d)}else if(dn(e.position)){if(n=typeof e.position.referenceGroup=="string"?(t=this._groups.get(e.position.referenceGroup))===null||t===void 0?void 0:t.value:e.position.referenceGroup,a=e.position.index,!n)throw new Error(`dockview: referenceGroup '${e.position.referenceGroup}' does not exist`)}else{const d=this.orthogonalize(ft(e.position.direction)),l=this.createPanel(e,d);return d.model.openPanel(l,{skipSetActive:e.inactive,skipSetGroupActive:e.inactive,index:a}),e.inactive||this.doSetGroupAndPanelActive(d),d.api.setSize({height:o==null?void 0:o.height,width:o==null?void 0:o.width}),l}else n=this.activeGroup;let s;if(n){const d=Ne(((i=e.position)===null||i===void 0?void 0:i.direction)||"within");if(e.floating){const l=this.createGroup();this._onDidAddGroup.fire(l);const c=typeof e.floating=="object"&&e.floating!==null?e.floating:{};this.addFloatingGroup(l,Object.assign(Object.assign({},c),{inDragMode:!1,skipRemoveGroup:!0,skipActiveGroup:!0})),s=this.createPanel(e,l),l.model.openPanel(s,{skipSetActive:e.inactive,skipSetGroupActive:e.inactive,index:a})}else if(n.api.location.type==="floating"||d==="center")s=this.createPanel(e,n),n.model.openPanel(s,{skipSetActive:e.inactive,skipSetGroupActive:e.inactive,index:a}),n.api.setSize({width:o==null?void 0:o.width,height:o==null?void 0:o.height}),e.inactive||this.doSetGroupAndPanelActive(n);else{const l=$(n.element),c=he(this.gridview.orientation,l,d),v=this.createGroupAtLocation(c,this.orientationAtLocation(c)===C.VERTICAL?o==null?void 0:o.height:o==null?void 0:o.width);s=this.createPanel(e,v),v.model.openPanel(s,{skipSetActive:e.inactive,skipSetGroupActive:e.inactive,index:a}),e.inactive||this.doSetGroupAndPanelActive(v)}}else if(e.floating){const d=this.createGroup();this._onDidAddGroup.fire(d);const l=typeof e.floating=="object"&&e.floating!==null?e.floating:{};this.addFloatingGroup(d,Object.assign(Object.assign({},l),{inDragMode:!1,skipRemoveGroup:!0,skipActiveGroup:!0})),s=this.createPanel(e,d),d.model.openPanel(s,{skipSetActive:e.inactive,skipSetGroupActive:e.inactive,index:a})}else{const d=this.createGroupAtLocation([0],this.gridview.orientation===C.VERTICAL?o==null?void 0:o.height:o==null?void 0:o.width);s=this.createPanel(e,d),d.model.openPanel(s,{skipSetActive:e.inactive,skipSetGroupActive:e.inactive,index:a}),e.inactive||this.doSetGroupAndPanelActive(d)}return s}removePanel(e,t={removeEmptyGroup:!0}){const i=e.group;if(!i)throw new Error(`dockview: cannot remove panel ${e.id}. it's missing a group.`);i.model.removePanel(e,{skipSetActiveGroup:t.skipSetActiveGroup}),t.skipDispose||(e.group.model.renderContainer.detatch(e),e.dispose()),i.size===0&&t.removeEmptyGroup&&this.removeGroup(i,{skipActive:t.skipSetActiveGroup})}createWatermarkComponent(){return this.options.createWatermarkComponent?this.options.createWatermarkComponent():new fn}updateWatermark(){var e,t;if(this.groups.filter(i=>i.api.location.type==="grid"&&i.api.isVisible).length===0){if(!this._watermark){this._watermark=this.createWatermarkComponent(),this._watermark.init({containerApi:new Ve(this)});const i=document.createElement("div");i.className="dv-watermark-container",wi(i,"watermark-component"),i.appendChild(this._watermark.element),this.gridview.element.appendChild(i)}}else this._watermark&&(this._watermark.element.parentElement.remove(),(t=(e=this._watermark).dispose)===null||t===void 0||t.call(e),this._watermark=null)}addGroup(e){var t;if(e){let i;if(ln(e)){const l=typeof e.referencePanel=="string"?this.panels.find(c=>c.id===e.referencePanel):e.referencePanel;if(!l)throw new Error(`dockview: reference panel ${e.referencePanel} does not exist`);if(i=this.findGroup(l),!i)throw new Error(`dockview: reference group for reference panel ${e.referencePanel} does not exist`)}else if(cn(e)){if(i=typeof e.referenceGroup=="string"?(t=this._groups.get(e.referenceGroup))===null||t===void 0?void 0:t.value:e.referenceGroup,!i)throw new Error(`dockview: reference group ${e.referenceGroup} does not exist`)}else{const l=this.orthogonalize(ft(e.direction),e);return e.skipSetActive||this.doSetGroupAndPanelActive(l),l}const n=Ne(e.direction||"within"),o=$(i.element),a=he(this.gridview.orientation,o,n),s=this.createGroup(e),d=this.getLocationOrientation(a)===C.VERTICAL?e.initialHeight:e.initialWidth;return this.doAddGroup(s,a,d),e.skipSetActive||this.doSetGroupAndPanelActive(s),s}else{const i=this.createGroup(e);return this.doAddGroup(i),this.doSetGroupAndPanelActive(i),i}}getLocationOrientation(e){return e.length%2==0&&this.gridview.orientation===C.HORIZONTAL?C.HORIZONTAL:C.VERTICAL}removeGroup(e,t){this.doRemoveGroup(e,t)}doRemoveGroup(e,t){var i;const n=[...e.panels];if(!(t!=null&&t.skipDispose))for(const s of n)this.removePanel(s,{removeEmptyGroup:!1,skipDispose:(i=t==null?void 0:t.skipDispose)!==null&&i!==void 0?i:!1});const o=this.activePanel;if(e.api.location.type==="floating"){const s=this._floatingGroups.find(d=>d.group===e);if(s){if(t!=null&&t.skipDispose||(s.group.dispose(),this._groups.delete(e.id),this._onDidRemoveGroup.fire(e)),je(this._floatingGroups,s),s.dispose(),!(t!=null&&t.skipActive)&&this._activeGroup===e){const d=Array.from(this._groups.values());this.doSetGroupAndPanelActive(d.length>0?d[0].value:void 0)}return s.group}throw new Error("dockview: failed to find floating group")}if(e.api.location.type==="popout"){const s=this._popoutGroups.find(d=>d.popoutGroup===e);if(s){if(!(t!=null&&t.skipDispose)){if(!(t!=null&&t.skipPopoutAssociated)){const l=s.referenceGroup?this.getPanel(s.referenceGroup):void 0;l&&l.panels.length===0&&this.removeGroup(l)}s.popoutGroup.dispose(),this._groups.delete(e.id),this._onDidRemoveGroup.fire(e)}je(this._popoutGroups,s);const d=s.disposable.dispose();if(!(t!=null&&t.skipPopoutReturn)&&d&&(this.doAddGroup(d,[0]),this.doSetGroupAndPanelActive(d)),!(t!=null&&t.skipActive)&&this._activeGroup===e){const l=Array.from(this._groups.values());this.doSetGroupAndPanelActive(l.length>0?l[0].value:void 0)}return this.updateWatermark(),s.popoutGroup}throw new Error("dockview: failed to find popout group")}const a=super.doRemoveGroup(e,t);return t!=null&&t.skipActive||this.activePanel!==o&&this._onDidActivePanelChange.fire(this.activePanel),a}debouncedUpdateAllPositions(){this._updatePositionsFrameId!==void 0&&cancelAnimationFrame(this._updatePositionsFrameId),this._updatePositionsFrameId=requestAnimationFrame(()=>{this._updatePositionsFrameId=void 0,this.overlayRenderContainer.updateAllPositions()})}movingLock(e){const t=this._moving;try{return this._moving=!0,e()}finally{this._moving=t}}moveGroupOrPanel(e){var t;const i=e.to.group,n=e.from.groupId,o=e.from.panelId,a=e.to.position,s=e.to.index,d=n?(t=this._groups.get(n))===null||t===void 0?void 0:t.value:void 0;if(!d)throw new Error(`dockview: Failed to find group id ${n}`);if(o===void 0){this.moveGroup({from:{group:d},to:{group:i,position:a},skipSetActive:e.skipSetActive});return}if(!a||a==="center"){const l=this.movingLock(()=>d.model.removePanel(o,{skipSetActive:!1,skipSetActiveGroup:!0}));if(!l)throw new Error(`dockview: No panel with id ${o}`);!e.keepEmptyGroups&&d.model.size===0&&this.doRemoveGroup(d,{skipActive:!0});const c=i.model.size===0;this.movingLock(()=>{var v;return i.model.openPanel(l,{index:s,skipSetActive:((v=e.skipSetActive)!==null&&v!==void 0?v:!1)&&!c,skipSetGroupActive:!0})}),e.skipSetActive||this.doSetGroupAndPanelActive(i),this._onDidMovePanel.fire({panel:l,from:d})}else{const l=$(i.element),c=he(this.gridview.orientation,l,a);if(d.size<2){const[v,m]=ge(c);if(d.api.location.type==="grid"){const w=$(d.element),[x,P]=ge(w);if(Ft(x,v)){this.gridview.moveView(x,P,m),this._onDidMovePanel.fire({panel:this.getGroupPanel(o),from:d});return}}if(d.api.location.type==="popout"){const w=this._popoutGroups.find(R=>R.popoutGroup===d),x=this.movingLock(()=>w.popoutGroup.model.removePanel(w.popoutGroup.panels[0],{skipSetActive:!0,skipSetActiveGroup:!0}));this.doRemoveGroup(d,{skipActive:!0});const P=this.createGroupAtLocation(c);this.movingLock(()=>P.model.openPanel(x,{skipSetActive:!0})),this.doSetGroupAndPanelActive(P),this._onDidMovePanel.fire({panel:this.getGroupPanel(o),from:d});return}const g=this.movingLock(()=>this.doRemoveGroup(d,{skipActive:!0,skipDispose:!0})),_=$(i.element),u=he(this.gridview.orientation,_,a);this.movingLock(()=>this.doAddGroup(g,u)),this.doSetGroupAndPanelActive(g),this._onDidMovePanel.fire({panel:this.getGroupPanel(o),from:d})}else{const v=this.movingLock(()=>d.model.removePanel(o,{skipSetActive:!1,skipSetActiveGroup:!0}));if(!v)throw new Error(`dockview: No panel with id ${o}`);const m=he(this.gridview.orientation,l,a),g=this.createGroupAtLocation(m);this.movingLock(()=>g.model.openPanel(v,{skipSetGroupActive:!0})),this.doSetGroupAndPanelActive(g),this._onDidMovePanel.fire({panel:v,from:d})}}}moveGroup(e){const t=e.from.group,i=e.to.group,n=e.to.position;if(n==="center"){const o=t.activePanel,a=this.movingLock(()=>[...t.panels].map(s=>t.model.removePanel(s.id,{skipSetActive:!0})));(t==null?void 0:t.model.size)===0&&this.doRemoveGroup(t,{skipActive:!0}),this.movingLock(()=>{for(const s of a)i.model.openPanel(s,{skipSetActive:s!==o,skipSetGroupActive:!0})}),e.skipSetActive!==!0?this.doSetGroupAndPanelActive(i):this.activePanel||this.doSetGroupAndPanelActive(i)}else{switch(t.api.location.type){case"grid":this.gridview.removeView($(t.element));break;case"floating":{const o=this._floatingGroups.find(a=>a.group===t);if(!o)throw new Error("dockview: failed to find floating group");o.dispose();break}case"popout":{const o=this._popoutGroups.find(s=>s.popoutGroup===t);if(!o)throw new Error("dockview: failed to find popout group");const a=this._popoutGroups.indexOf(o);if(a>=0&&this._popoutGroups.splice(a,1),o.referenceGroup){const s=this.getPanel(o.referenceGroup);s&&!s.api.isVisible&&this.doRemoveGroup(s,{skipActive:!0})}o.window.dispose(),i.api.location.type==="grid"?(t.model.renderContainer=this.overlayRenderContainer,t.model.dropTargetContainer=this.rootDropTargetContainer,t.model.location={type:"grid"}):i.api.location.type==="floating"&&(t.model.renderContainer=this.overlayRenderContainer,t.model.dropTargetContainer=this.rootDropTargetContainer,t.model.location={type:"floating"});break}}if(i.api.location.type==="grid"){const o=$(i.element),a=he(this.gridview.orientation,o,n);let s;switch(this.gridview.orientation){case C.VERTICAL:s=o.length%2==0?t.api.width:t.api.height;break;case C.HORIZONTAL:s=o.length%2==0?t.api.height:t.api.width;break}this.gridview.addView(t,s,a)}else if(i.api.location.type==="floating"){const o=this._floatingGroups.find(a=>a.group===i);if(o){const a=o.overlay.toJSON();let s,d;"left"in a?s=a.left+50:"right"in a?s=Math.max(0,a.right-a.width-50):s=50,"top"in a?d=a.top+50:"bottom"in a?d=Math.max(0,a.bottom-a.height-50):d=50,this.addFloatingGroup(t,{height:a.height,width:a.width,position:{left:s,top:d}})}}}if(t.panels.forEach(o=>{this._onDidMovePanel.fire({panel:o,from:t})}),this.debouncedUpdateAllPositions(),e.skipSetActive===!1){const o=i??t;this.doSetGroupAndPanelActive(o)}}doSetGroupActive(e){super.doSetGroupActive(e);const t=this.activePanel;!this._moving&&t!==this._onDidActivePanelChange.value&&this._onDidActivePanelChange.fire(t)}doSetGroupAndPanelActive(e){super.doSetGroupActive(e);const t=this.activePanel;e&&this.hasMaximizedGroup()&&!this.isMaximizedGroup(e)&&this.exitMaximizedGroup(),!this._moving&&t!==this._onDidActivePanelChange.value&&this._onDidActivePanelChange.fire(t)}getNextGroupId(){let e=this.nextGroupId.next();for(;this._groups.has(e);)e=this.nextGroupId.next();return e}createGroup(e){e||(e={});let t=e==null?void 0:e.id;if(t&&this._groups.has(e.id)&&(console.warn(`dockview: Duplicate group id ${e==null?void 0:e.id}. reassigning group id to avoid errors`),t=void 0),!t)for(t=this.nextGroupId.next();this._groups.has(t);)t=this.nextGroupId.next();const i=new wt(this,t,e);if(i.init({params:{},accessor:this}),!this._groups.has(i.id)){const n=new A(i.model.onTabDragStart(o=>{this._onWillDragPanel.fire(o)}),i.model.onGroupDragStart(o=>{this._onWillDragGroup.fire(o)}),i.model.onMove(o=>{const{groupId:a,itemId:s,target:d,index:l}=o;this.moveGroupOrPanel({from:{groupId:a,panelId:s},to:{group:i,position:d,index:l}})}),i.model.onDidDrop(o=>{this._onDidDrop.fire(o)}),i.model.onWillDrop(o=>{this._onWillDrop.fire(o)}),i.model.onWillShowOverlay(o=>{if(this.options.disableDnd){o.preventDefault();return}this._onWillShowOverlay.fire(o)}),i.model.onUnhandledDragOverEvent(o=>{this._onUnhandledDragOverEvent.fire(o)}),i.model.onDidAddPanel(o=>{this._moving||this._onDidAddPanel.fire(o.panel)}),i.model.onDidRemovePanel(o=>{this._moving||this._onDidRemovePanel.fire(o.panel)}),i.model.onDidActivePanelChange(o=>{this._moving||o.panel===this.activePanel&&this._onDidActivePanelChange.value!==o.panel&&this._onDidActivePanelChange.fire(o.panel)}),we.any(i.model.onDidPanelTitleChange,i.model.onDidPanelParametersChange)(()=>{this._bufferOnDidLayoutChange.fire()}));this._groups.set(i.id,{value:i,disposable:n})}return i.initialize(),i}createPanel(e,t){var i,n,o;const a=e.component,s=(i=e.tabComponent)!==null&&i!==void 0?i:this.options.defaultTabComponent,d=new ii(this,e.id,a,s),l=new De(e.id,a,s,this,this._api,t,d,{renderer:e.renderer,minimumWidth:e.minimumWidth,minimumHeight:e.minimumHeight,maximumWidth:e.maximumWidth,maximumHeight:e.maximumHeight});return l.init({title:(n=e.title)!==null&&n!==void 0?n:e.id,params:(o=e==null?void 0:e.params)!==null&&o!==void 0?o:{}}),l}createGroupAtLocation(e,t,i){const n=this.createGroup(i);return this.doAddGroup(n,e,t),n}findGroup(e){var t;return(t=Array.from(this._groups.values()).find(i=>i.value.model.containsPanel(e)))===null||t===void 0?void 0:t.value}orientationAtLocation(e){const t=this.gridview.orientation;return e.length%2==1?t:pe(t)}updateDropTargetModel(e){"dndEdges"in e&&(this._rootDropTarget.disabled=typeof e.dndEdges=="boolean"&&e.dndEdges===!1,typeof e.dndEdges=="object"&&e.dndEdges!==null?this._rootDropTarget.setOverlayModel(e.dndEdges):this._rootDropTarget.setOverlayModel(Dt)),"rootOverlayModel"in e&&this.updateDropTargetModel({dndEdges:e.dndEdges})}updateTheme(){var e,t;const i=(e=this._options.theme)!==null&&e!==void 0?e:gn;switch(this._themeClassnames.setClassNames(i.className),this.gridview.margin=(t=i.gap)!==null&&t!==void 0?t:0,i.dndOverlayMounting){case"absolute":this.rootDropTargetContainer.disabled=!1;break;case"relative":default:this.rootDropTargetContainer.disabled=!0;break}}}class Pn extends Ut{get orientation(){return this.gridview.orientation}set orientation(e){this.gridview.orientation=e}get options(){return this._options}get deserializer(){return this._deserializer}set deserializer(e){this._deserializer=e}constructor(e,t){var i;super(e,{proportionalLayout:(i=t.proportionalLayout)!==null&&i!==void 0?i:!0,orientation:t.orientation,styles:t.hideBorders?{separatorBorder:"transparent"}:void 0,disableAutoResizing:t.disableAutoResizing,className:t.className}),this._onDidLayoutfromJSON=new p,this.onDidLayoutFromJSON=this._onDidLayoutfromJSON.event,this._onDidRemoveGroup=new p,this.onDidRemoveGroup=this._onDidRemoveGroup.event,this._onDidAddGroup=new p,this.onDidAddGroup=this._onDidAddGroup.event,this._onDidActiveGroupChange=new p,this.onDidActiveGroupChange=this._onDidActiveGroupChange.event,this._options=t,this.addDisposables(this._onDidAddGroup,this._onDidRemoveGroup,this._onDidActiveGroupChange,this.onDidAdd(n=>{this._onDidAddGroup.fire(n)}),this.onDidRemove(n=>{this._onDidRemoveGroup.fire(n)}),this.onDidActiveChange(n=>{this._onDidActiveGroupChange.fire(n)}))}updateOptions(e){super.updateOptions(e);const t=typeof e.orientation=="string"&&this.gridview.orientation!==e.orientation;this._options=Object.assign(Object.assign({},this.options),e),t&&(this.gridview.orientation=e.orientation),this.layout(this.gridview.width,this.gridview.height,!0)}removePanel(e){this.removeGroup(e)}toJSON(){var e;return{grid:this.gridview.serialize(),activePanel:(e=this.activeGroup)===null||e===void 0?void 0:e.id}}setVisible(e,t){this.gridview.setViewVisible($(e.element),t)}setActive(e){this._groups.forEach((t,i)=>{t.value.setActive(e===t.value)})}focus(){var e;(e=this.activeGroup)===null||e===void 0||e.focus()}fromJSON(e){this.clear();const{grid:t,activePanel:i}=e;try{const n=[],o=this.width,a=this.height;if(this.gridview.deserialize(t,{fromJSON:s=>{const{data:d}=s,l=this.options.createComponent({id:d.id,name:d.component});return n.push(()=>l.init({params:d.params,minimumWidth:d.minimumWidth,maximumWidth:d.maximumWidth,minimumHeight:d.minimumHeight,maximumHeight:d.maximumHeight,priority:d.priority,snap:!!d.snap,accessor:this,isVisible:s.visible})),this._onDidAddGroup.fire(l),this.registerPanel(l),l}}),this.layout(o,a,!0),n.forEach(s=>s()),typeof i=="string"){const s=this.getPanel(i);s&&this.doSetGroupActive(s)}}catch(n){for(const o of this.groups)o.dispose(),this._groups.delete(o.id),this._onDidRemoveGroup.fire(o);throw this.clear(),n}this._onDidLayoutfromJSON.fire()}clear(){const e=this.activeGroup,t=Array.from(this._groups.values());for(const i of t)i.disposable.dispose(),this.doRemoveGroup(i.value,{skipActive:!0});e&&this.doSetGroupActive(void 0),this.gridview.clear()}movePanel(e,t){var i;let n;const o=this.gridview.remove(e),a=(i=this._groups.get(t.reference))===null||i===void 0?void 0:i.value;if(!a)throw new Error(`reference group ${t.reference} does not exist`);const s=Ne(t.direction);if(s==="center")throw new Error(`${s} not supported as an option`);{const d=$(a.element);n=he(this.gridview.orientation,d,s)}this.doAddGroup(o,n,t.size)}addPanel(e){var t,i,n,o;let a=(t=e.location)!==null&&t!==void 0?t:[0];if(!((i=e.position)===null||i===void 0)&&i.referencePanel){const d=(n=this._groups.get(e.position.referencePanel))===null||n===void 0?void 0:n.value;if(!d)throw new Error(`reference group ${e.position.referencePanel} does not exist`);const l=Ne(e.position.direction);if(l==="center")throw new Error(`${l} not supported as an option`);{const c=$(d.element);a=he(this.gridview.orientation,c,l)}}const s=this.options.createComponent({id:e.id,name:e.component});return s.init({params:(o=e.params)!==null&&o!==void 0?o:{},minimumWidth:e.minimumWidth,maximumWidth:e.maximumWidth,minimumHeight:e.minimumHeight,maximumHeight:e.maximumHeight,priority:e.priority,snap:!!e.snap,accessor:this,isVisible:!0}),this.doAddGroup(s,a,e.size),this.registerPanel(s),this.doSetGroupActive(s),s}registerPanel(e){const t=new A(e.api.onDidFocusChange(i=>{i.isFocused&&this._groups.forEach(n=>{const o=n.value;o!==e?o.setActive(!1):o.setActive(!0)})}));this._groups.set(e.id,{value:e,disposable:t})}moveGroup(e,t,i){const n=this.getPanel(t);if(!n)throw new Error("invalid operation");const o=$(e.element),a=he(this.gridview.orientation,o,i),[s,d]=ge(a),l=$(n.element),[c,v]=ge(l);if(Ft(c,s)){this.gridview.moveView(c,v,d);return}const m=this.doRemoveGroup(n,{skipActive:!0,skipDispose:!0}),g=$(e.element),_=he(this.gridview.orientation,g,i);this.doAddGroup(m,_)}removeGroup(e){super.removeGroup(e)}dispose(){super.dispose(),this._onDidLayoutfromJSON.dispose()}}class En extends ot{get panels(){return this.splitview.getViews()}get options(){return this._options}get length(){return this._panels.size}get orientation(){return this.splitview.orientation}get splitview(){return this._splitview}set splitview(e){this._splitview&&this._splitview.dispose(),this._splitview=e,this._splitviewChangeDisposable.value=new A(this._splitview.onDidSashEnd(()=>{this._onDidLayoutChange.fire(void 0)}),this._splitview.onDidAddView(t=>this._onDidAddView.fire(t)),this._splitview.onDidRemoveView(t=>this._onDidRemoveView.fire(t)))}get minimumSize(){return this.splitview.minimumSize}get maximumSize(){return this.splitview.maximumSize}get height(){return this.splitview.orientation===C.HORIZONTAL?this.splitview.orthogonalSize:this.splitview.size}get width(){return this.splitview.orientation===C.HORIZONTAL?this.splitview.size:this.splitview.orthogonalSize}constructor(e,t){var i;super(document.createElement("div"),t.disableAutoResizing),this._splitviewChangeDisposable=new K,this._panels=new Map,this._onDidLayoutfromJSON=new p,this.onDidLayoutFromJSON=this._onDidLayoutfromJSON.event,this._onDidAddView=new p,this.onDidAddView=this._onDidAddView.event,this._onDidRemoveView=new p,this.onDidRemoveView=this._onDidRemoveView.event,this._onDidLayoutChange=new p,this.onDidLayoutChange=this._onDidLayoutChange.event,this.element.style.height="100%",this.element.style.width="100%",this._classNames=new Me(this.element),this._classNames.setClassNames((i=t.className)!==null&&i!==void 0?i:""),e.appendChild(this.element),this._options=t,this.splitview=new Ce(this.element,t),this.addDisposables(this._onDidAddView,this._onDidLayoutfromJSON,this._onDidRemoveView,this._onDidLayoutChange)}updateOptions(e){var t,i;"className"in e&&this._classNames.setClassNames((t=e.className)!==null&&t!==void 0?t:""),"disableResizing"in e&&(this.disableResizing=(i=e.disableAutoResizing)!==null&&i!==void 0?i:!1),typeof e.orientation=="string"&&(this.splitview.orientation=e.orientation),this._options=Object.assign(Object.assign({},this.options),e),this.splitview.layout(this.splitview.size,this.splitview.orthogonalSize)}focus(){var e;(e=this._activePanel)===null||e===void 0||e.focus()}movePanel(e,t){this.splitview.moveView(e,t)}setVisible(e,t){const i=this.panels.indexOf(e);this.splitview.setViewVisible(i,t)}setActive(e,t){this._activePanel=e,this.panels.filter(i=>i!==e).forEach(i=>{i.api._onDidActiveChange.fire({isActive:!1}),t||i.focus()}),e.api._onDidActiveChange.fire({isActive:!0}),t||e.focus()}removePanel(e,t){const i=this._panels.get(e.id);if(!i)throw new Error(`unknown splitview panel ${e.id}`);i.dispose(),this._panels.delete(e.id);const n=this.panels.findIndex(s=>s===e);this.splitview.removeView(n,t).dispose();const a=this.panels;a.length>0&&this.setActive(a[a.length-1])}getPanel(e){return this.panels.find(t=>t.id===e)}addPanel(e){var t;if(this._panels.has(e.id))throw new Error(`panel ${e.id} already exists`);const i=this.options.createComponent({id:e.id,name:e.component});i.orientation=this.splitview.orientation,i.init({params:(t=e.params)!==null&&t!==void 0?t:{},minimumSize:e.minimumSize,maximumSize:e.maximumSize,snap:e.snap,priority:e.priority,accessor:this});const n=typeof e.size=="number"?e.size:re.Distribute,o=typeof e.index=="number"?e.index:void 0;return this.splitview.addView(i,n,o),this.doAddView(i),this.setActive(i),i}layout(e,t){const[i,n]=this.splitview.orientation===C.HORIZONTAL?[e,t]:[t,e];this.splitview.layout(i,n)}doAddView(e){const t=e.api.onDidFocusChange(i=>{i.isFocused&&this.setActive(e,!0)});this._panels.set(e.id,t)}toJSON(){var e;return{views:this.splitview.getViews().map((i,n)=>({size:this.splitview.getViewSize(n),data:i.toJSON(),snap:!!i.snap,priority:i.priority})),activeView:(e=this._activePanel)===null||e===void 0?void 0:e.id,size:this.splitview.size,orientation:this.splitview.orientation}}fromJSON(e){this.clear();const{views:t,orientation:i,size:n,activeView:o}=e,a=[],s=this.width,d=this.height;if(this.splitview=new Ce(this.element,{orientation:i,proportionalLayout:this.options.proportionalLayout,descriptor:{size:n,views:t.map(l=>{const c=l.data;if(this._panels.has(c.id))throw new Error(`panel ${c.id} already exists`);const v=this.options.createComponent({id:c.id,name:c.component});return a.push(()=>{var m;v.init({params:(m=c.params)!==null&&m!==void 0?m:{},minimumSize:c.minimumSize,maximumSize:c.maximumSize,snap:l.snap,priority:l.priority,accessor:this})}),v.orientation=i,this.doAddView(v),setTimeout(()=>{this._onDidAddView.fire(v)},0),{size:l.size,view:v}})}}),this.layout(s,d),a.forEach(l=>l()),typeof o=="string"){const l=this.getPanel(o);l&&this.setActive(l)}this._onDidLayoutfromJSON.fire()}clear(){for(const e of this._panels.values())e.dispose();for(this._panels.clear();this.splitview.length>0;)this.splitview.removeView(0,re.Distribute,!0).dispose()}dispose(){for(const t of this._panels.values())t.dispose();this._panels.clear();const e=this.splitview.getViews();this._splitviewChangeDisposable.dispose(),this.splitview.dispose();for(const t of e)t.dispose();this.element.remove(),super.dispose()}}class zt extends A{get element(){return this._element}constructor(){super(),this._expandedIcon=on(),this._collapsedIcon=Kt(),this.disposable=new K,this.apiRef={api:null},this._element=document.createElement("div"),this.element.className="dv-default-header",this._content=document.createElement("span"),this._expander=document.createElement("div"),this._expander.className="dv-pane-header-icon",this.element.appendChild(this._expander),this.element.appendChild(this._content),this.addDisposables(E(this._element,"click",()=>{var e;(e=this.apiRef.api)===null||e===void 0||e.setExpanded(!this.apiRef.api.isExpanded)}))}init(e){this.apiRef.api=e.api,this._content.textContent=e.title,this.updateIcon(),this.disposable.value=e.api.onDidExpansionChange(()=>{this.updateIcon()})}updateIcon(){var e;const t=!!(!((e=this.apiRef.api)===null||e===void 0)&&e.isExpanded);y(this._expander,"collapsed",!t),t?(this._expander.contains(this._collapsedIcon)&&this._collapsedIcon.remove(),this._expander.contains(this._expandedIcon)||this._expander.appendChild(this._expandedIcon)):(this._expander.contains(this._expandedIcon)&&this._expandedIcon.remove(),this._expander.contains(this._collapsedIcon)||this._expander.appendChild(this._collapsedIcon))}update(e){}dispose(){this.disposable.dispose(),super.dispose()}}const In=nt(),kt=22,Ct=0,St=Number.MAX_SAFE_INTEGER;class At extends Zi{constructor(e){super({accessor:e.accessor,id:e.id,component:e.component,headerComponent:e.headerComponent,orientation:e.orientation,isExpanded:e.isExpanded,disableDnd:e.disableDnd,headerSize:e.headerSize,minimumBodySize:e.minimumBodySize,maximumBodySize:e.maximumBodySize}),this.options=e}getBodyComponent(){return this.options.body}getHeaderComponent(){return this.options.header}}class On extends ot{get id(){return this._id}get panels(){return this.paneview.getPanes()}set paneview(e){this._paneview=e,this._disposable.value=new A(this._paneview.onDidChange(()=>{this._onDidLayoutChange.fire(void 0)}),this._paneview.onDidAddView(t=>this._onDidAddView.fire(t)),this._paneview.onDidRemoveView(t=>this._onDidRemoveView.fire(t)))}get paneview(){return this._paneview}get minimumSize(){return this.paneview.minimumSize}get maximumSize(){return this.paneview.maximumSize}get height(){return this.paneview.orientation===C.HORIZONTAL?this.paneview.orthogonalSize:this.paneview.size}get width(){return this.paneview.orientation===C.HORIZONTAL?this.paneview.size:this.paneview.orthogonalSize}get options(){return this._options}constructor(e,t){var i;super(document.createElement("div"),t.disableAutoResizing),this._id=In.next(),this._disposable=new K,this._viewDisposables=new Map,this._onDidLayoutfromJSON=new p,this.onDidLayoutFromJSON=this._onDidLayoutfromJSON.event,this._onDidLayoutChange=new p,this.onDidLayoutChange=this._onDidLayoutChange.event,this._onDidDrop=new p,this.onDidDrop=this._onDidDrop.event,this._onDidAddView=new p,this.onDidAddView=this._onDidAddView.event,this._onDidRemoveView=new p,this.onDidRemoveView=this._onDidRemoveView.event,this._onUnhandledDragOverEvent=new p,this.onUnhandledDragOverEvent=this._onUnhandledDragOverEvent.event,this.element.style.height="100%",this.element.style.width="100%",this.addDisposables(this._onDidLayoutChange,this._onDidLayoutfromJSON,this._onDidDrop,this._onDidAddView,this._onDidRemoveView,this._onUnhandledDragOverEvent),this._classNames=new Me(this.element),this._classNames.setClassNames((i=t.className)!==null&&i!==void 0?i:""),e.appendChild(this.element),this._options=t,this.paneview=new bt(this.element,{orientation:C.VERTICAL}),this.addDisposables(this._disposable)}setVisible(e,t){const i=this.panels.indexOf(e);this.paneview.setViewVisible(i,t)}focus(){}updateOptions(e){var t,i;"className"in e&&this._classNames.setClassNames((t=e.className)!==null&&t!==void 0?t:""),"disableResizing"in e&&(this.disableResizing=(i=e.disableAutoResizing)!==null&&i!==void 0?i:!1),this._options=Object.assign(Object.assign({},this.options),e)}addPanel(e){var t,i;const n=this.options.createComponent({id:e.id,name:e.component});let o;e.headerComponent&&this.options.createHeaderComponent&&(o=this.options.createHeaderComponent({id:e.id,name:e.headerComponent})),o||(o=new zt);const a=new At({id:e.id,component:e.component,headerComponent:e.headerComponent,header:o,body:n,orientation:C.VERTICAL,isExpanded:!!e.isExpanded,disableDnd:!!this.options.disableDnd,accessor:this,headerSize:(t=e.headerSize)!==null&&t!==void 0?t:kt,minimumBodySize:Ct,maximumBodySize:St});this.doAddPanel(a);const s=typeof e.size=="number"?e.size:re.Distribute,d=typeof e.index=="number"?e.index:void 0;return a.init({params:(i=e.params)!==null&&i!==void 0?i:{},minimumBodySize:e.minimumBodySize,maximumBodySize:e.maximumBodySize,isExpanded:e.isExpanded,title:e.title,containerApi:new Se(this),accessor:this}),this.paneview.addPane(a,s,d),a.orientation=this.paneview.orientation,a}removePanel(e){const i=this.panels.findIndex(n=>n===e);this.paneview.removePane(i),this.doRemovePanel(e)}movePanel(e,t){this.paneview.moveView(e,t)}getPanel(e){return this.panels.find(t=>t.id===e)}layout(e,t){const[i,n]=this.paneview.orientation===C.HORIZONTAL?[e,t]:[t,e];this.paneview.layout(i,n)}toJSON(){const e=n=>n===Number.MAX_SAFE_INTEGER||n===Number.POSITIVE_INFINITY?void 0:n,t=n=>n<=0?void 0:n;return{views:this.paneview.getPanes().map((n,o)=>({size:this.paneview.getViewSize(o),data:n.toJSON(),minimumSize:t(n.minimumBodySize),maximumSize:e(n.maximumBodySize),headerSize:n.headerSize,expanded:n.isExpanded()})),size:this.paneview.size}}fromJSON(e){this.clear();const{views:t,size:i}=e,n=[],o=this.width,a=this.height;this.paneview=new bt(this.element,{orientation:C.VERTICAL,descriptor:{size:i,views:t.map(s=>{var d,l,c;const v=s.data,m=this.options.createComponent({id:v.id,name:v.component});let g;v.headerComponent&&this.options.createHeaderComponent&&(g=this.options.createHeaderComponent({id:v.id,name:v.headerComponent})),g||(g=new zt);const _=new At({id:v.id,component:v.component,headerComponent:v.headerComponent,header:g,body:m,orientation:C.VERTICAL,isExpanded:!!s.expanded,disableDnd:!!this.options.disableDnd,accessor:this,headerSize:(d=s.headerSize)!==null&&d!==void 0?d:kt,minimumBodySize:(l=s.minimumSize)!==null&&l!==void 0?l:Ct,maximumBodySize:(c=s.maximumSize)!==null&&c!==void 0?c:St});return this.doAddPanel(_),n.push(()=>{var u;_.init({params:(u=v.params)!==null&&u!==void 0?u:{},minimumBodySize:s.minimumSize,maximumBodySize:s.maximumSize,title:v.title,isExpanded:!!s.expanded,containerApi:new Se(this),accessor:this}),_.orientation=this.paneview.orientation}),setTimeout(()=>{this._onDidAddView.fire(_)},0),{size:s.size,view:_}})}}),this.layout(o,a),n.forEach(s=>s()),this._onDidLayoutfromJSON.fire()}clear(){for(const[e,t]of this._viewDisposables.entries())t.dispose();this._viewDisposables.clear(),this.paneview.dispose()}doAddPanel(e){const t=new A(e.onDidDrop(i=>{this._onDidDrop.fire(i)}),e.onUnhandledDragOverEvent(i=>{this._onUnhandledDragOverEvent.fire(i)}));this._viewDisposables.set(e.id,t)}doRemovePanel(e){const t=this._viewDisposables.get(e.id);t&&(t.dispose(),this._viewDisposables.delete(e.id))}dispose(){super.dispose();for(const[e,t]of this._viewDisposables.entries())t.dispose();this._viewDisposables.clear(),this.element.remove(),this.paneview.dispose()}}class Gn extends at{get priority(){return this._priority}set orientation(e){this._orientation=e}get orientation(){return this._orientation}get minimumSize(){const e=typeof this._minimumSize=="function"?this._minimumSize():this._minimumSize;return e!==this._evaluatedMinimumSize&&(this._evaluatedMinimumSize=e,this.updateConstraints()),e}get maximumSize(){const e=typeof this._maximumSize=="function"?this._maximumSize():this._maximumSize;return e!==this._evaluatedMaximumSize&&(this._evaluatedMaximumSize=e,this.updateConstraints()),e}get snap(){return this._snap}constructor(e,t){super(e,t,new Xt(e,t)),this._evaluatedMinimumSize=0,this._evaluatedMaximumSize=Number.POSITIVE_INFINITY,this._minimumSize=0,this._maximumSize=Number.POSITIVE_INFINITY,this._snap=!1,this._onDidChange=new p,this.onDidChange=this._onDidChange.event,this.api.initialize(this),this.addDisposables(this._onDidChange,this.api.onWillVisibilityChange(i=>{const{isVisible:n}=i,{accessor:o}=this._params;o.setVisible(this,n)}),this.api.onActiveChange(()=>{const{accessor:i}=this._params;i.setActive(this)}),this.api.onDidConstraintsChangeInternal(i=>{(typeof i.minimumSize=="number"||typeof i.minimumSize=="function")&&(this._minimumSize=i.minimumSize),(typeof i.maximumSize=="number"||typeof i.maximumSize=="function")&&(this._maximumSize=i.maximumSize),this.updateConstraints()}),this.api.onDidSizeChange(i=>{this._onDidChange.fire({size:i.size})}))}setVisible(e){this.api._onDidVisibilityChange.fire({isVisible:e})}setActive(e){this.api._onDidActiveChange.fire({isActive:e})}layout(e,t){const[i,n]=this.orientation===C.HORIZONTAL?[e,t]:[t,e];super.layout(i,n)}init(e){super.init(e),this._priority=e.priority,e.minimumSize&&(this._minimumSize=e.minimumSize),e.maximumSize&&(this._maximumSize=e.maximumSize),e.snap&&(this._snap=e.snap)}toJSON(){const e=i=>i===Number.MAX_SAFE_INTEGER||i===Number.POSITIVE_INFINITY?void 0:i,t=i=>i<=0?void 0:i;return Object.assign(Object.assign({},super.toJSON()),{minimumSize:t(this.minimumSize),maximumSize:e(this.maximumSize)})}updateConstraints(){this.api._onDidConstraintsChange.fire({maximumSize:this._evaluatedMaximumSize,minimumSize:this._evaluatedMinimumSize})}}function Tn(r,e){return new An(r,e).api}function Rn(r,e){const t=new En(r,e);return new $t(t)}function Nn(r,e){const t=new Pn(r,e);return new jt(t)}function Vn(r,e){const t=new On(r,e);return new Se(t)}var Ln=li();const Mn=Tt(Ln);/**
 * dockview
 * @version 5.2.0
 * @link https://github.com/mathuo/dockview
 * @license MIT
 */function Hn(r,e){e===void 0&&(e={});var t=e.insertAt;if(!(typeof document>"u")){var i=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style");n.type="text/css",t==="top"&&i.firstChild?i.insertBefore(n,i.firstChild):i.appendChild(n),n.styleSheet?n.styleSheet.cssText=r:n.appendChild(document.createTextNode(r))}}var Wn=`.dv-scrollable {
  position: relative;
  overflow: hidden;
}
.dv-scrollable .dv-scrollbar {
  position: absolute;
  border-radius: 2px;
  background-color: transparent;
  /* GPU optimizations */
  will-change: background-color, transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  transition-property: background-color;
  transition-timing-function: ease-in-out;
  transition-duration: 1s;
  transition-delay: 0s;
}
.dv-scrollable .dv-scrollbar-horizontal {
  bottom: 0px;
  left: 0px;
  height: 4px;
}
.dv-scrollable .dv-scrollbar-vertical {
  right: 0px;
  top: 0px;
  width: 4px;
}
.dv-scrollable:hover .dv-scrollbar, .dv-scrollable.dv-scrollable-resizing .dv-scrollbar, .dv-scrollable.dv-scrollable-scrolling .dv-scrollbar {
  background-color: var(--dv-scrollbar-background-color, rgba(255, 255, 255, 0.25));
}
.dv-svg {
  display: inline-block;
  fill: currentcolor;
  line-height: 1;
  stroke: currentcolor;
  stroke-width: 0;
}
.dockview-theme-dark {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-group-view-background-color: #1e1e1e;
  --dv-tabs-and-actions-container-background-color: #252526;
  --dv-activegroup-visiblepanel-tab-background-color: #1e1e1e;
  --dv-activegroup-hiddenpanel-tab-background-color: #2d2d2d;
  --dv-inactivegroup-visiblepanel-tab-background-color: #1e1e1e;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #2d2d2d;
  --dv-tab-divider-color: #1e1e1e;
  --dv-activegroup-visiblepanel-tab-color: white;
  --dv-activegroup-hiddenpanel-tab-color: #969696;
  --dv-inactivegroup-visiblepanel-tab-color: #8f8f8f;
  --dv-inactivegroup-hiddenpanel-tab-color: #626262;
  --dv-separator-border: rgb(68, 68, 68);
  --dv-paneview-header-border-color: rgba(204, 204, 204, 0.2);
}
.dockview-theme-dark .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}

.dockview-theme-light {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-group-view-background-color: white;
  --dv-tabs-and-actions-container-background-color: #f3f3f3;
  --dv-activegroup-visiblepanel-tab-background-color: white;
  --dv-activegroup-hiddenpanel-tab-background-color: #ececec;
  --dv-inactivegroup-visiblepanel-tab-background-color: white;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #ececec;
  --dv-tab-divider-color: white;
  --dv-activegroup-visiblepanel-tab-color: rgb(51, 51, 51);
  --dv-activegroup-hiddenpanel-tab-color: rgba(51, 51, 51, 0.7);
  --dv-inactivegroup-visiblepanel-tab-color: rgba(51, 51, 51, 0.7);
  --dv-inactivegroup-hiddenpanel-tab-color: rgba(51, 51, 51, 0.35);
  --dv-separator-border: rgba(128, 128, 128, 0.35);
  --dv-paneview-header-border-color: rgb(51, 51, 51);
  --dv-scrollbar-background-color: rgba(0, 0, 0, 0.25);
}
.dockview-theme-light .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}

.dockview-theme-vs {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-group-view-background-color: #1e1e1e;
  --dv-tabs-and-actions-container-background-color: #252526;
  --dv-activegroup-visiblepanel-tab-background-color: #1e1e1e;
  --dv-activegroup-hiddenpanel-tab-background-color: #2d2d2d;
  --dv-inactivegroup-visiblepanel-tab-background-color: #1e1e1e;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #2d2d2d;
  --dv-tab-divider-color: #1e1e1e;
  --dv-activegroup-visiblepanel-tab-color: white;
  --dv-activegroup-hiddenpanel-tab-color: #969696;
  --dv-inactivegroup-visiblepanel-tab-color: #8f8f8f;
  --dv-inactivegroup-hiddenpanel-tab-color: #626262;
  --dv-separator-border: rgb(68, 68, 68);
  --dv-paneview-header-border-color: rgba(204, 204, 204, 0.2);
  --dv-tabs-and-actions-container-background-color: #2d2d30;
  --dv-tabs-and-actions-container-height: 20px;
  --dv-tabs-and-actions-container-font-size: 11px;
  --dv-activegroup-visiblepanel-tab-background-color: #007acc;
  --dv-inactivegroup-visiblepanel-tab-background-color: #3f3f46;
  --dv-activegroup-visiblepanel-tab-color: white;
  --dv-activegroup-hiddenpanel-tab-color: white;
  --dv-inactivegroup-visiblepanel-tab-color: white;
  --dv-inactivegroup-hiddenpanel-tab-color: white;
}
.dockview-theme-vs .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}
.dockview-theme-vs .dv-groupview.dv-active-group > .dv-tabs-and-actions-container {
  box-sizing: content-box;
  border-bottom: 2px solid var(--dv-activegroup-visiblepanel-tab-background-color);
}
.dockview-theme-vs .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tab.dv-active-tab {
  border-top: 2px solid var(--dv-activegroup-visiblepanel-tab-background-color);
}
.dockview-theme-vs .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tab.dv-inactive-tab {
  border-top: 2px solid var(--dv-activegroup-hiddenpanel-tab-background-color);
}
.dockview-theme-vs .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container {
  box-sizing: content-box;
  border-bottom: 2px solid var(--dv-inactivegroup-visiblepanel-tab-background-color);
}
.dockview-theme-vs .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tab.dv-active-tab {
  border-top: 2px solid var(--dv-inactivegroup-visiblepanel-tab-background-color);
}
.dockview-theme-vs .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tab.dv-inactive-tab {
  border-top: 2px solid var(--dv-inactivegroup-hiddenpanel-tab-background-color);
}

.dockview-theme-abyss {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-color-abyss-dark: #000c18;
  --dv-color-abyss: #10192c;
  --dv-color-abyss-light: #1c1c2a;
  --dv-color-abyss-lighter: #2b2b4a;
  --dv-color-abyss-accent: rgb(91, 30, 207);
  --dv-color-abyss-primary-text: white;
  --dv-color-abyss-secondary-text: rgb(148, 151, 169);
  --dv-group-view-background-color: var(--dv-color-abyss-dark);
  --dv-tabs-and-actions-container-background-color: var(
      --dv-color-abyss-light
  );
  --dv-activegroup-visiblepanel-tab-background-color: var(
      --dv-color-abyss-dark
  );
  --dv-activegroup-hiddenpanel-tab-background-color: var(--dv-color-abyss);
  --dv-inactivegroup-visiblepanel-tab-background-color: var(
      --dv-color-abyss-dark
  );
  --dv-inactivegroup-hiddenpanel-tab-background-color: var(--dv-color-abyss);
  --dv-tab-divider-color: var(--dv-color-abyss-lighter);
  --dv-activegroup-visiblepanel-tab-color: white;
  --dv-activegroup-hiddenpanel-tab-color: rgba(255, 255, 255, 0.5);
  --dv-inactivegroup-visiblepanel-tab-color: rgba(255, 255, 255, 0.5);
  --dv-inactivegroup-hiddenpanel-tab-color: rgba(255, 255, 255, 0.25);
  --dv-separator-border: var(--dv-color-abyss-lighter);
  --dv-paneview-header-border-color: var(--dv-color-abyss-lighter);
  --dv-paneview-active-outline-color: #596f99;
}
.dockview-theme-abyss .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}

.dockview-theme-dracula {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-group-view-background-color: #282a36;
  --dv-tabs-and-actions-container-background-color: #191a21;
  --dv-activegroup-visiblepanel-tab-background-color: #282a36;
  --dv-activegroup-hiddenpanel-tab-background-color: #21222c;
  --dv-inactivegroup-visiblepanel-tab-background-color: #282a36;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #21222c;
  --dv-tab-divider-color: #191a21;
  --dv-activegroup-visiblepanel-tab-color: rgb(248, 248, 242);
  --dv-activegroup-hiddenpanel-tab-color: rgb(98, 114, 164);
  --dv-inactivegroup-visiblepanel-tab-color: rgba(248, 248, 242, 0.5);
  --dv-inactivegroup-hiddenpanel-tab-color: rgba(98, 114, 164, 0.5);
  --dv-separator-border: #bd93f9;
  --dv-paneview-header-border-color: #bd93f9;
  --dv-paneview-active-outline-color: #6272a4;
}
.dockview-theme-dracula .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}
.dockview-theme-dracula .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  position: relative;
}
.dockview-theme-dracula .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab::after {
  position: absolute;
  left: 0px;
  top: 0px;
  content: "";
  width: 100%;
  height: 1px;
  background-color: #94527e;
  z-index: 999;
}
.dockview-theme-dracula .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  position: relative;
}
.dockview-theme-dracula .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab::after {
  position: absolute;
  left: 0px;
  bottom: 0px;
  content: "";
  width: 100%;
  height: 1px;
  background-color: #5e3d5a;
  z-index: 999;
}

.dockview-theme-replit {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  box-sizing: border-box;
  padding: 10px;
  background-color: #ebeced;
  --dv-group-view-background-color: #ebeced;
  --dv-tabs-and-actions-container-background-color: #fcfcfc;
  --dv-activegroup-visiblepanel-tab-background-color: #f0f1f2;
  --dv-activegroup-hiddenpanel-tab-background-color: #fcfcfc;
  --dv-inactivegroup-visiblepanel-tab-background-color: #f0f1f2;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #fcfcfc;
  --dv-tab-divider-color: transparent;
  --dv-activegroup-visiblepanel-tab-color: rgb(51, 51, 51);
  --dv-activegroup-hiddenpanel-tab-color: rgb(51, 51, 51);
  --dv-inactivegroup-visiblepanel-tab-color: rgb(51, 51, 51);
  --dv-inactivegroup-hiddenpanel-tab-color: rgb(51, 51, 51);
  --dv-separator-border: transparent;
  --dv-paneview-header-border-color: rgb(51, 51, 51);
  --dv-sash-color: #cfd1d3;
  --dv-active-sash-color: #babbbb;
}
.dockview-theme-replit .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}
.dockview-theme-replit .dv-resize-container:has(> .dv-groupview) {
  border-radius: 8px;
}
.dockview-theme-replit .dv-resize-container {
  border-radius: 10px !important;
  border: none;
}
.dockview-theme-replit .dv-groupview {
  overflow: hidden;
  border-radius: 10px;
}
.dockview-theme-replit .dv-groupview .dv-tabs-and-actions-container {
  border-bottom: 1px solid rgba(128, 128, 128, 0.35);
}
.dockview-theme-replit .dv-groupview .dv-tabs-and-actions-container .dv-tab {
  margin: 4px;
  border-radius: 8px;
}
.dockview-theme-replit .dv-groupview .dv-tabs-and-actions-container .dv-tab .dv-svg {
  height: 8px;
  width: 8px;
}
.dockview-theme-replit .dv-groupview .dv-tabs-and-actions-container .dv-tab:hover {
  background-color: #e4e5e6 !important;
}
.dockview-theme-replit .dv-groupview .dv-content-container {
  background-color: #fcfcfc;
}
.dockview-theme-replit .dv-groupview.dv-active-group {
  border: 1px solid rgba(128, 128, 128, 0.35);
}
.dockview-theme-replit .dv-groupview.dv-inactive-group {
  border: 1px solid transparent;
}
.dockview-theme-replit .dv-vertical > .dv-sash-container > .dv-sash {
  background-color: transparent;
}
.dockview-theme-replit .dv-vertical > .dv-sash-container > .dv-sash:not(.disabled)::after {
  content: "";
  height: 4px;
  width: 40px;
  border-radius: 2px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--dv-sash-color);
  position: absolute;
}
.dockview-theme-replit .dv-vertical > .dv-sash-container > .dv-sash:not(.disabled):hover, .dockview-theme-replit .dv-vertical > .dv-sash-container > .dv-sash:not(.disabled):active {
  background-color: transparent;
}
.dockview-theme-replit .dv-vertical > .dv-sash-container > .dv-sash:not(.disabled):hover::after, .dockview-theme-replit .dv-vertical > .dv-sash-container > .dv-sash:not(.disabled):active::after {
  background-color: var(--dv-active-sash-color);
}
.dockview-theme-replit .dv-horizontal > .dv-sash-container > .dv-sash {
  background-color: transparent;
}
.dockview-theme-replit .dv-horizontal > .dv-sash-container > .dv-sash:not(.disabled)::after {
  content: "";
  height: 40px;
  width: 4px;
  border-radius: 2px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--dv-sash-color);
  position: absolute;
}
.dockview-theme-replit .dv-horizontal > .dv-sash-container > .dv-sash:not(.disabled):hover, .dockview-theme-replit .dv-horizontal > .dv-sash-container > .dv-sash:not(.disabled):active {
  background-color: transparent;
}
.dockview-theme-replit .dv-horizontal > .dv-sash-container > .dv-sash:not(.disabled):hover::after, .dockview-theme-replit .dv-horizontal > .dv-sash-container > .dv-sash:not(.disabled):active::after {
  background-color: var(--dv-active-sash-color);
}

.dockview-theme-abyss-spaced {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-tab-font-size: 12px;
  --dv-border-radius: 20px;
  --dv-tab-margin: 0.5rem 0.25rem;
  --dv-tabs-and-actions-container-height: 44px;
  --dv-border-radius: 20px;
  box-sizing: border-box;
  --dv-color-abyss-dark: rgb(11, 6, 17);
  --dv-color-abyss: #16121f;
  --dv-color-abyss-light: #201d2b;
  --dv-color-abyss-lighter: #2a2837;
  --dv-color-abyss-accent: rgb(91, 30, 207);
  --dv-color-abyss-primary-text: white;
  --dv-color-abyss-secondary-text: rgb(148, 151, 169);
  --dv-drag-over-border: 2px solid var(--dv-color-abyss-accent);
  --dv-drag-over-background-color: "";
  --dv-group-view-background-color: var(--dv-color-abyss-dark);
  --dv-tabs-and-actions-container-background-color: var(--dv-color-abyss);
  --dv-activegroup-visiblepanel-tab-background-color: var(
      --dv-color-abyss-lighter
  );
  --dv-activegroup-hiddenpanel-tab-background-color: var(
      --dv-color-abyss-light
  );
  --dv-inactivegroup-visiblepanel-tab-background-color: var(
      --dv-color-abyss-lighter
  );
  --dv-inactivegroup-hiddenpanel-tab-background-color: var(
      --dv-color-abyss-light
  );
  --dv-tab-divider-color: transparent;
  --dv-activegroup-visiblepanel-tab-color: var(--dv-color-abyss-primary-text);
  --dv-activegroup-hiddenpanel-tab-color: var(
      --dv-color-abyss-secondary-text
  );
  --dv-inactivegroup-visiblepanel-tab-color: var(
      --dv-color-abyss-primary-text
  );
  --dv-inactivegroup-hiddenpanel-tab-color: var(
      --dv-color-abyss-secondary-text
  );
  --dv-separator-border: transparent;
  --dv-paneview-header-border-color: rgb(51, 51, 51);
  --dv-active-sash-color: var(--dv-color-abyss-accent);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(0, 0, 0, 0.5);
  padding: 10px;
  background-color: var(--dv-color-abyss-dark);
}
.dockview-theme-abyss-spaced .dv-resize-container:has(> .dv-groupview) {
  border-radius: 8px;
}
.dockview-theme-abyss-spaced .dv-sash {
  border-radius: 4px;
}
.dockview-theme-abyss-spaced .dv-drop-target-anchor {
  border-radius: calc(var(--dv-border-radius) / 4);
}
.dockview-theme-abyss-spaced .dv-drop-target-anchor.dv-drop-target-content {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-abyss-spaced .dv-resize-container {
  border-radius: var(--dv-border-radius) !important;
  border: none;
}
.dockview-theme-abyss-spaced .dv-tabs-overflow-container,
.dockview-theme-abyss-spaced .dv-tabs-overflow-dropdown-default {
  border-radius: 8px;
  height: unset !important;
}
.dockview-theme-abyss-spaced .dv-tab {
  border-radius: 8px;
}
.dockview-theme-abyss-spaced .dv-tab .dv-svg {
  height: 8px;
  width: 8px;
}
.dockview-theme-abyss-spaced .dv-groupview {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-abyss-spaced .dv-groupview .dv-tabs-and-actions-container {
  padding: 0px calc(var(--dv-border-radius) / 2);
}
.dockview-theme-abyss-spaced .dv-groupview .dv-content-container {
  background-color: var(--dv-tabs-and-actions-container-background-color);
}
.dockview-theme-abyss-spaced .dv-resize-container .dv-groupview {
  border: 2px solid var(--dv-color-abyss-dark);
}

.dockview-theme-light-spaced {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-tab-font-size: 12px;
  --dv-border-radius: 20px;
  --dv-tab-margin: 0.5rem 0.25rem;
  --dv-tabs-and-actions-container-height: 44px;
  --dv-border-radius: 20px;
  box-sizing: border-box;
  --dv-drag-over-border: 2px solid rgb(91, 30, 207);
  --dv-drag-over-background-color: "";
  --dv-group-view-background-color: #f6f5f9;
  --dv-tabs-and-actions-container-background-color: white;
  --dv-activegroup-visiblepanel-tab-background-color: #ededf0;
  --dv-activegroup-hiddenpanel-tab-background-color: #f9f9fa;
  --dv-inactivegroup-visiblepanel-tab-background-color: #ededf0;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #f9f9fa;
  --dv-tab-divider-color: transparent;
  --dv-activegroup-visiblepanel-tab-color: rgb(104, 107, 130);
  --dv-activegroup-hiddenpanel-tab-color: rgb(148, 151, 169);
  --dv-inactivegroup-visiblepanel-tab-color: rgb(104, 107, 130);
  --dv-inactivegroup-hiddenpanel-tab-color: rgb(148, 151, 169);
  --dv-separator-border: transparent;
  --dv-paneview-header-border-color: rgb(51, 51, 51);
  --dv-active-sash-color: rgb(91, 30, 207);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(0, 0, 0, 0.1);
  padding: 10px;
  background-color: #f6f5f9;
  --dv-scrollbar-background-color: rgba(0, 0, 0, 0.25);
}
.dockview-theme-light-spaced .dv-resize-container:has(> .dv-groupview) {
  border-radius: 8px;
}
.dockview-theme-light-spaced .dv-sash {
  border-radius: 4px;
}
.dockview-theme-light-spaced .dv-drop-target-anchor {
  border-radius: calc(var(--dv-border-radius) / 4);
}
.dockview-theme-light-spaced .dv-drop-target-anchor.dv-drop-target-content {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-light-spaced .dv-resize-container {
  border-radius: var(--dv-border-radius) !important;
  border: none;
}
.dockview-theme-light-spaced .dv-tabs-overflow-container,
.dockview-theme-light-spaced .dv-tabs-overflow-dropdown-default {
  border-radius: 8px;
  height: unset !important;
}
.dockview-theme-light-spaced .dv-tab {
  border-radius: 8px;
}
.dockview-theme-light-spaced .dv-tab .dv-svg {
  height: 8px;
  width: 8px;
}
.dockview-theme-light-spaced .dv-groupview {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-light-spaced .dv-groupview .dv-tabs-and-actions-container {
  padding: 0px calc(var(--dv-border-radius) / 2);
}
.dockview-theme-light-spaced .dv-groupview .dv-content-container {
  background-color: var(--dv-tabs-and-actions-container-background-color);
}
.dockview-theme-light-spaced .dv-resize-container .dv-groupview {
  border: 2px solid rgba(255, 255, 255, 0.1);
}
.dv-drop-target-container {
  position: absolute;
  z-index: 9999;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  pointer-events: none;
  overflow: hidden;
  --dv-transition-duration: 300ms;
}
.dv-drop-target-container .dv-drop-target-anchor {
  position: relative;
  border: var(--dv-drag-over-border);
  background-color: var(--dv-drag-over-background-color);
  opacity: 1;
  /* GPU optimizations */
  will-change: transform, opacity;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  contain: layout paint;
  transition: opacity var(--dv-transition-duration) ease-in, top var(--dv-transition-duration) ease-out, left var(--dv-transition-duration) ease-out, width var(--dv-transition-duration) ease-out, height var(--dv-transition-duration) ease-out;
}
.dv-drop-target {
  position: relative;
  --dv-transition-duration: 70ms;
}
.dv-drop-target > .dv-drop-target-dropzone {
  position: absolute;
  left: 0px;
  top: 0px;
  height: 100%;
  width: 100%;
  z-index: 1000;
  pointer-events: none;
}
.dv-drop-target > .dv-drop-target-dropzone > .dv-drop-target-selection {
  position: relative;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  border: var(--dv-drag-over-border);
  background-color: var(--dv-drag-over-background-color);
  transition: top var(--dv-transition-duration) ease-out, left var(--dv-transition-duration) ease-out, width var(--dv-transition-duration) ease-out, height var(--dv-transition-duration) ease-out, opacity var(--dv-transition-duration) ease-out;
  will-change: transform;
  pointer-events: none;
}
.dv-drop-target > .dv-drop-target-dropzone > .dv-drop-target-selection.dv-drop-target-top.dv-drop-target-small-vertical {
  border-top: 1px solid var(--dv-drag-over-border-color);
}
.dv-drop-target > .dv-drop-target-dropzone > .dv-drop-target-selection.dv-drop-target-bottom.dv-drop-target-small-vertical {
  border-bottom: 1px solid var(--dv-drag-over-border-color);
}
.dv-drop-target > .dv-drop-target-dropzone > .dv-drop-target-selection.dv-drop-target-left.dv-drop-target-small-horizontal {
  border-left: 1px solid var(--dv-drag-over-border-color);
}
.dv-drop-target > .dv-drop-target-dropzone > .dv-drop-target-selection.dv-drop-target-right.dv-drop-target-small-horizontal {
  border-right: 1px solid var(--dv-drag-over-border-color);
}
.dv-dockview {
  position: relative;
  background-color: var(--dv-group-view-background-color);
  contain: layout;
}
.dv-dockview .dv-watermark-container {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  z-index: 1;
}
.dv-dockview .dv-overlay-render-container {
  position: relative;
}

.dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  background-color: var(--dv-activegroup-visiblepanel-tab-background-color);
  color: var(--dv-activegroup-visiblepanel-tab-color);
}
.dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-inactive-tab {
  background-color: var(--dv-activegroup-hiddenpanel-tab-background-color);
  color: var(--dv-activegroup-hiddenpanel-tab-color);
}
.dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  background-color: var(--dv-inactivegroup-visiblepanel-tab-background-color);
  color: var(--dv-inactivegroup-visiblepanel-tab-color);
}
.dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-inactive-tab {
  background-color: var(--dv-inactivegroup-hiddenpanel-tab-background-color);
  color: var(--dv-inactivegroup-hiddenpanel-tab-color);
}

/**
 * when a tab is dragged we lose the above stylings because they are conditional on parent elements
 * therefore we also set some stylings for the dragging event
 **/
.dv-tab.dv-tab-dragging {
  background-color: var(--dv-activegroup-visiblepanel-tab-background-color);
  color: var(--dv-activegroup-visiblepanel-tab-color);
}
.dv-groupview {
  display: flex;
  height: 100%;
  background-color: var(--dv-group-view-background-color);
  overflow: hidden;
  flex-direction: column;
}
.dv-groupview:focus {
  outline: none;
}
.dv-groupview > .dv-content-container {
  flex-grow: 1;
  min-height: 0;
  outline: none;
}
.dv-groupview.dv-groupview-header-bottom {
  flex-direction: column-reverse;
}
.dv-groupview.dv-groupview-header-left {
  flex-direction: row;
}
.dv-groupview.dv-groupview-header-right {
  flex-direction: row-reverse;
}
.dv-root-wrapper {
  height: 100%;
  width: 100%;
}
.dv-grid-view,
.dv-branch-node {
  height: 100%;
  width: 100%;
}
.dv-debug .dv-resize-container .dv-resize-handle-top {
  background-color: red;
}
.dv-debug .dv-resize-container .dv-resize-handle-bottom {
  background-color: green;
}
.dv-debug .dv-resize-container .dv-resize-handle-left {
  background-color: yellow;
}
.dv-debug .dv-resize-container .dv-resize-handle-right {
  background-color: blue;
}
.dv-debug .dv-resize-container .dv-resize-handle-topleft,
.dv-debug .dv-resize-container .dv-resize-handle-topright,
.dv-debug .dv-resize-container .dv-resize-handle-bottomleft,
.dv-debug .dv-resize-container .dv-resize-handle-bottomright {
  background-color: cyan;
}

.dv-resize-container {
  --dv-overlay-z-index: var(--dv-overlay-z-index, 999);
  position: absolute;
  z-index: calc(var(--dv-overlay-z-index) - 2);
  border: 1px solid var(--dv-tab-divider-color);
  box-shadow: var(--dv-floating-box-shadow);
  /* GPU optimizations for floating group movement */
  will-change: transform, opacity;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}
.dv-resize-container.dv-hidden {
  display: none;
}
.dv-resize-container.dv-resize-container-dragging {
  opacity: 0.5;
  /* Enhanced GPU acceleration during drag */
  will-change: transform, opacity;
}
.dv-resize-container .dv-resize-handle-top {
  height: 4px;
  width: calc(100% - 8px);
  left: 4px;
  top: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: ns-resize;
}
.dv-resize-container .dv-resize-handle-bottom {
  height: 4px;
  width: calc(100% - 8px);
  left: 4px;
  bottom: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: ns-resize;
}
.dv-resize-container .dv-resize-handle-left {
  height: calc(100% - 8px);
  width: 4px;
  left: -2px;
  top: 4px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: ew-resize;
}
.dv-resize-container .dv-resize-handle-right {
  height: calc(100% - 8px);
  width: 4px;
  right: -2px;
  top: 4px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: ew-resize;
}
.dv-resize-container .dv-resize-handle-topleft {
  height: 4px;
  width: 4px;
  top: -2px;
  left: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: nw-resize;
}
.dv-resize-container .dv-resize-handle-topright {
  height: 4px;
  width: 4px;
  right: -2px;
  top: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: ne-resize;
}
.dv-resize-container .dv-resize-handle-bottomleft {
  height: 4px;
  width: 4px;
  left: -2px;
  bottom: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: sw-resize;
}
.dv-resize-container .dv-resize-handle-bottomright {
  height: 4px;
  width: 4px;
  right: -2px;
  bottom: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: se-resize;
}
.dv-render-overlay {
  --dv-overlay-z-index: var(--dv-overlay-z-index, 999);
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  contain: layout paint;
  isolation: isolate;
  /* GPU optimizations */
  will-change: transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}
.dv-render-overlay.dv-render-overlay-float {
  z-index: calc(var(--dv-overlay-z-index) - 1);
}

.dv-debug .dv-render-overlay {
  outline: 1px solid red;
  outline-offset: -1;
}
.dv-pane-container {
  height: 100%;
  width: 100%;
}
.dv-pane-container.dv-animated .dv-view {
  /* GPU optimizations for smooth pane animations */
  will-change: transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  transition: transform 0.15s ease-out;
}
.dv-pane-container .dv-view {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 0px !important;
}
.dv-pane-container .dv-view:not(:first-child)::before {
  background-color: transparent !important;
}
.dv-pane-container .dv-view:not(:first-child) .dv-pane > .dv-pane-header {
  border-top: 1px solid var(--dv-paneview-header-border-color);
}
.dv-pane-container .dv-view .dv-default-header {
  background-color: var(--dv-group-view-background-color);
  color: var(--dv-activegroup-visiblepanel-tab-color);
  display: flex;
  padding: 0px 8px;
  cursor: pointer;
}
.dv-pane-container .dv-view .dv-default-header .dv-pane-header-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}
.dv-pane-container .dv-view .dv-default-header > span {
  padding-left: 8px;
  flex-grow: 1;
}
.dv-pane-container:first-of-type > .dv-pane > .dv-pane-header {
  border-top: none !important;
}
.dv-pane-container .dv-pane {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
}
.dv-pane-container .dv-pane .dv-pane-header {
  box-sizing: border-box;
  user-select: none;
  position: relative;
  outline: none;
}
.dv-pane-container .dv-pane .dv-pane-header.dv-pane-draggable {
  cursor: pointer;
}
.dv-pane-container .dv-pane .dv-pane-header:focus:before, .dv-pane-container .dv-pane .dv-pane-header:focus-within:before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  content: "";
  pointer-events: none;
  outline: 1px solid;
  outline-width: -1px;
  outline-style: solid;
  outline-offset: -1px;
  outline-color: var(--dv-paneview-active-outline-color);
}
.dv-pane-container .dv-pane .dv-pane-body {
  overflow-y: auto;
  overflow-x: hidden;
  flex-grow: 1;
  position: relative;
  outline: none;
}
.dv-pane-container .dv-pane .dv-pane-body:focus:before, .dv-pane-container .dv-pane .dv-pane-body:focus-within:before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  content: "";
  pointer-events: none;
  outline: 1px solid;
  outline-width: -1px;
  outline-style: solid;
  outline-offset: -1px;
  outline-color: var(--dv-paneview-active-outline-color);
}
.dv-debug .dv-split-view-container .dv-sash-container .dv-sash.dv-enabled {
  background-color: black;
}
.dv-debug .dv-split-view-container .dv-sash-container .dv-sash.dv-disabled {
  background-color: orange;
}
.dv-debug .dv-split-view-container .dv-sash-container .dv-sash.dv-maximum {
  background-color: green;
}
.dv-debug .dv-split-view-container .dv-sash-container .dv-sash.dv-minimum {
  background-color: red;
}

.dv-split-view-container {
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
}
.dv-split-view-container.dv-splitview-disabled > .dv-sash-container > .dv-sash {
  pointer-events: none;
}
.dv-split-view-container.dv-animation .dv-view,
.dv-split-view-container.dv-animation .dv-sash {
  /* GPU optimizations for smooth animations */
  will-change: transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  transition: transform 0.15s ease-out;
}
.dv-split-view-container.dv-horizontal {
  height: 100%;
}
.dv-split-view-container.dv-horizontal > .dv-sash-container > .dv-sash {
  height: 100%;
  width: 4px;
}
.dv-split-view-container.dv-horizontal > .dv-sash-container > .dv-sash.dv-enabled {
  cursor: ew-resize;
}
.dv-split-view-container.dv-horizontal > .dv-sash-container > .dv-sash.dv-disabled {
  cursor: default;
}
.dv-split-view-container.dv-horizontal > .dv-sash-container > .dv-sash.dv-maximum {
  cursor: w-resize;
}
.dv-split-view-container.dv-horizontal > .dv-sash-container > .dv-sash.dv-minimum {
  cursor: e-resize;
}
.dv-split-view-container.dv-horizontal > .dv-view-container > .dv-view:not(:first-child)::before {
  height: 100%;
  width: 1px;
}
.dv-split-view-container.dv-vertical {
  width: 100%;
}
.dv-split-view-container.dv-vertical > .dv-sash-container > .dv-sash {
  width: 100%;
  height: 4px;
}
.dv-split-view-container.dv-vertical > .dv-sash-container > .dv-sash.dv-enabled {
  cursor: ns-resize;
}
.dv-split-view-container.dv-vertical > .dv-sash-container > .dv-sash.dv-disabled {
  cursor: default;
}
.dv-split-view-container.dv-vertical > .dv-sash-container > .dv-sash.dv-maximum {
  cursor: n-resize;
}
.dv-split-view-container.dv-vertical > .dv-sash-container > .dv-sash.dv-minimum {
  cursor: s-resize;
}
.dv-split-view-container.dv-vertical > .dv-view-container > .dv-view {
  width: 100%;
}
.dv-split-view-container.dv-vertical > .dv-view-container > .dv-view:not(:first-child)::before {
  height: 1px;
  width: 100%;
}
.dv-split-view-container .dv-sash-container {
  height: 100%;
  width: 100%;
  position: absolute;
}
.dv-split-view-container .dv-sash-container .dv-sash {
  position: absolute;
  z-index: 99;
  outline: none;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  touch-action: none;
  background-color: var(--dv-sash-color, transparent);
}
.dv-split-view-container .dv-sash-container .dv-sash:not(.disabled):active, .dv-split-view-container .dv-sash-container .dv-sash:not(.disabled):hover {
  background-color: var(--dv-active-sash-color, transparent);
  transition-property: background-color;
  transition-timing-function: ease-in-out;
  transition-duration: var(--dv-active-sash-transition-duration, 0.1s);
  transition-delay: var(--dv-active-sash-transition-delay, 0.5s);
}
.dv-split-view-container .dv-view-container {
  position: relative;
  height: 100%;
  width: 100%;
}
.dv-split-view-container .dv-view-container .dv-view {
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  position: absolute;
}
.dv-split-view-container.dv-separator-border .dv-view:not(:first-child)::before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  pointer-events: none;
  background-color: var(--dv-separator-border);
}
.dv-dragged {
  transform: translate3d(0px, 0px, 0px); /* forces tab to be drawn on a separate layer (see https://github.com/microsoft/vscode/issues/18733) */
}

.dv-tab {
  flex-shrink: 0;
}
.dv-tab:focus-within, .dv-tab:focus {
  position: relative;
}
.dv-tab:focus-within::after, .dv-tab:focus::after {
  position: absolute;
  content: "";
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  pointer-events: none;
  outline: 1px solid var(--dv-tab-divider-color) !important;
  outline-offset: -1px;
  z-index: 5;
}
.dv-tab.dv-tab-dragging .dv-default-tab-action {
  background-color: var(--dv-activegroup-visiblepanel-tab-color);
}
.dv-tab.dv-active-tab .dv-default-tab .dv-default-tab-action {
  visibility: visible;
}
.dv-tab.dv-inactive-tab .dv-default-tab .dv-default-tab-action {
  visibility: hidden;
}
.dv-tab.dv-inactive-tab .dv-default-tab:hover .dv-default-tab-action {
  visibility: visible;
}
.dv-tab .dv-default-tab {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.dv-tab .dv-default-tab .dv-default-tab-content {
  flex-grow: 1;
  margin-right: 4px;
}
.dv-tab .dv-default-tab .dv-default-tab-action {
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}
.dv-tab .dv-default-tab .dv-default-tab-action:hover {
  border-radius: 2px;
  background-color: var(--dv-icon-hover-background-color);
}
.dv-tabs-overflow-dropdown-default {
  height: 100%;
  color: var(--dv-activegroup-hiddenpanel-tab-color);
  margin: var(--dv-tab-margin);
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
}
.dv-tabs-overflow-dropdown-default > span {
  padding-left: 0.25rem;
}
.dv-tabs-overflow-dropdown-default > svg {
  transform: rotate(90deg);
}
.dv-tabs-overflow-dropdown-default:hover {
  border-radius: 2px;
  background-color: var(--dv-icon-hover-background-color);
}
.dv-tabs-container {
  display: flex;
  height: 100%;
  overflow: auto;
  scrollbar-width: thin;
  /* GPU optimizations for smooth scrolling */
  will-change: scroll-position;
  transform: translate3d(0, 0, 0);
  /* Track */
  /* Handle */
}
.dv-tabs-container.dv-tabs-container-vertical {
  width: 100%;
  height: fit-content;
  max-height: 100%;
  writing-mode: vertical-rl;
}
.dv-tabs-container.dv-horizontal .dv-tab:not(:first-child)::before, .dv-tabs-container.dv-vertical .dv-tab:not(:first-child)::before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  pointer-events: none;
  background-color: var(--dv-tab-divider-color);
}
.dv-tabs-container.dv-horizontal .dv-tab:not(:first-child)::before {
  width: 1px;
  height: 100%;
}
.dv-tabs-container.dv-vertical .dv-tab:not(:first-child)::before {
  width: 100%;
  height: 1px;
}
.dv-tabs-container::-webkit-scrollbar {
  height: 3px;
}
.dv-tabs-container::-webkit-scrollbar-track {
  background: transparent;
}
.dv-tabs-container::-webkit-scrollbar-thumb {
  background: var(--dv-tabs-container-scrollbar-color);
}

.dv-scrollable > .dv-tabs-container {
  overflow: hidden;
}

.dv-tab {
  -webkit-user-drag: element;
  outline: none;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  font-size: var(--dv-tab-font-size);
  margin: var(--dv-tab-margin);
}
.dv-tab.dv-tab--shifting {
  will-change: margin-left;
  transition: transform var(--dv-transition-duration, 200ms) ease-out, margin-left var(--dv-transition-duration, 200ms) ease-out;
}
.dv-tab.dv-tab--dragging {
  width: 0 !important;
  min-width: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
  transition: width var(--dv-transition-duration, 200ms) ease-out, padding var(--dv-transition-duration, 200ms) ease-out, margin var(--dv-transition-duration, 200ms) ease-out, opacity var(--dv-transition-duration, 200ms) ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .dv-tab {
    transition: none !important;
  }
}
.dv-tabs-container-vertical .dv-tab {
  padding: 0.5rem 0.25rem;
}

.dv-tabs-overflow-container {
  flex-direction: column;
  height: unset;
  font-size: var(--dv-tabs-and-actions-container-font-size);
  max-height: min(50vh, 400px);
  overflow-y: auto;
  border: 1px solid var(--dv-tab-divider-color);
  background-color: var(--dv-group-view-background-color);
  /* Scrollbar styling for webkit browsers */
  /* Firefox scrollbar */
  scrollbar-width: thin;
}
.dv-tabs-overflow-container::-webkit-scrollbar {
  width: 6px;
}
.dv-tabs-overflow-container::-webkit-scrollbar-track {
  background: transparent;
}
.dv-tabs-overflow-container::-webkit-scrollbar-thumb {
  background: var(--dv-tabs-container-scrollbar-color);
  border-radius: 3px;
}
.dv-tabs-overflow-container .dv-tab:not(:last-child) {
  border-bottom: 1px solid var(--dv-tab-divider-color);
}
.dv-tabs-overflow-container .dv-active-tab {
  background-color: var(--dv-activegroup-visiblepanel-tab-background-color);
  color: var(--dv-activegroup-visiblepanel-tab-color);
}
.dv-tabs-overflow-container .dv-inactive-tab {
  background-color: var(--dv-activegroup-hiddenpanel-tab-background-color);
  color: var(--dv-activegroup-hiddenpanel-tab-color);
}
.dv-tabs-and-actions-container {
  display: flex;
  background-color: var(--dv-tabs-and-actions-container-background-color);
  flex-shrink: 0;
  box-sizing: border-box;
  height: var(--dv-tabs-and-actions-container-height);
  font-size: var(--dv-tabs-and-actions-container-font-size);
}
.dv-tabs-and-actions-container.dv-single-tab.dv-full-width-single-tab .dv-scrollable {
  flex-grow: 1;
}
.dv-tabs-and-actions-container.dv-single-tab.dv-full-width-single-tab .dv-tabs-container {
  flex-grow: 1;
}
.dv-tabs-and-actions-container.dv-single-tab.dv-full-width-single-tab .dv-tabs-container .dv-tab {
  flex-grow: 1;
  padding: 0px;
}
.dv-tabs-and-actions-container.dv-single-tab.dv-full-width-single-tab .dv-void-container {
  flex-grow: 0;
}
.dv-tabs-and-actions-container .dv-void-container {
  display: flex;
  flex-grow: 1;
}
.dv-tabs-and-actions-container .dv-void-container.dv-draggable {
  cursor: grab;
}
.dv-tabs-and-actions-container .dv-right-actions-container {
  display: flex;
}
.dv-tabs-and-actions-container .dv-right-actions-container.dv-right-actions-container-vertical {
  flex-direction: column;
}
.dv-tabs-and-actions-container.dv-groupview-header-vertical {
  flex-direction: column;
  height: auto;
  width: var(--dv-tabs-and-actions-container-height);
}
.dv-watermark {
  display: flex;
  height: 100%;
}`;Hn(Wn);const ni=(r,e)=>{const[t,i]=k.useState(),n=k.useRef(r.componentProps);return k.useImperativeHandle(e,()=>({update:o=>{n.current=Object.assign(Object.assign({},n.current),o),i(Date.now())}}),[]),k.createElement(r.component,n.current)};ni.displayName="DockviewReactJsBridge";const Fn=(()=>{let r=1;return{next:()=>`dockview_react_portal_key_${(r++).toString()}`}})(),Bn=k.createContext({});class _e{constructor(e,t,i,n,o){this.parent=e,this.portalStore=t,this.component=i,this.parameters=n,this.context=o,this._initialProps={},this.disposed=!1,this.createPortal()}update(e){if(this.disposed)throw new Error("invalid operation: resource is already disposed");this.componentInstance?this.componentInstance.update(e):this._initialProps=Object.assign(Object.assign({},this._initialProps),e)}createPortal(){if(this.disposed)throw new Error("invalid operation: resource is already disposed");if(!Un(this.component))throw new Error("Dockview: Only React.memo(...), React.ForwardRef(...) and functional components are accepted as components");const e=k.createElement(k.forwardRef(ni),{component:this.component,componentProps:this.parameters,ref:n=>{this.componentInstance=n,Object.keys(this._initialProps).length>0&&(this.componentInstance.update(this._initialProps),this._initialProps={})}}),t=this.context?k.createElement(Bn.Provider,{value:this.context},e):e,i=Mn.createPortal(t,this.parent,Fn.next());this.ref={portal:i,disposable:this.portalStore.addPortal(i)}}dispose(){var e;(e=this.ref)===null||e===void 0||e.disposable.dispose(),this.disposed=!0}}const Fe=()=>{const[r,e]=k.useState([]);k.useDebugValue(`Portal count: ${r.length}`);const t=k.useCallback(i=>{e(o=>[...o,i]);let n=!1;return X.from(()=>{if(n)throw new Error("invalid operation: resource already disposed");n=!0,e(o=>o.filter(a=>a!==i))})},[]);return[r,t]};function Un(r){return typeof r=="function"||!!(r!=null&&r.$$typeof)}class Pt{get element(){return this._element}constructor(e,t,i){this.id=e,this.component=t,this.reactPortalStore=i,this._onDidFocus=new p,this.onDidFocus=this._onDidFocus.event,this._onDidBlur=new p,this.onDidBlur=this._onDidBlur.event,this._element=document.createElement("div"),this._element.className="dv-react-part",this._element.style.height="100%",this._element.style.width="100%"}focus(){}init(e){this.part=new _e(this.element,this.reactPortalStore,this.component,{params:e.params,api:e.api,containerApi:e.containerApi})}update(e){var t;(t=this.part)===null||t===void 0||t.update({params:e.params})}layout(e,t){}dispose(){var e;this._onDidFocus.dispose(),this._onDidBlur.dispose(),(e=this.part)===null||e===void 0||e.dispose()}}class Et{get element(){return this._element}constructor(e,t,i){this.id=e,this.component=t,this.reactPortalStore=i,this._element=document.createElement("div"),this._element.className="dv-react-part",this._element.style.height="100%",this._element.style.width="100%"}focus(){}init(e){this.part=new _e(this.element,this.reactPortalStore,this.component,{params:e.params,api:e.api,containerApi:e.containerApi,tabLocation:e.tabLocation})}update(e){var t;(t=this.part)===null||t===void 0||t.update({params:e.params})}layout(e,t){}dispose(){var e;(e=this.part)===null||e===void 0||e.dispose()}}class It{get element(){return this._element}constructor(e,t,i){this.id=e,this.component=t,this.reactPortalStore=i,this._element=document.createElement("div"),this._element.className="dv-react-part",this._element.style.height="100%",this._element.style.width="100%"}init(e){this.part=new _e(this.element,this.reactPortalStore,this.component,{group:e.group,containerApi:e.containerApi})}focus(){}update(e){var t,i,n;this.parameters&&(this.parameters.params=e.params),(t=this.part)===null||t===void 0||t.update({params:(n=(i=this.parameters)===null||i===void 0?void 0:i.params)!==null&&n!==void 0?n:{}})}layout(e,t){}dispose(){var e;(e=this.part)===null||e===void 0||e.dispose()}}class $n{get element(){return this._element}get part(){return this._part}constructor(e,t,i){this.component=e,this.reactPortalStore=t,this._group=i,this.mutableDisposable=new K,this._element=document.createElement("div"),this._element.className="dv-react-part",this._element.style.height="100%",this._element.style.width="100%"}init(e){this.mutableDisposable.value=new A(this._group.model.onDidAddPanel(()=>{this.updatePanels()}),this._group.model.onDidRemovePanel(()=>{this.updatePanels()}),this._group.model.onDidActivePanelChange(()=>{this.updateActivePanel()}),e.api.onDidActiveChange(()=>{this.updateGroupActive()})),this._part=new _e(this.element,this.reactPortalStore,this.component,{api:e.api,containerApi:e.containerApi,panels:this._group.model.panels,activePanel:this._group.model.activePanel,isGroupActive:this._group.api.isActive,group:this._group,headerPosition:this._group.model.headerPosition})}dispose(){var e;this.mutableDisposable.dispose(),(e=this._part)===null||e===void 0||e.dispose()}update(e){var t;(t=this._part)===null||t===void 0||t.update(e.params)}updatePanels(){this.update({params:{panels:this._group.model.panels}})}updateActivePanel(){this.update({params:{activePanel:this._group.model.activePanel}})}updateGroupActive(){this.update({params:{isGroupActive:this._group.api.isActive}})}}function ye(r,e){return r?t=>new $n(r,e,t):void 0}const Oe="props.defaultTabComponent";function jn(r){return tt.reduce((t,i)=>(i in r&&(t[i]=r[i]),t),{})}const Yn=k.forwardRef((r,e)=>{const t=k.useRef(null),i=k.useRef(),[n,o]=Fe();k.useImperativeHandle(e,()=>t.current,[]);const a=k.useRef({});return k.useEffect(()=>{const s={};tt.forEach(d=>{const l=d,c=r[l];l in r&&c!==a.current[l]&&(s[l]=c)}),i.current&&i.current.updateOptions(s),a.current=r},tt.map(s=>r[s])),k.useEffect(()=>{var s;if(!t.current)return;const d=(s=r.tabComponents)!==null&&s!==void 0?s:{};r.defaultTabComponent&&(d[Oe]=r.defaultTabComponent);const l={createLeftHeaderActionComponent:ye(r.leftHeaderActionsComponent,{addPortal:o}),createRightHeaderActionComponent:ye(r.rightHeaderActionsComponent,{addPortal:o}),createPrefixHeaderActionComponent:ye(r.prefixHeaderActionsComponent,{addPortal:o}),createComponent:g=>new Pt(g.id,r.components[g.name],{addPortal:o}),createTabComponent(g){return new Et(g.id,d[g.name],{addPortal:o})},createWatermarkComponent:r.watermarkComponent?()=>new It("watermark",r.watermarkComponent,{addPortal:o}):void 0,defaultTabComponent:r.defaultTabComponent?Oe:void 0},c=Tn(t.current,Object.assign(Object.assign({},jn(r)),l)),{clientWidth:v,clientHeight:m}=t.current;return c.layout(v,m),r.onReady&&r.onReady({api:c}),i.current=c,()=>{i.current=void 0,c.dispose()}},[]),k.useEffect(()=>{if(!i.current)return()=>{};const s=i.current.onDidDrop(d=>{r.onDidDrop&&r.onDidDrop(d)});return()=>{s.dispose()}},[r.onDidDrop]),k.useEffect(()=>{if(!i.current)return()=>{};const s=i.current.onWillDrop(d=>{r.onWillDrop&&r.onWillDrop(d)});return()=>{s.dispose()}},[r.onWillDrop]),k.useEffect(()=>{i.current&&i.current.updateOptions({createComponent:s=>new Pt(s.id,r.components[s.name],{addPortal:o})})},[r.components]),k.useEffect(()=>{var s;if(!i.current)return;const d=(s=r.tabComponents)!==null&&s!==void 0?s:{};r.defaultTabComponent&&(d[Oe]=r.defaultTabComponent),i.current.updateOptions({defaultTabComponent:r.defaultTabComponent?Oe:void 0,createTabComponent(l){return new Et(l.id,d[l.name],{addPortal:o})}})},[r.tabComponents,r.defaultTabComponent]),k.useEffect(()=>{i.current&&i.current.updateOptions({createWatermarkComponent:r.watermarkComponent?()=>new It("watermark",r.watermarkComponent,{addPortal:o}):void 0})},[r.watermarkComponent]),k.useEffect(()=>{i.current&&i.current.updateOptions({createRightHeaderActionComponent:ye(r.rightHeaderActionsComponent,{addPortal:o})})},[r.rightHeaderActionsComponent]),k.useEffect(()=>{i.current&&i.current.updateOptions({createLeftHeaderActionComponent:ye(r.leftHeaderActionsComponent,{addPortal:o})})},[r.leftHeaderActionsComponent]),k.useEffect(()=>{i.current&&i.current.updateOptions({createPrefixHeaderActionComponent:ye(r.prefixHeaderActionsComponent,{addPortal:o})})},[r.prefixHeaderActionsComponent]),k.createElement("div",{style:{height:"100%",width:"100%"},ref:t},n)});Yn.displayName="DockviewComponent";class Ot extends Gn{constructor(e,t,i,n){super(e,t),this.reactComponent=i,this.reactPortalStore=n}getComponent(){var e,t;return new _e(this.element,this.reactPortalStore,this.reactComponent,{params:(t=(e=this._params)===null||e===void 0?void 0:e.params)!==null&&t!==void 0?t:{},api:this.api,containerApi:new $t(this._params.accessor)})}}function Jn(r){return Ze.reduce((t,i)=>(i in r&&(t[i]=r[i]),t),{})}const Zn=k.forwardRef((r,e)=>{const t=k.useRef(null),i=k.useRef(),[n,o]=Fe();k.useImperativeHandle(e,()=>t.current,[]);const a=k.useRef({});return k.useEffect(()=>{const s={};Ze.forEach(d=>{const l=d,c=r[l];l in r&&c!==a.current[l]&&(s[l]=c)}),i.current&&i.current.updateOptions(s),a.current=r},Ze.map(s=>r[s])),k.useEffect(()=>{if(!t.current)return()=>{};const s={createComponent:v=>new Ot(v.id,v.name,r.components[v.name],{addPortal:o})},d=Rn(t.current,Object.assign(Object.assign({},Jn(r)),s)),{clientWidth:l,clientHeight:c}=t.current;return d.layout(l,c),r.onReady&&r.onReady({api:d}),i.current=d,()=>{i.current=void 0,d.dispose()}},[]),k.useEffect(()=>{i.current&&i.current.updateOptions({createComponent:s=>new Ot(s.id,s.name,r.components[s.name],{addPortal:o})})},[r.components]),k.createElement("div",{style:{height:"100%",width:"100%"},ref:t},n)});Zn.displayName="SplitviewComponent";class Gt extends ti{constructor(e,t,i,n){super(e,t),this.reactComponent=i,this.reactPortalStore=n}getComponent(){var e,t;return new _e(this.element,this.reactPortalStore,this.reactComponent,{params:(t=(e=this._params)===null||e===void 0?void 0:e.params)!==null&&t!==void 0?t:{},api:this.api,containerApi:new jt(this._params.accessor)})}}function Xn(r){return Qe.reduce((t,i)=>(i in r&&(t[i]=r[i]),t),{})}const qn=k.forwardRef((r,e)=>{const t=k.useRef(null),i=k.useRef(),[n,o]=Fe();k.useImperativeHandle(e,()=>t.current,[]);const a=k.useRef({});return k.useEffect(()=>{const s={};Qe.forEach(d=>{const l=d,c=r[l];l in r&&c!==a.current[l]&&(s[l]=c)}),i.current&&i.current.updateOptions(s),a.current=r},Qe.map(s=>r[s])),k.useEffect(()=>{if(!t.current)return()=>{};const s={createComponent:v=>new Gt(v.id,v.name,r.components[v.name],{addPortal:o})},d=Nn(t.current,Object.assign(Object.assign({},Xn(r)),s)),{clientWidth:l,clientHeight:c}=t.current;return d.layout(l,c),r.onReady&&r.onReady({api:d}),i.current=d,()=>{i.current=void 0,d.dispose()}},[]),k.useEffect(()=>{i.current&&i.current.updateOptions({createComponent:s=>new Gt(s.id,s.name,r.components[s.name],{addPortal:o})})},[r.components]),k.createElement("div",{style:{height:"100%",width:"100%"},ref:t},n)});qn.displayName="GridviewComponent";class Ge{get element(){return this._element}constructor(e,t,i){this.id=e,this.component=t,this.reactPortalStore=i,this._element=document.createElement("div"),this._element.style.height="100%",this._element.style.width="100%"}init(e){this.part=new _e(this.element,this.reactPortalStore,this.component,{params:e.params,api:e.api,title:e.title,containerApi:e.containerApi})}toJSON(){return{id:this.id}}update(e){var t;(t=this.part)===null||t===void 0||t.update(e.params)}dispose(){var e;(e=this.part)===null||e===void 0||e.dispose()}}function Kn(r){return et.reduce((t,i)=>(i in r&&(t[i]=r[i]),t),{})}const Qn=k.forwardRef((r,e)=>{const t=k.useRef(null),i=k.useRef(),[n,o]=Fe();k.useImperativeHandle(e,()=>t.current,[]);const a=k.useRef({});return k.useEffect(()=>{const s={};et.forEach(d=>{const l=d,c=r[l];l in r&&c!==a.current[l]&&(s[l]=c)}),i.current&&i.current.updateOptions(s),a.current=r},et.map(s=>r[s])),k.useEffect(()=>{var s;if(!t.current)return()=>{};const d=(s=r.headerComponents)!==null&&s!==void 0?s:{},l={createComponent:g=>new Ge(g.id,r.components[g.name],{addPortal:o}),createHeaderComponent:g=>new Ge(g.id,d[g.name],{addPortal:o})},c=Vn(t.current,Object.assign(Object.assign({},Kn(r)),l)),{clientWidth:v,clientHeight:m}=t.current;return c.layout(v,m),r.onReady&&r.onReady({api:c}),i.current=c,()=>{i.current=void 0,c.dispose()}},[]),k.useEffect(()=>{i.current&&i.current.updateOptions({createComponent:s=>new Ge(s.id,r.components[s.name],{addPortal:o})})},[r.components]),k.useEffect(()=>{var s;if(!i.current)return;const d=(s=r.headerComponents)!==null&&s!==void 0?s:{};i.current.updateOptions({createHeaderComponent:l=>new Ge(l.id,d[l.name],{addPortal:o})})},[r.headerComponents]),k.useEffect(()=>{if(!i.current)return()=>{};const s=i.current.onDidDrop(d=>{r.onDidDrop&&r.onDidDrop(d)});return()=>{s.dispose()}},[r.onDidDrop]),k.createElement("div",{style:{height:"100%",width:"100%"},ref:t},n)});Qn.displayName="PaneviewComponent";/**
 * dockview-react
 * @version 5.2.0
 * @link https://github.com/mathuo/dockview
 * @license MIT
 */function eo(r,e){e===void 0&&(e={});var t=e.insertAt;if(!(typeof document>"u")){var i=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style");n.type="text/css",t==="top"&&i.firstChild?i.insertBefore(n,i.firstChild):i.appendChild(n),n.styleSheet?n.styleSheet.cssText=r:n.appendChild(document.createTextNode(r))}}var to=`.dv-scrollable {
  position: relative;
  overflow: hidden;
}
.dv-scrollable .dv-scrollbar {
  position: absolute;
  border-radius: 2px;
  background-color: transparent;
  /* GPU optimizations */
  will-change: background-color, transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  transition-property: background-color;
  transition-timing-function: ease-in-out;
  transition-duration: 1s;
  transition-delay: 0s;
}
.dv-scrollable .dv-scrollbar-horizontal {
  bottom: 0px;
  left: 0px;
  height: 4px;
}
.dv-scrollable .dv-scrollbar-vertical {
  right: 0px;
  top: 0px;
  width: 4px;
}
.dv-scrollable:hover .dv-scrollbar, .dv-scrollable.dv-scrollable-resizing .dv-scrollbar, .dv-scrollable.dv-scrollable-scrolling .dv-scrollbar {
  background-color: var(--dv-scrollbar-background-color, rgba(255, 255, 255, 0.25));
}
.dv-svg {
  display: inline-block;
  fill: currentcolor;
  line-height: 1;
  stroke: currentcolor;
  stroke-width: 0;
}
.dockview-theme-dark {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-group-view-background-color: #1e1e1e;
  --dv-tabs-and-actions-container-background-color: #252526;
  --dv-activegroup-visiblepanel-tab-background-color: #1e1e1e;
  --dv-activegroup-hiddenpanel-tab-background-color: #2d2d2d;
  --dv-inactivegroup-visiblepanel-tab-background-color: #1e1e1e;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #2d2d2d;
  --dv-tab-divider-color: #1e1e1e;
  --dv-activegroup-visiblepanel-tab-color: white;
  --dv-activegroup-hiddenpanel-tab-color: #969696;
  --dv-inactivegroup-visiblepanel-tab-color: #8f8f8f;
  --dv-inactivegroup-hiddenpanel-tab-color: #626262;
  --dv-separator-border: rgb(68, 68, 68);
  --dv-paneview-header-border-color: rgba(204, 204, 204, 0.2);
}
.dockview-theme-dark .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}

.dockview-theme-light {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-group-view-background-color: white;
  --dv-tabs-and-actions-container-background-color: #f3f3f3;
  --dv-activegroup-visiblepanel-tab-background-color: white;
  --dv-activegroup-hiddenpanel-tab-background-color: #ececec;
  --dv-inactivegroup-visiblepanel-tab-background-color: white;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #ececec;
  --dv-tab-divider-color: white;
  --dv-activegroup-visiblepanel-tab-color: rgb(51, 51, 51);
  --dv-activegroup-hiddenpanel-tab-color: rgba(51, 51, 51, 0.7);
  --dv-inactivegroup-visiblepanel-tab-color: rgba(51, 51, 51, 0.7);
  --dv-inactivegroup-hiddenpanel-tab-color: rgba(51, 51, 51, 0.35);
  --dv-separator-border: rgba(128, 128, 128, 0.35);
  --dv-paneview-header-border-color: rgb(51, 51, 51);
  --dv-scrollbar-background-color: rgba(0, 0, 0, 0.25);
}
.dockview-theme-light .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}

.dockview-theme-vs {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-group-view-background-color: #1e1e1e;
  --dv-tabs-and-actions-container-background-color: #252526;
  --dv-activegroup-visiblepanel-tab-background-color: #1e1e1e;
  --dv-activegroup-hiddenpanel-tab-background-color: #2d2d2d;
  --dv-inactivegroup-visiblepanel-tab-background-color: #1e1e1e;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #2d2d2d;
  --dv-tab-divider-color: #1e1e1e;
  --dv-activegroup-visiblepanel-tab-color: white;
  --dv-activegroup-hiddenpanel-tab-color: #969696;
  --dv-inactivegroup-visiblepanel-tab-color: #8f8f8f;
  --dv-inactivegroup-hiddenpanel-tab-color: #626262;
  --dv-separator-border: rgb(68, 68, 68);
  --dv-paneview-header-border-color: rgba(204, 204, 204, 0.2);
  --dv-tabs-and-actions-container-background-color: #2d2d30;
  --dv-tabs-and-actions-container-height: 20px;
  --dv-tabs-and-actions-container-font-size: 11px;
  --dv-activegroup-visiblepanel-tab-background-color: #007acc;
  --dv-inactivegroup-visiblepanel-tab-background-color: #3f3f46;
  --dv-activegroup-visiblepanel-tab-color: white;
  --dv-activegroup-hiddenpanel-tab-color: white;
  --dv-inactivegroup-visiblepanel-tab-color: white;
  --dv-inactivegroup-hiddenpanel-tab-color: white;
}
.dockview-theme-vs .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}
.dockview-theme-vs .dv-groupview.dv-active-group > .dv-tabs-and-actions-container {
  box-sizing: content-box;
  border-bottom: 2px solid var(--dv-activegroup-visiblepanel-tab-background-color);
}
.dockview-theme-vs .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tab.dv-active-tab {
  border-top: 2px solid var(--dv-activegroup-visiblepanel-tab-background-color);
}
.dockview-theme-vs .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tab.dv-inactive-tab {
  border-top: 2px solid var(--dv-activegroup-hiddenpanel-tab-background-color);
}
.dockview-theme-vs .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container {
  box-sizing: content-box;
  border-bottom: 2px solid var(--dv-inactivegroup-visiblepanel-tab-background-color);
}
.dockview-theme-vs .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tab.dv-active-tab {
  border-top: 2px solid var(--dv-inactivegroup-visiblepanel-tab-background-color);
}
.dockview-theme-vs .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tab.dv-inactive-tab {
  border-top: 2px solid var(--dv-inactivegroup-hiddenpanel-tab-background-color);
}

.dockview-theme-abyss {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-color-abyss-dark: #000c18;
  --dv-color-abyss: #10192c;
  --dv-color-abyss-light: #1c1c2a;
  --dv-color-abyss-lighter: #2b2b4a;
  --dv-color-abyss-accent: rgb(91, 30, 207);
  --dv-color-abyss-primary-text: white;
  --dv-color-abyss-secondary-text: rgb(148, 151, 169);
  --dv-group-view-background-color: var(--dv-color-abyss-dark);
  --dv-tabs-and-actions-container-background-color: var(
      --dv-color-abyss-light
  );
  --dv-activegroup-visiblepanel-tab-background-color: var(
      --dv-color-abyss-dark
  );
  --dv-activegroup-hiddenpanel-tab-background-color: var(--dv-color-abyss);
  --dv-inactivegroup-visiblepanel-tab-background-color: var(
      --dv-color-abyss-dark
  );
  --dv-inactivegroup-hiddenpanel-tab-background-color: var(--dv-color-abyss);
  --dv-tab-divider-color: var(--dv-color-abyss-lighter);
  --dv-activegroup-visiblepanel-tab-color: white;
  --dv-activegroup-hiddenpanel-tab-color: rgba(255, 255, 255, 0.5);
  --dv-inactivegroup-visiblepanel-tab-color: rgba(255, 255, 255, 0.5);
  --dv-inactivegroup-hiddenpanel-tab-color: rgba(255, 255, 255, 0.25);
  --dv-separator-border: var(--dv-color-abyss-lighter);
  --dv-paneview-header-border-color: var(--dv-color-abyss-lighter);
  --dv-paneview-active-outline-color: #596f99;
}
.dockview-theme-abyss .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}

.dockview-theme-dracula {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-group-view-background-color: #282a36;
  --dv-tabs-and-actions-container-background-color: #191a21;
  --dv-activegroup-visiblepanel-tab-background-color: #282a36;
  --dv-activegroup-hiddenpanel-tab-background-color: #21222c;
  --dv-inactivegroup-visiblepanel-tab-background-color: #282a36;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #21222c;
  --dv-tab-divider-color: #191a21;
  --dv-activegroup-visiblepanel-tab-color: rgb(248, 248, 242);
  --dv-activegroup-hiddenpanel-tab-color: rgb(98, 114, 164);
  --dv-inactivegroup-visiblepanel-tab-color: rgba(248, 248, 242, 0.5);
  --dv-inactivegroup-hiddenpanel-tab-color: rgba(98, 114, 164, 0.5);
  --dv-separator-border: #bd93f9;
  --dv-paneview-header-border-color: #bd93f9;
  --dv-paneview-active-outline-color: #6272a4;
}
.dockview-theme-dracula .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}
.dockview-theme-dracula .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  position: relative;
}
.dockview-theme-dracula .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab::after {
  position: absolute;
  left: 0px;
  top: 0px;
  content: "";
  width: 100%;
  height: 1px;
  background-color: #94527e;
  z-index: 999;
}
.dockview-theme-dracula .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  position: relative;
}
.dockview-theme-dracula .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab::after {
  position: absolute;
  left: 0px;
  bottom: 0px;
  content: "";
  width: 100%;
  height: 1px;
  background-color: #5e3d5a;
  z-index: 999;
}

.dockview-theme-replit {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  box-sizing: border-box;
  padding: 10px;
  background-color: #ebeced;
  --dv-group-view-background-color: #ebeced;
  --dv-tabs-and-actions-container-background-color: #fcfcfc;
  --dv-activegroup-visiblepanel-tab-background-color: #f0f1f2;
  --dv-activegroup-hiddenpanel-tab-background-color: #fcfcfc;
  --dv-inactivegroup-visiblepanel-tab-background-color: #f0f1f2;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #fcfcfc;
  --dv-tab-divider-color: transparent;
  --dv-activegroup-visiblepanel-tab-color: rgb(51, 51, 51);
  --dv-activegroup-hiddenpanel-tab-color: rgb(51, 51, 51);
  --dv-inactivegroup-visiblepanel-tab-color: rgb(51, 51, 51);
  --dv-inactivegroup-hiddenpanel-tab-color: rgb(51, 51, 51);
  --dv-separator-border: transparent;
  --dv-paneview-header-border-color: rgb(51, 51, 51);
  --dv-sash-color: #cfd1d3;
  --dv-active-sash-color: #babbbb;
}
.dockview-theme-replit .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}
.dockview-theme-replit .dv-resize-container:has(> .dv-groupview) {
  border-radius: 8px;
}
.dockview-theme-replit .dv-resize-container {
  border-radius: 10px !important;
  border: none;
}
.dockview-theme-replit .dv-groupview {
  overflow: hidden;
  border-radius: 10px;
}
.dockview-theme-replit .dv-groupview .dv-tabs-and-actions-container {
  border-bottom: 1px solid rgba(128, 128, 128, 0.35);
}
.dockview-theme-replit .dv-groupview .dv-tabs-and-actions-container .dv-tab {
  margin: 4px;
  border-radius: 8px;
}
.dockview-theme-replit .dv-groupview .dv-tabs-and-actions-container .dv-tab .dv-svg {
  height: 8px;
  width: 8px;
}
.dockview-theme-replit .dv-groupview .dv-tabs-and-actions-container .dv-tab:hover {
  background-color: #e4e5e6 !important;
}
.dockview-theme-replit .dv-groupview .dv-content-container {
  background-color: #fcfcfc;
}
.dockview-theme-replit .dv-groupview.dv-active-group {
  border: 1px solid rgba(128, 128, 128, 0.35);
}
.dockview-theme-replit .dv-groupview.dv-inactive-group {
  border: 1px solid transparent;
}
.dockview-theme-replit .dv-vertical > .dv-sash-container > .dv-sash {
  background-color: transparent;
}
.dockview-theme-replit .dv-vertical > .dv-sash-container > .dv-sash:not(.disabled)::after {
  content: "";
  height: 4px;
  width: 40px;
  border-radius: 2px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--dv-sash-color);
  position: absolute;
}
.dockview-theme-replit .dv-vertical > .dv-sash-container > .dv-sash:not(.disabled):hover, .dockview-theme-replit .dv-vertical > .dv-sash-container > .dv-sash:not(.disabled):active {
  background-color: transparent;
}
.dockview-theme-replit .dv-vertical > .dv-sash-container > .dv-sash:not(.disabled):hover::after, .dockview-theme-replit .dv-vertical > .dv-sash-container > .dv-sash:not(.disabled):active::after {
  background-color: var(--dv-active-sash-color);
}
.dockview-theme-replit .dv-horizontal > .dv-sash-container > .dv-sash {
  background-color: transparent;
}
.dockview-theme-replit .dv-horizontal > .dv-sash-container > .dv-sash:not(.disabled)::after {
  content: "";
  height: 40px;
  width: 4px;
  border-radius: 2px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--dv-sash-color);
  position: absolute;
}
.dockview-theme-replit .dv-horizontal > .dv-sash-container > .dv-sash:not(.disabled):hover, .dockview-theme-replit .dv-horizontal > .dv-sash-container > .dv-sash:not(.disabled):active {
  background-color: transparent;
}
.dockview-theme-replit .dv-horizontal > .dv-sash-container > .dv-sash:not(.disabled):hover::after, .dockview-theme-replit .dv-horizontal > .dv-sash-container > .dv-sash:not(.disabled):active::after {
  background-color: var(--dv-active-sash-color);
}

.dockview-theme-abyss-spaced {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-tab-font-size: 12px;
  --dv-border-radius: 20px;
  --dv-tab-margin: 0.5rem 0.25rem;
  --dv-tabs-and-actions-container-height: 44px;
  --dv-border-radius: 20px;
  box-sizing: border-box;
  --dv-color-abyss-dark: rgb(11, 6, 17);
  --dv-color-abyss: #16121f;
  --dv-color-abyss-light: #201d2b;
  --dv-color-abyss-lighter: #2a2837;
  --dv-color-abyss-accent: rgb(91, 30, 207);
  --dv-color-abyss-primary-text: white;
  --dv-color-abyss-secondary-text: rgb(148, 151, 169);
  --dv-drag-over-border: 2px solid var(--dv-color-abyss-accent);
  --dv-drag-over-background-color: "";
  --dv-group-view-background-color: var(--dv-color-abyss-dark);
  --dv-tabs-and-actions-container-background-color: var(--dv-color-abyss);
  --dv-activegroup-visiblepanel-tab-background-color: var(
      --dv-color-abyss-lighter
  );
  --dv-activegroup-hiddenpanel-tab-background-color: var(
      --dv-color-abyss-light
  );
  --dv-inactivegroup-visiblepanel-tab-background-color: var(
      --dv-color-abyss-lighter
  );
  --dv-inactivegroup-hiddenpanel-tab-background-color: var(
      --dv-color-abyss-light
  );
  --dv-tab-divider-color: transparent;
  --dv-activegroup-visiblepanel-tab-color: var(--dv-color-abyss-primary-text);
  --dv-activegroup-hiddenpanel-tab-color: var(
      --dv-color-abyss-secondary-text
  );
  --dv-inactivegroup-visiblepanel-tab-color: var(
      --dv-color-abyss-primary-text
  );
  --dv-inactivegroup-hiddenpanel-tab-color: var(
      --dv-color-abyss-secondary-text
  );
  --dv-separator-border: transparent;
  --dv-paneview-header-border-color: rgb(51, 51, 51);
  --dv-active-sash-color: var(--dv-color-abyss-accent);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(0, 0, 0, 0.5);
  padding: 10px;
  background-color: var(--dv-color-abyss-dark);
}
.dockview-theme-abyss-spaced .dv-resize-container:has(> .dv-groupview) {
  border-radius: 8px;
}
.dockview-theme-abyss-spaced .dv-sash {
  border-radius: 4px;
}
.dockview-theme-abyss-spaced .dv-drop-target-anchor {
  border-radius: calc(var(--dv-border-radius) / 4);
}
.dockview-theme-abyss-spaced .dv-drop-target-anchor.dv-drop-target-content {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-abyss-spaced .dv-resize-container {
  border-radius: var(--dv-border-radius) !important;
  border: none;
}
.dockview-theme-abyss-spaced .dv-tabs-overflow-container,
.dockview-theme-abyss-spaced .dv-tabs-overflow-dropdown-default {
  border-radius: 8px;
  height: unset !important;
}
.dockview-theme-abyss-spaced .dv-tab {
  border-radius: 8px;
}
.dockview-theme-abyss-spaced .dv-tab .dv-svg {
  height: 8px;
  width: 8px;
}
.dockview-theme-abyss-spaced .dv-groupview {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-abyss-spaced .dv-groupview .dv-tabs-and-actions-container {
  padding: 0px calc(var(--dv-border-radius) / 2);
}
.dockview-theme-abyss-spaced .dv-groupview .dv-content-container {
  background-color: var(--dv-tabs-and-actions-container-background-color);
}
.dockview-theme-abyss-spaced .dv-resize-container .dv-groupview {
  border: 2px solid var(--dv-color-abyss-dark);
}

.dockview-theme-light-spaced {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-tab-font-size: 12px;
  --dv-border-radius: 20px;
  --dv-tab-margin: 0.5rem 0.25rem;
  --dv-tabs-and-actions-container-height: 44px;
  --dv-border-radius: 20px;
  box-sizing: border-box;
  --dv-drag-over-border: 2px solid rgb(91, 30, 207);
  --dv-drag-over-background-color: "";
  --dv-group-view-background-color: #f6f5f9;
  --dv-tabs-and-actions-container-background-color: white;
  --dv-activegroup-visiblepanel-tab-background-color: #ededf0;
  --dv-activegroup-hiddenpanel-tab-background-color: #f9f9fa;
  --dv-inactivegroup-visiblepanel-tab-background-color: #ededf0;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #f9f9fa;
  --dv-tab-divider-color: transparent;
  --dv-activegroup-visiblepanel-tab-color: rgb(104, 107, 130);
  --dv-activegroup-hiddenpanel-tab-color: rgb(148, 151, 169);
  --dv-inactivegroup-visiblepanel-tab-color: rgb(104, 107, 130);
  --dv-inactivegroup-hiddenpanel-tab-color: rgb(148, 151, 169);
  --dv-separator-border: transparent;
  --dv-paneview-header-border-color: rgb(51, 51, 51);
  --dv-active-sash-color: rgb(91, 30, 207);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(0, 0, 0, 0.1);
  padding: 10px;
  background-color: #f6f5f9;
  --dv-scrollbar-background-color: rgba(0, 0, 0, 0.25);
}
.dockview-theme-light-spaced .dv-resize-container:has(> .dv-groupview) {
  border-radius: 8px;
}
.dockview-theme-light-spaced .dv-sash {
  border-radius: 4px;
}
.dockview-theme-light-spaced .dv-drop-target-anchor {
  border-radius: calc(var(--dv-border-radius) / 4);
}
.dockview-theme-light-spaced .dv-drop-target-anchor.dv-drop-target-content {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-light-spaced .dv-resize-container {
  border-radius: var(--dv-border-radius) !important;
  border: none;
}
.dockview-theme-light-spaced .dv-tabs-overflow-container,
.dockview-theme-light-spaced .dv-tabs-overflow-dropdown-default {
  border-radius: 8px;
  height: unset !important;
}
.dockview-theme-light-spaced .dv-tab {
  border-radius: 8px;
}
.dockview-theme-light-spaced .dv-tab .dv-svg {
  height: 8px;
  width: 8px;
}
.dockview-theme-light-spaced .dv-groupview {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-light-spaced .dv-groupview .dv-tabs-and-actions-container {
  padding: 0px calc(var(--dv-border-radius) / 2);
}
.dockview-theme-light-spaced .dv-groupview .dv-content-container {
  background-color: var(--dv-tabs-and-actions-container-background-color);
}
.dockview-theme-light-spaced .dv-resize-container .dv-groupview {
  border: 2px solid rgba(255, 255, 255, 0.1);
}
.dv-drop-target-container {
  position: absolute;
  z-index: 9999;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  pointer-events: none;
  overflow: hidden;
  --dv-transition-duration: 300ms;
}
.dv-drop-target-container .dv-drop-target-anchor {
  position: relative;
  border: var(--dv-drag-over-border);
  background-color: var(--dv-drag-over-background-color);
  opacity: 1;
  /* GPU optimizations */
  will-change: transform, opacity;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  contain: layout paint;
  transition: opacity var(--dv-transition-duration) ease-in, top var(--dv-transition-duration) ease-out, left var(--dv-transition-duration) ease-out, width var(--dv-transition-duration) ease-out, height var(--dv-transition-duration) ease-out;
}
.dv-drop-target {
  position: relative;
  --dv-transition-duration: 70ms;
}
.dv-drop-target > .dv-drop-target-dropzone {
  position: absolute;
  left: 0px;
  top: 0px;
  height: 100%;
  width: 100%;
  z-index: 1000;
  pointer-events: none;
}
.dv-drop-target > .dv-drop-target-dropzone > .dv-drop-target-selection {
  position: relative;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  border: var(--dv-drag-over-border);
  background-color: var(--dv-drag-over-background-color);
  transition: top var(--dv-transition-duration) ease-out, left var(--dv-transition-duration) ease-out, width var(--dv-transition-duration) ease-out, height var(--dv-transition-duration) ease-out, opacity var(--dv-transition-duration) ease-out;
  will-change: transform;
  pointer-events: none;
}
.dv-drop-target > .dv-drop-target-dropzone > .dv-drop-target-selection.dv-drop-target-top.dv-drop-target-small-vertical {
  border-top: 1px solid var(--dv-drag-over-border-color);
}
.dv-drop-target > .dv-drop-target-dropzone > .dv-drop-target-selection.dv-drop-target-bottom.dv-drop-target-small-vertical {
  border-bottom: 1px solid var(--dv-drag-over-border-color);
}
.dv-drop-target > .dv-drop-target-dropzone > .dv-drop-target-selection.dv-drop-target-left.dv-drop-target-small-horizontal {
  border-left: 1px solid var(--dv-drag-over-border-color);
}
.dv-drop-target > .dv-drop-target-dropzone > .dv-drop-target-selection.dv-drop-target-right.dv-drop-target-small-horizontal {
  border-right: 1px solid var(--dv-drag-over-border-color);
}
.dv-dockview {
  position: relative;
  background-color: var(--dv-group-view-background-color);
  contain: layout;
}
.dv-dockview .dv-watermark-container {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  z-index: 1;
}
.dv-dockview .dv-overlay-render-container {
  position: relative;
}

.dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  background-color: var(--dv-activegroup-visiblepanel-tab-background-color);
  color: var(--dv-activegroup-visiblepanel-tab-color);
}
.dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-inactive-tab {
  background-color: var(--dv-activegroup-hiddenpanel-tab-background-color);
  color: var(--dv-activegroup-hiddenpanel-tab-color);
}
.dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  background-color: var(--dv-inactivegroup-visiblepanel-tab-background-color);
  color: var(--dv-inactivegroup-visiblepanel-tab-color);
}
.dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-inactive-tab {
  background-color: var(--dv-inactivegroup-hiddenpanel-tab-background-color);
  color: var(--dv-inactivegroup-hiddenpanel-tab-color);
}

/**
 * when a tab is dragged we lose the above stylings because they are conditional on parent elements
 * therefore we also set some stylings for the dragging event
 **/
.dv-tab.dv-tab-dragging {
  background-color: var(--dv-activegroup-visiblepanel-tab-background-color);
  color: var(--dv-activegroup-visiblepanel-tab-color);
}
.dv-groupview {
  display: flex;
  height: 100%;
  background-color: var(--dv-group-view-background-color);
  overflow: hidden;
  flex-direction: column;
}
.dv-groupview:focus {
  outline: none;
}
.dv-groupview > .dv-content-container {
  flex-grow: 1;
  min-height: 0;
  outline: none;
}
.dv-groupview.dv-groupview-header-bottom {
  flex-direction: column-reverse;
}
.dv-groupview.dv-groupview-header-left {
  flex-direction: row;
}
.dv-groupview.dv-groupview-header-right {
  flex-direction: row-reverse;
}
.dv-root-wrapper {
  height: 100%;
  width: 100%;
}
.dv-grid-view,
.dv-branch-node {
  height: 100%;
  width: 100%;
}
.dv-debug .dv-resize-container .dv-resize-handle-top {
  background-color: red;
}
.dv-debug .dv-resize-container .dv-resize-handle-bottom {
  background-color: green;
}
.dv-debug .dv-resize-container .dv-resize-handle-left {
  background-color: yellow;
}
.dv-debug .dv-resize-container .dv-resize-handle-right {
  background-color: blue;
}
.dv-debug .dv-resize-container .dv-resize-handle-topleft,
.dv-debug .dv-resize-container .dv-resize-handle-topright,
.dv-debug .dv-resize-container .dv-resize-handle-bottomleft,
.dv-debug .dv-resize-container .dv-resize-handle-bottomright {
  background-color: cyan;
}

.dv-resize-container {
  --dv-overlay-z-index: var(--dv-overlay-z-index, 999);
  position: absolute;
  z-index: calc(var(--dv-overlay-z-index) - 2);
  border: 1px solid var(--dv-tab-divider-color);
  box-shadow: var(--dv-floating-box-shadow);
  /* GPU optimizations for floating group movement */
  will-change: transform, opacity;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}
.dv-resize-container.dv-hidden {
  display: none;
}
.dv-resize-container.dv-resize-container-dragging {
  opacity: 0.5;
  /* Enhanced GPU acceleration during drag */
  will-change: transform, opacity;
}
.dv-resize-container .dv-resize-handle-top {
  height: 4px;
  width: calc(100% - 8px);
  left: 4px;
  top: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: ns-resize;
}
.dv-resize-container .dv-resize-handle-bottom {
  height: 4px;
  width: calc(100% - 8px);
  left: 4px;
  bottom: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: ns-resize;
}
.dv-resize-container .dv-resize-handle-left {
  height: calc(100% - 8px);
  width: 4px;
  left: -2px;
  top: 4px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: ew-resize;
}
.dv-resize-container .dv-resize-handle-right {
  height: calc(100% - 8px);
  width: 4px;
  right: -2px;
  top: 4px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: ew-resize;
}
.dv-resize-container .dv-resize-handle-topleft {
  height: 4px;
  width: 4px;
  top: -2px;
  left: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: nw-resize;
}
.dv-resize-container .dv-resize-handle-topright {
  height: 4px;
  width: 4px;
  right: -2px;
  top: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: ne-resize;
}
.dv-resize-container .dv-resize-handle-bottomleft {
  height: 4px;
  width: 4px;
  left: -2px;
  bottom: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: sw-resize;
}
.dv-resize-container .dv-resize-handle-bottomright {
  height: 4px;
  width: 4px;
  right: -2px;
  bottom: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: se-resize;
}
.dv-render-overlay {
  --dv-overlay-z-index: var(--dv-overlay-z-index, 999);
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  contain: layout paint;
  isolation: isolate;
  /* GPU optimizations */
  will-change: transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}
.dv-render-overlay.dv-render-overlay-float {
  z-index: calc(var(--dv-overlay-z-index) - 1);
}

.dv-debug .dv-render-overlay {
  outline: 1px solid red;
  outline-offset: -1;
}
.dv-pane-container {
  height: 100%;
  width: 100%;
}
.dv-pane-container.dv-animated .dv-view {
  /* GPU optimizations for smooth pane animations */
  will-change: transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  transition: transform 0.15s ease-out;
}
.dv-pane-container .dv-view {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 0px !important;
}
.dv-pane-container .dv-view:not(:first-child)::before {
  background-color: transparent !important;
}
.dv-pane-container .dv-view:not(:first-child) .dv-pane > .dv-pane-header {
  border-top: 1px solid var(--dv-paneview-header-border-color);
}
.dv-pane-container .dv-view .dv-default-header {
  background-color: var(--dv-group-view-background-color);
  color: var(--dv-activegroup-visiblepanel-tab-color);
  display: flex;
  padding: 0px 8px;
  cursor: pointer;
}
.dv-pane-container .dv-view .dv-default-header .dv-pane-header-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}
.dv-pane-container .dv-view .dv-default-header > span {
  padding-left: 8px;
  flex-grow: 1;
}
.dv-pane-container:first-of-type > .dv-pane > .dv-pane-header {
  border-top: none !important;
}
.dv-pane-container .dv-pane {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
}
.dv-pane-container .dv-pane .dv-pane-header {
  box-sizing: border-box;
  user-select: none;
  position: relative;
  outline: none;
}
.dv-pane-container .dv-pane .dv-pane-header.dv-pane-draggable {
  cursor: pointer;
}
.dv-pane-container .dv-pane .dv-pane-header:focus:before, .dv-pane-container .dv-pane .dv-pane-header:focus-within:before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  content: "";
  pointer-events: none;
  outline: 1px solid;
  outline-width: -1px;
  outline-style: solid;
  outline-offset: -1px;
  outline-color: var(--dv-paneview-active-outline-color);
}
.dv-pane-container .dv-pane .dv-pane-body {
  overflow-y: auto;
  overflow-x: hidden;
  flex-grow: 1;
  position: relative;
  outline: none;
}
.dv-pane-container .dv-pane .dv-pane-body:focus:before, .dv-pane-container .dv-pane .dv-pane-body:focus-within:before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  content: "";
  pointer-events: none;
  outline: 1px solid;
  outline-width: -1px;
  outline-style: solid;
  outline-offset: -1px;
  outline-color: var(--dv-paneview-active-outline-color);
}
.dv-debug .dv-split-view-container .dv-sash-container .dv-sash.dv-enabled {
  background-color: black;
}
.dv-debug .dv-split-view-container .dv-sash-container .dv-sash.dv-disabled {
  background-color: orange;
}
.dv-debug .dv-split-view-container .dv-sash-container .dv-sash.dv-maximum {
  background-color: green;
}
.dv-debug .dv-split-view-container .dv-sash-container .dv-sash.dv-minimum {
  background-color: red;
}

.dv-split-view-container {
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
}
.dv-split-view-container.dv-splitview-disabled > .dv-sash-container > .dv-sash {
  pointer-events: none;
}
.dv-split-view-container.dv-animation .dv-view,
.dv-split-view-container.dv-animation .dv-sash {
  /* GPU optimizations for smooth animations */
  will-change: transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  transition: transform 0.15s ease-out;
}
.dv-split-view-container.dv-horizontal {
  height: 100%;
}
.dv-split-view-container.dv-horizontal > .dv-sash-container > .dv-sash {
  height: 100%;
  width: 4px;
}
.dv-split-view-container.dv-horizontal > .dv-sash-container > .dv-sash.dv-enabled {
  cursor: ew-resize;
}
.dv-split-view-container.dv-horizontal > .dv-sash-container > .dv-sash.dv-disabled {
  cursor: default;
}
.dv-split-view-container.dv-horizontal > .dv-sash-container > .dv-sash.dv-maximum {
  cursor: w-resize;
}
.dv-split-view-container.dv-horizontal > .dv-sash-container > .dv-sash.dv-minimum {
  cursor: e-resize;
}
.dv-split-view-container.dv-horizontal > .dv-view-container > .dv-view:not(:first-child)::before {
  height: 100%;
  width: 1px;
}
.dv-split-view-container.dv-vertical {
  width: 100%;
}
.dv-split-view-container.dv-vertical > .dv-sash-container > .dv-sash {
  width: 100%;
  height: 4px;
}
.dv-split-view-container.dv-vertical > .dv-sash-container > .dv-sash.dv-enabled {
  cursor: ns-resize;
}
.dv-split-view-container.dv-vertical > .dv-sash-container > .dv-sash.dv-disabled {
  cursor: default;
}
.dv-split-view-container.dv-vertical > .dv-sash-container > .dv-sash.dv-maximum {
  cursor: n-resize;
}
.dv-split-view-container.dv-vertical > .dv-sash-container > .dv-sash.dv-minimum {
  cursor: s-resize;
}
.dv-split-view-container.dv-vertical > .dv-view-container > .dv-view {
  width: 100%;
}
.dv-split-view-container.dv-vertical > .dv-view-container > .dv-view:not(:first-child)::before {
  height: 1px;
  width: 100%;
}
.dv-split-view-container .dv-sash-container {
  height: 100%;
  width: 100%;
  position: absolute;
}
.dv-split-view-container .dv-sash-container .dv-sash {
  position: absolute;
  z-index: 99;
  outline: none;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  touch-action: none;
  background-color: var(--dv-sash-color, transparent);
}
.dv-split-view-container .dv-sash-container .dv-sash:not(.disabled):active, .dv-split-view-container .dv-sash-container .dv-sash:not(.disabled):hover {
  background-color: var(--dv-active-sash-color, transparent);
  transition-property: background-color;
  transition-timing-function: ease-in-out;
  transition-duration: var(--dv-active-sash-transition-duration, 0.1s);
  transition-delay: var(--dv-active-sash-transition-delay, 0.5s);
}
.dv-split-view-container .dv-view-container {
  position: relative;
  height: 100%;
  width: 100%;
}
.dv-split-view-container .dv-view-container .dv-view {
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  position: absolute;
}
.dv-split-view-container.dv-separator-border .dv-view:not(:first-child)::before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  pointer-events: none;
  background-color: var(--dv-separator-border);
}
.dv-dragged {
  transform: translate3d(0px, 0px, 0px); /* forces tab to be drawn on a separate layer (see https://github.com/microsoft/vscode/issues/18733) */
}

.dv-tab {
  flex-shrink: 0;
}
.dv-tab:focus-within, .dv-tab:focus {
  position: relative;
}
.dv-tab:focus-within::after, .dv-tab:focus::after {
  position: absolute;
  content: "";
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  pointer-events: none;
  outline: 1px solid var(--dv-tab-divider-color) !important;
  outline-offset: -1px;
  z-index: 5;
}
.dv-tab.dv-tab-dragging .dv-default-tab-action {
  background-color: var(--dv-activegroup-visiblepanel-tab-color);
}
.dv-tab.dv-active-tab .dv-default-tab .dv-default-tab-action {
  visibility: visible;
}
.dv-tab.dv-inactive-tab .dv-default-tab .dv-default-tab-action {
  visibility: hidden;
}
.dv-tab.dv-inactive-tab .dv-default-tab:hover .dv-default-tab-action {
  visibility: visible;
}
.dv-tab .dv-default-tab {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.dv-tab .dv-default-tab .dv-default-tab-content {
  flex-grow: 1;
  margin-right: 4px;
}
.dv-tab .dv-default-tab .dv-default-tab-action {
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}
.dv-tab .dv-default-tab .dv-default-tab-action:hover {
  border-radius: 2px;
  background-color: var(--dv-icon-hover-background-color);
}
.dv-tabs-overflow-dropdown-default {
  height: 100%;
  color: var(--dv-activegroup-hiddenpanel-tab-color);
  margin: var(--dv-tab-margin);
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
}
.dv-tabs-overflow-dropdown-default > span {
  padding-left: 0.25rem;
}
.dv-tabs-overflow-dropdown-default > svg {
  transform: rotate(90deg);
}
.dv-tabs-overflow-dropdown-default:hover {
  border-radius: 2px;
  background-color: var(--dv-icon-hover-background-color);
}
.dv-tabs-container {
  display: flex;
  height: 100%;
  overflow: auto;
  scrollbar-width: thin;
  /* GPU optimizations for smooth scrolling */
  will-change: scroll-position;
  transform: translate3d(0, 0, 0);
  /* Track */
  /* Handle */
}
.dv-tabs-container.dv-tabs-container-vertical {
  width: 100%;
  height: fit-content;
  max-height: 100%;
  writing-mode: vertical-rl;
}
.dv-tabs-container.dv-horizontal .dv-tab:not(:first-child)::before, .dv-tabs-container.dv-vertical .dv-tab:not(:first-child)::before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  pointer-events: none;
  background-color: var(--dv-tab-divider-color);
}
.dv-tabs-container.dv-horizontal .dv-tab:not(:first-child)::before {
  width: 1px;
  height: 100%;
}
.dv-tabs-container.dv-vertical .dv-tab:not(:first-child)::before {
  width: 100%;
  height: 1px;
}
.dv-tabs-container::-webkit-scrollbar {
  height: 3px;
}
.dv-tabs-container::-webkit-scrollbar-track {
  background: transparent;
}
.dv-tabs-container::-webkit-scrollbar-thumb {
  background: var(--dv-tabs-container-scrollbar-color);
}

.dv-scrollable > .dv-tabs-container {
  overflow: hidden;
}

.dv-tab {
  -webkit-user-drag: element;
  outline: none;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  font-size: var(--dv-tab-font-size);
  margin: var(--dv-tab-margin);
}
.dv-tab.dv-tab--shifting {
  will-change: margin-left;
  transition: transform var(--dv-transition-duration, 200ms) ease-out, margin-left var(--dv-transition-duration, 200ms) ease-out;
}
.dv-tab.dv-tab--dragging {
  width: 0 !important;
  min-width: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
  transition: width var(--dv-transition-duration, 200ms) ease-out, padding var(--dv-transition-duration, 200ms) ease-out, margin var(--dv-transition-duration, 200ms) ease-out, opacity var(--dv-transition-duration, 200ms) ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .dv-tab {
    transition: none !important;
  }
}
.dv-tabs-container-vertical .dv-tab {
  padding: 0.5rem 0.25rem;
}

.dv-tabs-overflow-container {
  flex-direction: column;
  height: unset;
  font-size: var(--dv-tabs-and-actions-container-font-size);
  max-height: min(50vh, 400px);
  overflow-y: auto;
  border: 1px solid var(--dv-tab-divider-color);
  background-color: var(--dv-group-view-background-color);
  /* Scrollbar styling for webkit browsers */
  /* Firefox scrollbar */
  scrollbar-width: thin;
}
.dv-tabs-overflow-container::-webkit-scrollbar {
  width: 6px;
}
.dv-tabs-overflow-container::-webkit-scrollbar-track {
  background: transparent;
}
.dv-tabs-overflow-container::-webkit-scrollbar-thumb {
  background: var(--dv-tabs-container-scrollbar-color);
  border-radius: 3px;
}
.dv-tabs-overflow-container .dv-tab:not(:last-child) {
  border-bottom: 1px solid var(--dv-tab-divider-color);
}
.dv-tabs-overflow-container .dv-active-tab {
  background-color: var(--dv-activegroup-visiblepanel-tab-background-color);
  color: var(--dv-activegroup-visiblepanel-tab-color);
}
.dv-tabs-overflow-container .dv-inactive-tab {
  background-color: var(--dv-activegroup-hiddenpanel-tab-background-color);
  color: var(--dv-activegroup-hiddenpanel-tab-color);
}
.dv-tabs-and-actions-container {
  display: flex;
  background-color: var(--dv-tabs-and-actions-container-background-color);
  flex-shrink: 0;
  box-sizing: border-box;
  height: var(--dv-tabs-and-actions-container-height);
  font-size: var(--dv-tabs-and-actions-container-font-size);
}
.dv-tabs-and-actions-container.dv-single-tab.dv-full-width-single-tab .dv-scrollable {
  flex-grow: 1;
}
.dv-tabs-and-actions-container.dv-single-tab.dv-full-width-single-tab .dv-tabs-container {
  flex-grow: 1;
}
.dv-tabs-and-actions-container.dv-single-tab.dv-full-width-single-tab .dv-tabs-container .dv-tab {
  flex-grow: 1;
  padding: 0px;
}
.dv-tabs-and-actions-container.dv-single-tab.dv-full-width-single-tab .dv-void-container {
  flex-grow: 0;
}
.dv-tabs-and-actions-container .dv-void-container {
  display: flex;
  flex-grow: 1;
}
.dv-tabs-and-actions-container .dv-void-container.dv-draggable {
  cursor: grab;
}
.dv-tabs-and-actions-container .dv-right-actions-container {
  display: flex;
}
.dv-tabs-and-actions-container .dv-right-actions-container.dv-right-actions-container-vertical {
  flex-direction: column;
}
.dv-tabs-and-actions-container.dv-groupview-header-vertical {
  flex-direction: column;
  height: auto;
  width: var(--dv-tabs-and-actions-container-height);
}
.dv-watermark {
  display: flex;
  height: 100%;
}`;eo(to);export{Yn as D,k as R,li as a,Nt as b,io as c,Ln as d,Mn as e,Mi as p,Rt as r};
//# sourceMappingURL=vendor-dockview-CzRb_6Po.js.map
