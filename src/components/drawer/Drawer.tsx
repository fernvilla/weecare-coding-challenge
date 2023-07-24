import { ReactNode, useEffect, useState } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';

import styles from './Drawer.module.scss';

interface DrawerProps {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
}

const Drawer = ({ open, onClose, children }: DrawerProps) => {
  const [isOpen, setIsOpen] = useState(open || false);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  if (!isOpen) return null;

  return (
    <div className={styles.drawer}>
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
