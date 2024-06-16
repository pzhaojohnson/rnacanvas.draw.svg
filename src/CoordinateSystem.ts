/**
 * Represents the coordinate system of a target SVG document.
 */
export class CoordinateSystem {
  constructor(private targetSVGDoc: SVGSVGElement) {}

  /**
   * The width of the coordinate system of the target SVG document
   * (i.e., the width of its view box).
   */
  get width(): number {
    return this.targetSVGDoc.viewBox.baseVal.width;
  }

  /**
   * The height of the coordinate system of the target SVG document
   * (i.e., the height of its view box).
   */
  get height(): number {
    return this.targetSVGDoc.viewBox.baseVal.height;
  }

  /**
   * The minimum X coordinate of the view box of the target SVG document.
   */
  get minX(): number {
    return this.targetSVGDoc.viewBox.baseVal.x;
  }

  /**
   * The maximum X coordinate of the view box of the target SVG document.
   */
  get maxX(): number {
    return this.minX + this.width;
  }

  /**
   * The minimum Y coordinate of the view box of the target SVG document.
   */
  get minY(): number {
    return this.targetSVGDoc.viewBox.baseVal.y;
  }

  /**
   * The maximum Y coordinate of the view box of the target SVG document.
   */
  get maxY(): number {
    return this.minY + this.height;
  }
}
