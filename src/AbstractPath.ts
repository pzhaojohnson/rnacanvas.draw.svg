import { Path } from './Path';

/**
 * A way to do calculations related to SVG path elements
 * without having to worry about creating and adding elements to the document body (and so forth).
 */
export class AbstractPath {
  readonly #d;

  constructor(d: string) {
    this.#d = d;
  }

  /**
   * Returns the closest point on the path to the specified point
   * (as well as the length along the path that the closest point is at).
   *
   * The `precision` option roughly corresponds to the margin for error in the closest point calculation.
   *
   * Higher margin for error speeds up calculation.
   */
  closestPoint(p: Point, options?: { precision?: number }) {
    let precision = options?.precision ?? 5;

    // just in case the SVG container got removed somehow
    if (!document.body.contains(svgContainer)) {
      document.body.append(svgContainer);
    }

    path.setAttribute('d', this.#d);

    return (new Path(path)).closestPoint(p, { precision });
  }
}

type Point = {
  x: number;
  y: number;
};

const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

// assign dimensions (just in case it's necessary for SVG calculations to work)
svg.setAttribute('viewBox', '0 0 100 100');

svg.setAttribute('width', '100');
svg.setAttribute('height', '100');

const svgContainer = document.createElement('div');

svgContainer.append(svg);

// make invisible to the user (but still rendered)
svgContainer.style.height = '0px';
svgContainer.style.position = 'fixed';

// SVG elements must be added to the document body for path calculations to work
document.body.append(svgContainer);

// the path element used for calculations
const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

// give some stroke (just in case it's necessary for calculations to work)
path.setAttribute('stroke', 'black');
path.setAttribute('stroke-width', '1');

svg.append(path);
