import { AlbumEntry } from './itunes-response';

export interface AlbumsContextInterface {
  albums: AlbumEntry[];
  isLoading: boolean;
  error: string | null;
}
