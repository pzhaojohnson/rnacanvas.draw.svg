/**
 * @jest-environment jsdom
 */

import { Polyline } from './Polyline';

describe('`class Polyline`', () => {
  test('`domNode`', () => {
    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');

    expect(new Polyline(domNode).domNode).toBe(domNode);
  });

  test('`shift()`', () => {
    var domNode = PolylineMock.create([[0, 0], [10, 20], [-5.5, 3]]);

    new Polyline(domNode).shift(5, -5);

    expect(domNode.points.items.map(p => [p.x, p.y])).toStrictEqual([[5, -5], [15, 15], [-0.5, -2]]);

    new Polyline(domNode).shift(-1, 1);

    expect(domNode.points.items.map(p => [p.x, p.y])).toStrictEqual([[4, -4], [14, 16], [-1.5, -1]]);

    // zero vector
    new Polyline(domNode).shift(0, 0);

    expect(domNode.points.items.map(p => [p.x, p.y])).toStrictEqual([[4, -4], [14, 16], [-1.5, -1]]);
  });
});

const PolylineMock = {
  create: (points = []) => {
    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');

    var items = points.map(([x, y]) => ({ x, y }));

    domNode.points = {
      items,

      get numberOfItems() { return items.length; },

      getItem: (i) => items[i],
    };

    return domNode;
  },
};
