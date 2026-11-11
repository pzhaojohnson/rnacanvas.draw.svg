import { SVG } from './SVG';
import { Text } from './Text';
import { Line } from './Line';
import { Circle } from './Circle';
import { Ellipse } from './Ellipse';
import { Rect } from './Rect';
import { Polyline } from './Polyline';
import { Polygon } from './Polygon';
import { Path } from './Path';
import { Image } from './Image';
import { Use } from './Use';
import { ForeignObject } from './ForeignObject';

/**
 * Shifts the SVG element by the specified vector.
 *
 * Does nothing for elements that are not rendered (e.g., `defs`, `style`).
 *
 * Acts recursively on the immediate children of `g` elements.
 */
export function shift(element: Element, vector: { x: number, y: number }): void {
  let { x, y } = vector;

  let tagName = element.tagName;

  if (unrenderedTagNames.has(tagName)) {
    return;
  }

  switch (tagName) {
    case 'g':
      Array.from(element.children).forEach(child => shift(child, vector));
      break;
    case 'svg':
      (new SVG(element as SVGSVGElement)).shift(x, y);
      break;
    case 'text':
      (new Text(element as SVGTextElement)).shift(x, y);
      break;
    case 'line':
      (new Line(element as SVGLineElement)).shift(x, y);
      break;
    case 'circle':
      (new Circle(element as SVGCircleElement)).shift(x, y);
      break;
    case 'ellipse':
      (new Ellipse(element as SVGEllipseElement)).shift(x, y);
      break;
    case 'rect':
      (new Rect(element as SVGRectElement)).shift(x, y);
      break;
    case 'polyline':
      (new Polyline(element as SVGPolylineElement)).shift(x, y);
      break;
    case 'polygon':
      (new Polygon(element as SVGPolygonElement)).shift(x, y);
      break;
    case 'path':
      (new Path(element as SVGPathElement)).shift(x, y);
      break;
    case 'image':
      (new Image(element as SVGImageElement)).shift(x, y);
      break;
    case 'use':
      (new Use(element as SVGUseElement)).shift(x, y);
      break;
    case 'foreignObject':
      (new ForeignObject(element as SVGForeignObjectElement)).shift(x, y);
      break;
    default:
      console.error(`Unrecognized SVG element type: "${tagName}".`);
  }
}

/**
 * Tag names of SVG elements that are not directly rendered (and thus cannot be shifted).
 */
const unrenderedTagNames = new Set([
  'defs',
  'title',
  'desc',
  'metadata',
  'style',
  'script',
  'linearGradient',
  'radialGradient',
  'stop',
  'clipPath',
  'mask',
  'marker',
  'pattern',
  'symbol',
  'filter',
]);
