/**
 * Represents the outer XML of a target SVG element.
 */
export class OuterXML {
  #targetSVGElement: SVGElement;

  constructor(targetSVGElement: SVGElement) {
    this.#targetSVGElement = targetSVGElement;
  }

  /**
   * Returns the value of the `outerHTML` property of the target SVG element.
   */
  toString(): string {
    return this.#targetSVGElement.outerHTML;
  }

  /**
   * Sets the outer XML of the target SVG element.
   *
   * The main difference between this method
   * and setting the `outerHTML` property of the target SVG element directly
   * is that this method modifies the target SVG element in place,
   * as opposed to replacing the target SVG element with a new SVG element in the DOM tree.
   *
   * Thus, it is critical that the outer XML passed to this method
   * encode a single SVG element with the same tag name as the target SVG element.
   *
   * This method will throw otherwise.
   */
  set(outerXML: string): void | never {
    // used for parsing the outer XML
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    // make invisible
    svg.style.height = '0px';

    // add to the document body
    // (just in case it's necessary for parsing the outer XML)
    document.body.append(svg);

    svg.innerHTML = outerXML;

    if (!svg.firstElementChild) {
      throw new Error('Outer XML must encode an SVG element.');
    } else if (svg.childNodes.length > 1) {
      throw new Error('Outer XML cannot encode multiple DOM nodes.');
    }

    if (svg.firstElementChild.tagName.toLowerCase() != this.#targetSVGElement.tagName.toLowerCase()) {
      throw new Error('Outer XML must specify an SVG element with the same tag name as the target SVG element.');
    }

    // remove previous attributes
    [...this.#targetSVGElement.attributes].forEach(attr => this.#targetSVGElement.removeAttribute(attr.name));

    // set new attributes
    [...svg.firstElementChild.attributes].forEach(attr => this.#targetSVGElement.setAttribute(attr.name, attr.value));

    this.#targetSVGElement.innerHTML = svg.firstElementChild.innerHTML;

    // don't forget to remove
    svg.remove();
  }
}
