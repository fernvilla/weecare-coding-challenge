import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import FavoritesProvider from './context/favoritesContext';
import AlbumsProvider from './context/albumsContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AlbumsProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </AlbumsProvider>
  </React.StrictMode>,
);
