'use client';

import { useQueryClient } from '@tanstack/react-query';

interface QueryStoreProps {
  queryKey: string;
  queryData: any;
}

// 서버 컴포넌트에서 받은 데이터를 클라이언트에 전달할 때 props drilling을 피하기 위한 저장용 컴포넌트
export default function QueryStore({ queryKey, queryData }: QueryStoreProps) {
  const queryClient = useQueryClient();
  // gctime이 지난후 수집되므로 setQueryDefaults를 사용 setQueryData 사용을 지양
  queryClient.setQueryDefaults([queryKey], {
    initialData: queryData,
  });
  return null;
}
