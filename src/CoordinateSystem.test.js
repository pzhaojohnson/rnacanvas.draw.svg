/**
 * @jest-environment jsdom
 */

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

  test('horizontalScaling getter', () => {
    let targetSVGDoc = {
      viewBox: { baseVal: { width: 708.114 } },
      width: { baseVal: { value: 1389.27 } },
    };

    let coordinateSystem = new CoordinateSystem(targetSVGDoc);

    expect(coordinateSystem.horizontalScaling).toBeCloseTo(1389.27 / 708.114);
  });

  test('verticalScaling getter', () => {
    let targetSVGDoc = {
      viewBox: { baseVal: { height: 908.227 } },
      height: { baseVal: { value: 471.2 } },
    };

    let coordinateSystem = new CoordinateSystem(targetSVGDoc);

    expect(coordinateSystem.verticalScaling).toBeCloseTo(471.2 / 908.227);
  });

  test('setScaling method', () => {
    let targetSVGDoc = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    targetSVGDoc.viewBox = { baseVal: { width: 1912.83, height: 3304.98 } };

    let coordinateSystem = new CoordinateSystem(targetSVGDoc);

    coordinateSystem.setScaling(2.81);

    expect(targetSVGDoc.getAttribute('width')).toBe(`${2.81 * 1912.83}`);
    expect(targetSVGDoc.getAttribute('height')).toBe(`${2.81 * 3304.98}`);
  });

  test('clientWidth getter', () => {
    let targetSVGDoc = { getBoundingClientRect: () => ({ width: 560.27 }) };

    let coordinateSystem = new CoordinateSystem(targetSVGDoc);

    expect(coordinateSystem.clientWidth).toBe(560.27);
  });

  test('clientHeight getter', () => {
    let targetSVGDoc = { getBoundingClientRect: () => ({ height: 873.225 }) };

    let coordinateSystem = new CoordinateSystem(targetSVGDoc);

    expect(coordinateSystem.clientHeight).toBe(873.225);
  });

  test('horizontalClientScaling getter', () => {
    let targetSVGDoc = {
      viewBox: { baseVal: { width: 809.043 } },
      getBoundingClientRect: () => ({ width: 1120.37 }),
    };

    let coordinateSystem = new CoordinateSystem(targetSVGDoc);

    expect(coordinateSystem.horizontalClientScaling).toBeCloseTo(1120.37 / 809.043);
  });

  test('verticalClientScaling getter', () => {
    let targetSVGDoc = {
      viewBox: { baseVal: { height: 2027.84 } },
      getBoundingClientRect: () => ({ height: 1382.91 }),
    };

    let coordinateSystem = new CoordinateSystem(targetSVGDoc);

    expect(coordinateSystem.verticalClientScaling).toBeCloseTo(1382.91 / 2027.84);
  });

  test('minClientX getter', () => {
    let targetSVGDoc = { getBoundingClientRect: () => ({ x: -28.4992 }) };

    let coordinateSystem = new CoordinateSystem(targetSVGDoc);

    expect(coordinateSystem.minClientX).toBe(-28.4992);
  });

  test('minClientY getter', () => {
    let targetSVGDoc = { getBoundingClientRect: () => ({ y: 59.832 }) };

    let coordinateSystem = new CoordinateSystem(targetSVGDoc);

    expect(coordinateSystem.minClientY).toBe(59.832);
  });

  test('fromClientX method', () => {
    let targetSVGDoc = {
      viewBox: { baseVal: { width: 2388.72 } },
      getBoundingClientRect: () => ({ x: 328.991, width: 1480.2 }),
    };

    let coordinateSystem = new CoordinateSystem(targetSVGDoc);

    expect(coordinateSystem.fromClientX(-80.3)).toBeCloseTo(((-80.3) - 328.991) / (1480.2 / 2388.72));
  });

  test('fromClientY method', () => {
    let targetSVGDoc = {
      viewBox: { baseVal: { height: 670.1 } },
      getBoundingClientRect: () => ({ y: -203.58, height: 1100.88 }),
    };

    let coordinateSystem = new CoordinateSystem(targetSVGDoc);

    expect(coordinateSystem.fromClientY(18.4)).toBeCloseTo((18.4 - (-203.58)) / (1100.88 / 670.1));
  });

  test('toClientX method', () => {
    let targetSVGDoc = {
      viewBox: { baseVal: { x: -28.18, width: 901.37 } },
      getBoundingClientRect: () => ({ width: 1503.2 }),
    };

    let coordinateSystem = new CoordinateSystem(targetSVGDoc);

    expect(coordinateSystem.toClientX(250.4)).toBeCloseTo((1503.2 / 901.37) * (250.4 - (-28.18)));
  });

  test('toClientY method', () => {
    let targetSVGDoc = {
      viewBox: { baseVal: { y: 82.5, height: 1533 } },
      getBoundingClientRect: () => ({ height: 1204.5 }),
    };

    let coordinateSystem = new CoordinateSystem(targetSVGDoc);

    expect(coordinateSystem.toClientY(-501)).toBeCloseTo((1204.5 / 1533) * ((-501) - 82.5));
  });
});
