import { intoIter } from './into-Iter';

export function* intoBuffer<T>(iterable: Iterable<T>, buffer: T[]): IterableIterator<T> {
  for (const item of intoIter(iterable)) {
    buffer.push(item);

    yield item;
  }
}
