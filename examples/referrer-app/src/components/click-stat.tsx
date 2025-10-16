'use client';

import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { useSafeContext } from '@/hooks/use-safe-context';
import { ReferrerContext } from '@/components/referrer-provider';
import { statService } from '@/lib/stat-service';
import { useQueryReferer } from '@/hooks/use-query-referrer';

export default function ClickStat({ children }: PropsWithChildren) {
  const { getReferer } = useSafeContext(ReferrerContext);

  const elementRef = useRef<HTMLElement>(null);
  const referrer = useQueryReferer();

  useEffect(() => {
    const handler = () => {
      getReferer;
      statService.send({
        // referrer: getReferrer(),
        referrer,
      });
    };

    elementRef.current?.addEventListener('click', handler);
    return () => {
      elementRef.current?.removeEventListener('click', handler);
    };
  }, []);

  // @ts-ignore
  return React.cloneElement(children, { ref: elementRef });
}
