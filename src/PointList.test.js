import { PointList } from './PointList';

describe('`class PointList`', () => {
  test('`shift()`', () => {
    var target = PointListMock.create([[1, 2], [2.5, -3], [0, 0]]);

    new PointList(target).shift(10, 20);

    expect(target.items.map(p => [p.x, p.y])).toStrictEqual([[11, 22], [12.5, 17], [10, 20]]);

    new PointList(target).shift(-20, -0.5);

    expect(target.items.map(p => [p.x, p.y])).toStrictEqual([[-9, 21.5], [-7.5, 16.5], [-10, 19.5]]);

    // zero vector
    new PointList(target).shift(0, 0);

    expect(target.items.map(p => [p.x, p.y])).toStrictEqual([[-9, 21.5], [-7.5, 16.5], [-10, 19.5]]);

    // empty list
    var target = PointListMock.create([]);

    expect(() => new PointList(target).shift(5, 5)).not.toThrow();

    expect(target.items).toStrictEqual([]);
  });
});

const PointListMock = {
  create: (points) => {
    var items = points.map(([x, y]) => ({ x, y }));

    return {
      items,

      get numberOfItems() { return items.length; },

      getItem: (i) => items[i],
    };
  },
};
