import { RiAlbumFill } from 'react-icons/ri';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <nav className={styles.header}>
      <div className={styles.headerLogo}>
        <RiAlbumFill size={30} color="#df3940" />
        <span>WeeCare Music</span>
      </div>
    </nav>
  );
};

export default Header;
