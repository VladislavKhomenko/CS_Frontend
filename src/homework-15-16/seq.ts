export const seq = <T>(...iterators: Iterable<T>[]): IterableIterator<T> => {
  let index = 0;
  let currentIterator = iterators[index][Symbol.iterator]();

  return {
    [Symbol.iterator](): IterableIterator<T> {
      return this;
    },

    next: (): IteratorResult<T> => {
      let current = currentIterator.next();

      if (current.done && index === iterators.length - 1) {
        return { done: true, value: undefined };
      }

      if (current.done) {
        index++;

        if (index < iterators.length) {
          currentIterator = iterators[index][Symbol.iterator]();
          current = currentIterator.next();
        }
      }

      return current;
    },
  };
};
