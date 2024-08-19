/**
 * @jest-environment jsdom
 */

import { InnerXML } from './InnerXML';

describe('`InnerXML` class', () => {
  test('`toString()` method', () => {
    let targetSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    targetSVGElement.textContent = 'A complicated SVG image - 174681274821.';

    let innerXML = new InnerXML(targetSVGElement);
    expect(innerXML.toString()).toBe('A complicated SVG image - 174681274821.');
  });

  test('`set()` method', () => {
    let targetSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    expect(targetSVGElement.innerHTML).toBe('');

    let innerXML = new InnerXML(targetSVGElement);
    innerXML.set('A unique SVG image - 8317492874918274.');

    expect(targetSVGElement.innerHTML).toBe('A unique SVG image - 8317492874918274.');
  });
});
