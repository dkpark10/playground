type UpperMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS';

type LowerMethod = Lowercase<UpperMethod>;

export type Method = UpperMethod | LowerMethod;

export type EndPoint = 'search';

export type QueryParams = {
  [Key in EndPoint]: Key extends 'search'
  ? {
    keyword: string;
    start: number;
    end: number;
    order: 'ascent' | 'descend'
  }
  : {
    [key: string]: any;
  };
};
