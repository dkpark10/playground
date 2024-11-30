'use client';

import React, { Suspense } from 'react';
import ServerComponent from '../components/server-component';
import ClientComponent from '../components/client-component';

export default async function NextNext() {
  return (
    <React.Fragment>
      <div>메인 클라</div>
      <Suspense fallback={<div>로딩중....</div>}>
        <ClientComponent>
          <ServerComponent />
        </ClientComponent>
      </Suspense>
    </React.Fragment>
  );
}
