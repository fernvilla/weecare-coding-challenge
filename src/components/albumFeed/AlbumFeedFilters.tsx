import clsx from 'clsx';
import { CategoryAttributes } from '../../interfaces/itunes-response';
import { FilterOptions } from './AlbumFeed';
import { useRef } from 'react';

import styles from './AlbumFeedFilters.module.scss';

interface AlbumFeedFiltersProps {
  filterOptions: FilterOptions;
  onGenreSelect: (genre: CategoryAttributes['label']) => void;
  selectedGenres: CategoryAttributes['label'][];
}

const AlbumFeedFilters = ({ filterOptions, onGenreSelect, selectedGenres }: AlbumFeedFiltersProps) => {
  const scrollToRef = useRef<HTMLDivElement>(null);

  const handleOnScroll = () => {
    if (scrollToRef.current) {
      window.scrollTo({ top: scrollToRef.current.offsetTop - 20, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.feedFilters} ref={scrollToRef}>
      <div className={styles.feedFilterHeader}>By Genre</div>

      <div className={styles.feedGenreFilters}>
        {filterOptions.genres.map(genre => (
          <div
            key={genre}
            className={clsx(styles.feedGenreOption, {
              [styles.selected]: selectedGenres.includes(genre)
            })}
            onClick={() => {
              handleOnScroll();
              onGenreSelect(genre);
            }}
          >
            {genre}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumFeedFilters;
