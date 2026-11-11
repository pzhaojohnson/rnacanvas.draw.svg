# Installation

With `npm`:

```
npm install @rnacanvas/draw.svg
```

# Usage

All exports of this package can be accessed as named imports.

```javascript
// some example imports
import { assignUUID } from '@rnacanvas/draw.svg';
import { bringToFront, sendToBack } from '@rnacanvas/draw.svg';
import { InnerXML, OuterXML } from '@rnacanvas/draw.svg';
```

## `shift()`

Shifts the specified SVG element by the specified vector.

The vector is specified as an object with `x` and `y` properties.

Does nothing for SVG elements that aren't rendered (e.g., `defs` and `title` elements).

Acts recursively on the immediate children of `g` elements.

Emits a console error message (without throwing) for unrecognized SVG element types.

(In principle, this function should be able to handle all possible SVG element types.)

```javascript
var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

circle.setAttribute('cx', '10');
circle.setAttribute('cy', '20');

shift(circle, { x: 5, y: -5 });

circle.getAttribute('cx'); // '15'
circle.getAttribute('cy'); // '15'
```

## `class SVG`

Wraps an SVG element.

### `readonly domNode`

The wrapped SVG element.

```javascript
var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

var svg = new SVG(domNode);

svg.domNode === domNode; // true
```

### `shift()`

Shifts the (nested) SVG element by the specified vector.

Modifies the `x` and `y` attributes (rather than the `transform` attribute, for instance).

```javascript
svg.domNode.setAttribute('x', '10');
svg.domNode.setAttribute('y', '20');

svg.shift(5, -5);

svg.domNode.getAttribute('x'); // '15'
svg.domNode.getAttribute('y'); // '15'
```

## `class Texts`

Represents all text elements in a target SVG document.

```javascript
var targetSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

var texts = new Texts(targetSVG);
```

### `toArray()`

Returns all text elements in the target SVG document (including nested ones) as an array
in document order.

Each text element is wrapped in an object
with a reference to the text element DOM node stored within the `domNode` property.

```javascript
var text1 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
var text2 = document.createElementNS('http://www.w3.org/2000/svg', 'text');

targetSVG.append(text1);

var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
g.append(text2);
targetSVG.append(g);

texts.toArray().length; // 2

texts.toArray()[0].domNode === text1; // true
texts.toArray()[1].domNode === text2; // true
```

## `class Text`

Wraps an SVG text element.

### `readonly domNode`

The wrapped SVG text element.

```javascript
var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'text');

var text = new Text(domNode);

text.domNode === domNode; // true
```

### `shift()`

Shifts the text element by the specified vector.

Modifies the `x` and `y` attributes (rather than the `transform` or `dx` and `dy` attributes, for instance).

The `x` and `y` attributes of descendent `tspan` elements are also modified (if present).

```javascript
text.domNode.setAttribute('x', '10');
text.domNode.setAttribute('y', '20');

text.shift(5, -5);

text.domNode.getAttribute('x'); // '15'
text.domNode.getAttribute('y'); // '15'
```

## `class Line`

Wraps an SVG line element.

### `readonly domNode`

The wrapped SVG line element.

```javascript
var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'line');

var line = new Line(domNode);

line.domNode === domNode; // true
```

### `shift()`

Shifts the line by the specified vector.

Modifies the `x1`, `y1`, `x2` and `y2` attributes (rather than the `transform` attribute, for instance).

```javascript
line.domNode.setAttribute('x1', '10');
line.domNode.setAttribute('y1', '20');
line.domNode.setAttribute('x2', '30');
line.domNode.setAttribute('y2', '40');

line.shift(5, -5);

line.domNode.getAttribute('x1'); // '15'
line.domNode.getAttribute('y1'); // '15'
line.domNode.getAttribute('x2'); // '35'
line.domNode.getAttribute('y2'); // '35'
```

## `class Circle`

Wraps an SVG circle element.

### `readonly domNode`

The wrapped SVG circle element.

```javascript
var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

var circle = new Circle(domNode);

circle.domNode === domNode; // true
```

### `shift()`

Shifts the circle by the specified vector.

Modifies the `cx` and `cy` attributes (rather than the `transform` attribute, for instance).

```javascript
circle.domNode.setAttribute('cx', '10');
circle.domNode.setAttribute('cy', '20');

circle.shift(5, -5);

circle.domNode.getAttribute('cx'); // '15'
circle.domNode.getAttribute('cy'); // '15'
```

## `class Ellipse`

Wraps an SVG ellipse element.

### `readonly domNode`

The wrapped SVG ellipse element.

```javascript
var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');

var ellipse = new Ellipse(domNode);

ellipse.domNode === domNode; // true
```

### `shift()`

Shifts the ellipse by the specified vector.

Modifies the `cx` and `cy` attributes (rather than the `transform` attribute, for instance).

