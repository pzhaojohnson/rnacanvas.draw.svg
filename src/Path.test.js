/**
 * @jest-environment jsdom
 */

import { Path } from './Path';

describe('`class Path`', () => {
  test('`readonly domNode`', () => {
    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    var path = new Path(domNode);

    expect(path.domNode).toBe(domNode);

    expect(domNode).toBeTruthy();
  });

  test('`closestPoint()`', () => {
    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    var path = new Path(domNode);

    // total length of 0
    domNode.getTotalLength = () => 0;

    domNode.getPointAtLength = () => ({ x: 27, y: -82 });

    expect(path.closestPoint({ x: 1, y: 2 })).toStrictEqual({ x: 27, y: -82, length: 0 });

    // total length greater than zero
    domNode.getTotalLength = () => 100;

    domNode.getPointAtLength = length => ({
      x: 20 + (length * Math.cos(Math.PI / 4)),
      y: -11 + (length * Math.sin(Math.PI / 4)),
    });

    var closestPoint = path.closestPoint({ x: 42, y: 11 });

    expect(Math.abs(closestPoint.x - 42)).toBeLessThanOrEqual(5);
    expect(Math.abs(closestPoint.y - 11)).toBeLessThanOrEqual(5);
    expect(Math.abs(closestPoint.length - (22 * 2**0.5))).toBeLessThanOrEqual(5);

    // with precision specified
    var closestPoint = path.closestPoint({ x: 42, y: 11 }, { precision: 20 });

    expect(Math.abs(closestPoint.x - 42)).toBeLessThanOrEqual(20);
    expect(Math.abs(closestPoint.y - 11)).toBeLessThanOrEqual(20);
    expect(Math.abs(closestPoint.length - (22 * 2**0.5))).toBeLessThanOrEqual(20);

    expect(Math.abs(closestPoint.x - 42)).toBeGreaterThan(5);
    expect(Math.abs(closestPoint.y - 11)).toBeGreaterThan(5);
    expect(Math.abs(closestPoint.length - (22 * 2**0.5))).toBeGreaterThan(5);

    // a point far away from the path
    var closestPoint = path.closestPoint({ x: 1000, y: -1000 });

    expect(Math.abs(closestPoint.x - path.closestPoint(closestPoint).x)).toBeLessThanOrEqual(5);
    expect(Math.abs(closestPoint.y - path.closestPoint(closestPoint).y)).toBeLessThanOrEqual(5);
    expect(Math.abs(closestPoint.length - path.closestPoint(closestPoint).length)).toBeLessThanOrEqual(5);

    // specifying a precision of zero
    expect(() => path.closestPoint({ x: 42, y: 11 }, { precision: 0 })).toThrow();

    // specifying negative precision
    expect(() => path.closestPoint({ x: 42, y: 11 }, { precision: -20 })).toThrow();
  });
});
