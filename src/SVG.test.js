/**
 * @jest-environment jsdom
 */

import { SVG } from './SVG';

describe('`class SVG`', () => {
  test('`domNode`', () => {
    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    var svg = new SVG(domNode);

    expect(svg.domNode).toBe(domNode);

    expect(domNode).toBeTruthy();
  });

  test('`shift()`', () => {
    var domNode = SVGMock.create({ x: 1, y: -2.5 });

    new SVG(domNode).shift(10, 20);

    expect(['x', 'y'].map(name => domNode[name].baseVal.value)).toStrictEqual([11, 17.5]);

    new SVG(domNode).shift(-15, -0.5);

    expect(['x', 'y'].map(name => domNode[name].baseVal.value)).toStrictEqual([-4, 17]);

    // zero vector
    new SVG(domNode).shift(0, 0);

    expect(['x', 'y'].map(name => domNode[name].baseVal.value)).toStrictEqual([-4, 17]);

    // defaults to zero
    var domNode = SVGMock.create();

    new SVG(domNode).shift(3, 4);

    expect(['x', 'y'].map(name => domNode[name].baseVal.value)).toStrictEqual([3, 4]);
  });
});

const SVGMock = {
  create: ({ x = 0, y = 0 } = {}) => {
    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    domNode.x = { baseVal: { value: x } };
    domNode.y = { baseVal: { value: y } };

    return domNode;
  }
};
