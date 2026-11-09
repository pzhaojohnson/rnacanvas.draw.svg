/**
 * @jest-environment jsdom
 */

import { Line } from './Line';

describe('`class Line`', () => {
  test('`domNode`', () => {
    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'line');

    var line = new Line(domNode);

    expect(line.domNode).toBe(domNode);

    expect(domNode).toBeTruthy();
  });

  test('`shift()`', () => {
    var domNode = LineMock.create({ x1: 1, y1: 2, x2: 3.5, y2: -4 });

    new Line(domNode).shift(10, 20);

    expect(['x1', 'y1', 'x2', 'y2'].map(name => domNode[name].baseVal.value)).toStrictEqual([11, 22, 13.5, 16]);

    new Line(domNode).shift(-15, -0.5);

    expect(['x1', 'y1', 'x2', 'y2'].map(name => domNode[name].baseVal.value)).toStrictEqual([-4, 21.5, -1.5, 15.5]);

    // zero vector
    new Line(domNode).shift(0, 0);

    expect(['x1', 'y1', 'x2', 'y2'].map(name => domNode[name].baseVal.value)).toStrictEqual([-4, 21.5, -1.5, 15.5]);

    // defaults to zero
    var domNode = LineMock.create();

    new Line(domNode).shift(3, 4);

    expect(['x1', 'y1', 'x2', 'y2'].map(name => domNode[name].baseVal.value)).toStrictEqual([3, 4, 3, 4]);
  });
});

const LineMock = {
  create: ({ x1 = 0, y1 = 0, x2 = 0, y2 = 0 } = {}) => {
    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'line');

    domNode.x1 = { baseVal: { value: x1 } };
    domNode.y1 = { baseVal: { value: y1 } };
    domNode.x2 = { baseVal: { value: x2 } };
    domNode.y2 = { baseVal: { value: y2 } };

    return domNode;
  }
};
