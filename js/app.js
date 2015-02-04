
/*
	
	jquery.cl.onePageSystem
	
	
	Christian Marienfeld
	www.chrisland.de
	
	Version 1.2.0
	https://github.com/chrisland/jquery.cl.onePageSystem
	
	
	Licence MIT

*/



var SYS = SYS || {};
SYS.namespace = function (ns_string) {
	var parts = ns_string.split('.'),
		parent = SYS,
		i;
	
	// führenden, redundaten globalen Bezeichner entfernen
	if (parts[0] === 'SYS') {
		parts = parts.slice(1);
	}
	
	for(i = 0; i < parts.length; i += 1) {
		// Eigenschaften erstellen, wenn sie nicht schon vorhanden ist
		if (typeof parent[parts[i]] === 'undefined') {
			parent[parts[i]] = {};
		}
		parent = parent[parts[i]];
	}
	return parent;
};





/*
*	Task 
*/


SYS.namespace('SYS.task');

SYS.task = (function(){
	

	var taskobj = {
		nothing: function (content, e) {
			return true;
		},
		back: function (content, e) {

			var history = SYS.page.getPageHistory();
			var last = history[history.length-2];

			if (last.pageTask == 'cardOverview') {
				last.pageContent = undefined;
			}
			if (last.pageId) {
				SYS.page.changePageById(last.pageId,last.pageTask,last.pageContent);				
				SYS.page.kickLastPageHistory(2);
			}
			
			return false;			
		},
		
		myFunc: function (content, e) {
			
			// do cool things
			
			alert('myFunc !');
			
			return true;
		}
		
		
	};

	return taskobj;
	
}());








/*
*	Modul init 
*/
SYS.namespace('SYS.init');


SYS.init = (function () {
	
	var iniboolean = false,
	initnetwork = false,
	initialize = function () {
		bindEvents();
	},
	bindEvents = function () {
	
		document.addEventListener('deviceready', onDeviceReady, false);
		
		document.addEventListener("resume", function () {
			var networkState = navigator.connection.type;
			if (networkState == 'none') {
				onDeviceOffline();
			} else {
				onDeviceOnline();
			}
		}, false);
	},
	onDeviceOffline = function () {
	
		
		initnetwork = false;
	},
	onDeviceOnline = function () {
	
	
		initnetwork = true;

	},
	onDeviceReady = function () {

		
		if (device.platform == 'Android') {

			document.removeEventListener('backbutton', onBackButton);
			document.addEventListener('backbutton', onBackButton);
	
		} else if(device.platform == 'iOS') {
			
		} else if(device.platform == 'Win32NT') {
			
		} else {
			
		}
		
		doReady();
		
	},
	doReady = function () {
		
		if (navigator && navigator.connection) {
			var networkState = navigator.connection.type;
		} else {
			networkState == 'none';
		}
				
		if (networkState == 'none') {
			onDeviceOffline();
		}
		
		if (!iniboolean) {

			SYS.page.construct();
			iniboolean = true;
		}
		
		return false;
	},
	onBackButton = function () {
		
		
		var done = SYS.task.back();
		if (!done) {
			if (navigator && navigator.app) {
				navigator.app.exitApp();
			}
		}
 	};
	
	return {
		initialize: initialize,
		doReady: doReady
	}
}());




/*
*	Modul Page 
*/

SYS.namespace('SYS.page');

SYS.page = (function(){
	
	
	var open = 0,
	lastopen = 0,
	timerOverlay = 0,
	pageHistory = [],
	overlayDom = '#overlay',
	overlayPath = function (str) {
		return	'url(img/overlay/'+str+'.svg)';
	},
	construct = function () {
		
		
		var page_anz = jQuery('.page').length;
		if (page_anz > 1 && typeof page_anz === 'number') {
			jQuery('.page').hide();
		}
		jQuery('body').on('click','.pageBtn', function (e) {
			
			var ref = jQuery(e.currentTarget).data('page'),
				task = jQuery(e.currentTarget).data('task');
			
			if ( (ref && typeof ref === 'number') || task ) {
				changePage(e);
			}
		});
		
		//var lastopen = SYS.page.getLastopen();
		if ( lastopen ) {
			SYS.page.changePageById(lastopen);
		} else {
			SYS.page.changePageById(1);
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
		
		
		if (jQuery(e.currentTarget).hasClass('pageBtnOffline')) {
			return false;
		}
		var pageId = jQuery(e.currentTarget).data('page'),
			pageTask = jQuery(e.currentTarget).data('task'),
			pageContent = jQuery(e.currentTarget).data('content');
			

		var task = changeContent( e, pageTask, pageContent, pageId );
		if (task) {
			fadePageDom(pageId);
			addPageHistory(pageId,pageTask,pageContent);
		}
		return false;
	},
	changeContent = function (e, task, content, pageId) {
		
		if (SYS.task[task]) {
			return SYS.task[task](content,e);
		}
		return true;
	}
	fadePageDom = function (pageId) {
		
		if (pageId && jQuery('#page_'+pageId).length > 0 ) {
			jQuery('body').find('.page').hide();
			jQuery('body').find('#page_'+pageId).show();
			lastopen = open;
			open = pageId;
		}
		return false;
	},
	addPageHistory = function (pageId,pageTask,pageContent) {
		
		if (pageId && pageTask) {
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
		
		jQuery(overlayDom)
			.css('background-image',overlayPath(type) )
			.fadeIn(500)
		if (time) {
			clearTimeout(timerOverlay);
			timerOverlay = setTimeout(function (){
				closeOverlay();
			},time);
		}
	},
	closeOverlay = function () {
		jQuery(overlayDom).fadeOut(400);
	},
	getLastopen = function () {
		return lastopen;
	};
	
	return {
		construct: construct
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




