export class SVG {
  constructor(readonly domNode: SVGSVGElement) {}

  /**
   * Shifts the nested SVG element by the specified vector.
   *
   * Modifies the `x` and `y` attributes (rather than the `transform` attribute, for instance).
   */
  shift(dx: number, dy: number): void {
    this.domNode.x.baseVal.value += dx;
    this.domNode.y.baseVal.value += dy;
  }
}
