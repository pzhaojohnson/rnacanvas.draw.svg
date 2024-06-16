type Point = {
  x: number;
  y: number;
};

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

  /**
   * The width of the bounding client rect for the target SVG document.
   */
  get clientWidth(): number {
    return this.targetSVGDoc.getBoundingClientRect().width;
  }

  /**
   * The height of the bounding client rect for the target SVG document.
   */
  get clientHeight(): number {
    return this.targetSVGDoc.getBoundingClientRect().height;
  }

  /**
   * The horizontal scaling factor going from the coordinate system of the target SVG document
   * (i.e., as defined by its view box)
   * to the client coordinate system
   * (i.e., the coordinate system used by methods such as `getBoundingClientRect`).
   */
  get horizontalClientScaling(): number {
    return this.clientWidth / this.width;
  }

  /**
   * The vertical scaling factor going from the coordinate system of the target SVG document
   * (i.e., as defined by its view box)
   * to the client coordinate system
   * (i.e., the coordinate system used by methods such as `getBoundingClientRect`).
   */
  get verticalClientScaling(): number {
    return this.clientHeight / this.height;
  }

  /**
   * The minimum X coordinate of the bounding client rect for the target SVG document.
   */
  get minClientX(): number {
    return this.targetSVGDoc.getBoundingClientRect().x;
  }

  /**
   * The minimum Y coordinate of the bounding client rect for the target SVG document.
   */
  get minClientY(): number {
    return this.targetSVGDoc.getBoundingClientRect().y;
  }

  /**
   * Converts an X coordinate in the client coordinate system
   * (i.e., the coordinate system used by methods such as `getBoundingClientRect`)
   * to the coordinate system of the target SVG document
   * (i.e., as defined by its view box).
   */
  fromClientX(clientX: number): number {
    return (clientX - this.minClientX) / this.horizontalClientScaling;
  }

  /**
   * Converts a Y coordinate in the client coordinate system
   * (i.e., the coordinate system used by methods such as `getBoundingClientRect`)
   * to the coordinate system of the target SVG document
   * (i.e., as defined by its view box).
   */
  fromClientY(clientY: number): number {
    return (clientY - this.minClientY) / this.verticalClientScaling;
  }

  /**
   * Converts a pair of X and Y coordinates in the client coordinate system
   * (i.e., the coordinate system used by methods such as `getBoundingClientRect`)
   * to the coordinate system of the target SVG document
   * (i.e., as defined by its view box).
   *
   * @returns A tuple of X and Y coordinates.
   */
  fromClientCoordinates(clientX: number, clientY: number): [number, number] {
    return [
      this.fromClientX(clientX),
      this.fromClientY(clientY),
    ];
  }

  /**
   * Converts a point in the client coordinate system
   * (i.e., the coordinate system used by methods such as `getBoundingClientRect`)
   * to the coordinate system of the target SVG document
   * (i.e., as defined by its view box).
   */
  fromClientPoint(clientPoint: Point): Point {
    return {
      x: this.fromClientX(clientPoint.x),
      y: this.fromClientY(clientPoint.y),
    };
  }

  /**
   * Converts an X coordinate in the coordinate system of the target SVG document
   * (i.e., as defined by its view box)
   * to the client coordinate system
   * (i.e., the coordinate system used by methods such as `getBoundingClientRect`).
   */
  toClientX(x: number): number {
    return this.horizontalClientScaling * (x - this.minX);
  }

  /**
   * Converts a Y coordinate in the coordinate system of the target SVG document
   * (i.e., as defined by its view box)
   * to the client coordinate system
   * (i.e., the coordinate system used by methods such as `getBoundingClientRect`).
   */
  toClientY(y: number): number {
    return this.verticalClientScaling * (y - this.minY);
  }

  /**
   * Converts a pair of X and Y coordinates in the coordinate system of the target SVG document
   * (i.e., as defined by its view box)
   * to the client coordinate system
   * (i.e., the coordinate system used by methods such as `getBoundingClientRect`).
   *
   * @returns A tuple of client X and Y coordinates.
   */
  toClientCoordinates(x: number, y: number): [number, number] {
    return [
      this.toClientX(x),
      this.toClientY(y),
    ];
  }

  /**
   * Converts a point in the coordinate system of the target SVG document
   * (i.e., as defined by its view box)
   * to the client coordinate system
   * (i.e., the coordinate system used by methods such as `getBoundingClientRect`).
   */
  toClientPoint(point: Point): Point {
    return {
      x: this.toClientX(point.x),
      y: this.toClientY(point.y),
    };
  }
}
