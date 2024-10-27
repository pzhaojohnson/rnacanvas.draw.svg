/**
 * @jest-environment jsdom
 */

import { isSVGGraphicsElementsArray } from './isSVGGraphicsElementsArray';

test('`function isSVGGraphicsElementsArray()`', () => {
  let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  let ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');

  // JSDOM does not implement the SVG element inheritance hierarchy correctly
  expect(circle instanceof SVGElement).toBeTruthy();
  expect(circle instanceof SVGGraphicsElement).toBeFalsy();

  globalThis.SVGGraphicsElement = SVGElement;

  expect(isSVGGraphicsElementsArray([circle, text, path, ellipse])).toBe(true);
  expect(isSVGGraphicsElementsArray([circle])).toBe(true);

  // vacuously returns true for an empty array
  expect(isSVGGraphicsElementsArray([])).toBe(true);

  // one item is not an SVG graphics element
  expect(isSVGGraphicsElementsArray([circle, text, path, {}, ellipse])).toBe(false);

  // no items are SVG graphics elements
  expect(isSVGGraphicsElementsArray([{}, true, 'SVGGraphicsElement'])).toBe(false);

  // values that are not arrays
  expect(isSVGGraphicsElementsArray('[]')).toBe(false);
  expect(isSVGGraphicsElementsArray({})).toBe(false);
  expect(isSVGGraphicsElementsArray(true)).toBe(false);
  expect(isSVGGraphicsElementsArray(null)).toBe(false);
});
