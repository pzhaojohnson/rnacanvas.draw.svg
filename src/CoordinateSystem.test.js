import { CoordinateSystem } from './CoordinateSystem';

describe('CoordinateSystem class', () => {
  test('width getter', () => {
    let targetSVGDoc = { viewBox: { baseVal: { width: 371.29 } } };

    let coordinateSystem = new CoordinateSystem(targetSVGDoc);

    expect(coordinateSystem.width).toBe(371.29);
  });

  test('height getter', () => {
    let targetSVGDoc = { viewBox: { baseVal: { height: 501.882 } } };

    let coordinateSystem = new CoordinateSystem(targetSVGDoc);

    expect(coordinateSystem.height).toBe(501.882);
  });

  test('minX getter', () => {
    let targetSVGDoc = { viewBox: { baseVal: { x: 58.9925 } } };

    let coordinateSystem = new CoordinateSystem(targetSVGDoc);

    expect(coordinateSystem.minX).toBe(58.9925);
  });

  test('maxX getter', () => {
    let targetSVGDoc = { viewBox: { baseVal: { x: -221.57, width: 3029.82 } } };

    let coordinateSystem = new CoordinateSystem(targetSVGDoc);

    expect(coordinateSystem.maxX).toBe((-221.57) + 3029.82);
  });

  test('minY getter', () => {
    let targetSVGDoc = { viewBox: { baseVal: { y: 52.7748 } } };

    let coordinateSystem = new CoordinateSystem(targetSVGDoc);

    expect(coordinateSystem.minY).toBe(52.7748);
  });

  test('maxY getter', () => {
    let targetSVGDoc = { viewBox: { baseVal: { y: 32.98, height: 202.184 } } };

    let coordinateSystem = new CoordinateSystem(targetSVGDoc);

    expect(coordinateSystem.maxY).toBe(32.98 + 202.184);
  });
});
