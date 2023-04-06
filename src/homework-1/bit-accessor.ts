export class BitAccessor {
  constructor(private readonly bytes: Uint8Array) {}

  public get(byteIndex: number, bitIndex: number): number {
    this.validate(byteIndex, bitIndex);

    const byte = this.bytes[byteIndex];
    const mask = 1 << bitIndex;
    const maskedByte = byte & mask;

    return maskedByte ? 1 : 0;
  }

  public set(byteIndex: number, bitIndex: number, value: number): void {
    this.validate(byteIndex, bitIndex, value);

    const byte = this.bytes[byteIndex];
    const mask = 1 << bitIndex;
    const newValue = value === 1 ? byte | mask : byte & ~mask;

    this.bytes[byteIndex] = newValue;
  }

  private validate(byteIndex: number, bitIndex: number, value?: number): void {
    if (!this.bytes || this.bytes.length === 0) {
      throw new Error('Invalid byte array.');
    }

    if (byteIndex < 0 || byteIndex >= this.bytes.length) {
      throw new Error('Invalid byte index.');
    }

    if (bitIndex < 0 || bitIndex >= 8) {
      throw new Error('Invalid bit index.');
    }

    if (Number.isFinite(value) && value !== 0 && value !== 1) {
      throw new Error('Value must be 0 or 1.');
    }
  }
}

const bitAccessor = new BitAccessor(new Uint8Array([0b1110, 0b1101]));

console.log(bitAccessor.get(0, 1)); // 1
console.log(bitAccessor.get(1, 1)); // 0

console.log(bitAccessor.set(0, 1, 1)); //
console.log(bitAccessor.get(0, 1)); // 0
