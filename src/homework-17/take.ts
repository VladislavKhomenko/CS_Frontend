import { intoIter } from './helpers/into-Iter';
import { intoSeq } from './helpers/into-seq';
import { Parser, ParserParams, ParserResult, ParserToken } from './models/parser.model';

export const take = (regExp: RegExp, params?: Partial<ParserParams>): Parser => {
  return function* (
    iterable: Iterable<string>
  ): Generator<ParserToken, ParserResult, Iterable<string>> {
    const innerIterator = intoIter(iterable);
    const { max = Infinity, min = 1 } = params || {};
    const prevIterable = [];
    let result = '';
    let count = 0;

    while (count < max) {
      const { done, value } = innerIterator.next();

      if (!regExp.test(value) && (!result || result.length < min)) {
        throw new Error('Invalid string');
      }

      if (done || !regExp.test(value)) {
        prevIterable.push(value);

        break;
      }

      result += value;
      count++;
    }

    return [{ type: 'TAKE', value: result }, intoSeq(prevIterable, innerIterator)];
  };
};
