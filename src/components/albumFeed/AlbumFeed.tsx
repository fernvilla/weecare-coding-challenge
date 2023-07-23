import { Entry } from './../../interfaces/itunes-response';
import Album from './../album/Album';
import styles from './AlbumFeed.module.scss';

interface AlbumFeedProps {
  albums: Entry[];
  onAlbumSelect: (album: Entry) => void;
}

const AlbumFeed = ({ albums, onAlbumSelect }: AlbumFeedProps) => {
  return (
    <div className={styles.feed}>
      {albums.map(album => (
        <Album album={album} key={album.id.attributes['im:id']} onAlbumSelect={onAlbumSelect} />
      ))}
    </div>
  );
};

export default AlbumFeed;
