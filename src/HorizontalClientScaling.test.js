import { HorizontalClientScaling } from './HorizontalClientScaling';

describe('HorizontalClientScaling class', () => {
  test('get method', () => {
    let targetSVGDoc = {
      getBoundingClientRect: () => ({ width: 2386 }),
      viewBox: { baseVal: { width: 1822 } },
    };

    let horizontalClientScaling = new HorizontalClientScaling(targetSVGDoc);

    expect(horizontalClientScaling.get()).toBeCloseTo(2386 / 1822);
  });
});
