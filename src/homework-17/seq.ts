import { intoIter } from './helpers/into-Iter';
import { Parser, ParserResult, ParserToken } from './models/parser.model';

export const seq = (...parsers: Parser[]): Parser => {
  return function* (
    iterable: Iterable<string>
  ): Generator<ParserToken, ParserResult, Iterable<string>> {
    let innerIterator = intoIter(iterable);
    let result = '';

    for (const parser of parsers) {
      const { value } = parser(innerIterator).next();
      const [token, iterator] = value as ParserResult<string>;

      innerIterator = intoIter(iterator);
      result += token.value;
    }

    return [{ type: 'SEQ', value: result }, innerIterator];
  };
};
