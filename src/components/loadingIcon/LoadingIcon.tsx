import styles from './LoadingIcon.module.scss';

const LoadingIcon = () => {
  return (
    <div className={styles.loadingIconContainer}>
      <div className={styles.loadingIcon} />
    </div>
  );
};

export default LoadingIcon;
