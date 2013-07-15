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
				var targetWidth, targetHeight;
				var $hsElm = $(hsElm);
				var posx = $hsElm.attr('posx'), posy = $hsElm.attr('posy');
				var title = $hsElm.find('label').text();
				var desc = $hsElm.text();
				var $hotspot = $("<div class='img-hotspot-container'><div class='img-hotspot-wrapper'><div class='img-hotspot-button'><div class='closed'></div></div><div class='img-hotspot-title'>"+title+"</div><div class='img-hotspot-desc'>"+desc+"</div></div></div>");				
				$elm.append($hotspot);

				$hotspot.css({'height': '1px', 'z-index': baseZIndex});
				$hotspot.position({
					of: $img,
					my: 'left top',
					at: 'left top',
					collision: 'flip flip'
				});
				$hotspot.css({'top':posy+'px','left':posx+'px','position':'relative'});
				var $title = $hotspot.find('.img-hotspot-title');
				targetWidth = $title.css('width');		
				$title.css({'width':'0px'});
				$title.hide();
				var $desc = $hotspot.find('.img-hotspot-desc');
				targetHeight = $desc.css('height');
				$desc.css({'height':'0px'});
				$desc.hide();
				$hotspot.find('.img-hotspot-button').click(function(){
					$elm.find('.img-hotspot-container').each(function(cIdx, cElm){
						$(cElm).css({'z-index': baseZIndex});
					});
					var $localHS = $(this).parent().parent();
					var $lbutton = $localHS.find('.img-hotspot-button div');
					var $ltitle = $localHS.find('.img-hotspot-title');
					var $ldesc = $localHS.find('.img-hotspot-desc');
					if( $ltitle.is(':visible') ) {						
						$localHS.css({'z-index': baseZIndex});
						$desc.animate({height:'0px'},{duration:400, complete:function(){
							$desc.css({'display':'none'});
							$ltitle.animate({width:'0px'},{duration:400, complete:function(){
								$ltitle.css({'display':'none'});

							}});
						}});						
						$lbutton.removeClass(openedClass).addClass(closedClass);
					}
					else {
						$localHS.css({'z-index': baseZIndex + 100});
						$ltitle.css({'display':'block'});
						$ltitle.animate({width: targetWidth},{duration:400, complete:function(){							
							$ldesc.css({'display':'block'});
							$ldesc.animate({height: targetHeight},{duration:400});
						}});
						$lbutton.removeClass(closedClass).addClass(openedClass);
					}
				});
			});			
			$hotspotBlock.remove();
		});
	};

}(jQuery));