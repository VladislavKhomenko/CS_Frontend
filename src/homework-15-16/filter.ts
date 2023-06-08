export const filter = <T>(
  iterator: Iterable<T>,
  pred: (value: T) => boolean
): IterableIterator<T> => {
  const innerIterator = iterator[Symbol.iterator]();

  return {
    [Symbol.iterator](): IterableIterator<T> {
      return this;
    },

    next: (): IteratorResult<T> => {
      let chunk = innerIterator.next();

      while (true) {
        if (pred(chunk.value) || chunk.done) {
          return chunk;
        }

        chunk = innerIterator.next();
      }
    },
  };
};
