import styles from './Button.module.scss';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button = ({ onClick, type = 'button', children, disabled = false }: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
