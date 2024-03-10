import * as SVG from '@svgdotjs/svg.js';

import { v4 as uuidv4 } from 'uuid';

/**
 * Assigns a UUID to the id attribute of the SVG element.
 *
 * Overwrites any preexisting id attribute.
 *
 * Will also prepend some letters to the assigned UUID,
 * as DOM element IDs must begin with a letter.
 *
 * Thus, assigned UUIDs will be a little bit bigger than 36 characters (the standard size for UUIDs).
 */
export function assignUUID(ele: SVG.Element): void {
  ele.attr('id', 'uuid-' + uuidv4());
}
