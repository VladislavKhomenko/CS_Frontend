export async function* every<T>(generator: AsyncGenerator<T>, pred: (value: T) => boolean) {
  for await (const value of generator) {
    if (pred(value)) {
      yield value;
    } else {
      return;
    }
  }
}
