'use client';

import React from 'react';
import { useModalList } from "@/hooks/use-modal";
import { createPortal } from 'react-dom';

export default function ModalContainer() {
  const modalList = useModalList();

  return (
    <React.Fragment>
      {modalList.map((modal) => 
        createPortal(<div role='alert' data-modalid={modal.id} key={modal.id}>{modal.component({ close :modal.close })}</div>, 
        document.getElementById('portal')!))
      }
    </React.Fragment>
  );
}
