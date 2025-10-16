'use client';

import { useEffect } from 'react';
import { useSafeContext } from '@/hooks/use-safe-context';
import { ReferrerContext } from '@/components/referrer-provider';
import { statService } from '@/lib/stat-service';
import { useQueryReferer } from '@/hooks/use-query-referrer';

export default function PageView() {
  const { getReferer } = useSafeContext(ReferrerContext);
  getReferer;
  const referrer = useQueryReferer();

  useEffect(() => {
    statService.send({
      referrer,
    });
  }, []);

  return <></>;
}
