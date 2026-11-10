/**
 * @jest-environment jsdom
 */

import { Polygon } from './Polygon';

describe('`class Polygon`', () => {
  test('`domNode`', () => {
    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');

    expect(new Polygon(domNode).domNode).toBe(domNode);
  });

  test('`shift()`', () => {
    var domNode = PolygonMock.create([[0, 0], [10, 20], [-5.5, 3]]);

    new Polygon(domNode).shift(5, -5);

    expect(domNode.points.items.map(p => [p.x, p.y])).toStrictEqual([[5, -5], [15, 15], [-0.5, -2]]);

    new Polygon(domNode).shift(-1, 1);

    expect(domNode.points.items.map(p => [p.x, p.y])).toStrictEqual([[4, -4], [14, 16], [-1.5, -1]]);

    // zero vector
    new Polygon(domNode).shift(0, 0);

    expect(domNode.points.items.map(p => [p.x, p.y])).toStrictEqual([[4, -4], [14, 16], [-1.5, -1]]);
  });
});

const PolygonMock = {
  create: (points = []) => {
    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');

    var items = points.map(([x, y]) => ({ x, y }));

    domNode.points = {
      items,

      get numberOfItems() { return items.length; },

      getItem: (i) => items[i],
    };

    return domNode;
  },
};
