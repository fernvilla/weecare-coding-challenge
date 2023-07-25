import { RiEqualizerFill } from 'react-icons/ri';
import { CategoryAttributes, AlbumEntry } from './../../interfaces/itunes-response';
import Album from './../album/Album';
import { useEffect, useRef, useState } from 'react';
import AlbumFeedFilters from './AlbumFeedFilters';
import AlbumFeedSearch from './AlbumFeedSearch';
import { useDebounce } from '../../hooks/useDebounce';
import { useAlbums } from '../../hooks/useAlbums';
import AlbumSort, { AlbumSortOption } from './AlbumSort';

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
  const [selectedSort, setSelectedSort] = useState<AlbumSortOption | null>(null);

  useEffect(() => {
    if (showFilters && scrollToRef.current) {
      // Scroll to the filters section when the filters are shown
      window.scrollTo({ top: scrollToRef.current.offsetTop - 20, behavior: 'smooth' });
    }
  }, [showFilters]);

  // Filter albums by search term
  useEffect(() => {
    if (!debouncedSearchTerm) {
      setFilteredAlbums(albums);
    } else {
      setFilteredAlbums(
        albums.filter((album) => {
          // Check if the artist or album name includes the search term
          const artist = album['im:artist'].label;
          const albumName = album['im:name'].label;

          return (
            artist.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
            albumName.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
          );
        }),
      );
    }
  }, [albums, debouncedSearchTerm]);

  // Filter albums by genre and/or alphanumeric
  useEffect(() => {
    if (!selectedGenres.length && !selectedAlphanumeric.length) {
      setFilteredAlbums(albums);
    } else {
      setFilteredAlbums(
        albums.filter((album) => {
          // Check if the album matches the selected genre and/or alphanumeric
          const genre = album.category.attributes.label;
          const artist = album['im:artist'].label;
          const albumName = album['im:name'].label;
          // Check if the first character of the artist or album name is a number for the '1-9' filter
          const firstCharArtist = artist.charAt(0).toUpperCase();
          const firstCharArtistIsNumber = !isNaN(parseInt(firstCharArtist));
          const firstCharAlbumName = albumName.charAt(0).toUpperCase();
          const firstCharAlbumNameIsNumber = !isNaN(parseInt(firstCharAlbumName));

          // If both filters are selected, check if the album matches both filters
          if (selectedGenres.length && selectedAlphanumeric.length) {
            if (selectedAlphanumeric.includes('1-9')) {
              return (
                // 'AND' filter
                selectedGenres.includes(genre) &&
                (firstCharArtistIsNumber || firstCharAlbumNameIsNumber)
              );
            }

            return (
              // 'AND' filter
              selectedGenres.includes(genre) &&
              (selectedAlphanumeric.includes(artist.charAt(0).toUpperCase()) ||
                selectedAlphanumeric.includes(albumName.charAt(0).toUpperCase()))
            );
          }

          if (selectedAlphanumeric.includes('1-9')) {
            return (
              // 'OR' filter
              selectedGenres.includes(genre) ||
              firstCharArtistIsNumber ||
              firstCharAlbumNameIsNumber
            );
          }

          // Default 'OR' filter when only one filter is selected
          return (
            selectedGenres.includes(genre) ||
            selectedAlphanumeric.includes(artist.charAt(0).toUpperCase()) ||
            selectedAlphanumeric.includes(albumName.charAt(0).toUpperCase())
          );
        }),
      );
    }
  }, [albums, selectedAlphanumeric, selectedGenres]);

  const onGenreSelect = (genre: CategoryAttributes['label']) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((selectedGenre) => selectedGenre !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const onAlphanumericSelect = (alphabet: string) => {
    if (selectedAlphanumeric.includes(alphabet)) {
      setSelectedAlphanumeric(
        selectedAlphanumeric.filter((selectedAlphanumeric) => selectedAlphanumeric !== alphabet),
      );
    } else {
      setSelectedAlphanumeric([...selectedAlphanumeric, alphabet]);
    }
  };

  const sortItems = (sort: AlbumSortOption) => {
    const newAlbums = filteredAlbums.sort((a, b) => {
      if (sort.type === 'artistName') {
        const artistALabel = a['im:artist'].label;
        const artistBLabel = b['im:artist'].label;

        switch (sort.order) {
          case 'asc':
            return artistALabel.localeCompare(artistBLabel);
          case 'desc':
            return artistBLabel.localeCompare(artistALabel);
          default:
            return artistALabel.localeCompare(artistBLabel); // Default a-z
        }
      }

      if (sort.type === 'albumName') {
        const albumALabel = a['im:name'].label;
        const albumBLabel = b['im:name'].label;

        switch (sort.order) {
          case 'asc':
            return albumALabel.localeCompare(albumBLabel);
          case 'desc':
            return albumBLabel.localeCompare(albumALabel);
          default:
            return albumALabel.localeCompare(albumBLabel); // Default a-z
        }
      }

      if (sort.type === 'releaseDate') {
        const releaseDateA = new Date(a['im:releaseDate'].label);
        const releaseDateB = new Date(b['im:releaseDate'].label);

        switch (sort.order) {
          case 'asc':
            return releaseDateA.getTime() - releaseDateB.getTime();
          case 'desc':
            return releaseDateB.getTime() - releaseDateA.getTime();
          default:
            return releaseDateB.getTime() - releaseDateA.getTime(); // Default newest
        }
      }

      return 0;
    });

    setFilteredAlbums(newAlbums);
  };

  const onSortChange = (sort: AlbumSortOption) => {
    setSelectedSort(sort);
    sortItems(sort);
  };

  return (
    <div className={styles.feedContainer}>
      {/* Header section w/filter toggle and search */}
      <div className={styles.feedTitleContainer}>
        <h2>Top Albums</h2>

        <div className={styles.feedActionsContainer}>
          <AlbumFeedSearch onSearch={setSearchTerm} />

          <div
            className={styles.feedActionsToggle}
            onClick={() => setShowFilters((showFilters) => !showFilters)}
          >
            <RiEqualizerFill color="#df3940" />
            <span>Filters</span>
          </div>
        </div>
      </div>

      {/* Feed Filter Section */}
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

      {/* Album Sort */}
      <AlbumSort onSortChange={onSortChange} selectedSort={selectedSort} />

      {/* Feed */}
      <div className={styles.feed}>
        {filteredAlbums.map((album, i) => (
          <Album
            album={album}
            key={album.id.attributes['im:id']}
            onAlbumSelect={onAlbumSelect}
            albumIndex={i}
          />
        ))}
      </div>
    </div>
  );
};

export default AlbumFeed;
