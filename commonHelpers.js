import"./assets/styles-061c43c6.js";import{f as h,i as y}from"./assets/vendor-77e16229.js";const o=document.querySelector("button[data-start]");document.querySelector('input[type="text"]');const n={days:document.querySelector("span[data-days]"),hours:document.querySelector("span[data-hours]"),minutes:document.querySelector("span[data-minutes]"),seconds:document.querySelector("span[data-seconds]")};let c=null,a=null,p={messageColor:"#FFFFF0",backgroundColor:"#FF4500",position:"topRight",progressBar:!1,close:!1};o.disabled=!0;const g={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){const t=new Date().getTime();e[0]<t?(d("Please choose a date in the future"),o.disabled=!0):(o.disabled=!1,c=e[0])}};h('input[type="text"]',g);o.addEventListener("click",()=>{if(!c){d("Please select a date first");return}T()});function T(){o.disabled=!0;const e=new Date().getTime();let t=c-e;clearInterval(a),a=setInterval(()=>{if(t-=1e3,t<=0){clearInterval(a),showSuccessToast("Timer has ended"),o.disabled=!1;return}const u=r(t);b(u)},1e3)}function b(e){n.days.textContent=s(e.days),n.hours.textContent=s(e.hours),n.minutes.textContent=s(e.minutes),n.seconds.textContent=s(e.seconds)}function s(e){return e<10?"0"+e:e}function r(e){const i=Math.floor(e/864e5),l=Math.floor(e%864e5/36e5),m=Math.floor(e%864e5%36e5/6e4),f=Math.floor(e%864e5%36e5%6e4/1e3);return{days:i,hours:l,minutes:m,seconds:f}}function d(e){y.error({message:e,...p})}console.log(r(2e3));console.log(r(14e4));console.log(r(2414e4));
//# sourceMappingURL=commonHelpers.js.map