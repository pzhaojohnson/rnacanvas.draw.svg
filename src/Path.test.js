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

    // a point on the path
    var closestPoint = path.closestPoint({ x: 42, y: 11 });

    expect(closestPoint.x).toBeCloseTo(42);
    expect(closestPoint.y).toBeCloseTo(11);
    expect(closestPoint.length).toBeCloseTo((2 * 22**2)**0.5);

    // a point off the path
    var closestPoint = path.closestPoint({ x: 42 - 5, y: 11 + 5 });

    expect(closestPoint.x).toBeCloseTo(42);
    expect(closestPoint.y).toBeCloseTo(11);
    expect(closestPoint.length).toBeCloseTo((2 * 22**2)**0.5);

    // the closest point is the start point
    var closestPoint = path.closestPoint({ x: 18, y: -15 });

    expect(closestPoint.x).toBeCloseTo(20);
    expect(closestPoint.y).toBeCloseTo(-11);
    expect(closestPoint.length).toBeCloseTo(0);

    // the closest point is the end point
    var closestPoint = path.closestPoint({ x: 20 + 100, y: (-11) + 100 });

    expect(closestPoint.x).toBeCloseTo(20 + (100 * Math.cos(Math.PI / 4)));
    expect(closestPoint.y).toBeCloseTo((-11) + (100 * Math.sin(Math.PI / 4)));
    expect(closestPoint.length).toBeCloseTo(100);
  });
});
