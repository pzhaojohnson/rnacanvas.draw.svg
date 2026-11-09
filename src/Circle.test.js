/**
 * @jest-environment jsdom
 */

import { Circle } from './Circle';

describe('`class Circle`', () => {
  test('`domNode`', () => {
    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    var circle = new Circle(domNode);

    expect(circle.domNode).toBe(domNode);

    expect(domNode).toBeTruthy();
  });

  test('`shift()`', () => {
    var domNode = CircleMock.create({ cx: 1, cy: -2.5 });

    new Circle(domNode).shift(10, 20);

    expect(['cx', 'cy'].map(name => domNode[name].baseVal.value)).toStrictEqual([11, 17.5]);

    new Circle(domNode).shift(-15, -0.5);

    expect(['cx', 'cy'].map(name => domNode[name].baseVal.value)).toStrictEqual([-4, 17]);

    // zero vector
    new Circle(domNode).shift(0, 0);

    expect(['cx', 'cy'].map(name => domNode[name].baseVal.value)).toStrictEqual([-4, 17]);

    // defaults to zero
    var domNode = CircleMock.create();

    new Circle(domNode).shift(3, 4);

    expect(['cx', 'cy'].map(name => domNode[name].baseVal.value)).toStrictEqual([3, 4]);
  });
});

const CircleMock = {
  create: ({ cx = 0, cy = 0 } = {}) => {
    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    domNode.cx = { baseVal: { value: cx } };
    domNode.cy = { baseVal: { value: cy } };

    return domNode;
  }
};
