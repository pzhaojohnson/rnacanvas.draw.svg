import { PointList } from './PointList';

export class Polyline {
  constructor(readonly domNode: SVGPolylineElement) {}

  /**
   * Shifts the polyline by the specified vector.
   *
   * Modifies the `points` attribute (rather than the `transform` attribute, for instance).
   */
  shift(dx: number, dy: number): void {
    (new PointList(this.domNode.points)).shift(dx, dy);
  }
}
