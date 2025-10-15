'use client';

import { useEffect } from 'react';
import { useSafeContext } from '@/hooks/use-safe-context';
import { ReferrerContext } from '@/components/referrer-provider';
import { statService } from '@/lib/stat-service';

export default function PageView() {
  const { getReferrer } = useSafeContext(ReferrerContext);

  useEffect(() => {
    statService.send({
      referrer: getReferrer(),
    });
  }, []);

  return <></>;
}
