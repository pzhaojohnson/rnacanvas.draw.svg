import { LengthList } from './LengthList';

export class Text {
  constructor(readonly domNode: SVGTextElement) {}

  /**
   * Shifts the text element by the specified vector.
   *
   * Modifies the `x` and `y` attributes (rather than the `transform` attribute, for instance).
   *
   * The `x` and `y` attributes of descendent `tspan` elements are also modified (if present).
   */
  shift(dx: number, dy: number): void {
    let x = new LengthList(this.domNode.x.baseVal);
    let y = new LengthList(this.domNode.y.baseVal);

    x.shift(dx);
    y.shift(dy);

    // in case `x` and `y` attributes were unspecified beforehand
    if (x.isEmpty()) { this.domNode.setAttribute('x', `${dx}`); }
    if (y.isEmpty()) { this.domNode.setAttribute('y', `${dy}`); }

    this.domNode.querySelectorAll('tspan').forEach(tspan => {
      new LengthList(tspan.x.baseVal).shift(dx);
      new LengthList(tspan.y.baseVal).shift(dy);
    });
  }
}
