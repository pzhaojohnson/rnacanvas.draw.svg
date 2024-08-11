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
circle.id; // 'uuid-33489b65-e606-4d15-af43-558b926ff25a'
```
