!function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="dist",t(t.s=2)}({2:function(e,n){$((function(e){const n=e("#selector-liquid"),t=e("#density-ff"),r=e("#density-p"),o=e("#distance-1"),u=e("#distance-2"),l=(e("#distance-curr"),e("#range")),i=e("#lrv"),a=e("#urv"),c=(e("#result-ma"),e("#result-percents"));let f="gas";e.each(n[0],(function(e){n[0].options[e].foo=function(){f=this.value}})),n.on("change",(function(e){n[0].options[n[0].selectedIndex].foo()})),c.on("input",(function(){!function(){let e=0,n=0,l=0;"gas"!==f?i.val((function(){return e=Number(o.val()),n=Number(u.val()),""!==t.val()&&(e*=Number(t.val())),""!==r.val()&&(n*=Number(r.val())),l=e-n,console.log(e,n,l),-l})):i.val((function(){return console.log(u.val(),r.val()),-Number(u.val())*Number(r.val())}))}(),a.val((function(){return Number(i.val())+Number(l.val())}))}))}))}});