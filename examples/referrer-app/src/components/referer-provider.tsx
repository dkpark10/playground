'use client';

import { useRouter } from 'next/navigation';
import { createContext, useEffect, useRef, type PropsWithChildren } from 'react';

export const RefererContext = createContext<{
  getReferer: () => string;
} | null>(null);

export function RefererProvider({ children }: PropsWithChildren) {
  const router = useRouter();

  const currentUrl = useRef<string | URL | null | undefined>('');

  const referer = useRef<string[]>([]);

  const getReferer = useRef(() => {
    if (referer.current.length <= 0) return '';
    return referer.current.slice(-1)[0];
  });

  useEffect(() => {
    const orgPushState = window.history.pushState.bind(window.history);

    const orgReplaceState = window.history.replaceState.bind(window.history);

    window.history.pushState = function pushState(data: any, unused: string, url?: string | URL | null) {
      referer.current.push(window.location.href);
      currentUrl.current = window.location.origin + (url as string);
      orgPushState(data, unused, url);
    };

    window.history.replaceState = function replaceState(
      data: any,
      unused: string,
      url?: string | URL | null,
    ) {
      referer.current[referer.current.length - 1] = currentUrl.current as string;
      currentUrl.current = window.location.origin + (url as string);
      orgReplaceState(data, unused, url);
    };

    return () => {
      window.history.pushState = orgPushState;
      window.history.replaceState = orgReplaceState;
    };
  }, [router]);

  return (
    <RefererContext.Provider
      value={{
        getReferer: getReferer.current,
      }}
    >
      {children}
    </RefererContext.Provider>
  );
}
