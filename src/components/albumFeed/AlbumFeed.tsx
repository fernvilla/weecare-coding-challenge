import { RiEqualizerFill } from 'react-icons/ri';
import { CategoryAttributes, Entry } from './../../interfaces/itunes-response';
import Album from './../album/Album';
import styles from './AlbumFeed.module.scss';
import { useEffect, useState } from 'react';
import AlbumFeedFilters from './AlbumFeedFilters';

interface AlbumFeedProps {
  albums: Entry[];
  onAlbumSelect: (album: Entry) => void;
}

export interface FilterOptions {
  genres: CategoryAttributes['label'][];
}

const AlbumFeed = ({ albums, onAlbumSelect }: AlbumFeedProps) => {
  const [filteredAlbums, setFilteredAlbums] = useState<Entry[]>(albums);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<CategoryAttributes['label'][]>([]);

  useEffect(() => {
    if (!selectedGenres.length) {
      setFilteredAlbums(albums);
    } else {
      setFilteredAlbums(
        albums.filter(album => {
          const genre = album.category.attributes.label;

          return selectedGenres.includes(genre);
        })
      );
    }
  }, [albums, selectedGenres]);

  const filterOptions = albums.reduce<FilterOptions>(
    (acc, album) => {
      const genre = album.category.attributes.label;

      if (!acc.genres.includes(genre)) {
        acc.genres.push(genre);
      }

      return acc;
    },
    { genres: [] }
  );

  const onGenreSelect = (genre: CategoryAttributes['label']) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(selectedGenre => selectedGenre !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  return (
    <div className={styles.feedContainer}>
      <div className={styles.feedTitle}>
        <h1>Top 100 Albums</h1>

        <div className={styles.feedActionsToggle} onClick={() => setShowFilters(showFilters => !showFilters)}>
          <RiEqualizerFill />
          <span>Filters</span>
        </div>
      </div>

      {showFilters && (
        <AlbumFeedFilters filterOptions={filterOptions} onGenreSelect={onGenreSelect} selectedGenres={selectedGenres} />
      )}

      <div className={styles.feed}>
        {filteredAlbums.map(album => (
          <Album album={album} key={album.id.attributes['im:id']} onAlbumSelect={onAlbumSelect} />
        ))}
      </div>
    </div>
  );
};

export default AlbumFeed;
