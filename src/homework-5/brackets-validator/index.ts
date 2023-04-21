function isValid(text: string): boolean {
  const stack: string[] = [];
  const openingBrackets: Set<string> = new Set(['(', '{', '[']);
  const matchingBrackets: Record<string, string> = {
    '}': '{',
    ']': '[',
    ')': '(',
  };

  for (const char of text) {
    if (openingBrackets.has(char)) {
      stack.push(char);
    }

    if (matchingBrackets[char]) {
      const bracket = stack.pop();

      if (bracket !== matchingBrackets[char]) return false;
    }
  }

  return !stack.length;
}

console.log(isValid('(hello{world} and [me])')); // true
console.log(isValid('(hello{world)} and [me])')); // false
console.log(isValid(')')); // false
