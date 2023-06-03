export const mapSeq = <T>(
  iterator: Iterable<T>,
  mappers: Iterable<(value: T) => T>
): IterableIterator<T> => {
  const currentIterator = iterator[Symbol.iterator]();

  return {
    [Symbol.iterator](): IterableIterator<T> {
      return this;
    },

    next: (): IteratorResult<T> => {
      let { done, value } = currentIterator.next();

      if (done) {
        return { done: true, value: undefined };
      }

      const transformedValue = Array.from(mappers).reduce((acc, mapper) => mapper(acc), value);

      return { done: false, value: transformedValue };
    },
  };
};
