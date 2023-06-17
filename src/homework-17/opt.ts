import { intoIter } from './helpers/into-Iter';
import { Parser, ParserResult, ParserToken } from './models/parser.model';

export const opt = (parser: Parser): Parser => {
  return function* (
    iterable: Iterable<string>
  ): Generator<ParserToken, ParserResult, Iterable<string>> {
    let innerIterator = intoIter(iterable);

    try {
      const { value } = parser(innerIterator).next();
      const [token, iterator] = value as ParserResult;

      return [{ type: 'OPT', value: token.value }, iterator];
    } catch (error) {
      return [{ type: 'OPT', value: '' }, innerIterator];
    }
  };
};
