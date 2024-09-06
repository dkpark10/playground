'use client';

import { useContext } from 'react';
import { ModalContext } from '@/components/modal/modal-provider';

export const useModal = () => {
  const modalContext = useContext(ModalContext);

  const open = (Component: JSX.Element) => {
    modalContext?.open(Component);
  };

  const close = (Component: JSX.Element) => {};

  return {
    open,
    close,
  };
};
