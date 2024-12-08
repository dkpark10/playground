'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { useModalList } from '@/hooks/use-modal';

export default function ModalContainer() {
  const modalList = useModalList();

  return (
    <>
      {modalList.map((modal) =>
        createPortal(
          <div role="alert" data-modalid={modal.id} key={modal.id}>
            {modal.component({ close: modal.close })}
          </div>,
          document.getElementById('portal')!,
        ),
      )}
    </>
  );
}
