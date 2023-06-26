Function.prototype.map = function (fn) {
  const originalFunction = this;

  return function () {
    const result = originalFunction.call(this, fn());

    return result;
  };
};

console.log(((v) => v * 10).map(() => 42)()); // 420
