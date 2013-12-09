

jQuery('#pages').on('click', '.pageBtn', clickPageHandler);


var openPage = 1;

function clickPageHandler(e) {
	
	var pageId = jQuery(e.currentTarget).data('id');
	
	if ( pageId && openPage != pageId ) {
		
		if ( jQuery('#pages #page_'+pageId).length > 0 ) {
		
			jQuery('#pages').find('.page').hide();
			jQuery('#pages').find('#page_'+pageId).show();
			
			openPage = pageId;
		}
	}
}
