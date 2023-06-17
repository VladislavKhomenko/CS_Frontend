import { intoIter } from './helpers/into-Iter';
import { Parser, ParserParams, ParserResult, ParserToken } from './models/parser.model';

export const repeat = (parser: Parser, params: Partial<ParserParams>): Parser => {
  return function* (
    iterable: Iterable<string>
  ): Generator<ParserToken, ParserResult, Iterable<string>> {
    let innerIterator = intoIter(iterable);
    let { min = 0, max = Infinity } = params || {};
    let result = '';
    let iter = null;

    try {
      while (max) {
        const { value } = parser(innerIterator).next();
        const [token, iterator] = value as ParserResult;
        iter = iterator;
        result += token.value;

        yield token;

        min--;
        max--;
      }
    } catch (error) {
      return [{ type: 'REPEAT', value: result }, iter!];
    }

    if (min) {
      throw new Error('Invalid string');
    }

    return [{ type: 'REPEAT', value: result }, iter!];
  };
};
