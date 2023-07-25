import { useEffect, useRef, useState } from 'react';
import { useAlbums } from '../../hooks/useAlbums';
import Input from '../input/Input';
import { useDebounce } from '../../hooks/useDebounce';
import { AlbumEntry } from '../../interfaces/itunes-response';
import AlbumImage from '../album/AlbumImage';
import { generateImageWithSizeFromUrl } from '../../utils/images';
import { useFavorites } from '../../hooks/useFavorites';
import clsx from 'clsx';

import styles from './FavoritesAutoComplete.module.scss';

const FavoritesAutoComplete = () => {
  const { albums } = useAlbums();
  const { onFavoriteClick, checkIfFavorite } = useFavorites();
  const [filteredAlbums, setFilteredAlbums] = useState<AlbumEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);
  const ref = useRef<HTMLDivElement | null>(null);
  const suggestions = filteredAlbums.filter((album) => !checkIfFavorite(album));
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    const handleClickOutside = (ev: Event) => {
      if (ref.current && !ref.current.contains(ev.target as Node)) {
        setFilteredAlbums([]);
      }
    };

    // Handle click outside menu
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  // Filter albums by search term
  useEffect(() => {
    if (!debouncedSearchTerm) {
      setFilteredAlbums([]);
    } else {
      setFilteredAlbums(
        albums.filter((album) => {
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

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow use to cycle through the suggestions with the arrow keys and select with enter
    if (e.key === 'ArrowDown') {
      setSelectedIndex((selectedIndex) =>
        selectedIndex < suggestions.length - 1 ? selectedIndex + 1 : 0,
      );
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex((selectedIndex) =>
        selectedIndex > 0 ? selectedIndex - 1 : suggestions.length - 1,
      );
    } else if (e.key === 'Enter') {
      if (suggestions.length > 0) {
        onFavoriteClick(suggestions[selectedIndex]);
        setSelectedIndex(0);
      }
    }
  };

  return (
    <div className={styles.autoCompleteContainer} ref={ref}>
      <Input
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Albums"
        onKeyDown={handleOnKeyDown}
      />

      {suggestions.length > 0 && (
        <div className={styles.albumSuggestions}>
          {suggestions?.map((album, i) => {
            const image = generateImageWithSizeFromUrl(album['im:image'][0].label, 100);
            const isFavorite = checkIfFavorite(album);

            return (
              <div
                key={album.id.attributes['im:id']}
                className={clsx(styles.albumSuggestion, {
                  [styles.isFavorite]: isFavorite,
                  [styles.isSelected]: selectedIndex === i,
                })}
                onClick={() => onFavoriteClick(album)}
              >
                <div className={styles.suggestionInfoSection}>
                  <div className={styles.suggestionItemImage}>
                    <AlbumImage image={image} label={album.title.label} />
                  </div>

                  <div>
                    <p className="text-medium-bold">{album['im:name'].label}</p>
                    <p className={styles.artistName}>{album['im:artist'].label}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FavoritesAutoComplete;
