'use client';

import React, { type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { useModalList, type ModalState } from '@/hooks/use-modal';

interface ModalProps extends PropsWithChildren {
  modalState: ModalState;
}

function Modal({ children, modalState }: ModalProps) {
  if (modalState.options?.center) {
    return createPortal(
      <div
        className="z-[9999] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        role="alert"
      >
        {children}
      </div>,
      document.body,
    );
  }

  const [y, x] = modalState.options?.target?.offset || [0, 0];

  return createPortal(
    <div
      style={{
        top: y,
        left: x,
      }}
      className="z-[9999] absolute"
      role="alert"
    >
      {children}
    </div>,
    modalState.options?.target?.element || document.body,
  );
}

export default function ModalContainer() {
  const modalList = useModalList();

  return (
    <>
      {modalList.map((modal) => (
        <Modal data-modalid={modal.id} modalState={modal} key={modal.id}>
          {modal.component({ visible: modal.visible, id: modal.id })}
        </Modal>
      ))}
    </>
  );
}
