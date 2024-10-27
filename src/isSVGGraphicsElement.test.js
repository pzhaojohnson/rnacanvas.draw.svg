/**
 * @jest-environment jsdom
 */

import { isSVGGraphicsElement } from './isSVGGraphicsElement';

test('`function isSVGGraphicsElement()`', () => {
  let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

  // JSDOM does not implement the SVG element inheritance hierarchy correctly
  expect(circle instanceof SVGElement).toBe(true);
  expect(circle instanceof SVGGraphicsElement).toBe(false);

  globalThis.SVGGraphicsElement = SVGElement;

  expect(isSVGGraphicsElement(circle)).toBe(true);
  expect(isSVGGraphicsElement(text)).toBe(true);
  expect(isSVGGraphicsElement(path)).toBe(true);

  expect(isSVGGraphicsElement({})).toBe(false);
  expect(isSVGGraphicsElement(1)).toBe(false);
  expect(isSVGGraphicsElement('SVGGraphicsElement')).toBe(false);
  expect(isSVGGraphicsElement(true)).toBe(false);
  expect(isSVGGraphicsElement(null)).toBe(false);
  expect(isSVGGraphicsElement(undefined)).toBe(false);
});