```javascript
ellipse.domNode.setAttribute('cx', '10');
ellipse.domNode.setAttribute('cy', '20');

ellipse.shift(5, -5);

ellipse.domNode.getAttribute('cx'); // '15'
ellipse.domNode.getAttribute('cy'); // '15'
```

## `class Rect`

Wraps an SVG rectangle element.

### `readonly domNode`

The wrapped SVG rectangle element.

```javascript
var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

var rect = new Rect(domNode);

rect.domNode === domNode; // true
```

### `shift()`

Shifts the rectangle by the specified vector.

Modifies the `x` and `y` attributes (rather than the `transform` attribute, for instance).

```javascript
rect.domNode.setAttribute('x', '10');
rect.domNode.setAttribute('y', '20');

rect.shift(5, -5);

rect.domNode.getAttribute('x'); // '15'
rect.domNode.getAttribute('y'); // '15'
```

## `class Polyline`

Wraps an SVG polyline element.

### `readonly domNode`

The wrapped SVG polyline element.

```javascript
var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');

var polyline = new Polyline(domNode);

polyline.domNode === domNode; // true
```

### `shift()`

Shifts the polyline by the specified vector.

Modifies the `points` attribute (rather than the `transform` attribute, for instance).

```javascript
polyline.domNode.setAttribute('points', '0,0 10,20 30,40');

polyline.shift(5, -5);

polyline.domNode.getAttribute('points'); // '5,-5 15,15 35,35'
```

## `class Polygon`

Wraps an SVG polygon element.

### `readonly domNode`

The wrapped SVG polygon element.

```javascript
var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');

var polygon = new Polygon(domNode);

polygon.domNode === domNode; // true
```

### `shift()`

Shifts the polygon by the specified vector.

Modifies the `points` attribute (rather than the `transform` attribute, for instance).

```javascript
polygon.domNode.setAttribute('points', '0,0 10,20 30,40');

polygon.shift(5, -5);

polygon.domNode.getAttribute('points'); // '5,-5 15,15 35,35'
```

## `class Path`

Wraps an SVG path element.

### `readonly domNode`

The wrapped SVG path element.

```javascript
var domNode = document.createElement('http://www.w3.org/2000/svg', 'path');

var path = new Path(domNode);

path.domNode === domNode; // true
```

### `shift()`

Shifts the path by the specified vector.

(Modifies the `d` attribute directly rather than the `transform` attribute, for instance.)

```javascript
path.domNode.setAttribute('d', 'M 0 0 L 10 10');

path.shift(5, -5);

path.domNode.getAttribute('d'); // 'M5 -5L15 5'
```

### `closestPoint()`

Calculates and returns the closest point along the path to a given point
(as well as returns the length along the path that the closest point is).

```javascript
// make the path a horizontal line
path.domNode.setAttribute('d', 'M 0 0 H 10');

var p = path.closestPoint({ x: 5, y: 5 });

p; // { x: 5, y: 0, length: 5 }
```

A `precision` option can also be specified,
which roughly controls the margin for error in the closest point calculation.

(Higher margin for error improves the speed of calculation.)

```javascript
// make the path a horizontal line
path.domNode.setAttribute('d', 'M 0 0 H 100');

var p = path.closestPoint({ x: 33, y: 33 }, { precision: 20 });

// is within 20 of the true closest point
p; // { x: 40, y: 0, length: 40 }
```

This method will throw if a precision of 0 or a negative precision is specified.

## `class Image`

Wraps an SVG image element.

### `readonly domNode`

The wrapped SVG image element.

```javascript
var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'image');

var image = new Image(domNode);

image.domNode === domNode; // true
```

### `shift()`

Shifts the image element by the specified vector.

Modifies the `x` and `y` attributes (rather than the `transform` attribute, for instance).

```javascript
image.domNode.setAttribute('x', '10');
image.domNode.setAttribute('y', '20');

image.shift(5, -5);

image.domNode.getAttribute('x'); // '15'
image.domNode.getAttribute('y'); // '15'
```

## `class Use`

Wraps an SVG use element.

### `readonly domNode`

The wrapped SVG use element.

```javascript
var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'use');

var use = new Use(domNode);

use.domNode === domNode; // true
```

### `shift()`

Shifts the use element by the specified vector.

Modifies the `x` and `y` attributes (rather than the `transform` attribute, for instance).

```javascript
use.domNode.setAttribute('x', '10');
use.domNode.setAttribute('y', '20');

use.shift(5, -5);

use.domNode.getAttribute('x'); // '15'
use.domNode.getAttribute('y'); // '15'
```

## `class ForeignObject`

Wraps an SVG foreign object element.

### `readonly domNode`

The wrapped SVG foreign object element.

```javascript
var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');

var foreignObject = new ForeignObject(domNode);

foreignObject.domNode === domNode; // true
```

### `shift()`

Shifts the foreign object element by the specified vector.

Modifies the `x` and `y` attributes (rather than the `transform` attribute, for instance).

