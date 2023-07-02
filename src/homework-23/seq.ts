function seq<T>(...iterators: AsyncIterable<T>[]): AsyncIterableIterator<T> {
  let index = 0;
  let currentIterator = iterators[index][Symbol.asyncIterator]();

  return {
    [Symbol.asyncIterator](): AsyncIterableIterator<T> {
      return this;
    },

    async next(): Promise<IteratorResult<T>> {
      let current = await currentIterator.next();

      if (current.done && index === iterators.length - 1) {
        return new Promise((resolve) => resolve({ done: true, value: current.value }));
      }

      if (current.done) {
        index++;

        if (index < iterators.length) {
          currentIterator = iterators[index][Symbol.asyncIterator]();
          current = await currentIterator.next();
        }
      }

      return current;
    },
  };
}
