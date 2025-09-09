import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Link from 'next/link'

export default function Page() {
  const router = useRouter()

  const nextSlug = Number(router.query.slug) + 1;
  const prevSlug = Number(router.query.slug) - 1;

  useEffect(() => {
    console.log('mount');
    const routeChangeStartHandler = (...rest: any) => {
      console.log('routeChangeStart', rest);
    }
    const routeChangeCompleteHandler = (url: any, { shallow }: any) => {
      console.log('routeChangeComplete', url, shallow);
    }
    const routeChangeErrorHandler = (url: any, { shallow }: any) => {
      console.log('routeChangeError', url, shallow);
    }
    const beforeHistoryChangeHandler = (url: any, { shallow }: any) => {
      console.log('beforeHistoryChange', url, shallow);
    }
    const hashChangeStartHandler = (url: any, { shallow }: any) => {
      console.log('hashChangeStart', url, shallow);
    }
    const hashChangeCompleteHandler = (url: any, { shallow }: any) => {
      console.log('hashChangeComplete', url, shallow);
    }
    const emitHandler = (...rest: any) => {
      console.log('emitHandler', rest);
    }

    router.events.on('routeChangeStart', routeChangeStartHandler);
    router.events.emit('routeChangeStart', '123 custom data', 'hmm...');

    // router.events.on('routeChangeComplete', routeChangeCompleteHandler);
    // router.events.on('routeChangeError', routeChangeErrorHandler);
    // router.events.on('beforeHistoryChange', beforeHistoryChangeHandler);
    // router.events.on('hashChangeStart', hashChangeStartHandler);
    // router.events.on('hashChangeComplete', hashChangeCompleteHandler);
    return () => {
      router.events.off('routeChangeStart', routeChangeStartHandler);

      // router.events.off('routeChangeComplete', routeChangeCompleteHandler);
      // router.events.off('routeChangeError', routeChangeErrorHandler);
      // router.events.off('beforeHistoryChange', beforeHistoryChangeHandler);
      // router.events.off('hashChangeStart', hashChangeStartHandler);
      // router.events.off('hashChangeComplete', hashChangeCompleteHandler);
    }
  }, [router]);

  return (
    <>
      <h1>page router</h1>
      <Link href={`/page-dynamic/${nextSlug}`}>다음 페이지 {nextSlug}</Link>
      <div>slug: {router.query.slug}</div>
      <Link href={`/page-dynamic/${prevSlug}`}>이전 페이지 {prevSlug}</Link>
    </>
  )
}
