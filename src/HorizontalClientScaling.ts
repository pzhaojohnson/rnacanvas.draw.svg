/**
 * The horizontal scaling factor for a target SVG document
 * going from the coordinate system of the SVG document (as determined by its view box)
 * to the client coordinate system (i.e., the coordinate system used by methods such as `getBoundingClientRect`).
 */
export class HorizontalClientScaling {
  constructor(private targetSVGDoc: SVGSVGElement) {}

  /**
   * Can possibly return a nonfinite value
   * (e.g., if the target SVG document has a width of zero).
   */
  get(): number {
    let boundingClientRect = this.targetSVGDoc.getBoundingClientRect();
    let viewBox = this.targetSVGDoc.viewBox.baseVal;

    return boundingClientRect.width / viewBox.width;
  }
}
