import { ReactNode, useEffect, useRef, useState } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import clsx from 'clsx';

import styles from './Drawer.module.scss';

interface DrawerProps {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
}

const Drawer = ({ open, onClose, children }: DrawerProps) => {
  const [isOpen, setIsOpen] = useState(open || false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (ev: Event) => {
      if (ref.current && !ref.current.contains(ev.target as Node)) {
        setIsOpen(false);
        onClose?.();
      }
    };

    // Handle click outside drawer
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  if (!isOpen) return null;

  return (
    <div
      className={clsx(styles.drawer, {
        [styles.drawerOpen]: isOpen
      })}
      ref={ref}
    >
      <div className={styles.drawerCloseContainer}>
        <span
          className={styles.drawerClose}
          onClick={() => {
            setIsOpen(false);
            onClose?.();
          }}
        >
          <RiCloseCircleLine />
        </span>
      </div>

      <div className={styles.drawerContent}>{children}</div>
    </div>
  );
};

export default Drawer;
