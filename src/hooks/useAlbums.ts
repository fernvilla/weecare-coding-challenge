import { useContext } from 'react';
import { AlbumsContextInterface } from '../interfaces/albums-context';
import { AlbumsContext } from '../context/albumsContext';

export const useAlbums = (): AlbumsContextInterface => {
  const context = useContext(AlbumsContext) as AlbumsContextInterface;

  if (!context) {
    throw new Error('useAlbums must be used within a AlbumsProvider');
  }

  return context;
};
