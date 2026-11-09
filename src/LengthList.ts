export class LengthList {
  readonly #target: SVGLengthList;

  constructor(target: SVGLengthList) {
    this.#target = target;
  }

  isEmpty(): boolean {
    return this.#target.numberOfItems == 0;
  }

  /**
   * Adds the specified offset to every length in the list.
   */
  shift(offset: number): void {
    for (let i = 0; i < this.#target.numberOfItems; i++) {
      let length = this.#target.getItem(i);

      length.value += offset;
    }
  }
}
