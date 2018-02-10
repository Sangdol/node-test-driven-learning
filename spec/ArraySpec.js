describe('Array', function() {

  it('should shift() remove the first element of an array and return that element', function () {
    var arr = ['a', 'b', 'c'];
    expect(arr.shift()).toBe('a');
    expect(arr).toEqual(['b', 'c']);
  });

  it('should unshift() add an element to an array and return the size', function () {
    var arr = ['a', 'b', 'c'];
    expect(arr.unshift('1')).toBe(4);
    expect(arr).toEqual(['1', 'a' , 'b', 'c']);

    expect(arr.unshift(0, 0)).toBe(6);
    expect(arr).toEqual([0, 0, '1', 'a' , 'b', 'c']);
  });

  it('should slice() convert arguments to array', function () {
    function test() {
      expect(arguments.join).toBeUndefined();
      expect([].slice.call(arguments).join).toBeDefined();
      expect(Array.from(arguments).join).toBeDefined();
    }

    test(1, 2);
  });

  /**
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
   */
  it('should splice() change the contents of an array by removing existing elements', function () {
    const numbers = [0, 1, 7, 3, 4];
    expect(numbers.splice(2, 1, 2)).toEqual([7]);
    expect(numbers).toEqual([0, 1, 2, 3, 4]);
  });

  /**
   * http://stackoverflow.com/questions/8205691/coffeescript-array-vs-new-array
   */
  it('should Array() and new Array() be the same', function() {
    expect(Array(3)).toEqual(new Array(3));
  });

  it('should fill() fill the all elements', function() {
    let LENGTH = 3;
    let arr = Array(LENGTH);

    expect(arr.length).toBe(LENGTH);

    let loopCount = 0;
    arr.forEach((e) => loopCount++);
    expect(loopCount).toBe(0);

    arr.fill(1);
    arr.forEach((e) => {
      loopCount++;
      expect(e).toBe(1);
    });
    expect(loopCount).toBe(LENGTH);
  });

  /**
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys
   */
  it('should keys() return iterator', function() {
    let arr = ['a', 'b'];
    let iterator = arr.keys();

    let first = iterator.next();
    let last = iterator.next();
    expect(first.value).toBe(0);
    expect(first.done).toBe(false);
    expect(last.value).toBe(1);
    expect(last.done).toBe(false);
    expect(iterator.next().done).toBe(true);
  });

  /**
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
   */
  it('reduce()', function() {
    let sum = [1, 2, 3].reduce((prevValue, currValue, currIndex, array) => {
      expect(currValue - 1).toBe(currIndex);
      expect(array.length).toBe(3);

      return prevValue + currValue;
    });

    expect(sum).toBe(6);
  });

  /**
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
   */
  it('forEach()', function() {
    let sum = 0;
    let indexSum = 0;
    [1, 2, 3].forEach(function(element, index, array) {
      sum += element;
      indexSum += index;

      expect(array).toEqual([1, 2, 3]);
    });
    expect(sum).toBe(6);
    expect(indexSum).toBe(3);
  });

  /**
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
   */
  it('includes', function() {
    expect([1, 2, 3].includes(1)).toBe(true);
    expect([1, 2, 3].includes(4)).toBe(false);
    expect([1, 2, 3].includes(undefined)).toBe(false);
  });
});
