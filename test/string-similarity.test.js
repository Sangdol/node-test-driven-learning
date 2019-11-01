/**
 * https://github.com/aceakash/string-similarity
 */
import test from 'ava';

const stringSimilarity = require('string-similarity');

test('compareTwoStrings test', (t) => {
  t.is(stringSimilarity.compareTwoStrings('a', 'A'), 1);
  t.is(stringSimilarity.compareTwoStrings('A', 'A'), 1);
  t.is(stringSimilarity.compareTwoStrings('A', 'Ä'), 0);
  t.is(stringSimilarity.compareTwoStrings('Anzüge', 'Anzug'), 0.4444444444444444);
  t.is(stringSimilarity.compareTwoStrings('BHs', 'BH'), 0.6666666666666666);
  t.is(stringSimilarity.compareTwoStrings('Hüte', 'Hut'), 0);
  t.is(stringSimilarity.compareTwoStrings('Hute', 'Hut'), 0.8);
});

test('bestMatch test', (t) => {
  const categories = ['Armbänder', 'Ausrüstung', 'Anzüge'];
  t.is(stringSimilarity.findBestMatch('armband', categories).bestMatch.target, 'Armbänder');
  t.is(stringSimilarity.findBestMatch('anzug', categories).bestMatch.target, 'Anzüge');
});
