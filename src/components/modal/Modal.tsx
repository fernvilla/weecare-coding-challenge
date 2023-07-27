import { RiCloseCircleLine } from 'react-icons/ri';
import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import useOnClickOutside from '../../hooks/useOnClickOutside';

import styles from './Modal.module.scss';

export interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ show, onClose, children }: ModalProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(ref, () => onClose());

  useEffect(() => {
    const handleEscape = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        onClose();
      }
    };

    // Handle escape key press
    document.addEventListener('keydown', handleEscape);

    return () => {
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
