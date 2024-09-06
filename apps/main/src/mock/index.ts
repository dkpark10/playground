/* eslint-disable @typescript-eslint/no-floating-promises */
(async function mockServerStart() {
  if (typeof window === 'undefined') {
    const { server } = await import('./server');
    server.listen();
  } else {
    const { worker } = await import('./browser');
    worker.start();
  }
})();

export {};
