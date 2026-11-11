/**
 * @jest-environment jsdom
 */

import { shift } from './shift';

import { SVG } from './SVG';
import { Text } from './Text';
import { Line } from './Line';
import { Circle } from './Circle';
import { Ellipse } from './Ellipse';
import { Rect } from './Rect';
import { Polyline } from './Polyline';
import { Polygon } from './Polygon';
import { Path } from './Path';
import { Image } from './Image';
import { Use } from './Use';
import { ForeignObject } from './ForeignObject';

test('shift()', () => {
  // delegates to wrapper classes
  [
    ['svg', SVG],
    ['text', Text],
    ['line', Line],
    ['circle', Circle],
    ['ellipse', Ellipse],
    ['rect', Rect],
    ['polyline', Polyline],
    ['polygon', Polygon],
    ['path', Path],
    ['image', Image],
    ['use', Use],
    ['foreignObject', ForeignObject],
  ].forEach(([tagName, Wrapper]) => {
    let spy = jest.spyOn(Wrapper.prototype, 'shift').mockImplementation(() => {});

    let ele = document.createElementNS('http://www.w3.org/2000/svg', tagName);

    shift(ele, { x: 3, y: -4 });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(3, -4);
    expect(spy.mock.contexts[0].domNode).toBe(ele);

    spy.mockRestore();
  });

  // recursively shifts immediate children of g elements
  {
    let circleSpy = jest.spyOn(Circle.prototype, 'shift').mockImplementation(() => {});

    let g = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    let inner = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    let c1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    let c2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    inner.appendChild(c1);
    g.appendChild(inner);
    g.appendChild(c2);

    shift(g, { x: 5, y: 6 });

    expect(circleSpy.mock.contexts.map(c => c.domNode)).toEqual([c1, c2]);

    circleSpy.mockRestore();
  }

  {
    let error = jest.spyOn(console, 'error').mockImplementation(() => {});

    // does nothing for unrendered elements
    ['defs', 'title', 'desc', 'metadata', 'style', 'linearGradient', 'clipPath'].forEach(tagName => {
      expect(() => shift(document.createElementNS('http://www.w3.org/2000/svg', tagName), { x: 1, y: 1 })).not.toThrow();
    });

    expect(error).not.toHaveBeenCalled();

    // emits a console error without throwing for unrecognized elements
    expect(() => shift(document.createElementNS('http://www.w3.org/2000/svg', 'blah'), { x: 1, y: 1 })).not.toThrow();

    expect(error).toHaveBeenCalledTimes(1);

    error.mockRestore();
  }
});
