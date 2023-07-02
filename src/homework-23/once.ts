import { on } from './on';

export async function* once<T>(emitter: any, event: string): AsyncIterableIterator<T> {
  for await (let result of on<T>(emitter, event)) {
    yield result;

    return;
  }
}
