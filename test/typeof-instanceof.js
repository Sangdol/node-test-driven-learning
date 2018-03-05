import test from 'ava'

/**
 * instanceof
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof
 */
const vm = require('vm');

/**
 * https://github.com/nodejs/node-v0.x-archive/issues/1277
 */
test('instanceof does not work in multiple context', (t) => {
  // node vm https://nodejs.org/api/vm.html
  t.true(vm.runInNewContext('typeof a === \'object\'', {a: {}}));

  t.false(vm.runInNewContext('a instanceof Object', {a: {}}));
  t.true(vm.runInNewContext('a instanceof Object', {a: {}, Object}));
});

/**
 * http://2ality.com/2012/08/instanceof-object.html
 */
test('intanceof checks prototype chain', (t) => {
  let obj = Object.create(null);

  t.is(typeof obj, 'object');
  t.false(obj instanceof Object);
  t.false(Object.isPrototypeOf(obj));

  obj = {};
  t.true(obj instanceof Object);
  t.true(Object.prototype.isPrototypeOf(obj));
});
