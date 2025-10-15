import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post<never, never, any>('http://stat-referrer.example.com/', () => {
    return HttpResponse.text('success', { status: 201 });
  }),
];
