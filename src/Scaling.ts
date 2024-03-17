/**
 * The scaling of a target SVG document
 * (as determined by its view box and its width and height attributes).
 */
export class Scaling {
  constructor(private targetSVGDoc: SVGSVGElement) {}

  /**
   * Modifies the width and height attributes of the target SVG document
   * to make its horizontal and vertical scaling equal to the given scaling factor.
   */
  set(scaling: number) {
    let viewBox = this.targetSVGDoc.viewBox.baseVal;

    this.targetSVGDoc.setAttribute('width', (scaling * viewBox.width) + 'px');
    this.targetSVGDoc.setAttribute('height', (scaling * viewBox.height) + 'px');
  }
}
