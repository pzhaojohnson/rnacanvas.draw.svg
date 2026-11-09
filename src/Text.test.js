/**
 * @jest-environment jsdom
 */

import { Text } from './Text';

describe('`class Text`', () => {
  test('`domNode`', () => {
    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'text');

    var text = new Text(domNode);

    expect(text.domNode).toBe(domNode);

    expect(domNode).toBeTruthy();
  });

  test('`shift()`', () => {
    // single x and y values
    var domNode = TextMock.create({ x: [10], y: [-20.5] });

    new Text(domNode).shift(5, 7);

    expect(LengthListMock.values(domNode.x)).toStrictEqual([15]);
    expect(LengthListMock.values(domNode.y)).toStrictEqual([-13.5]);

    // lists of x and y values
    var domNode = TextMock.create({ x: [1, 2, 3], y: [10, 20, 30] });

    new Text(domNode).shift(100, -10);

    expect(LengthListMock.values(domNode.x)).toStrictEqual([101, 102, 103]);
    expect(LengthListMock.values(domNode.y)).toStrictEqual([0, 10, 20]);

    // missing x and y (default to zero)
    var domNode = TextMock.create();

    new Text(domNode).shift(3, 4);

    expect(domNode.getAttribute('x')).toBe('3');
    expect(domNode.getAttribute('y')).toBe('4');

    // only one of x and y is missing
    var domNode = TextMock.create({ x: [8] });

    new Text(domNode).shift(1, 2);

    expect(LengthListMock.values(domNode.x)).toStrictEqual([9]);
    expect(domNode.hasAttribute('x')).toBe(false);
    expect(domNode.getAttribute('y')).toBe('2');

    // tspan descendants (only non-empty lists are shifted)
    var domNode = TextMock.create({ x: [0], y: [0] });

    var tspan1 = TSpanMock.create({ x: [50, 51], y: [60] });
    var tspan2 = TSpanMock.create();

    domNode.append(tspan1, tspan2);

    new Text(domNode).shift(10, 20);

    expect(LengthListMock.values(tspan1.x)).toStrictEqual([60, 61]);
    expect(LengthListMock.values(tspan1.y)).toStrictEqual([80]);

    expect(tspan2.x.baseVal.numberOfItems).toBe(0);
    expect(tspan2.y.baseVal.numberOfItems).toBe(0);
    expect(tspan2.hasAttribute('x')).toBe(false);
    expect(tspan2.hasAttribute('y')).toBe(false);
  });
});

const TextMock = {
  create: ({ x = [], y = [] } = {}) => {
    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'text');

    domNode.x = LengthListMock.create(x);
    domNode.y = LengthListMock.create(y);

    return domNode;
  },
};

const TSpanMock = {
  create: ({ x = [], y = [] } = {}) => {
    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');

    domNode.x = LengthListMock.create(x);
    domNode.y = LengthListMock.create(y);

    return domNode;
  },
};

const LengthListMock = {
  create: values => {
    var items = values.map(value => ({ value }));

    return {
      baseVal: {
        numberOfItems: items.length,
        getItem: i => items[i],
      },
      items,
    };
  },

  values: lengthList => lengthList.items.map(item => item.value),
};
