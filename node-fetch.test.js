/**
 * node-fetch 1.x test
 * https://github.com/bitinn/node-fetch/blob/1.x/README.md
 */

import test from 'ava';

const fetch = require('node-fetch');

test('get test', (t) => {
  const headers = {
    Authorization: `Bearer abc`,
  };
  return fetch('http://httpbin.org/get', { headers })
    .then(function(res) {
      return res.json();
    }).then(function(json) {
      t.is(json.headers.Authorization, `Bearer abc`);
    });
});
