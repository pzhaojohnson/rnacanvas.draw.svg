import { distance } from '@rnacanvas/points';

export class Path {
  constructor(readonly domNode: SVGPathElement) {}

  /**
   * Returns the closest point along the path to the given point
   * (as well as the length along the path that the closest point is at).
   *
   * This method is not guaranteed to return the true closest point (e.g., for particularly convoluted paths).
   */
  closestPoint(p: Point) {
    let intervals = 16;

    let totalLength = this.domNode.getTotalLength();

    let boundaries: [Length, Distance][] = [];

    for (let i = 0; i <= intervals; i++) {
      let length = (i / intervals) * totalLength;

      boundaries.push([
        length,
        distance(p, this.domNode.getPointAtLength(length)),
      ]);
    }

    // sort by distance
    boundaries.sort((b1, b2) => b1[1] - b2[1]);

    let closestBoundary = boundaries[0];

    let leftLength = closestBoundary[0] - (totalLength / intervals);
    let rightLength = closestBoundary[0] + (totalLength / intervals);

    leftLength = Math.max(0, leftLength);
    rightLength = Math.min(totalLength, rightLength);

    let iterations = 20;

    // ternary refinement
    for (let i = 0; i < iterations; i++) {
      let aThird = (rightLength - leftLength) / 3;

      if (distance(p, this.domNode.getPointAtLength(leftLength)) < distance(p, this.domNode.getPointAtLength(rightLength))) {
        rightLength -= aThird;
      } else {
        leftLength += aThird;
      }
    }

    let closestLength = (leftLength + rightLength) / 2;

    let closestPoint = this.domNode.getPointAtLength(closestLength);

    return {
      x: closestPoint.x,
      y: closestPoint.y,

      length: closestLength,
    };
  }
}

type Point = {
  x: number;
  y: number;
};

type Length = number;

type Distance = number;
