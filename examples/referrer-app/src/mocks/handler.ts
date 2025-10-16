import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post<never, never, any>('http://localhost:3000/api/stat', () => {
    return HttpResponse.text('success', { status: 201 });
  }),
];
