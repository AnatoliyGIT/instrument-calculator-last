!function(n){var t={};function e(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return n[o].call(i.exports,i,i.exports,e),i.l=!0,i.exports}e.m=n,e.c=t,e.d=function(n,t,o){e.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:o})},e.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},e.t=function(n,t){if(1&t&&(n=e(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var i in n)e.d(o,i,function(t){return n[t]}.bind(null,i));return o},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.p="dist",e(e.s=4)}({4:function(n,t){$((function(n){const t=n("#press-units-left"),e=n("#press-units-right"),o=t[0],i=e[0],r=n("#press-type-left"),a=n("#press-type-right"),c=r[0],l=a[0],u=n("#input-press"),s=n("#output-press");let d=Number(u.val()),f=10,p=10,v=0,h=0;n.each(o,(function(n){o.options[n].foo=function(){d=u.val(),f=Number(this.value)}})),n.each(i,(function(n){i.options[n].foo=function(){p=Number(this.value)}})),n.each(c,(function(n){o.options[o.selectedIndex].foo(),c.options[n].foo=function(){1===n&&(v=Number(p)/101.97)}})),n.each(l,(function(n){l.options[n].foo=function(){1===n&&(h=Number(p)/101.97)}}));let b=function(){o.options[o.selectedIndex].foo(),i.options[i.selectedIndex].foo(),c.options[c.selectedIndex].foo(),l.options[l.selectedIndex].foo();let n=v,t=h;v=0,h=0,s.val((function(){return Math.round(1e3*(d*p/f+t-n))/1e3}))};t.on("change",(function(){return window.navigator.vibrate(10),b()})),e.on("change",(function(){return window.navigator.vibrate(10),b()})),u.on("input",(function(){return b()})),r.on("change",(function(){return b()})),a.on("change",(function(){return b()}));let w=new bootstrap.Modal(document.getElementById("keyboard"),{}),g=void 0,m=void 0,y="",k={};u.on("focus",(function(){k=function(t,e,o){n("#keyboard_input").children("span").html(t.val());const i=window.screen.width,r=window.screen.height;if(i<=1200){let e="95vw";i>r&&(e="50vw",n("button").css("height","60px").css("display","flex").css("justify-content","center").css("align-items","center"),n("button span").css("font-size","2rem"),n("i").css("font-size","2rem")),n("#modal-dialog").css("max-width",e),g=t,y="0"===g.val()?"":g.val(),o.show()}return{html:t,focus:e,result:y}}(u,"inp_press",w),g=k.html,y=k.result,m=k.focus})),n("#one").on("click",(function(){window.navigator.vibrate(10),y+="1",n("#keyboard_input").children("span").html(y),g.val(()=>y)})),n("#two").on("click",(function(){window.navigator.vibrate(10),y+="2",n("#keyboard_input").children("span").html(y),g.val(()=>y)})),n("#three").on("click",(function(){window.navigator.vibrate(10),y+="3",n("#keyboard_input").children("span").html(y),g.val(()=>y)})),n("#for").on("click",(function(){window.navigator.vibrate(10),y+="4",n("#keyboard_input").children("span").html(y),g.val(()=>y)})),n("#fife").on("click",(function(){window.navigator.vibrate(10),y+="5",n("#keyboard_input").children("span").html(y),g.val(()=>y)})),n("#six").on("click",(function(){window.navigator.vibrate(10),y+="6",n("#keyboard_input").children("span").html(y),g.val(()=>y)})),n("#seven").on("click",(function(){window.navigator.vibrate(10),y+="7",n("#keyboard_input").children("span").html(y),g.val(()=>y)})),n("#eight").on("click",(function(){window.navigator.vibrate(10),y+="8",n("#keyboard_input").children("span").html(y),g.val(()=>y)})),n("#nine").on("click",(function(){window.navigator.vibrate(10),y+="9",n("#keyboard_input").children("span").html(y),g.val(()=>y)})),n("#zero").on("click",(function(){window.navigator.vibrate(10),y+="0",n("#keyboard_input").children("span").html(y),g.val(()=>y)})),n("#dot").on("click",(function(){window.navigator.vibrate(10),y.includes(".")||(y+="."),n("#keyboard_input").children("span").html(y),g.val(()=>y)})),n("#minus").on("click",(function(){window.navigator.vibrate(10),y="-"!==y[0]?"-"+y:y.slice(1),n("#keyboard_input").children("span").html(y),g.val(()=>y)})),n("#backspace").on("click",(function(){window.navigator.vibrate(10),y=y.substring(0,y.length-1),n("#keyboard_input").children("span").html(y),g.val(()=>y)})),n("#erase").on("click",(function(){window.navigator.vibrate(10),n("#keyboard_input").children("span").html(""),y="",g.val(()=>y)})),n("#enter").on("click",(function(){switch(window.navigator.vibrate(10),n("#keyboard_input").children("span").html(""),g.val(()=>y),w.hide(),m){case"inp_press":b()}}))}))}});