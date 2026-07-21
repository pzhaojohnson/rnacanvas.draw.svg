/**
 * @jest-environment jsdom
 */

import { AbstractPath } from './AbstractPath';

describe('`class AbstractPath`', () => {
  test('`closestPoint()`', () => {
    // a vertical line
    var path = new AbstractPath('M 50 -25 Q 50 -100 50 -200');

    if (!SVGElement.prototype.getPointAtLength) {
      SVGElement.prototype.getPointAtLength = function (length) {
        if (!document.body.contains(this)) {
          throw new Error('This SVG element is not part of the document body.');
        }

        return {
          x: 50,
          y: (-25) - length,
        };
      };
    }

    if (!SVGElement.prototype.getTotalLength) {
      SVGElement.prototype.getTotalLength = function () {
        if (!document.body.contains(this)) {
          throw new Error('This SVG element is not part of the document body.');
        }

        return (-25) - (-200);
      };
    }

    // without specifying precision
    var p = path.closestPoint({ x: 21, y: -54 });

    // assuming a default precision of 5
    expect(p.x).toBeCloseTo(50);
    expect(p.y).toBeCloseTo(-55);
    expect(p.length).toBeCloseTo(30);

    // with precision specified
    var p = path.closestPoint({ x: 21, y: -54 }, { precision: 20 });

    expect(p.x).toBeCloseTo(50);
    expect(p.y).toBeCloseTo(-45);
    expect(p.length).toBeCloseTo(20);

    // re-adds SVG container to document body if necessary
    var svgContainer = document.body.childNodes[document.body.childNodes.length - 1];

    svgContainer.remove();
    expect(document.body.contains(svgContainer)).toBeFalsy();

    var n = document.body.childNodes.length;

    var p = path.closestPoint({ x: 53, y: -141 });

    expect(document.body.childNodes.length).toBe(n + 1);
    expect(document.body.contains(svgContainer)).toBeTruthy();

    expect(p.x).toBeCloseTo(50);
    expect(p.y).toBeCloseTo(-140);
    expect(p.length).toBeCloseTo(115);
  });
});
