import { distance } from '@rnacanvas/points';

export class Path {
  constructor(readonly domNode: SVGPathElement) {}

  /**
   * Returns the closest point along the path to the given point
   * (as well as the length along the path that the closest point is).
   *
   * The precision option roughly corresponds to the margin for error in the closest point calculation.
   *
   * (Higher margin for error improves the speed of calculation.)
   *
   * This method will throw for non-positive precisions.
   */
  closestPoint(p: Point, options?: { precision?: number }) {
    let q = this.domNode.getPointAtLength(0);

    let closestPoint = { x: q.x, y: q.y, length: 0 };

    let precision = options?.precision ?? 5;

    if (precision <= 0) {
      throw new Error(`Precision must be positive: ${precision}.`);
    }

    let totalLength = this.domNode.getTotalLength();

    for (let length = precision; length <= totalLength; length += precision) {
      let q = this.domNode.getPointAtLength(length);

      if (distance(p, q) < distance(p, closestPoint)) {
        closestPoint = { x: q.x, y: q.y, length };
      }
    }

    return closestPoint;
  }
}

type Point = {
  x: number;
  y: number;
};
