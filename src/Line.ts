export class Line {
  constructor(readonly domNode: SVGLineElement) {}

  /**
   * Shifts the line element by the specified vector.
   *
   * Modifies the `x1`, `y1`, `x2` and `y2` attributes (rather than the `transform` attribute, for instance).
   */
  shift(dx: number, dy: number): void {
    this.domNode.x1.baseVal.value += dx;
    this.domNode.y1.baseVal.value += dy;

    this.domNode.x2.baseVal.value += dx;
    this.domNode.y2.baseVal.value += dy;
  }
}
