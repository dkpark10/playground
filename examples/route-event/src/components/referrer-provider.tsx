'use client';

<<<<<<<< HEAD:examples/route-event/src/hooks/use-referrer.ts
import { useRouter } from 'next/navigation';
import { createContext, useEffect, useRef } from 'react';

// export const ReferrerContext = createContext<{
//   setReferrer: (referrer: string) => void;
//   getReferrer: () => string;
// } | null>(null);

export const useReferrer = () => {
  const router = useRouter();

========
import { type PropsWithChildren, createContext, useEffect, useRef, useState } from 'react';
import { useRouter } from "next/navigation";

export const ReferrerContext = createContext<{
  getReferrer: () => string;
} | null>(null);

export function ReferrerProvider({ children }: PropsWithChildren) {
  const router = useRouter();

>>>>>>>> 454cfff221e9b96fc91611db20eace213f1ce3b7:examples/route-event/src/components/referrer-provider.tsx
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
<<<<<<<< HEAD:examples/route-event/src/hooks/use-referrer.ts

    return () => {
      window.history.pushState = orgPushState;
      window.history.replaceState = orgReplaceState;
    };
  }, [router]);
========

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
>>>>>>>> 454cfff221e9b96fc91611db20eace213f1ce3b7:examples/route-event/src/components/referrer-provider.tsx
}