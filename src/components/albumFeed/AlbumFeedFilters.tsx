import clsx from 'clsx';
import { CategoryAttributes } from '../../interfaces/itunes-response';
import { Fragment } from 'react';
import { generateAlphabet } from '../../utils/strings';
import { useAlbums } from '../../hooks/useAlbums';

import styles from './AlbumFeedFilters.module.scss';

interface AlbumFeedFiltersProps {
  onGenreSelect: (genre: CategoryAttributes['label']) => void;
  selectedGenres: CategoryAttributes['label'][];
  onAlphanumericSelect: (letter: string) => void;
  selectedAlphanumeric: string[];
}

const AlbumFeedFilters = ({
  onGenreSelect,
  selectedGenres,
  selectedAlphanumeric,
  onAlphanumericSelect
}: AlbumFeedFiltersProps) => {
  const { filterOptions } = useAlbums();
  const genreOptions = filterOptions.genres;
  const alphanumericOptions = ['1-9', ...generateAlphabet()];

  return (
    <div className={styles.feedFilters}>
      {/* Genre/Category filter */}
      <div className={styles.feedFilterHeader}>By Genre</div>

      <div className={styles.feedGenreFilters}>
        {genreOptions.map(genre => (
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
        {alphanumericOptions.map((letter, i, array) => (
          <Fragment key={letter}>
            <div
              className={clsx(styles.alphanumericOption, {
                [styles.selected]: selectedAlphanumeric.includes(letter)
              })}
              onClick={() => onAlphanumericSelect(letter)}
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
