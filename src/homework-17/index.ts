import { opt } from './opt';
import { or } from './or';
import { repeat } from './repeat';
import { seq } from './seq';
import { tag } from './tag';
import { take } from './take';

console.log('---------------tag-----------');

const tagIter = tag('function')('function foo() {}');

console.log(tagIter.next()); // {done: true, value: {type: 'TAG', value: 'function'}}

console.log('--------------take-----------');

const takeIterOne = take(/\d/)('1234 foo');

console.log(takeIterOne.next()); // {done: true, value: {type: 'TAKE', value: '1234'}}

const takeIterTwo = take(/\d/, { max: 2 })('1234 foo');

console.log(takeIterTwo.next()); // {done: true, value: {type: 'TAKE', value: '12'}}

console.log('--------------seq-----------');

const seqIter = seq(
  tag('function '),

  take(/[a-z_$]/i, { max: 1 }),
  take(/\w/, { min: 0 }),

  tag('()')
)('function foo() {}');

console.log(seqIter.next()); // {done: true, value: {type: 'SEQ', value: 'function foo()'}}

console.log('--------------or-----------');

const orIter = or(tag('true'), tag('falsetrue'), tag('truefalse'), tag('false'))('false');

console.log(orIter.next()); // {done: true, value: {type: 'OR', value: 'false'}}

console.log('--------------repeat-----------');

const repeatIter = repeat(seq(take(/\d/), tag(',')), { min: 1 })('100,200,300,');

console.log(repeatIter.next()); // { value: { type: 'SEQ', value: '100,' }, done: false }
console.log(repeatIter.next()); // { value: { type: 'SEQ', value: '200,' }, done: false }
console.log(repeatIter.next()); // { value: { type: 'SEQ', value: '300,' }, done: false }
console.log(repeatIter.next()); // { value: [{ type: 'REPEAT', value: '100,200,300,' }, IterableIterator], done: true }
console.log(repeatIter.next()); // { value: undefined, done: true }

console.log('--------------opt-----------');

const repeatIter2 = repeat(seq(take(/\d/), opt(tag(','))), { min: 4 })('100,200,300');

console.log(repeatIter2.next()); // {done: false, value: {type: 'SEQ', value: '100,'}}
console.log(repeatIter2.next()); // {done: false, value: {type: 'SEQ', value: '200,'}}
console.log(repeatIter2.next()); // {done: false, value: {type: 'SEQ', value: '300'}}
console.log(repeatIter2.next()); // { value: [{ type: 'REPEAT', value: '100,200,300' }, IterableIterator], done: true }
