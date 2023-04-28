import { Matrix2DConfig, Matrix3DConfig } from './models';

class Matrix2D<T extends Matrix2DConfig> {
  protected buffer: number[];
  protected width: number;
  protected height: number;

  constructor(config: T) {
    this.buffer = this.#initBuffer(config);
    this.width = config.x;
    this.height = config.y;
  }

  set(config: T, value: number) {
    this.buffer[this.getIndex(config)] = value;
  }

  get(config: T) {
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

const matrix2D = new Matrix2D({ x: 10, y: 10 });

matrix2D.set({ x: 1, y: 3 }, 10);
console.log(matrix2D.get({ x: 1, y: 3 })); // 10

class Matrix3D extends Matrix2D<Matrix3DConfig> {
  constructor(config: Matrix3DConfig) {
    super(config);
  }

  protected getIndex({ x, y, z }: Matrix3DConfig): number {
    return z * this.width * this.height + y * this.width + x;
  }
}

const matrix = new Matrix3D({ x: 10, y: 10, z: 10 });

matrix.set({ x: 1, y: 3, z: 2 }, 20);
console.log(matrix.get({ x: 1, y: 3, z: 2 })); // 20
