/**
 * @jest-environment jsdom
 */

import { bringToFront } from './bringToFront';

describe('bringToFront function', () => {
  it('reappends the target SVG element if it has a parent node', () => {
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    svg.appendChild(text);

    // add some elements to append after
    for (let i = 0; i < 5; i++) {
      svg.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'circle'));
    }

    expect(svg.childNodes[0]).toBe(text);

    bringToFront(text);

    expect(svg.childNodes[5]).toBe(text);
    expect(svg.childNodes.length).toBe(6);
  });

  it('has no effect if the target SVG element has no parent node', () => {
    let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    expect(circle.parentNode).toBeFalsy();

    expect(() => bringToFront(circle)).not.toThrow();
  });
});
