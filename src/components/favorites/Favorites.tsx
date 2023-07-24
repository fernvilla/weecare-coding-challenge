import { RiCloseCircleFill } from 'react-icons/ri';
import { useFavorites } from '../../hooks/useFavorites';
import { generateImageWithSizeFromUrl } from '../../utils/images';
import AlbumImage from '../album/AlbumImage';
import Drawer from '../drawer/Drawer';

import styles from './Favorites.module.scss';

const Favorites = () => {
  const { showFavoritesDrawer, toggleFavoritesDrawer, favorites, removeFavorite } = useFavorites();

  return (
    <Drawer open={showFavoritesDrawer} onClose={() => toggleFavoritesDrawer()}>
      <h2 className="text-bold">Favorites</h2>

      <div className={styles.favoritesList}>
        {!favorites?.length && <p className="text-medium">No favorites added yet.</p>}

        <div>
          {favorites?.map(album => {
            const image = generateImageWithSizeFromUrl(album['im:image'][0].label, 100);

            return (
              <div key={album.id.attributes['im:id']} className={styles.favoritesItem}>
                <div className={styles.favoriteInfoSection}>
                  <div className={styles.favoriteItemImage}>
                    <AlbumImage image={image} label={album.title.label} />
                  </div>

                  <div>
                    <p className="text-medium-bold">{album['im:name'].label}</p>
                    <p className={styles.artistName}>{album['im:artist'].label}</p>
                  </div>
                </div>

                <div className={styles.closeContainer} title="Remove Favorite" onClick={() => removeFavorite(album)}>
                  <RiCloseCircleFill size={24} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Drawer>
  );
};

export default Favorites;
