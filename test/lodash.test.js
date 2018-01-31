import test from 'ava'

const _ = require('lodash');

test('chain: filter after take', (t) => {
  let evens = _.chain([1, 2, 3, 4]).take(1).filter(n => n % 2 === 0).value();
  t.deepEqual(evens, []);

  evens = _.chain([1, 2, 3, 4]).filter(n => n % 2 === 0).take(1).value();
  t.deepEqual(evens, [2]);
});
