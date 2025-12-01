'use client';

import { useEffect, useState } from 'react';
import { useSafeContext } from '@/hooks/use-safe-context';
import { RefererContext } from '@/components/referer-provider';
import { statService } from '@/lib/stat-service';

export default function PageView() {
  const [referer, setReferer] = useState('');
  const { getReferer } = useSafeContext(RefererContext);

  useEffect(() => {
    statService.send({
      referer: getReferer(),
    });
    setReferer(getReferer());
  }, []);

  return <div data-testid='referer'>{referer}</div>;
}
