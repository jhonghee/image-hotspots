(function($, undefined){

	$.fn.hotspots = function( options ) {

		return this.each(function(idx, elm){
			var $elm = $(elm);
			var $img = $elm.find('img');
			$img.css({'position':'absolute','z-index':'100'});
			var baseZIndex = $img.css('z-index');
			var $hotspotBlock = $elm.find('ul');
			var $hotspotLIs = $elm.find('ul li');
			$hotspotBlock.hide();
			$hotspotLIs.each(function(hsIdx, hsElm){
				var $hsElm = $(hsElm);
				var posx = $hsElm.attr('posx'), posy = $hsElm.attr('posy');
				var title = $hsElm.find('label').text();
				var desc = $hsElm.text();
				var $hotspot = $("<div class='img-hotspot-container'><div class='img-hotspot-button closed'></div><div class='img-hotspot-wrapper'><div class='img-hotspot-title'>"+title+"</div><div class='img-hotspot-desc'>"+desc+"</div></div></div>");				
				$elm.append($hotspot);				
				$hotspot.css({'height': '1px', 'z-index': baseZIndex+1});
				$hotspot.position({
					of: $img,
					my: 'left top',
					at: 'left+'+posx+' top+'+posy,
					collision: 'flip flip'
				});
				var $wrapper = $hotspot.find('.img-hotspot-wrapper');
				$wrapper.hide();
				$hotspot.find('.img-hotspot-button').on('click', function(){
					var $localHS = $(this).parent();
					var $localWrapper = $localHS.find('.img-hotspot-wrapper');
					if( $localWrapper.is(':visible') ) {						
						$localHS.css({'z-index': baseZIndex+1});
					}
					else {
						$localHS.css({'z-index': baseZIndex+10});
					}
					$localWrapper.toggle('blind', 200);
				});
			});			
			$hotspotBlock.remove();
		});
	};

}(jQuery));