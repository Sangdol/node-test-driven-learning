/**
 * https://github.com/sindresorhus/run-jxa
 */
import test from 'ava';

const runJxa = require('run-jxa');

test.cb('Basic usage', (t) => {
  t.plan(1);
  (async () => {
    const result = await runJxa((unicorn, horse) => {
      // This is run in the JXA engine
      return `I love ${unicorn} & ${horse}`;
    }, ['🦄', '🐴']);

    t.is(result, 'I love 🦄 & 🐴');
    t.end();
  })();
});

test.cb('Date', (t) => {
  t.plan(1);
  (async () => {
    const result = await runJxa((d) => {
      // The date type needs to be converted to avoid an exception
      // when it's used inside the JXA context.
      // Don't know if there's any documentation about it.
      return new Date(d)
    }, [new Date(2019, 8, 7)]);

    // This will work only in Germany timezone.
    t.is(result, '2019-09-06T22:00:00.000Z',
      'This will work only in Germany timezone.');
    t.end();
  })();
});