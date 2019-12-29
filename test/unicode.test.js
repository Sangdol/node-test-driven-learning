import test from 'ava';

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
  t.deepEqual(Array.from(facepalm.split("").join("")).map((v) => v.codePointAt(0).toString(16)), [
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
