import { RiEqualizerFill } from 'react-icons/ri';
import { CategoryAttributes, AlbumEntry } from './../../interfaces/itunes-response';
import Album from './../album/Album';
import { useEffect, useRef, useState } from 'react';
import AlbumFeedFilters from './AlbumFeedFilters';
import AlbumFeedSearch from './AlbumFeedSearch';
import { useDebounce } from '../../hooks/useDebounce';
import { useAlbums } from '../../hooks/useAlbums';
import styles from './AlbumFeed.module.scss';

interface AlbumFeedProps {
  onAlbumSelect: (album: AlbumEntry) => void;
}

const AlbumFeed = ({ onAlbumSelect }: AlbumFeedProps) => {
  const { albums } = useAlbums();
  const scrollToRef = useRef<HTMLDivElement>(null);
  const [filteredAlbums, setFilteredAlbums] = useState<AlbumEntry[]>(albums);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<CategoryAttributes['label'][]>([]);
  const [selectedAlphanumeric, setSelectedAlphanumeric] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);

  useEffect(() => {
    if (showFilters && scrollToRef.current) {
      // Scroll to the filters section when the filters are shown
      window.scrollTo({ top: scrollToRef.current.offsetTop - 20, behavior: 'smooth' });
    }
  }, [showFilters]);

  useEffect(() => {
    if (!debouncedSearchTerm) {
      setFilteredAlbums(albums);
    } else {
      setFilteredAlbums(
        albums.filter(album => {
          const artist = album['im:artist'].label;
          const albumName = album['im:name'].label;

          return (
            artist.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
            albumName.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
          );
        })
      );
    }
  }, [albums, debouncedSearchTerm]);

  useEffect(() => {
    if (!selectedGenres.length && !selectedAlphanumeric.length) {
      setFilteredAlbums(albums);
    } else {
      setFilteredAlbums(
        albums.filter(album => {
          const genre = album.category.attributes.label;
          const artist = album['im:artist'].label;
          const albumName = album['im:name'].label;
          const firstCharArtist = artist.charAt(0).toUpperCase();
          const firstCharArtistIsNumber = !isNaN(parseInt(firstCharArtist));
          const firstCharAlbumName = albumName.charAt(0).toUpperCase();
          const firstCharAlbumNameIsNumber = !isNaN(parseInt(firstCharAlbumName));

          if (selectedGenres.length && selectedAlphanumeric.length) {
            if (selectedAlphanumeric.includes('1-9')) {
              return selectedGenres.includes(genre) && (firstCharArtistIsNumber || firstCharAlbumNameIsNumber);
            }

            return (
              selectedGenres.includes(genre) &&
              (selectedAlphanumeric.includes(artist.charAt(0).toUpperCase()) ||
                selectedAlphanumeric.includes(albumName.charAt(0).toUpperCase()))
            );
          }

          if (selectedAlphanumeric.includes('1-9')) {
            return selectedGenres.includes(genre) || firstCharArtistIsNumber || firstCharAlbumNameIsNumber;
          }

          return (
            selectedGenres.includes(genre) ||
            selectedAlphanumeric.includes(artist.charAt(0).toUpperCase()) ||
            selectedAlphanumeric.includes(albumName.charAt(0).toUpperCase())
          );
        })
      );
    }
  }, [albums, selectedAlphanumeric, selectedGenres]);

  const onGenreSelect = (genre: CategoryAttributes['label']) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(selectedGenre => selectedGenre !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const onAlphanumericSelect = (alphabet: string) => {
    if (selectedAlphanumeric.includes(alphabet)) {
      setSelectedAlphanumeric(selectedAlphanumeric.filter(selectedAlphanumeric => selectedAlphanumeric !== alphabet));
    } else {
      setSelectedAlphanumeric([...selectedAlphanumeric, alphabet]);
    }
  };

  return (
    <div className={styles.feedContainer}>
      <div className={styles.feedTitleContainer}>
        <h2>Top Albums</h2>

        <div className={styles.feedActionsContainer}>
          <AlbumFeedSearch onSearch={setSearchTerm} />

          <div className={styles.feedActionsToggle} onClick={() => setShowFilters(showFilters => !showFilters)}>
            <RiEqualizerFill color="#df3940" />
            <span>Filters</span>
          </div>
        </div>
      </div>

      {showFilters && (
        <div ref={scrollToRef}>
          <AlbumFeedFilters
            onGenreSelect={onGenreSelect}
            selectedGenres={selectedGenres}
            onAlphanumericSelect={onAlphanumericSelect}
            selectedAlphanumeric={selectedAlphanumeric}
          />
        </div>
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
