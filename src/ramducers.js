// lets take a stab at this

R.transducers = {

  transduce: function(xform) {
    return function(fn, init, ls) {
      return R.reduce(xform(fn), init, ls);
    };
  },

  map: function t_map(fn) {
    return function(step) {
      return function(acc, x) {
        return step(acc, fn(x));
      };
    };
  },

  filter: function t_filter(pred) {
    return function(step) {
      return function(acc, x) {
        return pred(x) ? step(acc, x) : acc;
      };
    };
  },

  drop: function t_drop(n) {
    return function(step) {
      var count = n;
      return function(acc, x) {
        return count-- > 0 ? acc : step(acc, x); // need `reduced` here?
      };
    };
  },

  dropWhile: function t_dropWhile(pred) {
    return function(step) {
      return function(acc, x) {
        return pred(x) ? acc: step(acc, x); // need `reduced` here?
      };
    };
  },

  take: function t_take(n) {
    return function(step) {
      var count = n;
      return function(acc, x) {
        return count-- > 0 ? step(acc, x) : acc; // need `reduced` here?
      };
    };
  },

  takeWhile: function t_takeWhile(pred) {
    return function(step) {
      return function(acc, x) {
        return pred(x) ? step(acc, x) : acc; // need `reduced` here?
      };
    };
  }


};
