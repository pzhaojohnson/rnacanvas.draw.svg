/**
 * Set multiple attributes of a target SVG element at once.
 */
export function setAttributes(targetSVGElement: SVGElement, attributes: { [name: string]: string }): void {
  for (let [name, value] of Object.entries(attributes)) {
    targetSVGElement.setAttribute(name, value);
  }
}
