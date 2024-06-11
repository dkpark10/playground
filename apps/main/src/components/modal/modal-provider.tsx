"use client";

import React, {
  useRef,
  useState,
  useEffect,
  createContext,
  useMemo,
  type ReactNode,
  type PropsWithChildren,
  Component,
} from "react";
import { createPortal } from "react-dom";

interface ModalContextParams {
  open: (reactNode: ReactNode) => void;
  close: (reactNode: ReactNode) => void;
}

export const ModalContext = createContext<ModalContextParams>({
  open: () => {},
  close: () => {},
});

export default function ModalProvider({ children }: PropsWithChildren) {
  const [modals, setModals] = useState<Map<number, ReactNode>>(new Map());

  const portalElement = useRef<Element | null>();

  const [mounted, setMounted] = useState(false);

  const context = {
    open: (Component: ReactNode) => {
      setModals((prev) => {
        const cloned = new Map(prev);
        cloned.set(1, Component);
        return cloned;
      });
    },

    close: (Component: ReactNode) => {},
  };

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      portalElement.current = document.getElementById("portal");
    }
  }, []);

  return (
    <React.Fragment>
      {children}
      <ModalContext.Provider value={context}>
        {portalElement.current && mounted && createPortal(<></>, portalElement.current)}
      </ModalContext.Provider>
    </React.Fragment>
  );
}

{
  /* <div className="bg-black w-screen h-screen bg-opacity-25 absolute z-10">
              <div className="absolute top-1/2 left-1/2 -translate-y-1/2	-translate-x-1/2">
                <div className="bg-white rounded-md p-6 w-80"></div>
              </div>
            </div>, */
}
