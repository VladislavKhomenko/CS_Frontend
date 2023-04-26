function stackBasedCollapse(obj: any): Record<string, any> {
  const stack: [Record<string, any>, string?][] = [[obj]];
  const result: Record<string, any> = {};

  while (stack.length) {
    const [value, key] = stack.pop()!;

    if (typeof value !== 'object' || value === null) {
      result[key!] = value;

      continue;
    }

    const keys = Object.keys(value);

    for (let i = keys.length - 1; i >= 0; i--) {
      const currentKey = keys[i];
      const compressedKey = key !== undefined ? `${key}.${currentKey}` : currentKey;

      stack.push([value[currentKey], compressedKey]);
    }
  }

  return result;
}

const object = {
  a: {
    b: [1, 2],
    f: [
      [3, 4],
      [5, 6],
    ],
    '': { c: 2, d: { e: 3 } },
  },
};

// {
//     'a.b.0': 1,
//     'a.b.1': 2,
//     'a.f.0.0': 3,
//     'a.f.0.1': 4,
//     'a.f.1.0': 5,
//     'a.f.1.1': 6,
//     'a..c': 2,
//     'a..d.e': 3
// }
console.log(stackBasedCollapse(object));
