function recursiveCollapse(obj: any, key?: string): Record<string, unknown> {
  if (typeof obj !== 'object' || obj === null) {
    return { [key!]: obj };
  }

  const toCollapsedObject = (
    collapsedObject: Record<string, unknown>,
    currentKey: string
  ): Record<string, unknown> => {
    const collapsedKey = key !== undefined ? `${key}.${currentKey}` : currentKey;
    const value = obj[currentKey];
    const collapsed = recursiveCollapse(value, collapsedKey);

    return { ...collapsedObject, ...collapsed };
  };

  return Object.keys(obj).reduce(toCollapsedObject, {});
}

const obj = {
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
console.log(recursiveCollapse(obj));
