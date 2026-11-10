/**
 * @jest-environment jsdom
 */

import { ForeignObject } from './ForeignObject';

describe('`class ForeignObject`', () => {
  test('`domNode`', () => {
    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');

    var foreignObject = new ForeignObject(domNode);

    expect(foreignObject.domNode).toBe(domNode);

    expect(domNode).toBeTruthy();
  });

  test('`shift()`', () => {
    var domNode = ForeignObjectMock.create({ x: 1, y: -2.5 });

    new ForeignObject(domNode).shift(10, 20);

    expect(['x', 'y'].map(name => domNode[name].baseVal.value)).toStrictEqual([11, 17.5]);

    new ForeignObject(domNode).shift(-15, -0.5);

    expect(['x', 'y'].map(name => domNode[name].baseVal.value)).toStrictEqual([-4, 17]);

    // zero vector
    new ForeignObject(domNode).shift(0, 0);

    expect(['x', 'y'].map(name => domNode[name].baseVal.value)).toStrictEqual([-4, 17]);

    // defaults to zero
    var domNode = ForeignObjectMock.create();

    new ForeignObject(domNode).shift(3, 4);

    expect(['x', 'y'].map(name => domNode[name].baseVal.value)).toStrictEqual([3, 4]);
  });
});

const ForeignObjectMock = {
  create: ({ x = 0, y = 0 } = {}) => {
    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');

    domNode.x = { baseVal: { value: x } };
    domNode.y = { baseVal: { value: y } };

    return domNode;
  }
};
