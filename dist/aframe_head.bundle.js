!function(t){function e(e){for(var o,s,a=e[0],l=e[1],u=e[2],p=0,f=[];p<a.length;p++)s=a[p],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&f.push(i[s][0]),i[s]=0;for(o in l)Object.prototype.hasOwnProperty.call(l,o)&&(t[o]=l[o]);for(c&&c(e);f.length;)f.shift()();return n.push.apply(n,u||[]),r()}function r(){for(var t,e=0;e<n.length;e++){for(var r=n[e],o=!0,a=1;a<r.length;a++){var l=r[a];0!==i[l]&&(o=!1)}o&&(n.splice(e--,1),t=s(s.s=r[0]))}return t}var o={},i={0:0},n=[];function s(e){if(o[e])return o[e].exports;var r=o[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=t,s.c=o,s.d=function(t,e,r){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)s.d(r,o,function(e){return t[e]}.bind(null,o));return r},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="dist/";var a=window.webpackJsonp=window.webpackJsonp||[],l=a.push.bind(a);a.push=e,a=a.slice();for(var u=0;u<a.length;u++)e(a[u]);var c=l;n.push([6,2]),r()}({6:function(t,e,r){"use strict";r.r(e);var o=r(1);window.addEventListener("camera-init",t=>{console.log("camera-init",t)}),window.addEventListener("camera-error",t=>{console.log("camera-error",t)}),o.registerComponent("registerevents",{init:function(){var t=this.el;t.addEventListener("markerFound",(function(){var e=t.id;console.log("markerFound",e)})),t.addEventListener("markerLost",(function(){var e=t.id;console.log("markerLost",e)}))}}),o.registerComponent("listener",{init:function(){this.target=document.querySelector("a-marker"),this.prevPosition=null,this.prevRotation=null},tick:function(){if(this.el.object3D.visible){if(this.target.setAttribute("visible","true"),this.prevPosition||this.prevRotation){this.target.object3D.position.lerp(this.prevPosition,.1);let t=this.target.object3D.rotation.toVector3().lerp(this.prevRotation,.1);this.target.object3D.rotation.setFromVector3(t)}else this.target.setAttribute("position",this.el.getAttribute("position")),this.target.setAttribute("rotation",this.el.getAttribute("rotation"));this.prevPosition=this.el.object3D.position,this.prevRotation=this.el.object3D.rotation}else this.target.setAttribute("visible","false"),this.prevPosition=null,this.prevRotation=null}})}});