import { Nullable } from '../shared/models';

export class Result<T> {
  #state: 'Ok' | 'Err' = 'Ok';
  #error: unknown;
  #data: Nullable<T> = null;

  constructor(cb: () => T, unpack = true) {
    const data = cb();

    try {
      if (unpack && data instanceof Result) {
        data.then(this.#setData.bind(this)).catch(this.#setError.bind(this));
      } else {
        this.#setData(data);
      }
    } catch (error) {
      this.#setError(error);
    }
  }

  #setData(data: T): void {
    this.#data = data;
    this.#state = 'Ok';
  }

  #setError(error: unknown): void {
    this.#error = error;
    this.#state = 'Err';
  }

  unwrap(): T | unknown {
    if (this.#state === 'Err') {
      return this.#error;
    }

    return this.#data;
  }

  then<R>(cb: (value: T) => R): Result<T | R> {
    if (this.#state === 'Ok') {
      return new Result(() => cb(this.#data!));
    }

    return this;
  }

  catch<R>(cb: (error: unknown) => R): Result<T | R> {
    if (this.#state === 'Err') {
      return new Result(() => cb(this.#error!));
    }

    return this;
  }

  map<R>(cb: (value: T) => R): Result<T | R> {
    if (this.#state === 'Ok') {
      return new Result(() => cb(this.#data!), false);
    }

    return this;
  }

  flatMap<R>(cb: (value: T) => R): Result<T | R> {
    if (this.#state === 'Ok') {
      return new Result(() => cb(this.#data!));
    }

    return this;
  }
}

const res1 = new Result(() => 42);

res1.then((data) => {
  console.log('res1', data);
});

const res2 = new Result(() => {
  throw 'Boom!';
});

res2
  .then((data) => {
    // Этот callback не вызовется
    console.log(data);
  })
  .catch(console.log);
