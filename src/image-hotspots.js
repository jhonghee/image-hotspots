(function($, undefined){

	$.fn.hotspots = function( options ) {

		var closedClass = 'closed';
		var openedClass = 'opened';

		return this.each(function(idx, elm){
			var baseZIndex = 1;
			var $elm = $(elm);
			var $img = $elm.find('img');
			$img.css({'position':'absolute'});
			var $hotspotBlock = $elm.find('ul');
			var $hotspotLIs = $elm.find('ul li');
			$hotspotBlock.hide();
			$hotspotLIs.each(function(hsIdx, hsElm){
				var $hsElm = $(hsElm);
				var posx = $hsElm.attr('posx'), posy = $hsElm.attr('posy');
				var title = $hsElm.find('label').text();
				var desc = $hsElm.text();
				var $hotspot = $("<div class='img-hotspot-container'><div class='img-hotspot-wrapper'><div class='img-hotspot-button closed'></div><div class='img-hotspot-title'>"+title+"</div><div class='img-hotspot-desc'>"+desc+"</div></div></div>");				
				$elm.append($hotspot);				
				$hotspot.css({'height': '1px', 'z-index': baseZIndex});
				$hotspot.position({
					of: $img,
					my: 'left top',
					at: 'left+'+posx+' top+'+posy,
					collision: 'flip flip'
				});
				var $title = $hotspot.find('.img-hotspot-title');
				$title.hide();
				var $desc = $hotspot.find('.img-hotspot-desc');
				$desc.hide();
				$hotspot.on('click', '.img-hotspot-button', function(){
					$elm.find('.img-hotspot-container').each(function(cIdx, cElm){
						$(cElm).css({'z-index': baseZIndex});
					});
					var $localHS = $(this).parent().parent();
					var $lbutton = $localHS.find('.img-hotspot-button');
					var $ltitle = $localHS.find('.img-hotspot-title');
					var $ldesc = $localHS.find('.img-hotspot-desc');
					if( $ltitle.is(':visible') ) {						
						$localHS.css({'z-index': baseZIndex});
						$desc.hide('blind', 400, function(){
							$ltitle.hide('blind', { direction: 'left'}, 400);
						});
						$lbutton.removeClass(openedClass).addClass(closedClass);
					}
					else {
						$localHS.css({'z-index': baseZIndex + 100});
						$ltitle.show('blind', { direction: 'left'}, 400, function(){
							$ldesc.show('blind', 400);
						});
						$lbutton.removeClass(closedClass).addClass(openedClass);
					}
				});
			});			
			$hotspotBlock.remove();
		});
	};

}(jQuery));