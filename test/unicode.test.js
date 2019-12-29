import test from 'ava';

test('codePointAt() vs. codeCharAt()', (t) => {
  const facepalm = '🤦🏼‍♂️';

  const splitedCodePoints = facepalm.split('').map((v) => v.codePointAt(0).toString(16));

  t.deepEqual(splitedCodePoints, [
    'd83e',
    'dd26',
    'd83c',
    'dffc',
    '200d',
    '2642',
    'fe0f',
  ]);

  const codePoints = []
  for (let i = 0; i < facepalm.length; i++) {
    codePoints.push(facepalm.codePointAt(i).toString(16));
  }

  // WTF?
  t.deepEqual(codePoints, [
    '1f926', // merged
    'dd26', // remained
    '1f3fc', // merged
    'dffc', // remained
    '200d',
    '2642',
    'fe0f',
  ]);

  // The UTF-16 code unit matches the Unicode code point for code points
  // which can be represented in a single UTF-16 code unit.
  // If the Unicode code point cannot be represented in
  // a single UTF-16 code unit (because its value is greater than 0xFFFF)
  // then the code unit returned will be the first part of a surrogate pair
  // for the code point.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
  const codeChars = []
  for (let i = 0; i < facepalm.length; i++) {
    codeChars.push(facepalm.charCodeAt(i).toString(16));
  }

  t.deepEqual(codeChars, splitedCodePoints);
});

test('Emoji length 🤦🏼‍♂️', (t) => {
  const facepalm = '🤦🏼‍♂️';

  t.is(facepalm.length, 7);

  t.deepEqual(facepalm.split('').map((v) => v.codePointAt(0).toString(16)), [
    'd83e',
    'dd26',
    'd83c',
    'dffc',
    '200d',
    '2642',
    'fe0f',
  ]);

  // Merging surrogate pairs - the result is the same as Python's.
  // For some reason, Array.from() merges surrogate pairs.
  t.deepEqual(Array.from(facepalm).map((v) => v.codePointAt(0).toString(16)), [
    '1f926',
    '1f3fc',
    '200d',
    '2642',
    'fe0f',
  ])

  // https://blog.jonnew.com/posts/poo-dot-length-equals-two
  // "In fact, U+FE00 through U+FE0F can all change the appearance of
  // the previous character."
  function fancyCount(str){
    return Array.from(str.split(/[\ufe00-\ufe0f]/).join("")).length;
  }

  t.is(fancyCount(facepalm), 4);

  // This takes care of joiner but doesn't look enough
  // because U+1F3FC (emoji modifier)
  // https://hsivonen.fi/string-leng
  function fancyCount2(str){
    const joiner = "\u{200D}";
    const split = str.split(joiner);
    let count = 0;

    for(const s of split){
      //removing the variation selectors
      const num = Array.from(s.split(/[\ufe00-\ufe0f]/).join("")).length;
      count += num;
    }

    //assuming the joiners are used appropriately
    return count / split.length;
  }

  // this is wrong.
  t.is(fancyCount2(facepalm), 1.5);
});
