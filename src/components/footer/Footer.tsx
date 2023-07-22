import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a>About</a>
      <a>Contact</a>
      <a>Sign Up</a>
      <a>Log In</a>
    </footer>
  );
};

export default Footer;
