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

  test('`shift()`', () => {
    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    var path = new Path(domNode);

    // absolute and relative commands (relative commands are unchanged)
    domNode.setAttribute('d', 'M 10 10 L 20 20 H 30 V 40 h 5 v 5 l 1 1');

    path.shift(100, 200);

    expect(domNode.getAttribute('d')).toBe('M110 210L120 220H130V240h5v5l1 1');

    // command types are preserved (e.g., arcs are not converted into curves)
    domNode.setAttribute('d', 'M 10 10 A 5 7 30 1 0 20 20 C 1 1 2 2 3 3 Q 4 4 5 5');

    path.shift(-10, 5.5);

    expect(domNode.getAttribute('d')).toBe('M0 15.5A5 7 30 1 0 10 25.5C-9 6.5 -8 7.5 -7 8.5Q-6 9.5 -5 10.5');

    // does not add a transform attribute
    expect(domNode.hasAttribute('transform')).toBe(false);

    // empty `d` attribute
    domNode.setAttribute('d', '');

    path.shift(10, 20);

    expect(domNode.getAttribute('d')).toBe('');

    // no `d` attribute
    domNode.removeAttribute('d');

    path.shift(10, 20);

    expect(domNode.getAttribute('d')).toBe('');
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
