export class Ellipse {
  constructor(readonly domNode: SVGEllipseElement) {}

  /**
   * Shifts the ellipse by the specified vector.
   *
   * Modifies the `cx` and `cy` attributes (rather than the `transform` attribute, for instance).
   */
  shift(dx: number, dy: number): void {
    this.domNode.cx.baseVal.value += dx;
    this.domNode.cy.baseVal.value += dy;
  }
}
