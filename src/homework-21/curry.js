function curry(fn) {
  _ = Symbol();

  const arity = fn.length;

  return function curried(...args) {
    const filteredCurrentArgs = getFilteredArgs(args);

    if (arity <= filteredCurrentArgs.length) {
      return fn.call(this, ...filteredCurrentArgs);
    }

    return function (...nextArgs) {
      const filteredNextArgs = getFilteredArgs(nextArgs);

      return curried(...filteredNextArgs, ...args);
    };
  };
}

function getFilteredArgs(args) {
  return args.filter((arg) => arg !== curry._);
}

const diff = curry((a, b, c) => a - b + c);

console.log(diff(curry._, 10)(15)(curry._, curry._, 10)); // 5
