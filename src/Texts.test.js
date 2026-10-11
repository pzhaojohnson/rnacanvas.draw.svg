/**
 * @jest-environment jsdom
 */

import { Texts } from './Texts';

describe('`class Texts`', () => {
  test('`toArray()`', () => {
    var targetSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    var texts = new Texts(targetSVG);

    // no text elements
    expect(texts.toArray()).toStrictEqual([]);

    var text1 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    var text2 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    var text3 = document.createElementNS('http://www.w3.org/2000/svg', 'text');

    var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    targetSVG.append(text1, circle, g);
    g.append(text2, text3);

    // includes nested text elements in document order and excludes other elements
    expect(texts.toArray().map(text => text.domNode)).toStrictEqual([text1, text2, text3]);

    text2.remove();

    expect(texts.toArray().map(text => text.domNode)).toStrictEqual([text1, text3]);
  });
});
