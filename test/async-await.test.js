/**
 * async function
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction
 */

import test from 'ava';

function resolveAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 200);
  });
}

test('parallel await', (t) => {
  async function add1(x) {
    var a = resolveAfter2Seconds(20);
    var b = resolveAfter2Seconds(30);
    return x + await a + await b;
  }

  return add1(10).then(v => {
    // prints 60 after 200 milliseconds.
    t.is(v, 60);
  });
});

test('seqeuntial await', (t) => {
  async function add2(x) {
    var a = await resolveAfter2Seconds(20);
    var b = await resolveAfter2Seconds(30);
    return x + a + b;
  }

  return add2(10).then(v => {
    // prints 60 after 400 milliseconds.
    t.is(v, 60);
  });
});

test('async test function', async (t) => {
  const v = await resolveAfter2Seconds(20);
  t.is(v, 20);
});
