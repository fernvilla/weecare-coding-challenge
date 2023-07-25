import { RiAlbumFill, RiHeartFill } from 'react-icons/ri';
import Button from '../button/Button';
import { useFavorites } from '../../hooks/useFavorites';

import styles from './Header.module.scss';

const Header = () => {
  const { favoritesCount, toggleFavoritesDrawer } = useFavorites();

  return (
    <nav className={styles.header}>
      <div className={styles.headerLogo}>
        <RiAlbumFill size={30} color="#df3940" />
        <span>Top Music</span>
      </div>

      <Button isLink onClick={toggleFavoritesDrawer} className={styles.headerButton}>
        <div className={styles.favoritesLinkContainer}>
          {favoritesCount > 0 ? (
            <span>
              <span className={styles.viewText}>View your Favorites</span>{' '}
              <span className={styles.favoriteIcon}>
                <RiHeartFill />
              </span>
              <span className={styles.favoritesCount}>{favoritesCount}</span>
            </span>
          ) : (
            <span>Add Favorites</span>
          )}
        </div>
      </Button>
    </nav>
  );
};

export default Header;
