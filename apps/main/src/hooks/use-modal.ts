'use client';

import { type ReactNode, useSyncExternalStore } from "react";

type ModalState = {
  id: number;
  component: ({ close }: { close: () => void; }) => ReactNode;
  close: () => void;
}

const listeners = new Set<() => void>();

let modalState: Array<ModalState> = [];

/** @description assignment new memory variable */
const setModalState = (nextState: Array<ModalState>) => {
  modalState = nextState;
  listeners.forEach((listener) => listener());
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  }
}

const generateId = (() => {
  let id = 0;
  return () => id++;
})();

export const useModalList = () => {
  return useSyncExternalStore(subscribe, () => modalState);
}

export const useModal = () => {
  const open = (component: ModalState['component']) => {
    const modalId = generateId();

    const close = () => {
      modalState = modalState.filter((modal) => modal.id !== modalId);
      setModalState([...modalState]);
    };

    modalState.push({ id: modalId, component, close })
    setModalState([...modalState]);
  };

  return { open };
}