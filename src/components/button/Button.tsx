import clsx from 'clsx';

import styles from './Button.module.scss';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  fullWidth?: boolean;
  isLink?: boolean;
  className?: string;
}

const Button = ({
  onClick,
  type = 'button',
  children,
  disabled = false,
  fullWidth = false,
  isLink = false,
  className,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        styles.button,
        {
          [styles.fullWidth]: fullWidth,
          [styles.isLink]: isLink,
        },
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
