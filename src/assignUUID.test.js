/**
 * @jest-environment jsdom
 */

import { assignUUID } from './assignUUID';

import * as SVG from '@svgdotjs/svg.js';

import { validate as validateUUID } from 'uuid';

test('assignUUID function', () => {
  let ele = (new SVG.Text()).node;
  expect(ele.getAttribute('id')).toBeFalsy();

  assignUUID(ele);

  // assigned some sort of ID
  expect(ele.getAttribute('id')).toBeTruthy();
  expect(typeof ele.getAttribute('id')).toBe('string');

  // prepends some letters
  expect(ele.id.startsWith('uuid-')).toBeTruthy();

  // assigned a UUID
  expect(validateUUID(ele.id.slice(5))).toBeTruthy();
  expect(ele.id.slice(5).length).toBe(36);
});
