image-hotspots
==============

[toc]

jQuery - image hotspots

## How to set up HTML fragment

This plug-in will turn following HTML into image hotspots.

```
	<div class="image-hotspots">
		<img src="http://southernbite.com/wp-content/uploads/2012/05/SouthernBiteFruitSalad-21.jpg" width="500"/>
		<ul>
			<li posx='30' posy='30'><label>Blackberry</label>Lorem ipsum Velit sed amet qui.</li>
			<li posx='100' posy='100'><label>Kiwi</label>Lorem ipsum Dolore velit sint in sunt tempor.</li>
		</ul>
	</div>
```
 - `img` tag can be used to set up your image
 - Each hotspot can be expressed within `li`
 	- Use `posx` and `posy` attributes on `li` to provide XY-coordinate from the top left corner of the image
 	- Use `label` inside `li` to provide title of the hotspot
 	- The text of `li` becomes the description of the hotspot

## How to use in your code

```js
$('.image-hotspots').hotspots();
```