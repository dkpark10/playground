import {
  type ReactElement,
  type JSXElementConstructor,
  type PropsWithChildren,
  cloneElement,
  useRef,
  useEffect,
} from 'react';

interface StatsProps {
  event: Array<keyof HTMLElementEventMap>;
  properties: (event: any) => Record<string, any> | Record<string, any>;
}

export default function Stats({ event, properties, children }: StatsProps & PropsWithChildren) {
  if (Array.isArray(children)) throw new Error('only one children');

  const elementRef = useRef<HTMLElement>();

  const sendStat = (e: Event) => {
    if (typeof properties === 'function') {
      console.log(properties(e));
      return;
    }
    console.log(properties);
  };

  useEffect(() => {
    if (!elementRef.current) return;
    event.forEach((e) => {
      elementRef.current?.addEventListener(e, sendStat);
    });

    return () => {
      event.forEach((e) => {
        elementRef.current?.removeEventListener(e, sendStat);
      });
    };
  }, []);

  return (
    <>
      {cloneElement(children as ReactElement<any, string | JSXElementConstructor<any>>, { ref: elementRef })}
    </>
  );
}
