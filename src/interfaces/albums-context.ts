import { Entry } from './itunes-response';

export interface AlbumsContextInterface {
  albums: Entry[];
  isLoading: boolean;
  error: string | null;
}
