const myRegExp = /^[\w$]+$/;

console.log(myRegExp.test('привет')); // false
console.log(myRegExp.test('aba')); // true
console.log(myRegExp.test('12345')); // true
console.log(myRegExp.test('___')); // true
console.log(myRegExp.test('$')); // true
console.log(myRegExp.test('Hello$_54678')); // true
console.log(myRegExp.test('Hello$_54678 Привет')); // false
console.log(myRegExp.test('+')); // false
console.log(myRegExp.test('^')); // false
