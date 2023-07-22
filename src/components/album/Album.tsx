import { Entry } from '../../interfaces/itunes-response';
import { generateImageWithSizeFromUrl } from '../../utils/images';
import styles from './Album.module.scss';

interface AlbumProps {
  album: Entry;
}

const Album = ({ album }: AlbumProps) => {
  // Increase the size of the image by replacing api width with '500x500' (double the element size)
  const image = generateImageWithSizeFromUrl(album['im:image'][0].label, 500);

  return (
    <div className={styles.album}>
      <img src={image} alt={album.title.label} className={styles.albumImage} />

      <div className={styles.albumTextContainer}>
        <div className={styles.albumTitle}>{album['im:name'].label}</div>
        <div className={styles.artistName}>{album['im:artist'].label}</div>
      </div>
    </div>
  );
};

export default Album;
