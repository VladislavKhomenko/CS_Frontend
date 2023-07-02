export function any<T>(...streams: AsyncGenerator<T>[]): AsyncIterableIterator<T> {
  let isDone = false;

  return {
    [Symbol.asyncIterator](): AsyncIterableIterator<T> {
      return this;
    },

    return() {
      isDone = true;

      streams.forEach((stream) => {
        stream.return(undefined);
      });

      return Promise.resolve({ done: isDone, value: undefined });
    },

    next(): Promise<IteratorResult<T>> {
      return new Promise<IteratorResult<T>>((resolve) => {
        if (isDone) {
          resolve({ done: isDone, value: undefined });

          return;
        }

        return Promise.any(streams.map((stream) => stream.next())).then(resolve);
      });
    },
  };
}
