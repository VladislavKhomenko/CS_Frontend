export const enumerate = <T>(iterator: Iterable<T>): IterableIterator<[number, T]> => {
  let index = 0;
  const innerIterator = iterator[Symbol.iterator]();

  return {
    [Symbol.iterator](): IterableIterator<[number, T]> {
      return this;
    },

    next: (): IteratorResult<[number, T]> => {
      const { value, done } = innerIterator.next();

      if (done) {
        return { done: true, value: undefined };
      }

      return { done: false, value: [index++, value] };
    },
  };
};
