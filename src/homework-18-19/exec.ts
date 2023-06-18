import { Result } from './result';

export const exec = <T>(generator: () => Generator<T>): Result<T> => {
  const iterator = generator();

  return execHandler();

  function execHandler(data?: T): Result<T> {
    const chunk: IteratorResult<T> = iterator.next(data);

    if (chunk.done) {
      return new Result<T>(() => chunk.value);
    }

    const result = new Result<T>(() => chunk.value);

    return result.then(execHandler).catch((error) => {
      const chunk = iterator.throw(error);

      if (chunk.done) {
        return chunk.value;
      }

      return execHandler(chunk.value);
    });
  }
};

exec(function* main() {
  const res1 = new Result(() => 42);
  console.log(yield res1);

  try {
    const res2 = new Result(() => {
      throw 'Boom!';
    });
  } catch (err) {
    console.error(err);
  }
})
  .then(console.log)
  .catch(console.error);
