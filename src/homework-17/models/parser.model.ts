export interface ParserToken<T = unknown> {
  type: string;
  value?: T;
}

export interface ParserValue<T = unknown> extends ParserToken<T> {}

export type ParserResult<T = unknown> = [ParserValue<T>, Iterable<T>];

export type Parser<T = unknown, R = unknown> = (
  iterable: Iterable<string>,
  params?: ParserParams
) => Generator<ParserToken<T>, ParserResult<R>, Iterable<string> | undefined>;

export interface ParserParams {
  max: number;
  min: number;
}
