export class Range<T extends string | number> implements Iterable<T> {
  #start: number;
  #end: number;
  #isNumericRange: boolean;

  constructor(start: T, end: T) {
    this.#isNumericRange = this.#isString(start);
    this.#start = this.#normalizeValue(start);
    this.#end = this.#normalizeValue(end);
  }

  #isString(value: unknown): value is string {
    return typeof value === 'string';
  }

  #normalizeValue(value: T): number {
    return this.#isString(value) ? value.charCodeAt(0) : value;
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this;
  }

  next(): IteratorResult<T> {
    if (this.#start > this.#end) {
      return { done: true, value: undefined };
    }

    const value = this.#isNumericRange ? String.fromCharCode(this.#start) : this.#start;
    const result = { done: false, value: value as T };

    this.#start++;

    return result;
  }

  reverse(): IterableIterator<T> {
    const array = Array.from(this);
    let index = array.length - 1;

    return {
      [Symbol.iterator](): IterableIterator<T> {
        return this;
      },

      next: (): IteratorResult<T> => {
        if (index >= 0) {
          return { done: false, value: array[index--] };
        }

        return { done: true, value: undefined };
      },
    };
  }
}
