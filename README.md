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

## `class Path`

Wraps an SVG path element.

### `readonly domNode`

The wrapped SVG path element.

```javascript
var domNode = document.createElement('http://www.w3.org/2000/svg', 'path');

var path = new Path(domNode);

path.domNode === domNode; // true
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

(Lower precision improves the speed of calculation.)

```javascript
// make the path a horizontal line
path.domNode.setAttribute('d', 'M 0 0 H 100');

var p = path.closestPoint({ x: 33, y: 33 }, { precision: 20 });

// is within 20 of the true closest point
p; // { x: 40, y: 0, length: 40 }
```

This method will throw if a precision of 0 or a negative precision is specified.

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
