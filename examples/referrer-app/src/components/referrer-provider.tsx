'use client';

import { useRouter } from 'next/navigation';
import { createContext, useEffect, useRef, type PropsWithChildren } from 'react';

export const ReferrerContext = createContext<{
  getReferer: () => string;
} | null>(null);

export function RefererProvider({ children }: PropsWithChildren) {
  const router = useRouter();

  const currentUrl = useRef<string | URL | null | undefined>('');

  const referrer = useRef<string[]>([]);

  const setReferer = useRef((value: string) => {
    referrer.current.push(value);
  });

  const getReferer = useRef(() => {
    if (referrer.current.length <= 0) return '';
    return referrer.current.slice(-1)[0];
  });

  useEffect(() => {
    const orgPushState = window.history.pushState.bind(window.history);

    const orgReplaceState = window.history.replaceState.bind(window.history);

    window.history.pushState = function pushState(data: any, unused: string, url?: string | URL | null) {
      setReferer.current(window.location.href);
      currentUrl.current = window.location.origin + (url as string);
      orgPushState(data, unused, url);
    };

    window.history.replaceState = function replaceState(
      data: any,
      unused: string,
      url?: string | URL | null,
    ) {
      referrer.current[referrer.current.length - 1] = currentUrl.current as string;
      currentUrl.current = window.location.origin + (url as string);
      orgReplaceState(data, unused, url);
    };

    return () => {
      window.history.pushState = orgPushState;
      window.history.replaceState = orgReplaceState;
    };
  }, [router]);

  return (
    <ReferrerContext.Provider
      value={{
        getReferer: getReferer.current,
      }}
    >
      {children}
    </ReferrerContext.Provider>
  );
}
