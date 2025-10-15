'use client';

import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { useSafeContext } from '@/hooks/use-safe-context';
import { ReferrerContext } from '@/components/referrer-provider';
import { statService } from '@/lib/stat-service';

export default function ClickStat({ children }: PropsWithChildren) {
  const { getReferrer } = useSafeContext(ReferrerContext);

  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handler = () => {
      statService.send({
        referrer: getReferrer(),
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
