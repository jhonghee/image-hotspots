(function($, undefined){

	var rhst = '<div class="img-hotspot-container" style="width:1px;"><table><tr><td class="img-hotspot-button"><div class="closed"></div></td><td><div class="img-hotspot-title" style="width: {{width}}px;">{{title}}</div></td></tr><tr class="img-hotspot-desc-body"><td colspan="2"><div class="img-hotspot-desc">{{desc}}</div></td></tr></table></div>';
	var lhst = '<div class="img-hotspot-container" style="width:1px;"><table style="float:right;"><tr><td><div class="img-hotspot-title" style="width: {{width}}px;">{{title}}</div></td><td class="img-hotspot-button"><div class="closed"></td></tr><tr class="img-hotspot-desc-body"><td colspan="2"><div class="img-hotspot-desc">{{desc}}</div></td></tr></table></div>';

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
            
            var $openedHS;
            
			$hotspotLIs.each(function(hsIdx, hsElm){
                
				var targetWidth, targetHeight;
				var $hsElm = $(hsElm);
				var posx = $hsElm.attr('posx'), posy = $hsElm.attr('posy'), width = $hsElm.attr('width');

				var direction = 'right';
				if( posx > ($img.width() / 2) ) {
					direction = 'left';
				}
				var directionOverride = $hsElm.attr('direction');
				if( directionOverride ) {
					direction = directionOverride;
				}

				var title = $hsElm.find('label').text();
				var desc = $hsElm.text();
				var hotspotTemplate = (direction == 'left') ? lhst : rhst ;
				var floatDirection = (direction == 'left') ? 'right' : 'left';
				var $hotspot = $(hotspotTemplate.replace('{{title}}', title).replace('{{desc}}', desc).replace('{{width}}', width));
				$elm.append($hotspot);

				$hotspot.css({'height': '1px', 'z-index': baseZIndex});

				$hotspot.position({
					of: $img,
					my: floatDirection + ' top',
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
							$ldesc.css({'display':'none'});
							$ltitle.animate({width:'0px'},{duration:400, complete:function(){
								$ltitle.css({'display':'none'});

							}});
						}});						
						$lbutton.removeClass(openedClass).addClass(closedClass);
                        
                        $openedHS = undefined;
					}
					else {
                        if( $openedHS ) {
                            // close previously open hs
                            var $pbutton = $openedHS.find('.img-hotspot-button div');
                            var $ptitle = $openedHS.find('.img-hotspot-title');
                            var $pdesc = $openedHS.find('.img-hotspot-desc');
                            
                            $openedHS.css({'z-index': baseZIndex});
                            $desc.animate({height:'0px'},{duration:400, complete:function(){
                                $pdesc.css({'display':'none'});
                                $ptitle.animate({width:'0px'},{duration:400, complete:function(){
                                    $ptitle.css({'display':'none'});
    
                                }});
                            }});						
                            $pbutton.removeClass(openedClass).addClass(closedClass);                                                    
                        }
                                                
						$localHS.css({'z-index': baseZIndex + 100});
						$ltitle.css({'display':'block'});
						$ltitle.animate({width: targetWidth},{duration:400, complete:function(){							
							$ldesc.css({'display':'block'});
							$ldesc.animate({height: targetHeight},{duration:400});
						}});
						$lbutton.removeClass(closedClass).addClass(openedClass);
                        
                        $openedHS = $localHS;                        
					}
				});
			});			
			$hotspotBlock.remove();
		});
	};

}(jQuery));