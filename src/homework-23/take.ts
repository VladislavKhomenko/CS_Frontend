function take<T>(iterator: AsyncIterable<T>, count: number): AsyncIterableIterator<T> {
  let limit = 0;
  const innerIterator = iterator[Symbol.asyncIterator]();

  return {
    [Symbol.asyncIterator](): AsyncIterableIterator<T> {
      return this;
    },

    next: (): Promise<IteratorResult<T>> => {
      if (limit >= count) {
        return new Promise((resolve) => resolve({ done: true, value: undefined }));
      }

      limit++;

      return innerIterator.next();
    },
  };
}
