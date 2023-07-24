import { createContext, useState } from 'react';
import { FavoriteSong, FavoritesContextInterface } from '../interfaces/favorites-context';

export const FavoritesContext = createContext<FavoritesContextInterface | null>(null);

const LOCAL_STORAGE_KEY = 'favorites';

const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const storedFavorites = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]') as FavoriteSong[];
  const [favorites, setFavorites] = useState<FavoriteSong[]>(storedFavorites || []);
  const [showFavoritesDrawer, setShowFavoritesDrawer] = useState(false);

  const onFavoriteClick = (album: FavoriteSong) => {
    checkIfFavorite(album) ? removeFavorite(album) : addFavorite(album);
  };

  const addFavorite = (song: FavoriteSong) => {
    const updatedFavorites = [...favorites, song];

    setFavorites(updatedFavorites);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedFavorites));
  };

  const removeFavorite = (song: FavoriteSong) => {
    const updatedFavorites = favorites.filter(favorite => favorite.id !== song.id);

    setFavorites(updatedFavorites);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedFavorites));
  };

  const checkIfFavorite = (song: FavoriteSong) => {
    return favorites.some(favorite => favorite.id.attributes['im:id'] === song.id.attributes['im:id']);
  };

  const toggleFavoritesDrawer = () => {
    setShowFavoritesDrawer(showFavoritesDrawer => !showFavoritesDrawer);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        checkIfFavorite,
        onFavoriteClick,
        favoritesCount: favorites.length || 0,
        showFavoritesDrawer,
        toggleFavoritesDrawer
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
