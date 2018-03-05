import test from 'ava'

const cycle = require('cycle');

test('decycle', (t) => {
  var obj = {
    a: "foo",
  };
  obj.b = obj;

  t.is(JSON.stringify(cycle.decycle(obj)), '{"a":"foo","b":{"$ref":"$"}}');
});
