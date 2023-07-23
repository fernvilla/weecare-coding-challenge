import clsx from 'clsx';
import { CategoryAttributes } from '../../interfaces/itunes-response';
import { FilterOptions } from './AlbumFeed';
import styles from './AlbumFeedFilters.module.scss';

interface AlbumFeedFiltersProps {
  filterOptions: FilterOptions;
  onGenreSelect: (genre: CategoryAttributes['label']) => void;
  selectedGenres: CategoryAttributes['label'][];
}

const AlbumFeedFilters = ({ filterOptions, onGenreSelect, selectedGenres }: AlbumFeedFiltersProps) => {
  return (
    <div className={styles.feedFilters}>
      <div className={styles.feedFilterHeader}>By Genre</div>

      <div className={styles.feedGenreFilters}>
        {filterOptions.genres.map(genre => (
          <div
            key={genre}
            className={clsx(styles.feedGenreOption, {
              [styles.selected]: selectedGenres.includes(genre)
            })}
            onClick={() => onGenreSelect(genre)}
          >
            {genre}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumFeedFilters;
