import { Matrix2DConfig } from '../models';

export class Matrix2D<T extends Matrix2DConfig = Matrix2DConfig> {
  protected _buffer: number[];
  protected _width: number;
  protected _height: number;

  constructor(config: T) {
    this._buffer = this.#initBuffer(config);
    this._width = config.x;
    this._height = config.y;
  }

  get buffer(): number[] {
    return this._buffer;
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  set(config: T, value: number): void {
    this.buffer[this.getIndex(config)] = value;
  }

  get(config: T): number {
    return this.buffer[this.getIndex(config)];
  }

  #initBuffer(config: T): number[] {
    const capacity = Object.values(config).reduce((capacity, value) => capacity * value);

    return new Array(capacity).fill(0);
  }

  protected getIndex({ x, y }: T): number {
    return x * this.width + y;
  }
}
