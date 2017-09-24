const _ = require('lodash');
/**
 * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
 * http://www.html5rocks.com/en/tutorials/es6/promises/
 */
describe('simple promise', function() {
  let result;

  beforeEach(function(done) {
    let p = new Promise(function(resolve) {
      let count = 0;
      setTimeout(function() {
        resolve(count++);
      }, Math.random() * 100 + 100);
    });

    p.then(function(count) {
      return count;
    }).then(function(count) {
      result = count + 1;
      done();
    });
  });

  it('should set result to 1', function(done) {
    expect(result).toBe(1);
    done();
  });
});

describe('Promise parallelism and sequence', function() {
  let getCount = function(order) {
    return new Promise(function(resolve) {
      let start = new Date;

      setTimeout(function() {
        resolve([order, start.getTime()]);
      }, 100);
    })
  };

  it('should promise chain start sequentially', function(done) {
    let prevOrder;
    let prevStart;
    _.range(1, 4).reduce(function(sequence, order) {
      return sequence.then(function() {
        return getCount(order);
      }).then(function(arr) {
        let order = arr[0];
        let start = arr[1];

        if (order > 1) {
          expect(order - prevOrder).toBe(1);
          expect(start - prevStart).toBeGreaterThan(99);
        }

        prevOrder = order;
        prevStart = start;
      });
    }, Promise.resolve()).then(function() {
      done();
    });
  });

  it('should all() start in parallel', function(done) {
    let prevOrder;
    let prevStart;

    Promise.all(_.range(1, 4).map(getCount)).then(function(arr) {
      arr.forEach(function(e) {
        let order = e[0];
        let start = e[1];

        if (order > 1) {
          expect(order - prevOrder).toBe(1);
          expect(start - prevStart).toBeLessThan(100);
        }

        prevOrder = order;
        prevStart = start;
      });
    }).then(function() {
      done();
    });
  });

  it('should promise chain returning promise start in parallel', function(done) {
    let prevOrder;
    let prevStart;

    _.range(1, 4).map(getCount).reduce(function(sequence, getCountPromise) {
      return sequence.then(function() {
        return getCountPromise;
      }).then(function(arr) {
        let order = arr[0];
        let start = arr[1];

        if (order > 1) {
          expect(order - prevOrder).toBe(1);
          expect(start - prevStart).toBeLessThan(100);
        }

        prevOrder = order;
        prevStart = start;
      });
    }, Promise.resolve()).then(function() {
      done();
    });
  });

  it('should resolve() not take more than one arguments', function() {
    let p = new Promise(function(resolve) {
      resolve(1, 2);
    });

    p.then(function(a, b) {
      expect(a).toBe(1);
      expect(b).toBe(undefined);
    });
  });
});