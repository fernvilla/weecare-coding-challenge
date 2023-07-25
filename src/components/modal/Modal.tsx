import { RiCloseCircleLine } from 'react-icons/ri';
import { useEffect, useRef } from 'react';
import clsx from 'clsx';

import styles from './Modal.module.scss';

export interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ show, onClose, children }: ModalProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (ev: Event) => {
      if (ref.current && !ref.current.contains(ev.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        onClose();
      }
    };

    // Handle click outside modal
    document.addEventListener('click', handleClickOutside, true);
    // Handle escape key press
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
      document.addEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div className={styles.modal}>
      <div
        className={clsx(styles.modalContent, {
          [styles.modalShow]: show,
          [styles.modalHide]: !show,
        })}
        ref={ref}
      >
        <div className={styles.modalCloseContainer}>
          <span className={styles.modalClose} onClick={onClose}>
            <RiCloseCircleLine />
          </span>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Modal;
