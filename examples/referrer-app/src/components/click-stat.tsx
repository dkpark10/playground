'use client';

import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { useSafeContext } from '@/hooks/use-safe-context';
import { RefererContext } from '@/components/referer-provider';
import { statService } from '@/lib/stat-service';
import { useQueryReferer } from '@/hooks/use-query-referer';

export default function ClickStat({ children }: PropsWithChildren) {
  const { getReferer } = useSafeContext(RefererContext);

  const elementRef = useRef<HTMLElement>(null);
  const referer = useQueryReferer();
  referer;

  useEffect(() => {
    const handler = () => {
      alert(getReferer());
      statService.send({
        referer: getReferer(),
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
