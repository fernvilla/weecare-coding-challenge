import { RiArrowDropDownLine } from 'react-icons/ri';
import styles from './AlbumSort.module.scss';

interface AlbumSortProps {
  onSortChange: (sort: AlbumSortOption) => void;
  selectedSort: AlbumSortOption | null;
}

export interface AlbumSortOption {
  type: 'releaseDate' | 'artistName' | 'albumName';
  order: 'asc' | 'desc';
  label: string;
}

const sortOptions: AlbumSortOption[] = [
  { type: 'artistName', order: 'asc', label: 'Artist Name (A-Z)' },
  { type: 'artistName', order: 'desc', label: 'Artist Name (Z-A)' },
  { type: 'albumName', order: 'asc', label: 'Album Name (A-Z)' },
  { type: 'albumName', order: 'desc', label: 'Album Name (Z-A)' },
  { type: 'releaseDate', order: 'desc', label: 'Release Date (Newest)' },
  { type: 'releaseDate', order: 'asc', label: 'Release Date (Oldest)' },
];

const AlbumSort = ({ onSortChange, selectedSort }: AlbumSortProps) => {
  return (
    <div className={styles.albumSort}>
      <p>Sort:</p>

      <div className={styles.albumSortDropdown}>
        <div className={styles.albumSortDropdownSelect}>
          <span>{selectedSort?.label || 'Select'}</span> <RiArrowDropDownLine size={20} />
        </div>

        <div className={styles.albumSortDropdownOptions}>
          {sortOptions.map((option) => (
            <div
              key={`${option.type}-${option.order}`}
              className={styles.albumSortDropdownOption}
              onClick={() =>
                onSortChange({ type: option.type, order: option.order, label: option.label })
              }
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlbumSort;
