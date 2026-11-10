/**
 * @jest-environment jsdom
 */

import { Use } from './Use';

describe('`class Use`', () => {
  test('`domNode`', () => {
    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'use');

    var use = new Use(domNode);

    expect(use.domNode).toBe(domNode);

    expect(domNode).toBeTruthy();
  });

  test('`shift()`', () => {
    var domNode = UseMock.create({ x: 1, y: -2.5 });

    new Use(domNode).shift(10, 20);

    expect(['x', 'y'].map(name => domNode[name].baseVal.value)).toStrictEqual([11, 17.5]);

    new Use(domNode).shift(-15, -0.5);

    expect(['x', 'y'].map(name => domNode[name].baseVal.value)).toStrictEqual([-4, 17]);

    // zero vector
    new Use(domNode).shift(0, 0);

    expect(['x', 'y'].map(name => domNode[name].baseVal.value)).toStrictEqual([-4, 17]);

    // defaults to zero
    var domNode = UseMock.create();

    new Use(domNode).shift(3, 4);

    expect(['x', 'y'].map(name => domNode[name].baseVal.value)).toStrictEqual([3, 4]);
  });
});

const UseMock = {
  create: ({ x = 0, y = 0 } = {}) => {
    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'use');

    domNode.x = { baseVal: { value: x } };
    domNode.y = { baseVal: { value: y } };

    return domNode;
  }
};
