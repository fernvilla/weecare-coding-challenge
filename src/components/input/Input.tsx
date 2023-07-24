import styles from './Input.module.scss';

interface InputProps {
  placeholder?: string;
  autoFocus?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ placeholder = '', autoFocus = false, onChange }: InputProps) => {
  return (
    <input type="text" placeholder={placeholder} autoFocus={autoFocus} className={styles.input} onChange={onChange} />
  );
};

export default Input;
