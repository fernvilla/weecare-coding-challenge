import { RiSearchLine } from 'react-icons/ri';
import Input from '../input/Input';

import styles from './AlbumFeedSearch.module.scss';

interface AlbumFeedSearchProps {
  onSearch: (searchTerm: string) => void;
}

const AlbumFeedSearch = ({ onSearch }: AlbumFeedSearchProps) => {
  return (
    <div className={styles.albumSearchContainer}>
      <Input placeholder="Search Albums" onChange={(e) => onSearch(e.target.value)} />

      <div className={styles.albumSearchToggle}>
        <RiSearchLine />
      </div>
    </div>
  );
};

export default AlbumFeedSearch;
