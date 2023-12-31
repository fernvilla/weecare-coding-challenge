import { AlbumEntry } from './itunes-response';

export interface FavoriteSong extends AlbumEntry {}

export interface FavoritesContextInterface {
  favorites: FavoriteSong[];
  addFavorite: (song: FavoriteSong) => void;
  removeFavorite: (song: FavoriteSong) => void;
  checkIfFavorite: (song: FavoriteSong) => boolean;
  onFavoriteClick: (song: FavoriteSong) => void;
  favoritesCount: number;
  showFavoritesDrawer: boolean;
  toggleFavoritesDrawer: () => void;
}
