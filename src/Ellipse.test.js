/**
 * @jest-environment jsdom
 */

import { Ellipse } from './Ellipse';

describe('`class Ellipse`', () => {
  test('`domNode`', () => {
    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');

    var ellipse = new Ellipse(domNode);

    expect(ellipse.domNode).toBe(domNode);

    expect(domNode).toBeTruthy();
  });

  test('`shift()`', () => {
    var domNode = EllipseMock.create({ cx: 1, cy: -2.5 });

    new Ellipse(domNode).shift(10, 20);

    expect(['cx', 'cy'].map(name => domNode[name].baseVal.value)).toStrictEqual([11, 17.5]);

    new Ellipse(domNode).shift(-15, -0.5);

    expect(['cx', 'cy'].map(name => domNode[name].baseVal.value)).toStrictEqual([-4, 17]);

    // zero vector
    new Ellipse(domNode).shift(0, 0);

    expect(['cx', 'cy'].map(name => domNode[name].baseVal.value)).toStrictEqual([-4, 17]);

    // defaults to zero
    var domNode = EllipseMock.create();

    new Ellipse(domNode).shift(3, 4);

    expect(['cx', 'cy'].map(name => domNode[name].baseVal.value)).toStrictEqual([3, 4]);
  });
});

const EllipseMock = {
  create: ({ cx = 0, cy = 0 } = {}) => {
    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');

    domNode.cx = { baseVal: { value: cx } };
    domNode.cy = { baseVal: { value: cy } };

    return domNode;
  }
};
