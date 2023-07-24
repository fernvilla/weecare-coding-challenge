import { useContext } from 'react';
import { FavoritesContextInterface } from '../interfaces/favorite';
import { FavoritesContext } from '../context/favoritesContext';

export const useFavorites = (): FavoritesContextInterface => {
  const context = (useContext(FavoritesContext) as FavoritesContextInterface) || ({} as FavoritesContextInterface);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
};
