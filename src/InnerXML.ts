/**
 * Represents the inner XML of a target SVG element.
 */
export class InnerXML {
  #targetSVGElement: SVGElement;

  constructor(targetSVGElement: SVGElement) {
    this.#targetSVGElement = targetSVGElement;
  }

  /**
   * Returns the `innerHTML` property of the target SVG element.
   */
  toString(): string {
    return this.#targetSVGElement.innerHTML;
  }

  /**
   * Sets the `innerHTML` property of the target SVG element.
   */
  set(innerXML: string): void {
    this.#targetSVGElement.innerHTML = innerXML;
  }
}
