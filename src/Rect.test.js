/**
 * @jest-environment jsdom
 */

import { Rect } from './Rect';

describe('`class Rect`', () => {
  test('`domNode`', () => {
    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

    var rect = new Rect(domNode);

    expect(rect.domNode).toBe(domNode);

    expect(domNode).toBeTruthy();
  });

  test('`shift()`', () => {
    var domNode = RectMock.create({ x: 1, y: -2.5 });

    new Rect(domNode).shift(10, 20);

    expect(['x', 'y'].map(name => domNode[name].baseVal.value)).toStrictEqual([11, 17.5]);

    new Rect(domNode).shift(-15, -0.5);

    expect(['x', 'y'].map(name => domNode[name].baseVal.value)).toStrictEqual([-4, 17]);

    // zero vector
    new Rect(domNode).shift(0, 0);

    expect(['x', 'y'].map(name => domNode[name].baseVal.value)).toStrictEqual([-4, 17]);

    // defaults to zero
    var domNode = RectMock.create();

    new Rect(domNode).shift(3, 4);

    expect(['x', 'y'].map(name => domNode[name].baseVal.value)).toStrictEqual([3, 4]);
  });
});

const RectMock = {
  create: ({ x = 0, y = 0 } = {}) => {
    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

    domNode.x = { baseVal: { value: x } };
    domNode.y = { baseVal: { value: y } };

    return domNode;
  }
};
