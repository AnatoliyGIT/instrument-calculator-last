!function(n){var t={};function e(u){if(t[u])return t[u].exports;var r=t[u]={i:u,l:!1,exports:{}};return n[u].call(r.exports,r,r.exports,e),r.l=!0,r.exports}e.m=n,e.c=t,e.d=function(n,t,u){e.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:u})},e.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},e.t=function(n,t){if(1&t&&(n=e(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var u=Object.create(null);if(e.r(u),Object.defineProperty(u,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var r in n)e.d(u,r,function(t){return n[t]}.bind(null,r));return u},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.p="dist",e(e.s=3)}({3:function(n,t){$((function(n){const t=n("#selector-output"),e=n("#input-lover-range"),u=n("#input-current-range-value"),r=n("#input-upper-range"),o=n("#input-output-range"),i=n("#output-ma"),c=n("#output-percents");let a=0,f="lin";n.each(t[0],(function(n){t[0].options[n].foo=function(){f=this.value}})),t.on("change",(function(n){t[0].options[t[0].selectedIndex].foo(),p(),s()}));const l=function(){o.val((function(){return Math.round(10*(Number(r.val())-Number(e.val())))/10}))},p=function(){const n=Number(o.val()),t=Number(e.val()),r=Number(u.val()),c=16/n,l=16/Math.sqrt(n),p=r-t;a=4+c*p,"sqr"===f&&(a=Math.sqrt(p*l*l)+4),i.val((function(){return a>=3.6&&a<=21.6?Math.round(1e3*a)/1e3:""}))},s=function(){let n=100*a/16-25;c.val((function(){return n>=-10&&n<=110?Math.round(10*n)/10:""}))};r.on("input",(function(){l(),p(),s()})),e.on("input",(function(){l(),p(),s()})),o.on("input",(function(){r.val((function(){return Math.round(10*(Number(o.val())+Number(e.val())))/10}))})),u.on("input",(function(){p(),s()}))}))}});