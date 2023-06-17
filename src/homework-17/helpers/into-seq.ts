import { intoIter } from './into-Iter';

export function* intoSeq<T>(...iterables: Iterable<T>[]): IterableIterator<T> {
  for (const iterable of iterables) {
    yield* intoIter(iterable);
  }
}
