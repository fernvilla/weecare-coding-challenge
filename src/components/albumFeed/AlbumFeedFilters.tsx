import clsx from 'clsx';
import { CategoryAttributes } from '../../interfaces/itunes-response';
import { FilterOptions } from './AlbumFeed';

import { generateAlphabet } from '../../utils/strings';

import styles from './AlbumFeedFilters.module.scss';
import { Fragment } from 'react';

interface AlbumFeedFiltersProps {
  filterOptions: FilterOptions;
  onGenreSelect: (genre: CategoryAttributes['label']) => void;
  selectedGenres: CategoryAttributes['label'][];
  onAlphabetSelect: (letter: string) => void;
  selectedAlphabet: string[];
}

const AlbumFeedFilters = ({
  filterOptions,
  onGenreSelect,
  selectedGenres,
  selectedAlphabet,
  onAlphabetSelect
}: AlbumFeedFiltersProps) => {
  return (
    <div className={styles.feedFilters}>
      {/* Genre/Category filter */}
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

      <div className={styles.feedFilterHeader}>Advanced Filters</div>

      {/* Alphanumeric filter */}
      <div className={styles.feedFilterSubheader}>By Alphabet (Title/Artist)</div>

      <div className={styles.feedAlphanumericFilters}>
        {generateAlphabet().map((letter, i, array) => (
          <Fragment key={letter}>
            <div
              className={clsx(styles.alphanumericOption, {
                [styles.selected]: selectedAlphabet.includes(letter)
              })}
              onClick={() => onAlphabetSelect(letter)}
            >
              {letter}
            </div>

            {i < array.length - 1 && <div className={styles.optionDivider}>|</div>}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default AlbumFeedFilters;
