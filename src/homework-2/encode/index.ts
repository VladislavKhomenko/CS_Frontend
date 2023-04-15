function encode(data: any[], schema: [number, string][]): ArrayBuffer {
  const bytesLength = schema.reduce((acc, [bits]) => acc + getBytesLength(bits), 0);
  const buffer = new ArrayBuffer(bytesLength);
  const view = new DataView(buffer);
  let offset = 0;

  for (let i = 0; i < data.length; i++) {
    const [bits, type] = schema[i];
    switch (type) {
      case 'number':
        if (typeof data[i] !== 'number') {
          throw new Error('Data does not match type');
        }

        view.setUint8(offset, data[i]);
        break;
      case 'boolean':
        if (typeof data[i] !== 'boolean') {
          throw new Error('Data does not match type');
        }

        view.setUint8(offset, data[i] ? 1 : 0);
        break;
      case 'ascii':
        if (typeof data[i] !== 'string' || data[i].length !== bits / 8) {
          throw new Error('Data does not match type');
        }

        for (let j = 0; j < data[i].length; j++) {
          view.setUint8(offset + j, data[i].charCodeAt(j));
        }
        break;
    }

    offset += getBytesLength(bits);
  }

  return buffer;
}

function decode(buffer: ArrayBuffer, schema: [number, string][]): (string | number | boolean)[] {
  const view = new DataView(buffer);
  let offset = 0;
  const result = [];

  for (const [bits, type] of schema) {
    switch (type) {
      case 'number':
        result.push(view.getUint8(offset));
        break;
      case 'boolean':
        result.push(view.getUint8(offset) === 1);
        break;
      case 'ascii':
        let chars = '';

        for (let i = 0; i < bits / 8; i++) {
          chars += String.fromCharCode(view.getUint8(offset + i));
        }

        result.push(chars);
        break;
    }

    offset += getBytesLength(bits);
  }

  return result;
}

function getBytesLength(bits: number): number {
  return Math.ceil(bits / 8);
}

// Test cases

const schema: [number, string][] = [
  [3, 'number'], // 3 бита число
  [2, 'number'], // 3 бита число
  [1, 'boolean'], // 1 бит логический
  [1, 'boolean'], // 1 бит логический
  [16, 'ascii'], // 16 бит 2 аски символа
];

const encodedData = encode([2, 3, true, false, 'ab'], schema);

console.log(encodedData);

const decodedData = decode(encodedData, schema);

console.log(decodedData);
