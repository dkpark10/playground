'use client';

import { useEffect } from 'react';
import { useSafeContext } from '@/hooks/use-safe-context';
import { RefererContext } from '@/components/referer-provider';
import { statService } from '@/lib/stat-service';
import { useQueryReferer } from '@/hooks/use-query-referer';

export default function PageView() {
  const { getReferer } = useSafeContext(RefererContext);
  const referer = useQueryReferer();
  referer;

  useEffect(() => {
    statService.send({
      referer: getReferer(),
    });
  }, []);

  return <></>;
}
