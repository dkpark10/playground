'use client';

import { type PropsWithChildren, createContext, useEffect, useRef, useState } from 'react';
import { useRouter } from "next/navigation";

export const ReferrerContext = createContext<{
  getReferrer: () => string;
} | null>(null);

export function ReferrerProvider({ children }: PropsWithChildren) {
  const router = useRouter();

  const currentUrl = useRef<string | URL | null | undefined>('');

  const referrer = useRef<string[]>([]);

  const setReferrer = useRef((value: string) => {
    referrer.current.push(value);
  });

  const getReferrer = useRef(() => {
    if (referrer.current.length <= 0) return '';
    return referrer.current.slice(-1)[0];
  });

  useEffect(() => {
    const orgPushState = window.history.pushState.bind(window.history);

    const orgReplaceState = window.history.replaceState.bind(window.history);

    window.history.pushState = function pushState(data: any, unused: string, url?: string | URL | null) {
      setReferrer.current(window.location.href);
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
    }
  }, [router]);

  return (
    <ReferrerContext.Provider
      value={{
        getReferrer: getReferrer.current,
      }}
    >
      {children}
    </ReferrerContext.Provider>
  );
}