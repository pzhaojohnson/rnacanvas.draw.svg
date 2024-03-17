import { Scaling } from './Scaling';

describe('Scaling class', () => {
  test('set method', () => {
    let attributes = { 'width': null, 'height': null };

    let targetSVGDoc = {
      viewBox: { baseVal: { width: 1293, height: 871 } },

      setAttribute: (name, value) => {
        attributes[name] = value;
      },
    };

    let scaling = new Scaling(targetSVGDoc);

    scaling.set(1.79);

    expect(attributes['width']).toBe('2314.4700000000003px');
    expect(attributes['height']).toBe('1559.09px');
  });
});
