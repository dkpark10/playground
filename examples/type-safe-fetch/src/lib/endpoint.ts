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
    pathParameter: number;
    queryString: {
      keyword: string;
      start: number;
      end: number;
      order: 'ascent' | 'descend'
    }
  }
  : {
    [key: string]: any;
  };
};

// export type QueryParams<M extends Method> = {
//   [Key in EndPoint]: Key extends 'search'
//   ?
//   {
//     [Mkey in M]: Mkey extends 'get' ?
//     {
//       pathParameter: number;
//       queryString: {
//         keyword: string;
//         start: number;
//         end: number;
//         order: 'ascent' | 'descend'
//       }
//     } :
//     Mkey extends 'delete' ?
//     {
//       pathParameter: string;
//       queryString?: {}
//     } : never;
//   }
//   : {
//     [key: string]: any;
//   };
// };
