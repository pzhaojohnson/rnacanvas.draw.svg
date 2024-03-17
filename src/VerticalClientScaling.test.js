import { VerticalClientScaling } from './VerticalClientScaling';

describe('VerticalClientScaling class', () => {
  test('get method', () => {
    let targetSVGDoc = {
      getBoundingClientRect: () => ({ height: 1507 }),
      viewBox: { baseVal: { height: 2241 } },
    };

    let verticalClientScaling = new VerticalClientScaling(targetSVGDoc);

    expect(verticalClientScaling.get()).toBeCloseTo(1507 / 2241);
  });
});
