import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './toast-temp.module.scss';

interface ToastProps {
  isVisible: boolean;
  close: () => void;
}

export default function Toast({ isVisible, close }: ToastProps) {
  const closeCallback = useRef(close);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        closeCallback.current();
      }, 2000);
    }
  }, [isVisible]);

  return (
    <div className={styles.toast__container}>
      <div>
        <div
          className={clsx(styles.toast__link_success, {
            [styles.toast__fade_in]: isVisible,
            [styles.toast__fade_out]: !isVisible,
          })}
        >
          주소를 복사했어요
        </div>
      </div>
    </div>
  );
}
