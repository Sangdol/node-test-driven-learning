/**
 * https://github.com/philbooth/check-types.js
 */
import test from 'ava';

const checkTypes = require('check-types');

test('null, undefined, and assigned', (t) => {
  t.true(checkTypes.null(null));
  t.false(checkTypes.null(undefined));
  t.false(checkTypes.undefined(null));

  t.true(checkTypes.not.null(undefined));
  t.true(checkTypes.not.undefined(null));

  t.true(checkTypes.not.assigned(undefined));
  t.true(checkTypes.not.assigned(null));
});
