import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';

const port = parseInt('8080');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // `url.parse`에 두 번째 인수로 `true`를 전달해야 합니다.
      // 이는 URL의 쿼리 부분을 구문 분석하도록 지시합니다.
      const parsedUrl = parse(req.url!, true)

      const { pathname, query } = parsedUrl;
      
      // @ts-ignore
      // const server = await app.getServer();

      if (pathname === '/a') {
        await app.render(req, res, '/a', query);
      } else if (pathname === '/b') {
        await app.render(req, res, '/b', query);
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error('처리 중 오류 발생', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`server listen ${port}`);
    });
});
