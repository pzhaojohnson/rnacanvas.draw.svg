/**
 * @jest-environment jsdom
 */

import { sendToBack } from './sendToBack';

describe('sendToBack function', () => {
  it('makes the target SVG element the first child of its parent node', () => {
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    // add some elements to prepend before
    for (let i = 0; i < 5; i++) {
      svg.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'text'));
    }

    let ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    svg.appendChild(ellipse);

    expect(svg.childNodes[5]).toBe(ellipse);

    sendToBack(ellipse);

    expect(svg.childNodes[0]).toBe(ellipse);
  });

  it('has no effect when the target SVG element has no parent node', () => {
    let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    expect(circle.parentNode).toBeFalsy();

    expect(() => sendToBack(circle)).not.toThrow();
  });
});
