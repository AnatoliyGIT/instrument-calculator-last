!function(n){var e={};function t(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return n[i].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=n,t.c=e,t.d=function(n,e,i){t.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:i})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,e){if(1&e&&(n=t(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var i=Object.create(null);if(t.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var o in n)t.d(i,o,function(e){return n[e]}.bind(null,o));return i},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="dist",t(t.s=2)}({2:function(n,e){$((function(n){const e=n("#selector-calc"),t=n("#selector-liquid"),i=n("#density-ff");let o=i.val();const r=n("#density-p"),a=n("#distance-1"),c=n("#distance-2"),u=n("#distance-curr"),l=n(".distance-curr"),s=n("#range-mmh2o"),d=n("#lrv"),f=n("#urv"),v=n("#result-ma"),b=n("#result-percents"),p=n(".result-ma-percents");let m="gas",h="range",y=0;function w(){r.val((function(){return Math.round(Number(s.val())/(Number(a.val())-Number(c.val()))*100)/100}))}function g(){let n=100*y/16-25;b.val((function(){return n>=-10&&n<=110?Math.round(10*n)/10:""}))}function k(){"gas"===m||"water"===m||"glycerine"===m?s.val((function(){return Math.round(Number(a.val())*Number(r.val()))})):s.val((function(){return Math.round(Number(a.val())*Number(r.val())-Number(a.val())*Number(i.val()))}));const n=Number(s.val());!function(){let n=Number(a.val()),e=Number(c.val()),t=Number(c.val()),u=Number(a.val());"density"!==h&&("gas"===m&&d.val(Math.round(Number(c.val())*Number(r.val()))),"water"!==m&&"glycerine"!==m||d.val((function(){return n*=Number(o),-Math.round(n)})),"phase_separation"===m&&(e*=Number(r.val()),t*=Number(i.val()),d.val(e-t)),"phase_separation_glicerine"===m&&d.val((function(){return n*=Number(o),u*=Number(i.val()),-Math.round(n-u)})))}(),"density"!==h&&f.val((function(){return Math.round(Number(d.val())+Number(s.val()))}));const e=Number(u.val())*r.val();y=4+16/n*e,v.val((function(){return y>=3.6&&y<=21.6?Math.round(100*y)/100:""}))}function _(){const n=Math.round(Number(c.val())+Number(s.val())/Number(r.val()));n?a.val(n):a.val("0")}p.css("display","none"),l.css("display","none"),n.each(e[0],(function(n){e[0].options[n].foo=function(){h=this.value}})),n.each(t[0],(function(n){t[0].options[n].foo=function(){m=this.value}})),t.on("change",(function(e){t[0].options[t[0].selectedIndex].foo(),"phase_separation"===m||"phase_separation_glicerine"===m?("phase_separation_glicerine"===m&&(o="1.26"),n(".density-ff").css("display","block")):(n(".density-ff").css("display","none"),"water"===m?o="1":"glycerine"===m&&(o="1.26")),k(),g()})),e.on("change",(function(n){switch(e[0].options[e[0].selectedIndex].foo(),h){case"percents":l.css("display","block"),p.css("display","block"),r.removeAttr("disabled"),s.prop("disabled","true");break;case"density":l.css("display","none"),p.css("display","none"),r.prop("disabled","true"),s.prop("disabled","true"),_();break;case"current":l.css("display","block"),p.css("display","block"),r.removeAttr("disabled"),s.removeAttr("disabled");break;default:l.css("display","none"),p.css("display","none"),r.removeAttr("disabled"),s.removeAttr("disabled")}})),b.on("input",(function(){})),d.on("input",(function(){s.val((function(){return Number(f.val())-Number(d.val())})),"density"===h&&w()})),f.on("input",(function(){s.val((function(){return Number(f.val())-Number(d.val())})),"density"===h&&w()})),a.on("input",(function(){"density"===h?w():(k(),g())})),c.on("input",(function(){"density"===h?w():(k(),g())})),u.on("input",(function(){k(),g()})),r.on("input",(function(){k(),g()})),i.on("input",(function(){k(),g()})),s.on("input",(function(){_()}));let N=new bootstrap.Modal(document.getElementById("keyboard"),{}),M=void 0,x=void 0,j="",O={};const A=function(e,t,i){n("#keyboard_input").children("span").html(e.val());const o=window.screen.width,r=window.screen.height;if(o<=1200){let t="95vw";o>r&&(t="50vw",n("button").css("height","60px").css("display","flex").css("justify-content","center").css("align-items","center"),n("button span").css("font-size","2rem"),n("i").css("font-size","2rem")),n("#modal-dialog").css("max-width",t),M=e,j="0"===M.val()?"":M.val(),i.show()}return{html:e,focus:t,result:j}};r.on("focus",(function(){O=A(r,"density_p",N),M=O.html,j=O.result,x=O.focus})),i.on("focus",(function(){O=A(i,"density_ff",N),M=O.html,j=O.result,x=O.focus})),a.on("focus",(function(){O=A(a,"distance_1",N),M=O.html,j=O.result,x=O.focus})),c.on("focus",(function(){O=A(c,"distance_2",N),M=O.html,j=O.result,x=O.focus})),u.on("focus",(function(){O=A(u,"distance_curr",N),M=O.html,j=O.result,x=O.focus})),s.on("focus",(function(){O=A(s,"range_mmh2o",N),M=O.html,j=O.result,x=O.focus})),d.on("focus",(function(){O=A(d,"lrv",N),M=O.html,j=O.result,x=O.focus})),f.on("focus",(function(){O=A(f,"urv",N),M=O.html,j=O.result,x=O.focus})),b.on("focus",(function(){O=A(b,"result_percent",N),M=O.html,j=O.result,x=O.focus})),v.on("focus",(function(){O=A(v,"result_ma",N),M=O.html,j=O.result,x=O.focus})),n("#one").on("click",(function(){window.navigator.vibrate(10),j+="1",n("#keyboard_input").children("span").html(j),M.val(j)})),n("#two").on("click",(function(){window.navigator.vibrate(10),j+="2",n("#keyboard_input").children("span").html(j),M.val(j)})),n("#three").on("click",(function(){window.navigator.vibrate(10),j+="3",n("#keyboard_input").children("span").html(j),M.val(j)})),n("#four").on("click",(function(){window.navigator.vibrate(10),j+="4",n("#keyboard_input").children("span").html(j),M.val(j)})),n("#five").on("click",(function(){window.navigator.vibrate(10),j+="5",n("#keyboard_input").children("span").html(j),M.val(j)})),n("#six").on("click",(function(){window.navigator.vibrate(10),j+="6",n("#keyboard_input").children("span").html(j),M.val(j)})),n("#seven").on("click",(function(){window.navigator.vibrate(10),j+="7",n("#keyboard_input").children("span").html(j),M.val(j)})),n("#eight").on("click",(function(){window.navigator.vibrate(10),j+="8",n("#keyboard_input").children("span").html(j),M.val(j)})),n("#nine").on("click",(function(){window.navigator.vibrate(10),j+="9",n("#keyboard_input").children("span").html(j),M.val(j)})),n("#zero").on("click",(function(){window.navigator.vibrate(10),j+="0",n("#keyboard_input").children("span").html(j),M.val(j)})),n("#dot").on("click",(function(){window.navigator.vibrate(10),j.includes(".")||(j+="."),n("#keyboard_input").children("span").html(j),"."!==j.slice(-1)&&M.val(j)})),n("#minus").on("click",(function(){window.navigator.vibrate(10),j="-"!==j[0]?"-"+j:j.slice(1),n("#keyboard_input").children("span").html(j),M.val(j)})),n("#backspace").on("click",(function(){window.navigator.vibrate(10),j=j.substring(0,j.length-1),n("#keyboard_input").children("span").html(j),"."!==j.slice(-1)&&M.val(j)})),n("#erase").on("click",(function(){window.navigator.vibrate(10),n("#keyboard_input").children("span").html(""),j="",M.val(j)})),n("#enter").on("click",(function(){switch(window.navigator.vibrate(10),n("#keyboard_input").children("span").html(""),"."!==j.slice(-1)?M.val(j):M.val(j.substring(0,j.length-1)),N.hide(),x){case"density_p":case"density_ff":k(),g();break;case"distance_1":case"distance_2":"density"===h?w():(k(),g());break;case"distance_curr":k(),g();break;case"range_mmh2o":_();break;case"lrv":case"urv":s.val((function(){return Number(f.val())-Number(d.val())})),"density"===h&&w()}}))}))}});