const text = `
Какой-то текст (10 + 15 - 24) ** 2 
Еще какой-то текст 2 * 10
`;

const calc = (string: string): string => {
  return string.replace(/[(|\d].*[)|\d]/gm, (str) => eval(str));
};

console.log(calc(text));
// Какой - то текст 1
// Еще какой - то текст 20
