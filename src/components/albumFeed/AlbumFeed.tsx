import { Entry } from './../../interfaces/itunes-response';
import Album from './../album/Album';
import styles from './AlbumFeed.module.scss';

interface AlbumFeedProps {
  albums: Entry[];
}

const AlbumFeed = ({ albums }: AlbumFeedProps) => {
  return (
    <div className={styles.feed}>
      {albums.map(album => (
        <Album album={album} key={album.id.attributes['im:id']} />
      ))}
    </div>
  );
};

export default AlbumFeed;
