/**
 * @jest-environment jsdom
 */

import { setAttributes } from './setAttributes';

let targetSVGElement = null;

beforeEach(() => {
  targetSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
});

afterEach(() => {
  targetSVGElement = null;
});

describe('`setAttributes()` function', () => {
  test('an empty attributes object', () => {
    expect(() => setAttributes(targetSVGElement, {})).not.toThrow();
  });

  test('a nonempty attributes object', () => {
    setAttributes(targetSVGElement, {
      'stroke': '#17bcd3',
      'stroke-opacity': '0.81642',
      'fill-opacity': '0.14728',
    });

    expect(targetSVGElement.getAttribute('stroke')).toBe('#17bcd3');
    expect(targetSVGElement.getAttribute('stroke-opacity')).toBe('0.81642');
    expect(targetSVGElement.getAttribute('fill-opacity')).toBe('0.14728');
  });
});
