import { FetchClient } from './lib';

(async function () {
  const response = await new FetchClient<'search', string>()
    .setUrl('search')
    .setParameter(123)
    .setQuery('order', 'ascent')
    .setQuery('start', 1)
    .getUrl();

  console.log(response);

  // await new ApiClient<'search', string>()
  //   .setUrl('search')
  //   .setQuery('invalid', 0)
  //   .retrieve();
})();