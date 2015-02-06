
/*
	
	onPageSystem
	
	
	Christian Marienfeld
	www.chrisland.de
	
	Version 1.3.1
	https://github.com/chrisland/onePageOPStem
	
	
	Licence MIT

*/



var OPS = OPS || {};



OPS.page = (function(){
	
	
	var options = {
		handler: 'pageBtn',
		pages: 'page',
		pagePrefix: '',
		displayStyle: 'block',
		offButton: 'pageBtnOffline',
		mockupDebug: false,
		mockup: {}
	},
	open = 0,
	lastopen = 0,
	timerOverlay = 0,
	pageHistory = [],
	overlayDom = '#overlay',
	overlayPath = function (str) {
		return	'url(img/overlay/'+str+'.svg)';
	},
	$_pages = {},
	initialize = function (opt) {
		
		
		for (var i in opt) {
			if(opt.hasOwnProperty(i)){
				options[i] = opt[i];
			}
		}
		
		//console.log(options);
		
		$_pages = document.getElementsByClassName(options.pages);
		var page_anz = $_pages.length;
		if (page_anz > 1 && typeof page_anz === 'number') {

			
			for(var i = 0; i < $_pages.length; i++) {
				
			    $_pages[i].style.display = 'none';
			    
			    
			    
			    //alert(options.mockup.length);
			    
			    
			   // alert($_pages[i].id);
			    if (options.mockup[$_pages[i].id]) {
				    
				    var wrap = makeMockupBtn(options.mockup[$_pages[i].id], i);
				    
				    $_pages[i].appendChild(wrap);
			    }
			    
			    
			    
			}

		}
		
		var clickHandler = function (e) {
		
			var ref = this.getAttribute('data-page'),
				task = this.getAttribute('data-task');

			if ( ref || task ) {

				changePage(this);
			}
		};
		
		var $_pageBtn = document.getElementsByClassName(options.handler);
		
		for(var i = 0; i < $_pageBtn.length; i++) {
			$_pageBtn[i].style.curser = 'pointer';  // IOS BUG
			
			$_pageBtn[i].addEventListener('click',clickHandler);
		}
		

		if ( lastopen ) {
			OPS.page.changePageById(lastopen);
		} else {
			if (options.start) {
				OPS.page.changePageById(options.start);
			}
			
		}
		
		
		return open;
	},
	makeMockupBtn = function (dom, i) {
		var wrap = document.createElement('div');
	    wrap.style.position = 'absolute';
	    wrap.style.width = 0;
	    wrap.style.height = 0;
	    wrap.style.top = 0;
	    wrap.style.left = 0;
	    
	    for(var a = 0; a < dom.length; a++) {
		    
		    var note = dom[a];
		    var btn = document.createElement('button');
		    btn.style.position = 'absolute';
		    btn.style.zindex = 9999999+i+a;
		    btn.style.left = note.x+'vw';
		    btn.style.top = note.y+'vh';
		    btn.style.width = note.width+'vw';
		    btn.style.height = note.height+'vh';
		    btn.style.border = 1;
		    btn.style.outline = 0;
		    btn.style.curser = 'pointer';
		    btn.style.backgroundColor = 'rgba(0,0,0,0)';
		    
		    if (options.mockupDebug == true) {
			    btn.style.backgroundColor = 'rgba(255,200,0,0.5)';
			    btn.style.border = '1px solid #ffc800';
			    
			    if (note.title) {
				    btn.innerHTML = note.title;
			    }
			    
		    }
		    btn.setAttribute('class', options.handler);
		    btn.setAttribute('data-page', note.page);
		    btn.setAttribute('data-task', note.task);
		    btn.setAttribute('data-content', note.content);

		    wrap.appendChild(btn);
	    }
	    
	    return wrap;
	    
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


		if (e.classList.contains(options.offButton)) {
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
		
		var $_page = document.getElementById(options.pagePrefix+pageId);
		if (pageId && $_page ) {

			for(var i = 0; i < $_pages.length; i++) {
			    $_pages[i].style.display = 'none';
			}

			$_page.style.display = options.displayStyle;
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
		$_overlay.style.display = options.displayStyle;
		if (time) {
			clearTimeout(timerOverlay);
			timerOverlay = setTimeout(function (){
				closeOverlay();
			},time);
		}
	},
	closeOverlay = function () {

		document.getElementById(overlayDom).style.display = 'none';
	};
	
	return {
		initialize: initialize
		,changePageById: changePageById
		,openOverlay: openOverlay
		,closeOverlay: closeOverlay
	}
	
}());




