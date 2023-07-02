function compose(...functions) {
  return function (args) {
    return functions.reduceRight((acc, cb) => cb(acc), args);
  };
}

const f = compose(
  (a) => a ** 2,
  (a) => a * 10,
  (a) => Math.sqrt(a) // Первая
);

console.log(f(16)); // 1600
