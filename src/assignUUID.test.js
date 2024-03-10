import { assignUUID } from './assignUUID';

import { validate as validateUUID } from 'uuid';

test('assignUUID function', () => {
  let id = null;

  let ele = {
    attr: (name, value) => {
      if (name === 'id') {
        id = value;
      }
    },
  };

  assignUUID(ele);

  // assigned some sort of ID
  expect(typeof id).toBe('string');

  // prepends some letters
  expect(id.startsWith('uuid-')).toBeTruthy();

  // assigned a UUID
  expect(validateUUID(id.slice(5))).toBeTruthy();
  expect(id.slice(5).length).toBe(36);
});
