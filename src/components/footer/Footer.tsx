import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a href="/">About</a>
      <a href="/">Contact</a>
      <a href="/">Sign Up</a>
      <a href="/">Log In</a>
    </footer>
  );
};

export default Footer;
