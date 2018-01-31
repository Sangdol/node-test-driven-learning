import test from 'ava'

const axios = require('axios');


test('catch return value can be plain or promised', async (t) => {
  let res = await axios.get('something wrong', { timeout: 10 })
    .catch((error) => {
      return [1];
    });

  t.deepEqual(res, [1]);

  res = await axios.get('something wrong', { timeout: 10 })
    .catch((error) => {
      return new Promise((resolve) => { resolve([1]) });
    });

  t.deepEqual(res, [1]);
});
