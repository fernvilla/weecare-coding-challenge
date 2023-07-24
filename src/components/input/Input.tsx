import styles from './Input.module.scss';

interface InputProps {
  placeholder?: string;
  autoFocus?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input = ({ placeholder = '', autoFocus = false, onChange, onKeyDown }: InputProps) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      autoFocus={autoFocus}
      className={styles.input}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};

export default Input;
