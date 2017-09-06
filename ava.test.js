/**
 * Test APIs ava using ava
 * https://github.com/avajs/ava
 *
 * API
 * https://github.com/avajs/ava#api
 *
 */

import test from 'ava';

/*
 * Assertions
 * https://github.com/avajs/ava#assertions
 */
test('Assertions', (t) => {
  t.is(1, 1);
});

/**
 * If you're unable to use promises or observables, you may enable "callback mode" by defining your test with test.cb([title], fn). Tests declared this way must be manually ended with t.end(). However, we would strongly recommend promisifying callback-style APIs instead of using "callback mode", as this results in more correct and readable tests.
 */
test.cb('Callback mode', (t) => {
  t.plan(1);
  setTimeout(() => {
    t.pass();
    t.end();
  }, 1);
});
