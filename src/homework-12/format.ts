const format = (string: string, object: Record<string, any>): string => {
  return string.replace(/\${(.*?)}/g, (_, key) => object[key]);
};

const result = format('Hello, ${user}! Your age is ${age}.', { user: 'Bob', age: 10 });

console.log(result); // Hello, Bob! Your age is 10.
