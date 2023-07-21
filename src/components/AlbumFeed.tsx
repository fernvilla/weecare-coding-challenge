import { Entry } from '../interfaces/itunes-response';
import Album from './Album';

interface AlbumFeedProps {
  albums: Entry[];
}

const AlbumFeed = ({ albums }: AlbumFeedProps) => {
  return (
    <div>
      {albums.map(album => (
        <Album album={album} key={album.id.attributes['im:id']} />
      ))}
    </div>
  );
};

export default AlbumFeed;
