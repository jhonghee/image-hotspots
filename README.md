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
 	- (Optional) Use `width` attribute to specify the with of the title. The defult is the width of the title.
 	- (Optional) Use `direction` attribute to specify the direction of expansion. The default behavior is `right` if the `posx` value belongs to the left half of the image, `left` if `posx` value exceeds the half of the image width.

## How to use in your code

```js
$('.image-hotspots').hotspots();
```

## How to style hotspots

The generated DOM for a hotspot would look as follows.
For right expansion,

```
	<div class="img-hotspot-container" style="width: 1px; height: 1px; z-index: 1; position: relative; top: 30px; left: 30px;">
		<table>
			<tbody style="z-index: 101;">
				<tr>
					<td class="img-hotspot-button">
						<div class="opened"></div>
					</td>
					<td>
						<div class="img-hotspot-title" style="width: 88px; display: block;">Blackberry</div>
					</td>
				</tr>
				<tr class="img-hotspot-desc-body">
					<td colspan="2">
						<div style="height: 60px; display: block;" class="img-hotspot-desc">BlackberryLorem ipsum Velit sed amet qui.</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
```

For left expansion,

```
	<div style="width: 1px; height: 1px; z-index: 1; position: relative; top: 100px; left: 300px;" class="img-hotspot-container">
		<table style="float:right;">
			<tbody style="z-index: 1;">
				<tr>
					<td>
						<div style="width: 0px; display: none;" class="img-hotspot-title">Blueberry</div>
					</td>
					<td class="img-hotspot-button">
						<div class="closed"></div>
					</td>
				</tr>
				<tr class="img-hotspot-desc-body">
					<td colspan="2">
						<div class="img-hotspot-desc" style="height: 80px; display: none;">BlueberryLorem ipsum Dolore velit sint in sunt tempor.</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
```

 - The button will have class `img-hotspot-button` and `closed` or `opened` based on the state of the hotspot.
 - The title will have class `img-hotspot-title`
 - The description will have class `img-hotspot-desc`