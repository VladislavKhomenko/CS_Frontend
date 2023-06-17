import { intoIter } from './helpers/into-Iter';
import { Parser, ParserResult, ParserToken } from './models/parser.model';

export const tag = (str: string): Parser => {
  return function* (
    iterable: Iterable<string>
  ): Generator<ParserToken, ParserResult, Iterable<string>> {
    const innerIterator = intoIter(iterable);
    let result = '';

    for (const char of str) {
      const { done, value } = innerIterator.next();

      if (done || value !== char) {
        throw new Error('Invalid string');
      }

      result += char;
    }

    return [{ type: 'TAG', value: result }, innerIterator];
  };
};
