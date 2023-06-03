export const take = <T>(iterator: Iterable<T>, count: number): IterableIterator<T> => {
  let limit = 0;
  const innerIterator = iterator[Symbol.iterator]();

  return {
    [Symbol.iterator](): IterableIterator<T> {
      return this;
    },

    next: (): IteratorResult<T> => {
      if (limit >= count) {
        return { done: true, value: undefined };
      }

      limit++;

      return innerIterator.next();
    },
  };
};
