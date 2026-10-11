/**
 * Represents all text elements in a target SVG document.
 */
export class Texts {
  readonly #targetSVG;

  constructor(targetSVG: SVGSVGElement) {
    this.#targetSVG = targetSVG;
  }

  toArray() {
    return Array.from(this.#targetSVG.querySelectorAll('text')).map(text => ({ domNode: text }));
  }
}
