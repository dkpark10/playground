'use client';

import { type ReactNode, useSyncExternalStore } from 'react';

type ModalState = {
  id: number;
  component: ({ close, visible }: { close: () => void; visible: boolean }) => ReactNode;
  close: () => void;
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
  const open = (component: ModalState['component']) => {
    const modalId = generateId();

    const close = () => {
      modalState = modalState.map((modal) => {
        if (modal.id === modalId) {
          return {
            ...modal,
            visible: false,
          };
        }
        return modal;
      });

      setModalState([...modalState]);

      setTimeout(() => {
        modalState = modalState.filter((modal) => modal.id !== modalId);
        setModalState([...modalState]);
      }, 200);
    };

    modalState.push({ id: modalId, component, close, visible: true });
    setModalState([...modalState]);
  };

  return { open };
};
