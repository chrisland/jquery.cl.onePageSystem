
/*
	
	onPageSystem
	
	
	Christian Marienfeld
	www.chrisland.de
	
	Version 1.3.0
	https://github.com/chrisland/onePageOPStem
	
	
	Licence MIT

*/



var OPS = OPS || {};



OPS.page = (function(){
	
	
	var open = 0,
	lastopen = 0,
	timerOverlay = 0,
	pageHistory = [],
	overlayDom = '#overlay',
	overlayPath = function (str) {
		return	'url(img/overlay/'+str+'.svg)';
	},
	initialize = function () {
		
		
		var page_anz = document.getElementsByClassName('page').length;
		if (page_anz > 1 && typeof page_anz === 'number') {

			var $_page = document.getElementsByClassName('page');
			for(var i = 0; i < $_page.length; i++) {
			    $_page[i].style.display = 'none';
			}

		}
		
		var clickHandler = function (e) {
		
			var ref = this.getAttribute('data-page'),
				task = this.getAttribute('data-task');

			if ( ref || task ) {

				changePage(this);
			}
		};
		
		var $_pageBtn = document.getElementsByClassName('pageBtn');
		
		for(var i = 0; i < $_pageBtn.length; i++) {
			$_pageBtn[i].style.curser = 'pointer';  // IOS BUG
			
			$_pageBtn[i].addEventListener('click',clickHandler);
		}
		

		//var lastopen = OPS.page.getLastopen();
		if ( lastopen ) {
			OPS.page.changePageById(lastopen);
		} else {
			OPS.page.changePageById(1);
		}
		
		
		return open;
	},
	changePageById = function(pageId,pageTask,pageContent) {
				
		var task = changeContent( null, pageTask, pageContent, pageId);
		if (task) {
			fadePageDom(pageId);
			
			addPageHistory(pageId,pageTask,pageContent);
			
			
		}
		return false;
	},
	changePage = function (e) {


		if (e.classList.contains('pageBtnOffline')) {
			return false;
		}
		var pageId = e.getAttribute('data-page'),
			pageTask = e.getAttribute('data-task'),
			pageContent = e.getAttribute('data-content');
			

		var task = changeContent( e, pageTask, pageContent, pageId );
		if (task) {
			fadePageDom(pageId);
			addPageHistory(pageId,pageTask,pageContent);
		}
		return false;
	},
	changeContent = function (e, task, content, pageId) {
		
		if (task == 'back') {
			var history = OPS.page.getPageHistory();
			
			var last = history[history.length-2];
			
			if (!last) {
				return false;
			}
			if (last.pageTask == 'cardOverview') {
				last.pageContent = undefined;
			}
			if (last.pageId) {
				OPS.page.changePageById(last.pageId,last.pageTask,last.pageContent);				
				OPS.page.kickLastPageHistory(2);
			}
			
			return true;	
		} else if (OPS.task && OPS.task[task]) {
			return OPS.task[task](pageId,content,e);
		}
		return true;
	}
	fadePageDom = function (pageId) {
		
		var $_page = document.getElementById('page_'+pageId);
		if (pageId && $_page ) {

			var $_pages = document.getElementsByClassName('page');
			for(var i = 0; i < $_pages.length; i++) {
			    $_pages[i].style.display = 'none';
			}

			$_page.style.display = 'block';
			lastopen = open;
			open = pageId;
		}
		return false;
	},
	addPageHistory = function (pageId,pageTask,pageContent) {
		
		if (pageId) {
			var obj = {
				pageId: pageId,
				pageTask: pageTask,
				pageContent: pageContent
			};
			pageHistory.push(obj);	
		}
	},
	getPageHistory = function () {
		if (pageHistory) {
			return pageHistory;
		}
		return false;
	},
	kickLastPageHistory = function (anz) {
		pageHistory = pageHistory.slice(0, pageHistory.length - anz);
	},
	openOverlay = function (type,time) {
		
		var $_overlay = document.getElementById(overlayDom);
		$_overlay.style.backgroundImage = overlayPath(type);
		$_overlay.style.display = 'block';
		if (time) {
			clearTimeout(timerOverlay);
			timerOverlay = setTimeout(function (){
				closeOverlay();
			},time);
		}
	},
	closeOverlay = function () {

		document.getElementById(overlayDom).style.display = 'none';
	},
	getLastopen = function () {
		return lastopen;
	};
	
	return {
		initialize: initialize
		,changePage: changePage
		,addPageHistory: addPageHistory
		,changePageById: changePageById
		,kickLastPageHistory: kickLastPageHistory
		,changeContent: changeContent
		,openOverlay: openOverlay
		,closeOverlay: closeOverlay
		,getLastopen: getLastopen
		,getPageHistory: getPageHistory
	}
	
}());




