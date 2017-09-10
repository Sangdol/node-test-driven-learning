
import test from 'ava';

/**
 * Spread syntax
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator
 */
test('spread syntax', (t) => {
  const arr1 = [1, 2];
  const arr2 = [...arr1, 3, 4];
  t.is(arr2.reduce((p, n) => p + n), 10);
});
