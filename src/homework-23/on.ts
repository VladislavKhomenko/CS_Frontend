export function on<T>(emitter: any, event: string): AsyncIterableIterator<T> {
  const queue: T[] = [];
  let isDone = false;
  const handlers: Set<Function> = new Set();

  const handler = (value: T) => {
    if (!handlers.size) {
      queue.push(value);
    } else {
      handlers.forEach((handler) => {
        handler(value);
      });

      handlers.clear();
    }
  };

  emitter.on(event, handler);

  return {
    [Symbol.asyncIterator](): AsyncIterableIterator<T> {
      return this;
    },

    return() {
      isDone = true;
      emitter.off(event, handler);
      return Promise.resolve({ done: isDone, value: undefined });
    },

    next(): Promise<IteratorResult<T>> {
      return new Promise<IteratorResult<T>>((resolve) => {
        if (isDone) {
          resolve({ done: isDone, value: undefined });

          return;
        }

        if (queue.length) {
          resolve({ done: isDone, value: queue.shift()! });
        } else {
          handlers.add((value: T) => {
            resolve({ done: isDone, value });
          });
        }
      });
    },
  };
}
