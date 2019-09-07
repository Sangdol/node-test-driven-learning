/**
 * https://sugarjs.com/quickstart/
 * https://sugarjs.com/dates/
 */
import test from 'ava';

const Sugar = require('sugar-date');
Sugar.Date.extend();

// https://sugarjs.com/dates/#/Parsing
test('Valid parsing', (t) => {
  let toDate = (str) => {
    return Date.create(str);
  };

  const today = new Date().format('%d');
  const tomorrow = new Date().addDays(1).format('%d');

  t.is(toDate('19th at 10:12').format('%d %H:%M'), '19 10:12');
  t.is(toDate('tomorrow at 10:12').format('%d %H:%M'), `${tomorrow} 10:12`);
  t.is(toDate('10:12').format('%d %H:%M'), `${today} 10:12`);
  t.is(toDate('tomorrow 10:12').format('%d %H:%M'), `${tomorrow} 10:12`);
});

test('Invalid parsing', (t) => {
  let isInvalid = (str) => {
    t.is(Date.create(str).toString(), 'Invalid Date');
  };

  isInvalid('at 10:00 19th');
  isInvalid('at 10:12');
});
