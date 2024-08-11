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
