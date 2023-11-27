"use client";

import { useRef, useState, useEffect, PropsWithChildren } from "react";
import { createPortal } from "react-dom";

export default function ModalContainer({ children }: PropsWithChildren) {
  const portalElement = useRef<Element | null>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      portalElement.current = document.getElementById("portal");
    }
  }, []);

  if (portalElement.current && mounted) {
    return createPortal(
      <div className="bg-black w-screen h-screen bg-opacity-25 absolute z-10">
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2	-translate-x-1/2">
          <div className="bg-white rounded-md p-6 w-80">{children}</div>
        </div>
      </div>,
      portalElement.current,
    );
  }

  return null;
}
