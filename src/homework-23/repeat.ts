export async function* every<T>(generator: AsyncGenerator<T>) {
  while (true) {
    for await (const value of generator) {
      yield value;
    }
  }
}
