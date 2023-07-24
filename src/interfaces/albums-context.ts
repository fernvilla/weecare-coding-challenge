import { AlbumEntry, CategoryAttributes } from './itunes-response';

export interface FilterOptions {
  genres: CategoryAttributes['label'][];
}

export interface AlbumsContextInterface {
  albums: AlbumEntry[];
  isLoading: boolean;
  error: string | null;
  filterOptions: FilterOptions;
}
