import { ApiClient } from './lib';

(async function () {
  const response = await new ApiClient<'search', string>()
    .setUrl('search')
    .setQuery('order', 'ascent')
    .retrieve();

  response;

  await new ApiClient<'search', string>()
    .setUrl('search')
    .setQuery('invalid', 0)
    .retrieve();
})();