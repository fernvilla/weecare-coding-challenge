import { Entry } from '../../interfaces/itunes-response';
import { generateImageWithSizeFromUrl } from '../../utils/images';
import styles from './Album.module.scss';
import AlbumImage from './AlbumImage';

interface AlbumProps {
  album: Entry;
  onAlbumSelect: (album: Entry) => void;
}

const Album = ({ album, onAlbumSelect }: AlbumProps) => {
  // Increase the size of the image by replacing api width with '500x500' (double the element size)
  const image = generateImageWithSizeFromUrl(album['im:image'][0].label, 500);

  return (
    <div className={styles.album} onClick={() => onAlbumSelect(album)}>
      <AlbumImage image={image} label={album.title.label} />

      <div className={styles.albumTextContainer}>
        <div className={styles.albumTitle}>{album['im:name'].label}</div>
        <div className={styles.artistName}>{album['im:artist'].label}</div>
      </div>
    </div>
  );
};

export default Album;
