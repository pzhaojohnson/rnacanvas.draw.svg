export class PointList {
  readonly #target: SVGPointList;

  constructor(target: SVGPointList) {
    this.#target = target;
  }

  /**
   * Shifts every point in the list by the specified vector.
   */
  shift(dx: number, dy: number): void {
    for (let i = 0; i < this.#target.numberOfItems; i++) {
      let point = this.#target.getItem(i);

      point.x += dx;
      point.y += dy;
    }
  }
}
