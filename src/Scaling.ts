import * as SVG from '@svgdotjs/svg.js';

/**
 * The scaling of a target SVG document
 * (as determined by its view box and its width and height attributes).
 */
export class Scaling {
  constructor(private targetSVGDoc: SVG.Svg) {}

  /**
   * Modifies the width and height attributes of the target SVG document
   * to make its horizontal and vertical scaling equal to the given scaling factor.
   */
  set(scaling: number) {
    let viewBox = this.targetSVGDoc.viewbox();

    this.targetSVGDoc.attr({
      'width': (scaling * viewBox.width) + 'px',
      'height': (scaling * viewBox.height) + 'px',
    });
  }
}
