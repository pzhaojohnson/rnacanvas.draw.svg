import { isArray } from '@rnacanvas/value-check';

import { isSVGGraphicsElement } from './isSVGGraphicsElement';

/**
 * Returns true if and only if the value is an array of SVG graphics elements.
 *
 * Vacuously returns true for an empty array.
 */
export function isSVGGraphicsElementsArray(value: unknown): value is SVGGraphicsElement[] {
  return (
    isArray(value)
    && value.every(isSVGGraphicsElement)
  );
}
