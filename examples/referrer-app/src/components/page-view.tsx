'use client';

import { useEffect } from 'react';
import { useSafeContext } from '@/hooks/use-safe-context';
import { ReferrerContext } from '@/components/referrer-provider';
import { statService } from '@/lib/stat-service';
import { useQueryReferer } from '@/hooks/use-query-referrer';

export default function PageView() {
  const { getReferer } = useSafeContext(ReferrerContext);
  const referrer = useQueryReferer();
  referrer;

  useEffect(() => {
    statService.send({
      referrer: getReferer(),
    });
  }, []);

  return <></>;
}
