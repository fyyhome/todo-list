!function(t){var e={};function i(o){if(e[o])return e[o].exports;var n=e[o]={i:o,l:!1,exports:{}};return t[o].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=e,i.d=function(t,e,o){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(i.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(o,n,function(e){return t[e]}.bind(null,n));return o},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i.r(e);class o{constructor(){this.sub=[]}addSub(t){this.sub.push(t)}notify(){this.sub.forEach(t=>{t.update()})}}o.prototype.target=null;class n{constructor(t,e,i){this.vm=t,this.prop=e,this.callback=i,this.value=this.get()}update(){const t=this.vm.$data[this.prop];t!==this.value&&(this.value=t,this.callback(t))}get(){o.target=this;const t=this.vm.$data[this.prop];return o.target=null,t}}class s{constructor(t){this.vm=t,this.el=t.$el,this.fragment=null,this.init()}init(){this.fragment=this.nodeFragment(this.el),this.compileNode(this.fragment),this.el.appendChild(this.fragment)}nodeFragment(t){const e=document.createDocumentFragment();let i=t.firstChild;for(;i;)e.appendChild(i),i=t.firstChild;return e}compileNode(t){[...t.childNodes].forEach(t=>{if(this.isElementNode(t))this.compile(t);else{let e=/\{\{(.*)\}\}/,i=t.textContent;if(e.test(i)){let o=e.exec(i)[1];this.compileText(t,o)}}t.childNodes&&t.childNodes.length&&this.compileNode(t)})}compile(t){[...t.attributes].forEach(e=>{if(this.isDrective(e.name)){let i=e.value;"fv-model"===e.name?this.compileModel(t,i):"fv-show"===e.name?this.compileShow(t,i):"fv-on"===e.name.split(":")[0]&&this.compileOn(t,e.name.split(":")[1],i)}})}compileText(t,e){let i=this.vm.$data[e];this.updateView(t,i),new n(this.vm,e,e=>{this.updateView(t,e)})}compileModel(t,e){let i=this.vm.$data[e];this.updateModel(t,i),new n(this.vm,e,e=>{this.updateModel(t,e)}),t.addEventListener("input",t=>{let i=t.target.value;i!==this.vm.$data[e]&&(this.vm.$data[e]=i)})}compileShow(t,e){let i=this.vm.$data[e];this.updateShow(t,i),new n(this.vm,e,e=>{this.updateShow(t,e)})}updateModel(t,e){t.value=void 0===e?"":e}updateView(t,e){t.textContent=void 0===e?"":e}updateShow(t,e){t.style.display=Boolean(e)?"block":"none"}isDrective(t){return-1!==t.indexOf("fv-")}isElementNode(t){return 1===t.nodeType}isTextNode(t){return 3===t.nodeType}compileOn(t,e,i){t.addEventListener(e,this.vm.$method[i].bind(this.vm))}}function r(t){null!==t&&"object"==typeof t&&Object.keys(t).forEach(e=>{!function(t,e,i){r(i);let n=new o;Object.defineProperty(t,e,{get:function(){return o.target&&n.addSub(o.target),i},set:function(t){i!==t&&(i=t,n.notify())}})}(t,e,t[e])})}window.Fvue=class{constructor(t){this.$options=t,this.$data=t.data,this.$method=t.method,this.$el=document.querySelector(t.el),Object.keys(this.$data).forEach(t=>{this.proxyData(this.$data,t)}),Object.keys(this.$method).forEach(t=>{this.proxyData(this.$method,t)}),this.init()}init(){r(this.$data),new s(this)}proxyData(t,e){"function"==typeof t[e]?Object.defineProperty(this,e,{value:this.$method[e],writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(this,e,{get:function(){return this.$data[e]},set:function(t){this.$data[e]=t}})}}}]);