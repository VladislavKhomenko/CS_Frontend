import { intoIter } from './helpers/into-Iter';
import { intoBuffer } from './helpers/into-buffer';
import { intoSeq } from './helpers/into-seq';
import { Parser, ParserResult, ParserToken } from './models/parser.model';

export const or = (...parsers: Parser[]): Parser => {
  return function* (
    iterable: Iterable<string>
  ): Generator<ParserToken, ParserResult, Iterable<string>> {
    let buffer: string[] = [];
    let innerIterator = intoBuffer(iterable, buffer);
    let parserResult = null;

    for (const parser of parsers) {
      try {
        const { value } = parser(innerIterator).next();
        parserResult = value as ParserResult<string>;
      } catch (error) {
        innerIterator = intoSeq(buffer, innerIterator);
      }
    }

    const [token, iter] = parserResult!;

    return [{ type: 'OR', value: token.value }, intoIter(iter)];
  };
};
