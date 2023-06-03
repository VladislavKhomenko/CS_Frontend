import { enumerate } from './enumerate';
import { filter } from './filter';
import { mapSeq } from './map-seq';
import { random } from './random';
import { Range } from './range';
import { seq } from './seq';
import { take } from './take';
import { zip } from './zip';

console.log('----------random--------');

const randomInt = random(0, 100);

console.log(randomInt.next());
console.log(randomInt.next());
console.log(randomInt.next());
console.log(randomInt.next());

console.log('-----------take---------');

console.log([...take(randomInt, 15)]);

console.log('----------filter--------');

console.log([
  ...take(
    filter(randomInt, (el) => el > 30),
    15
  ),
]);

console.log('----------enumerate--------');

console.log([...take(enumerate(randomInt), 3)]); // [[0, ...], [1, ...], [2, ...]]

console.log('----------range--------');

const symbolRange = new Range('a', 'f');

console.log(Array.from(symbolRange)); // ['a', 'b', 'c', 'd', 'e', 'f']

const numberRange = new Range(-5, 1);

console.log(Array.from(numberRange.reverse())); // [1, 0, -1, -2, -3, -4, -5]

console.log('----------seq--------');

console.log(...seq<any>([1, 2], new Set([3, 4]), 'bla')); // 1, 2, 3, 4, 'b', 'l', 'a'

console.log('----------zip--------');

console.log(...zip<any>([1, 2], new Set([3, 4]), 'bl')); // [[1, 3, b], [2, 4, 'l']]

console.log('----------mapSeq--------');

console.log(...mapSeq([1, 2, 3], [(el) => el * 2, (el) => el - 1])); // [1, 3, 5]
