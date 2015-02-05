/*
	
	onePageSystem - min
	
	
	Christian Marienfeld
	www.chrisland.de
	
	Version 1.3.0
	https://github.com/chrisland/onePageSystem
	
	
	Licence MIT

*/
var OPS=OPS||{};OPS.page=function(){var e=0,t=0,n=0,r=[],i="#overlay",s=function(e){return"url(img/overlay/"+e+".svg)"},o=function(){var n=document.getElementsByClassName("page").length;if(n>1&&typeof n==="number"){var r=document.getElementsByClassName("page");for(var i=0;i<r.length;i++){r[i].style.display="none"}}var s=function(e){var t=this.getAttribute("data-page"),n=this.getAttribute("data-task");if(t||n){a(this)}};var o=document.getElementsByClassName("pageBtn");for(var i=0;i<o.length;i++){o[i].style.curser="pointer";o[i].addEventListener("click",s)}if(t){OPS.page.changePageById(t)}else{OPS.page.changePageById(1)}return e},u=function(e,t,n){var r=f(null,t,n,e);if(r){fadePageDom(e);addPageHistory(e,t,n)}return false},a=function(e){if(e.classList.contains("pageBtnOffline")){return false}var t=e.getAttribute("data-page"),n=e.getAttribute("data-task"),r=e.getAttribute("data-content");var i=f(e,n,r,t);if(i){fadePageDom(t);addPageHistory(t,n,r)}return false},f=function(e,t,n,r){if(t=="back"){var i=OPS.page.getPageHistory();var s=i[i.length-2];if(!s){return false}if(s.pageTask=="cardOverview"){s.pageContent=undefined}if(s.pageId){OPS.page.changePageById(s.pageId,s.pageTask,s.pageContent);OPS.page.kickLastPageHistory(2)}return true}else if(OPS.task&&OPS.task[t]){return OPS.task[t](r,n,e)}return true};fadePageDom=function(n){var r=document.getElementById("page_"+n);if(n&&r){var i=document.getElementsByClassName("page");for(var s=0;s<i.length;s++){i[s].style.display="none"}r.style.display="block";t=e;e=n}return false},addPageHistory=function(e,t,n){if(e){var i={pageId:e,pageTask:t,pageContent:n};r.push(i)}},getPageHistory=function(){if(r){return r}return false},kickLastPageHistory=function(e){r=r.slice(0,r.length-e)},openOverlay=function(e,t){var r=document.getElementById(i);r.style.backgroundImage=s(e);r.style.display="block";if(t){clearTimeout(n);n=setTimeout(function(){closeOverlay()},t)}},closeOverlay=function(){document.getElementById(i).style.display="none"},getLastopen=function(){return t};return{initialize:o,changePage:a,addPageHistory:addPageHistory,changePageById:u,kickLastPageHistory:kickLastPageHistory,changeContent:f,openOverlay:openOverlay,closeOverlay:closeOverlay,getLastopen:getLastopen,getPageHistory:getPageHistory}}()