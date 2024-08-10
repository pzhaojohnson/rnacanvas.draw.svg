/**
 * Represents the inner XML of a target SVG document.
 */
export class InnerXML {
  #targetSVGDoc: SVGSVGElement;

  constructor(targetSVGDoc: SVGSVGElement) {
    this.#targetSVGDoc = targetSVGDoc;
  }

  /**
   * Returns the `innerHTML` property of the target SVG document.
   */
  toString(): string {
    return this.#targetSVGDoc.innerHTML;
  }

  /**
   * Sets the `innerHTML` property of the target SVG document.
   */
  set(innerXML: string): void {
    this.#targetSVGDoc.innerHTML = innerXML;
  }
}
