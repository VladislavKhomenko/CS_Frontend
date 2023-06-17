export const intoIter = <T>(iterable: Iterable<T>): IterableIterator<T> => {
  const iter = iterable[Symbol.iterator]();

  return {
    [Symbol.iterator](): IterableIterator<T> {
      return this;
    },

    next: (): IteratorResult<T> => {
      return iter.next();
    },
  };
};