```javascript
foreignObject.domNode.setAttribute('x', '10');
foreignObject.domNode.setAttribute('y', '20');

foreignObject.shift(5, -5);

foreignObject.domNode.getAttribute('x'); // '15'
foreignObject.domNode.getAttribute('y'); // '15'
```

## `class AbstractPath`

A way to do calculations related to SVG path elements
without having to worry about creating elements and/or adding them to the document body.

```javascript
// a horizontal line
var path = new AbstractPath('M 0 0 L 100 0');

var p = path.closestPoint({ x: 33, y: -2 });

p.x; // 33
p.y; // 0
p.length; // 33
```

### `closestPoint()`

This method has the same interface as the `closestPoint()` method of the `Path` class [above](https://pzhaojohnson.github.io/rnacanvas.draw.svg/#class-path).

The main difference is that you don't have to worry about adding an abstract path to an SVG document (or the document body)
for closest point calculations to work.

## `setAttributes()`

Set multiple attributes of a target SVG element at once.

```javascript
setAttributes(targetSVGElement, {
  'stroke': '#526bcf',
  'stroke-opacity': '0.72',
  'fill-opacity': '0.91',
});
```

## `assignUUID()`

Assigns a [universally unique identifier](https://en.wikipedia.org/wiki/Universally_unique_identifier) (UUID)
to the `id` attribute of the specified SVG element.

Will overwrite any preexisting `id` attribute
that the SVG element has.

Assigned UUIDs will follow all rules required for HTML/SVG element `id` attributes
(e.g., will start with a letter).

To ensure that assigned UUIDs always start with a letter,
this function may prepend some additional characters to assigned UUIDs.
Thus, assigned UUIDs may be somewhat longer than the standard 36 characters in length.

```javascript
var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

assignUUID(circle);

// a UUID prepended with "uuid-"
circle.id; // "uuid-33489b65-e606-4d15-af43-558b926ff25a"
```

## `bringToFront()`

Makes the specified SVG element the last child of its parent node.
(Has no effect if the specified SVG element is already the last child of its parent node
or if the specified SVG element has no parent node.)

Note that this function only makes the specified SVG element the last child of its immediate parent node
(not the root SVG document if the specified SVG element were nested within a `g` element, for instance).

```javascript
bringToFront(svgElement);

svgElement.parentNode.lastChild === svgElement; // true
```

## `sendToBack()`

Makes the specified SVG element the first child of its parent node.
(Has no effect if the specified SVG element is already the first child of its parent node
or if the specified SVG element has no parent node.)

Note that this function only makes the specified SVG element the first child of its immediate parent node
(not the root SVG document if the specified SVG element were nested within a `g` element, for instance).

```javascript
sendToBack(svgElement);

svgElement.parentNode.firstChild === svgElement; // true
```

## `Scaling`

The `Scaling` class represents the scaling of a target SVG document.

```javascript
var targetSVGDoc = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

var scaling = new Scaling(targetSVGDoc);

// adjusts the `width` and `height` attributes of the target SVG document
// to set both its horizontal and vertical scaling factors at once
scaling.set(2);
```

## `InnerXML`

The `InnerXML` class represents the inner XML of a target SVG element.

```javascript
var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
svg.append(circle);

var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
text.textContent = 'A';
svg.append(text);

var innerXML = new InnerXML(svg);

// returns the value of the `innerHTML` property
innerXML.toString(); // "<circle></circle><text>A</text>"

// sets the `innerHTML` property of the target SVG element
innerXML.set('<rect></rect><text>B</text>');
```

## `OuterXML`

The `OuterXML` class represents the outer XML of a target SVG element.

The critical difference between the behavior of this class
and the `outerHTML` property of SVG elements
is that the `set()` method of this class modifies the target SVG element <b>in place</b>,
as opposed to replacing the target SVG element with newly created SVG element(s) in the DOM tree,
which is what setting the `outerHTML` property does.

Thus, the `set()` method will throw if the specified outer XML does not encode exactly one SVG element
or if the specified outer XML encodes an SVG element with a tag name different from that of the target SVG element.

```javascript
var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

svg.setAttribute('viewBox', '0 0 10 20');

svg.append(document.createElementNS('http://www.w3.org/2000/svg', 'circle'));
svg.append(document.createElementNS('http://www.w3.org/2000/svg', 'rect'));
svg.append('Some text.');

var outerXML = new OuterXML(svg);

outerXML.toString(); // '<svg viewBox="0 0 10 20"><circle></circle><rect></rect>Some text.</svg>'

outerXML.set('<svg viewBox="0 0 25 25" width="50" height="50>Different text.<path></path></svg>');
```

## `async function drawOnCanvas()`

Creates a new HTML canvas element and draws the passed in SVG document on it.

```javascript
var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

// ...SVG drawing code

var canvas = await drawOnCanvas(svg);
```

The `width` and `height` attributes of the returned canvas element
will match the `width` and `height` attributes of the passed in SVG document
(in units of pixels).

This function might possibly fail,
such as if the dimensions of the passed in SVG document are too big.
