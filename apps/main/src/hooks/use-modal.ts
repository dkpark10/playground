'use client';

import { type ReactNode, useSyncExternalStore, useRef } from 'react';

type ModalState = {
  id: number;
  component: ({ visible }: { visible: boolean }) => ReactNode;
  visible: boolean;
};

const listeners = new Set<() => void>();

let modalState: Array<ModalState> = [];

/** @description assignment new memory variable */
const setModalState = (nextState: Array<ModalState>) => {
  modalState = nextState;
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

const generateId = (() => {
  let id = 0;
  // eslint-disable-next-line no-plusplus
  return () => id++;
})();

export const useModalList = () => {
  return useSyncExternalStore(
    subscribe,
    () => modalState,
    () => modalState,
  );
};

export const useModal = () => {
  const modalId = useRef(-1);

  const open = (component: ModalState['component']) => {
    modalId.current = generateId();

    modalState.push({ id: modalId.current, component, visible: true });
    setModalState([...modalState]);
  };

  const close = () => {
    modalState = modalState.map((modal) => {
      if (modal.id === modalId.current) {
        return {
          ...modal,
          visible: false,
        };
      }
      return modal;
    });

    setModalState([...modalState]);

    setTimeout(() => {
      modalState = modalState.filter((modal) => modal.id !== modalId.current);
      setModalState([...modalState]);
    }, 200);
  };

  return { open, close };
};
