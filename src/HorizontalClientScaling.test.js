import { HorizontalClientScaling } from './HorizontalClientScaling';

describe('HorizontalClientScaling class', () => {
  test('get method', () => {
    let targetSVGDoc = {
      node: { getBoundingClientRect: () => ({ width: 2386 }) },
      viewbox: () => ({ width: 1822 }),
    };

    let horizontalClientScaling = new HorizontalClientScaling(targetSVGDoc);

    expect(horizontalClientScaling.get()).toBeCloseTo(2386 / 1822);
  });
});
