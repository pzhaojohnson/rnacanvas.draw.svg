/**
 * @jest-environment jsdom
 */

import { InnerXML } from './InnerXML';

describe('`InnerXML` class', () => {
  test('`toString()` method', () => {
    let targetSVGDoc = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    targetSVGDoc.textContent = 'A complicated SVG image - 174681274821.';

    let innerXML = new InnerXML(targetSVGDoc);
    expect(innerXML.toString()).toBe('A complicated SVG image - 174681274821.');
  });

  test('`set()` method', () => {
    let targetSVGDoc = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    expect(targetSVGDoc.innerHTML).toBe('');

    let innerXML = new InnerXML(targetSVGDoc);
    innerXML.set('A unique SVG image - 8317492874918274.');

    expect(targetSVGDoc.innerHTML).toBe('A unique SVG image - 8317492874918274.');
  });
});
