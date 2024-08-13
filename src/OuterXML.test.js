/**
 * @jest-environment jsdom
 */

import { OuterXML } from './OuterXML';

describe('`OuterXML` class', () => {
  test('`toString()` method', () => {
    let targetSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    targetSVGElement.setAttribute('viewBox', '5 -20 544 231');

    targetSVGElement.append(document.createElementNS('http://www.w3.org/2000/svg', 'circle'));
    targetSVGElement.append(document.createElementNS('http://www.w3.org/2000/svg', 'rect'));
    targetSVGElement.append('text');

    let outerXML = new OuterXML(targetSVGElement);

    expect(outerXML.toString()).toBe('<svg viewBox="5 -20 544 231"><circle></circle><rect></rect>text</svg>');
  });

  describe('`set()` method', () => {
    it('sets attributes', () => {
      let targetSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

      targetSVGElement.setAttribute('r', '9');
      targetSVGElement.setAttribute('stroke-width', '2.5');

      let outerXML = new OuterXML(targetSVGElement);
      outerXML.set('<circle r="12" ></circle>');

      expect(targetSVGElement.getAttribute('r')).toBe('12'); // changed
      expect(targetSVGElement.getAttribute('stroke-width')).toBeFalsy(); // removed
    });

    it('sets children and character data', () => {
      let targetSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

      targetSVGElement.append(document.createElementNS('http://www.w3.org/2000/svg', 'rect'));
      targetSVGElement.append('Lots of text.');
      targetSVGElement.append(document.createElementNS('http://www.w3.org/2000/svg', 'circle'));

      let outerXML = new OuterXML(targetSVGElement);
      outerXML.set('<svg><text>Wrapped text.</text><ellipse></ellipse>Unwrapped text.</svg>');

      expect(targetSVGElement.outerHTML).toBe('<svg><text>Wrapped text.</text><ellipse></ellipse>Unwrapped text.</svg>');
    });

    it('throws if the specified outer XML cannot be parsed', () => {
      let targetSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      let outerXML = new OuterXML(targetSVGElement);

      // missing a '>' character
      expect(() => outerXML.set('<rect</rect>')).toThrow();
    });

    it('throws if the specified outer XML does not encode an SVG element', () => {
      let targetSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      let outerXML = new OuterXML(targetSVGElement);

      expect(() => outerXML.set('Some text.')).toThrow();
    });

    it('throws if the specified outer XML encodes multiple DOM nodes', () => {
      let targetSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      let outerXML = new OuterXML(targetSVGElement);

      expect(() => outerXML.set('<rect></rect><rect></rect>')).toThrow();
    });

    it('throws if the specified outer XML encodes an SVG element with a different tag name', () => {
      let targetSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      let outerXML = new OuterXML(targetSVGElement);

      expect(() => outerXML.set('<text></text>')).toThrow();
    });

    /**
     * Extraneous elements might be used for parsing XML
     * (e.g., a container `svg` element added to the document body).
     */
    it('does not leave any extraneous elements behind', () => {
      let targetSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      let outerXML = new OuterXML(targetSVGElement);

      let n = document.body.childNodes.length;

      outerXML.set('<svg>Text content.</svg>');

      expect(document.body.childNodes.length).toBe(n);
    });
  });
});
