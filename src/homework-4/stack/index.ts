import { Nullable } from '../../shared/models';
import { Type } from './models/type.model';
import { TypedArray } from './models/typed-array.model';

class Stack {
  private array: TypedArray;
  private length = 0;

  constructor(classConstructor: Type<TypedArray>, readonly size: number) {
    this.array = new classConstructor(size);
  }

  get isEmpty(): boolean {
    return !this.length;
  }

  get head(): Nullable<number | bigint> {
    return this.array[this.length - 1] || null;
  }

  push(value: number): void {
    if (this.length >= this.size) throw new Error('Stack overflow');

    this.array[this.length++] = value;
  }

  pop(): number | bigint {
    if (!this.length) throw new Error('Stack underflow');

    return this.array[--this.length];
  }
}

const stack = new Stack(Int32Array, 10);

stack.push(10);
stack.push(11);
stack.push(12);

console.log(stack.head); // 12

console.log(stack.pop()); // 12

console.log(stack.head); // 11

console.log(stack.pop()); // 11
console.log(stack.pop()); // 10
console.log(stack.isEmpty); // true
console.log(stack.pop()); // Exception
