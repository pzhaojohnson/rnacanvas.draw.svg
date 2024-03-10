import { Scaling } from './Scaling';

describe('Scaling class', () => {
  test('set method', () => {
    let attributes = { 'width': null, 'height': null };

    let targetSVGDoc = {
      viewbox: () => ({ width: 1293, height: 871 }),

      attr: attrs => {
        ['width', 'height'].forEach(name => {
          if (name in attrs) {
            attributes[name] = attrs[name];
          }
        });
      },
    };

    let scaling = new Scaling(targetSVGDoc);

    scaling.set(1.79);

    expect(attributes['width']).toBe('2314.4700000000003px');
    expect(attributes['height']).toBe('1559.09px');
  });
});
