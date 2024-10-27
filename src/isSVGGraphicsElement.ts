/**
 * Returns true if and only if the value is an SVG graphics element.
 */
export function isSVGGraphicsElement(value: unknown): value is SVGGraphicsElement {
  return value instanceof SVGGraphicsElement;
}
