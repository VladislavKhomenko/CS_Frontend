export const zip = <T>(...iterators: Iterable<T>[]): IterableIterator<T[]> => {
  const iters = Array.from(iterators, (iter) => iter[Symbol.iterator]());

  return {
    [Symbol.iterator](): IterableIterator<T[]> {
      return this;
    },

    next: (): IteratorResult<T[]> => {
      const values = [];

      for (const iter of iters) {
        const { done, value } = iter.next();

        if (done) {
          return { done: true, value: undefined };
        }

        values.push(value);
      }

      return { done: false, value: values };
    },
  };
};
