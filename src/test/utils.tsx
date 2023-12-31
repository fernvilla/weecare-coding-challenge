import { render } from '@testing-library/react';
import { ReactElement } from 'react';
import AlbumsProvider from '../context/albumsContext';
import FavoritesProvider from '../context/favoritesContext';

export function renderWithProviders(ui: ReactElement) {
  return render(
    <AlbumsProvider>
      <FavoritesProvider>{ui}</FavoritesProvider>
    </AlbumsProvider>,
  );
}
