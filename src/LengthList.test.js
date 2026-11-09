import { LengthList } from './LengthList';

describe('`class LengthList`', () => {
  test('`isEmpty()`', () => {
    expect(new LengthList(LengthListMock.create([])).isEmpty()).toBe(true);

    expect(new LengthList(LengthListMock.create([0])).isEmpty()).toBe(false);
    expect(new LengthList(LengthListMock.create([1, 2, 3])).isEmpty()).toBe(false);
  });

  test('`shift()`', () => {
    var target = LengthListMock.create([1, 2.5, -3]);

    new LengthList(target).shift(10);

    expect(target.items.map(item => item.value)).toStrictEqual([11, 12.5, 7]);

    new LengthList(target).shift(-20);

    expect(target.items.map(item => item.value)).toStrictEqual([-9, -7.5, -13]);

    // empty list
    var target = LengthListMock.create([]);

    expect(() => new LengthList(target).shift(5)).not.toThrow();

    expect(target.items).toStrictEqual([]);
  });
});

const LengthListMock = {
  create: values => {
    var items = values.map(value => ({ value }));

    return {
      numberOfItems: items.length,
      getItem: i => items[i],
      items,
    };
  },
};
