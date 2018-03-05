import test from 'ava'

const vm = require('vm');

test('when typeof object is not instanceof object', (t) => {
  // node vm https://nodejs.org/api/vm.html
  t.true(vm.runInNewContext('typeof a === \'object\'', {a: {}}));

  t.false(vm.runInNewContext('a instanceof Object', {a: {}}));
  t.true(vm.runInNewContext('a instanceof Object', {a: {}, Object}));
});
