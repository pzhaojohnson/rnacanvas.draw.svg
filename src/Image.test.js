/**
 * @jest-environment jsdom
 */

import { Image } from './Image';

describe('`class Image`', () => {
  test('`domNode`', () => {
    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'image');

    var image = new Image(domNode);

    expect(image.domNode).toBe(domNode);

    expect(domNode).toBeTruthy();
  });

  test('`shift()`', () => {
    var domNode = ImageMock.create({ x: 1, y: -2.5 });

    new Image(domNode).shift(10, 20);

    expect(['x', 'y'].map(name => domNode[name].baseVal.value)).toStrictEqual([11, 17.5]);

    new Image(domNode).shift(-15, -0.5);

    expect(['x', 'y'].map(name => domNode[name].baseVal.value)).toStrictEqual([-4, 17]);

    // zero vector
    new Image(domNode).shift(0, 0);

    expect(['x', 'y'].map(name => domNode[name].baseVal.value)).toStrictEqual([-4, 17]);

    // defaults to zero
    var domNode = ImageMock.create();

    new Image(domNode).shift(3, 4);

    expect(['x', 'y'].map(name => domNode[name].baseVal.value)).toStrictEqual([3, 4]);
  });
});

const ImageMock = {
  create: ({ x = 0, y = 0 } = {}) => {
    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'image');

    domNode.x = { baseVal: { value: x } };
    domNode.y = { baseVal: { value: y } };

    return domNode;
  }
};
