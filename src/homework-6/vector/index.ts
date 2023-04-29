import { Type, TypedArray } from '../../shared/models';
import { VectorConfig } from './shared/models';

class Vector {
  #classConstructor: Type<TypedArray>;
  #buffer: TypedArray;
  #capacity: number;
  #length: number = 0;
  #startPointer = 0;
  #endPointer = 0;

  constructor(constructor: Type<TypedArray>, config: VectorConfig) {
    this.#classConstructor = constructor;
    this.#buffer = new constructor(config.capacity);
    this.#capacity = config.capacity || 31;
  }

  get length(): number {
    return this.#length;
  }

  push(...rest: number[]): void {
    this.#resize(rest);

    rest.forEach((value: number) => {
      this.#buffer[this.#endPointer] = value;
      this.#endPointer = (this.#endPointer + 1) % this.#capacity;
      this.#length++;
    });
  }

  pop(): number | bigint | undefined {
    if (!this.#length) return undefined;

    this.#endPointer = (this.#endPointer - 1 + this.#capacity) % this.#capacity;
    const item = this.#buffer[this.#endPointer];
    this.#buffer[this.#endPointer] = 0;
    this.#length--;

    return item;
  }

  shift(): number | bigint | undefined {
    if (!this.#length) return undefined;

    const item = this.#buffer[this.#startPointer];
    this.#buffer[this.#startPointer] = 0;
    this.#startPointer = (this.#startPointer + 1) % this.#capacity;
    this.#length--;

    return item;
  }

  unshift(...rest: number[]): void {
    this.#resize(rest);

    rest.forEach((value: number) => {
      this.#startPointer = (this.#startPointer - 1 + this.#capacity) % this.#capacity;
      this.#buffer[this.#startPointer] = value;
      this.#length++;
    });
  }

  #resize(values: number[]): void {
    if (values.length + this.#length <= this.#capacity) return;

    const capacity = this.#capacity * 2;
    const buffer = new this.#classConstructor(capacity);

    for (let i = 0; i < this.#length; i++) {
      const index = (this.#startPointer + i) % capacity;
      buffer[i] = this.#buffer[index];
    }

    this.#buffer = buffer;
    this.#capacity = capacity;
    this.#startPointer = 0;
    this.#endPointer = this.#length;
  }
}

const uint8Vector = new Vector(Uint8Array, { capacity: 3 });

console.log(uint8Vector.push(100));
console.log(uint8Vector.push(20, 10));
console.log(uint8Vector.push(20, 10));

console.log(uint8Vector.pop()); // 10
console.log(uint8Vector.shift()); // 100

console.log(uint8Vector.unshift(1)); // 4
console.log(uint8Vector.length); // 4
