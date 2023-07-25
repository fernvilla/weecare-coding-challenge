import { RiHeartFill, RiHeartLine } from 'react-icons/ri';
import { AlbumEntry } from '../../interfaces/itunes-response';
import { generateImageWithSizeFromUrl } from '../../utils/images';
import AlbumImage from './AlbumImage';
import { useFavorites } from '../../hooks/useFavorites';
import clsx from 'clsx';

import styles from './Album.module.scss';

interface AlbumProps {
  album: AlbumEntry;
  onAlbumSelect: (album: AlbumEntry) => void;
  albumIndex: number;
}

const Album = ({ album, onAlbumSelect, albumIndex }: AlbumProps) => {
  const { onFavoriteClick, checkIfFavorite } = useFavorites();
  // Increase the size of the image by replacing api width with '500x500' (double the element size)
  const image = generateImageWithSizeFromUrl(album['im:image'][0].label, 500);
  const isFavorite = checkIfFavorite(album);

  const handleOnFavoriteClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, album: AlbumEntry) => {
    e.stopPropagation();
    onFavoriteClick(album);
  };

  return (
    <div
      className={styles.album}
      onClick={() => onAlbumSelect(album)}
      // Add a delay to the animation based on the album index (only for the first n albums)
      style={{ animationDuration: `${albumIndex <= 6 ? albumIndex * 0.5 : 3.5}s` }}
    >
      <AlbumImage image={image} label={album.title.label} />

      <div className={styles.albumTextContainer}>
        <div className={styles.albumTitle}>
          <span>{album['im:name'].label} </span>

          <span
            className={clsx(styles.favoriteIcon, {
              [styles.favoriteIconActive]: isFavorite
            })}
            onClick={e => handleOnFavoriteClick(e, album)}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? <RiHeartFill color="#df3940" /> : <RiHeartLine />}
          </span>
        </div>

        <div className={styles.artistName}>{album['im:artist'].label}</div>
      </div>
    </div>
  );
};

export default Album;
